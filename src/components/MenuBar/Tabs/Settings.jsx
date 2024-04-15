import { useRef, useEffect } from 'react';
import './Settings.css';
import mainLogic from '@/logic/main.js';

const Settings = () => {
    useEffect(() => {
        console.log("loaded settings");
    }, [])

    const saveboxRef = useRef(null);

    const exportSave = () => {
        saveboxRef.current.innerHTML = mainLogic.exportSave();
    }

    const importSave = () => {
        mainLogic.importSave(saveboxRef.current.innerHTML);
    }

    return (
        <>
            <h2>Settings</h2>
            <div id="debugging-container">
                <label htmlFor="debug">Enable Debugging</label>
                <input id="debug" type="checkbox"/>

                <button onClick={mainLogic.wipeSave} id="wipe">Wipe Save</button>
            </div>

            <div className="spacer"></div>

            <div id="save-container">
                <textarea ref={saveboxRef} id="savegamebox"></textarea>
                <br />
                <button onClick={exportSave} id="export">Export Save</button>
                <button onClick={importSave} id="import">Import Save</button>
            </div>
        </>
    );
}

export default Settings;
