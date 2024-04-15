import mainLogic from '@/logic/main.js';
import Upgrade from './Upgrade/Upgrade'

const Upgrades = () => {
    return (
        <>
            <p>Upgrades</p>
            {Object.keys(mainLogic.gameData.upgrades.automatic).map(key => {
                return <Upgrade upgradeId={mainLogic.gameData.upgrades.automatic[key]} />
            })}
        </>
    );
}

export default Upgrades;
