import React from 'react';
import './results-stylesheet.css';
import Tabs from '../tabs';
import Description from '../description';

const Results = (props) => {
    let {options, activeSymbol, setActiveSymbol, removeSymbol} = props;
    const closeSymbol = (id) => {
        let index = options.indexOf(id);
        if(index >= 0){
            let arr = [...options];
            arr.splice(index,1);
            removeSymbol(arr);
            if(activeSymbol === index){
                setActiveSymbol(arr.length-1);
            }
        }
    }
    return (
        <div className="results">
            <Tabs activeTab={activeSymbol} options={options} onTabSelect={(index) => setActiveSymbol(index)}/>
            <Description symbolId = {options[activeSymbol]} closeSymbol={closeSymbol}/>
        </div>
    )
}
export default Results;