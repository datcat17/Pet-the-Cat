type StoreItem<T> = {
    subscribers: Set<Subscriber<T>>;
    value: T;
};

class Subscriber<T> {
    readonly callback: (value: T) => void;
    private cleanup?: () => void;
    private destroyed: boolean;

    constructor(callback: (value: T) => void, cleanup?: () => void) {
        this.callback = callback;
        this.cleanup = cleanup;
        this.destroyed = false;
    }

    public isDestroyed(): boolean {
        return this.destroyed;
    }

    public destroy() {
        if (!this.destroyed) {
            this.cleanup?.();
            this.destroyed = true;
        }
    }
};

export class Store<T> {
    private intervalId: number | undefined;
    private items: Map<string, StoreItem<T>>;
    private toUpdate: Set<string>;

    constructor() {
        this.items = new Map();
        this.toUpdate = new Set();
    }

    private get(item: string): StoreItem<T> {
        let itemRef = this.items.get(item);

        if (itemRef === undefined) {
            throw new Error("Attempted to access store value that does not exist");
        }

        return itemRef;
    }

    public createItem(item: string, value: T): void {
        if (this.items.has(item)) {
            throw new Error("Cannot create store item: item already exists");
        }

        this.items.set(item, {
            subscribers: new Set(),
            value: value,
        });

        this.toUpdate.delete(item);
    }

    public deleteItem(item: string): void {
        const itemRef = this.get(item);

        for (const subscriber of [...itemRef.subscribers]) {
            subscriber.destroy();
        }

        // Just in case there are stale references
        itemRef.subscribers.clear();

        this.items.delete(item);
        this.toUpdate.delete(item);
    }

    public flush() {
        for (const item of this.toUpdate.values()) {
            const itemRef = this.get(item);
            for (const subscriber of [...itemRef.subscribers]) {
                try {
                    subscriber.callback(itemRef.value);
                } catch (e) {
                    console.error(`Subscriber on ${item} auto-removed due to thrown error:`, e);
                    subscriber.destroy();
                    itemRef.subscribers.delete(subscriber);
                }
            }
        }

        this.toUpdate.clear();
    }

    public getItem(item: string): T {
        return this.get(item).value;
    }

    public setItem(item: string, value: T): void {
        const itemRef = this.get(item);

        if (Object.is(itemRef.value, value)) {
            return;
        }

        itemRef.value = value;
        this.toUpdate.add(item);
    }

    public startTicking(interval: number) {
        if (this.intervalId !== undefined) {
            throw new Error("Cannot start store tick interval: already ticking.");
        }

        this.intervalId = setInterval(() => this.flush(), interval);
    }

    public stopTicking() {
        if (this.intervalId === undefined) {
            throw new Error("Cannot stop store ticking: not currently ticking.");
        }

        clearInterval(this.intervalId);
        this.intervalId = undefined;
    }

    public subscribe(
        item: string,
        callback: (value: T) => void,
        cleanup?: () => void,
    ): () => void {
        const itemRef = this.get(item);
        const subscriber = new Subscriber(callback, cleanup);
        itemRef.subscribers.add(subscriber);

        // New subscribers do not wait for the next tick
        try {
            subscriber.callback(itemRef.value);
        } catch (e) {
            console.error(`Subscriber on ${item} auto-removed due to thrown error:`, e);
            subscriber.destroy();
            itemRef.subscribers.delete(subscriber);
        }

        return () => {
            subscriber.destroy();
            itemRef.subscribers.delete(subscriber);
        };
    }
};
