import { Route, Routes } from 'react-router-dom'
import Estabelecimento from './pages/Estabelecimento'
import CreateEstabelecimento from './pages/NewEstabelecimento'

import Login from './pages/Login'
import Home from './pages/Home/Index'
import Demanda from './pages/Demanda'
import Setoriacao from './pages/Setorizacao'
import TransferenciaSetorizacao from './pages/TransferenciaSetorizacao'
// import Home2 from './pages/Home2'

export default function Router () {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/criar' element={<CreateEstabelecimento />}/>
      <Route path='/estabelecimento/:cnpj' element={<Estabelecimento />}/>
      <Route path='/demanda' element={<Demanda />}/>
      <Route path='/setorizacao' element={<Setoriacao />}/>
      <Route path='/setorizacao/transferencia' element={<TransferenciaSetorizacao />}/>
    </Routes>
  )
}
