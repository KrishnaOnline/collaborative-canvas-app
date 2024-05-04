import './App.css'
import {Routes, Route} from "react-router-dom"
import io from "socket.io-client"
import RoomPage from './Pages/RoomPage'
import HomePage from './Pages/HomePage'
import { useState } from 'react'

const server = process.env.VITE_BACKEND_URL
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
}
const socket = io(server, connectionOptions)

function App() {
  const [user, setUser] = useState(null)


  const generateID = () => {
      let id = '';
      const chars = '0123456789';
      for (let i=0; i<3; i++) {
          if(i>0) id += '-';
          for(let j=0; j<3; j++) {
              id += chars.charAt(Math.floor(Math.random() * chars.length));
          }
      }
      return id;
  }
  // console.log(generateID());

  return (
    <div className='max-w-[1280px] mx-auto'>
      <Routes>
        <Route path='/' element={<HomePage generateID={generateID} socket={socket} setUser={setUser}/>}/>
        <Route path='/:roomID' element={<RoomPage/>}/>
      </Routes>
    </div>
  )
}

export default App