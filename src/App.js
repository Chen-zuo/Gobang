import './App.css';
import { useState } from 'react';
import GobangClass from './components/class'
import GobangHook from './components/hook'


function App() {
  const [turn, setTurn] = useState(true)
  return (
    <div className="App">
      <div className="change">
        <button  onClick={() => {setTurn((turn)=>!turn)}}>切换组件类型</button>
        <p>当前为: {turn ? 'Class组件' : 'Hook组件'}</p>
      </div>
      
      { turn ? <GobangClass/> : <GobangHook/> }  
    </div>
  );
}

export default App;

