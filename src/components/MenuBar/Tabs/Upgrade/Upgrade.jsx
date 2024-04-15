import { useState } from 'react';
import mainLogic from '@/logic/main.js';
import { objective4 } from "@/logic/objectives.js"
import { formatNumber } from '@/logic/format.js';
import './Upgrade.css';

const Upgrade = (upgrade) => {
    return (
        <div onClick={objective4} id={upgrade.upgradeId} className="upgrade">
            <h3>{upgrade.upgradeId.a}</h3>
            <div className="spacer" />
            <div>
                <h2>{upgrade.upgradeId.name}</h2>
                <h3>{formatNumber(Math.floor(upgrade.upgradeId.c))} pets</h3>
            </div>
            <h3>+{upgrade.upgradeId.v} pps</h3>
        </div>
    )
}

export default Upgrade;
