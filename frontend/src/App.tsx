
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Game from './pages/Game'

function App() {

  return (
    <div className='bg-slate-900'>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/game' element={<Game />} />
      </Routes>
    </div>

  )
}

export default App
