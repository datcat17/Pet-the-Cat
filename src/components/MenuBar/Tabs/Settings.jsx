const Settings = () => {
    return (
        <>
            <h2>Settings</h2>
            <div id="debugging-container">
              <label htmlFor="debug">Enable Debugging</label>
              <input id="debug" type="checkbox"/>

              <button id="wipe">Wipe Save</button>
            </div>
            
            <div className="spacer"></div>
            
            <div id="save-container">
              <textarea id="savegamebox"></textarea>
              <div id="export">Export Save</div>
              <div id="import">Import Save</div>
            </div>
        </>
    );
}

export default Settings;