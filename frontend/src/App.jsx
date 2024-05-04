import './App.css'
import {Routes, Route} from "react-router-dom"
import RoomPage from './Pages/RoomPage'
import HomePage from './Pages/HomePage'

function App() {
  return (
    <div className='max-w-[1280px] mx-auto'>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/:roomID' element={<RoomPage/>}/>
      </Routes>
    </div>
  )
}

export default App