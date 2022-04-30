
import React from 'react';
import { useSelector } from 'react-redux';
import PessoaItem from '../../components/PessoaItem';

function ListarPessoas() {

const { pessoas } = useSelector((state) => state.pessoa)

  return (
      <div>
          {
              pessoas.map(p => <PessoaItem key={p.id} {...p} /> )
          }
      </div>
  );
}

export default ListarPessoas;