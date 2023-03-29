import React from "react";
import "./Settings.css";

const Settings = (props) =>{

    return(
        <div className="Menu">

            <button className="button" onClick={props.onGameToggle}> menage games</button>
            <button className="button" onClick={props.onAuthorToggle}> menage authors</button>
            <button className="button" onClick={props.onCategoryToggle}> menage categories</button>
            <button className="button" onClick={props.onPlatformToggle}> menage platforms</button>
        </div>
    )
}




export default Settings;