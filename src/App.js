import './App.css';
import { useState, useEffect } from 'react';
import GobangClass from './components/class'
import GobangHook from './components/hook'


function App() {
  const [type, setTurn] = useState('class')
  useEffect(() => {
    let type = localStorage.getItem("__type__")
    if(type){ setTurn(type) }
  }, [])

  let changeType= (type) =>{
    type = type === 'class' ? 'hook' : 'class' 
    setTurn(type)
    localStorage.setItem("__type__", type)
  }

  return (
    <div className="App">
      <div className="change">
        <button onClick={() => changeType(type)}>切换组件类型</button>
        <p>当前为: {type === 'class' ? 'Class组件' : 'Hook组件'}</p>
      </div>
      
      { type === 'class' ? <GobangClass/> : <GobangHook/> }  
    </div>
  );
}

export default App;

