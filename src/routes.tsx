import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Index'

export default function Router () {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
    </Routes>
  )
}
