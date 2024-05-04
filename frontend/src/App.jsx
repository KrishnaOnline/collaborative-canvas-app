import './App.css'
import {Routes, Route} from "react-router-dom"
import io from "socket.io-client"
import RoomPage from './Pages/RoomPage'
import HomePage from './Pages/HomePage'
import { useEffect, useState } from 'react'


const server = import.meta.env.VITE_BACKEND_URL
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
}
const socket = io(server, connectionOptions)

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    socket.on("userIsJoined", (data) => {
      if(data.success) {
        console.log("User Joined")
      } else console.log("Something Went Wrong")
    })
  }, [])

  const generateID = () => {
      let id = '';
      const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
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
        <Route path='/:roomID' element={<RoomPage user={user} socket={socket}/>}/>
      </Routes>
    </div>
  )
}

export default App