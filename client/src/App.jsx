import { useEffect, useState } from 'react'
import { Routes, Route, } from "react-router-dom";
import io from "socket.io-client";
import Input from './components/input';
import Home from './components/home';

const socket = io("https://chat-app-v35g.vercel.app");

function App() {
  const [score, setScore] = useState({});
  const [scores, setScores] = useState([]);


  function handleInput(event){
    let {name, value} = event.target;
    let currentObj = { [name]: value };

    setScore((prev) => ({...prev, ...currentObj}));
  }

  function sendScore(){
    socket.emit("scores", score);
  }

  useEffect(() => {
    socket.on("playerScores", (playerScores) => {
      setScores(playerScores);

    });

  }, []);


  return (
    <>
    <button onClick={sendScore} className='p-2 border-2 border-amber-300'>ADD</button>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Input handleInput={handleInput} placeholder={"enter name"} name={"name"}/>}/>
      </Routes>

      <div>
        {(scores || []).map((data, index) => (
          <div className='flex gap-2 border-2 border-amber-950'>
            <span>{data?.name}</span>
            <span>{data?.id}</span>
          </div>
        ))}
      </div>

    </>
  )
}

export default App
