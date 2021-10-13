import React from 'react';
import SearchBox from '../searchBox';

const Head = ({symbols, addSymbol, setActiveSymbol}) => {
    const onSearchSelect = (item) => {
        let arr = [...symbols];
        arr.push(item)
        addSymbol(arr);
        setActiveSymbol(arr.length-1);
    }
    return (
        <div className="home">
            <header className="App-header">
                <p>Stock Picker Widget</p>
                <SearchBox onSelect={onSearchSelect} placeholder="Search for a stock"/>
            </header>
        </div>
    )
}
export default Head;