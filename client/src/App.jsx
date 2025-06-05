import { useEffect, useState } from 'react'
import { Routes, Route, } from "react-router-dom";
import io from "socket.io-client";
import Input from './components/input';
import Home from './components/home';

function App() {
  const [score, setScore] = useState({});
  const [scores, setScores] = useState([]);

  const socket = io("http://localhost:3000");

  function connectSocket(){
    socket.on("connection", (socket) => {
      console.log("socket connected")
    });
  }

  function handleInput(event){
    let {name, value} = event.target;
    let currentObj = { [name]: value };

    setScore((prev) => ({...prev, ...currentObj}));
  }

  function sendScore(){
    socket.emit("scores", score);

    socket.on("playerScores", (playerScores) => {
      setScores(playerScores);
    });
  }

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <>
    <button onClick={sendScore} className='p-2 border-2 border-amber-300'>ADD</button>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Input handleInput={handleInput} placeholder={"enter name"} name={"name"}/>}/>
      </Routes>

    </>
  )
}

export default App
