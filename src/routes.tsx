import { Route, Routes } from 'react-router-dom'
import Estabelecimento from './pages/Estabelecimento'
import Home from './pages/Home/Index'
import CreateEstabelecimento from './pages/NewEstabelecimento'

export default function Router () {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/criar' element={<CreateEstabelecimento />}/>
      <Route path='/estabelecimento/:cnpj' element={<Estabelecimento />}/>
    </Routes>
  )
}
