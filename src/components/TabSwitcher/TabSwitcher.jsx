import React, { useState } from 'react';
import './TabSwitcher.css';

const closeStore = () => {
    document.getElementById("MenuBar").classList.remove("open-store");
//     document.getElementById("MenuBar").classList.add("close-store");
}

const TabSwitcher = ({ tabs }) => {

    const [activeTab, setActiveTab] = useState(tabs[0].name);

    return <div className="tab-switcher">
        <div className='tab-list'>
            <button key="close" onClick={ closeStore }>Close</button>

            {tabs.map((tab) => {
                return <button
                    key={tab.name}
                    className={`tab-button ${activeTab === tab.name ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.name)}
                >
                    {tab.label}
                </button>
            })}
        </div>

        <div className="tab-content">
            {tabs.map(tab => (
                <div
                    key={tab.name}
                    style={{height: "100%", display: tab.name === activeTab ? 'block' : 'none' }}
                >
                    {tab.component}
                </div>
            ))}
        </div>
    </div>
}

export default TabSwitcher;
