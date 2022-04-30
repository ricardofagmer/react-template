import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom'
import AdicionarPessoa from '../../pages/AdicionarPessoa'
import ListarPessoas from '../../pages/ListarPessoas'
import PaginaOne from '../../pages/pagina1'
import { ConsultarPessoa } from '../../pages/Pessoa/ConsultarPessoa'
import { PessoaService } from '../../services/pessoa.service'
import SideNav from './SideNav'

const Home = () => {

  const sql = new PessoaService();
  const dispatch  = useDispatch();

  return (
    <div>
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <main>
              <Router>
              <SideNav />
                <Routes>
                  <Route path="/pessoa" element={<ConsultarPessoa />} />
                  <Route path="/pessoas/:id" element={<ListarPessoas />} />
                  <Route path="/pessoas" element={<ListarPessoas />} />
                  <Route path="/paginaone" element={<PaginaOne />} />
                  <Route path="/add" element={<AdicionarPessoa />} />
                </Routes>
              </Router>
            </main>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
