import { Route, Routes } from 'react-router-dom'
import Estabelecimento from './pages/Estabelecimento'
import CreateEstabelecimento from './pages/NewEstabelecimento'
import Home from './pages/Home/Index'
import Login from './pages/Login'

export default function Router () {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/criar' element={<CreateEstabelecimento />}/>
      <Route path='/estabelecimento/:cnpj' element={<Estabelecimento />}/>
    </Routes>
  )
}
