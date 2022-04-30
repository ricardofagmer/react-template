import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="main-footer">
        <strong>
          Copyright © 2009-{new Date().getFullYear()} <a href="https://www.biosistemico.com.br" target={'_blanck'}>Instituo Biosistemico</a>.
        </strong> &nbsp;
        Todos os direitos reservados.
        <div className="float-right d-none d-sm-inline-block">
          <b>Versão</b> 1.0
        </div>
      </footer>
    </div>
  )
}

export default Footer
