import './App.css'
import {Routes, Route} from "react-router-dom"
import io from "socket.io-client"
import RoomPage from './Pages/RoomPage'
import HomePage from './Pages/HomePage'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { data } from 'autoprefixer'
import Navbar from './AppComponents/NavBar'
import Error from './Pages/ErrorPage'


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
  const [users, setUsers] = useState([])

  useEffect(() => {
    socket.on("userIsJoined", (data) => {
      if(data.success) {
        console.log("User Joined")
        setUsers(data.users)
      } else console.log("Something Went Wrong")
    })
    socket.on("allUsers", (data) => {
      setUsers(data)
    })
    socket.on("userJoinedMsg", (data) => {
      toast.success(`${data} joined the Room`);
    })
    socket.on("userLeftMsg", (data) => {
      toast.success(`${data} left the Room`);
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
    <div className=''>
      <div className='sticky top-0 z-50'>
        <Navbar/>
      </div>
      <div className='max-w-[1280px] overflow-x-hidden md:overflow-visible h-screen mx-auto'>
        <Routes>
          <Route path='/' element={<HomePage generateID={generateID} socket={socket} setUser={setUser}/>}/>
          <Route path='/:roomID' element={<RoomPage user={user} socket={socket} users={users}/>}/>
          <Route path='*' element={<Error/>}/>
        </Routes>
      </div>
      <Toaster />
    </div>
  )
}

export default App