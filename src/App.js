import React, {useState} from 'react';
import './App.css';
import Head from './components/head';
import Results from './components/results';

function App() {
  const [symbols, updateSymbols] = useState([]);
  let [activeSymbol, setActiveSymbol] = useState(0);
  return (
    <div className="App">
      <Head addSymbol={updateSymbols} symbols={symbols} setActiveSymbol={setActiveSymbol}/>
      {symbols.length > 0 && <Results options={symbols} activeSymbol={activeSymbol} setActiveSymbol={setActiveSymbol} removeSymbol={updateSymbols}/>}
    </div>
  );
}

export default App;
