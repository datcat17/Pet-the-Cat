import './MenuBar.css';
import TabSwitcher from '@/components/TabSwitcher/TabSwitcher';
import Settings from './Tabs/Settings';
import Upgrades from './Tabs/Upgrades';

const tabs = [
    { name: 'settings', label: 'Settings', component: <Settings /> },
    { name: 'upgrades', label: 'Upgrades', component: <Upgrades /> },
];

const MenuBar = () => {
    return <div id="MenuBar" className="menu-bar">
        <TabSwitcher tabs={tabs}></TabSwitcher>
    </div>
}

export default MenuBar;
