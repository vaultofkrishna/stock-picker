import React from "react";
import "./tabs-stylesheet.css";

const Tabs = ({ activeTab, options, onTabSelect}) => {
    const onSelect = (e) => {
        let ref = e.target;
        onTabSelect(ref.getAttribute('index'));
    }
    return (
        <div className="sub-nav-holder card">
            <ul onClick={onSelect} className="flex">
                {
                    options.map((item,i) => {
                        return (<li className={`${(parseInt(activeTab) === i?'active':'')}`} key={i} index={i}>
                            {item}
                        </li>)
                    })
                }
            </ul>
        </div>
    )
};

export default Tabs;
