import React from "react";
import './menu.css';
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import PaginaOne  from './pagina1';
import ListarPessoas from './ListarPessoas';
import AdicionarPessoa from "./AdicionarPessoa";

function Menu(){

    return(
        <Router>
        <div className="Menu">
            <header>
                <nav>
                    <ul>
                        <li className="active">
                        <NavLink to="/">Home</NavLink>
                        </li>                        
                        <li>   
                        <NavLink to={"/paginaone"}>Página</NavLink>                                            
                        </li> 
                        <li>   
                        <NavLink to={"/pessoas"}>Pessoas</NavLink>                                            
                        </li>
                        <li>   
                        <NavLink to={"/add"}>Add Pessoas</NavLink>                                            
                        </li>
                    </ul>
                </nav>
            </header> 
            <main>
                <Routes>
                    <Route path="/pessoas/:id" element={<ListarPessoas />} />
                    <Route path="/pessoas" element={<ListarPessoas />} />
                    <Route path="/paginaone" element={<PaginaOne />} />      
                    <Route path="/add" element={<AdicionarPessoa />}/>
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </main>       
        </div>
        </Router>
    );
}

 function NotFound(){
    return <>
        <h1>404 Page Not Found</h1>
    </>
}
 

export default Menu

