import { useState } from "react";
import "./searchBox-stylesheet.css";
import {fetchData} from '../../utils';

const SearchBox = ({ suggestions = [], onSelect, placeholder }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [noSuggestionsAvailable, setNoSuggestionsAvailable] = useState(false);
  const inputRef = document.querySelector('#searchBox input');

  const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  const resetSearchBox = () => {
    setShowSuggestions(false);
    setNoSuggestionsAvailable(false);
    inputRef.value = '';
  }

  const fetchRes = (e) => {
    const userInput = e.target.value;
    if(userInput){
      fetchData('function=SYMBOL_SEARCH&keywords='+userInput).then((res) => {
        if(res && res.bestMatches && res.bestMatches.length > 0){
          setFilteredSuggestions(res.bestMatches);
        } else {
          setNoSuggestionsAvailable(true);
        }
      })
      setActiveSuggestionIndex(0);
      setShowSuggestions(true);
    }
    setNoSuggestionsAvailable(false);
  };

  const executeSelect = (index) => {
    setFilteredSuggestions([]);
    onSelect(filteredSuggestions[index]['1. symbol']);
    setActiveSuggestionIndex(0);
    resetSearchBox()
  }

  const onClick = (index) => {
    executeSelect(index)
  };

  const focusElem = (index) => {
    const ref = document.querySelector('#suggestion-'+index);
    inputRef.value = filteredSuggestions[index]['1. symbol'];
    ref.focus();
  }

  const onKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      executeSelect(activeSuggestionIndex);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestionIndex === 0) {
        return;
      }
      focusElem(activeSuggestionIndex - 1);
      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
        return;
      }
      focusElem(activeSuggestionIndex + 1)
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;

          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }

          return (
            <li id = {`suggestion-${index}`} className={`flex flex-space-between ${className}`} key={suggestion['1. symbol']} onClick={() => onClick(index)}>
              <span>{suggestion['1. symbol']}</span>
              <span>{suggestion['2. name']} ({suggestion['4. region']})</span>
            </li>
          );
        })}
      </ul>
    ) : null;
  };

  return (
    <div id="searchBoxContainer">
      <div id="searchBox">
        <input
          type="text"
          onChange={debounce(fetchRes,500)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />
        {showSuggestions && <button className="close-desc" onClick={() => resetSearchBox()}>close</button>}
        {showSuggestions && <SuggestionsListComponent />}
        <div className="no-suggestions">
          {
            noSuggestionsAvailable && <span>Sorry no results available !</span>
          }
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
