import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PessoaService } from '../../services/pessoa.service';
import ListarPessoas from '../ListarPessoas';


function AdicionarPessoa() {

    const pessoaService = new PessoaService();

    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');

    const dispatch = useDispatch();

    const onSubmitHandler = event => {
        event.preventDefault();

        const pessoa = { nome, sobrenome };

        pessoaService.create(pessoa).subscribe(res => {
        });

        pessoaService.findAll().subscribe(data => console.log(data.data));
        
    }
  return  (
    <div>                   
        <h2>Adicionar Pessoa</h2>
        <form onSubmit={onSubmitHandler}>
            <div className="flex">
                <input id="one" type="text" placeholder="Nome" name="nome" value={nome} onChange={event => setNome(event.target.value)} required></input>
            </div>
            <div className="flex">
                <input id='two' type="text" placeholder="Sobrenome" name="sobrenome" value={sobrenome} onChange={event => setSobrenome(event.target.value)} required></input>
            </div>

            <button type="submit">ENVIAR</button>
        </form> 
        <ListarPessoas></ListarPessoas>
       </div>
)
}

export default AdicionarPessoa;