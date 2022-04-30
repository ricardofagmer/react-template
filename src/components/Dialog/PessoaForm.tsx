import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import style from './Dialog.module.scss'
import { InputMask } from 'primereact/inputmask'
import { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm'
import { PessoaService } from '../../services/pessoa.service'
import { Pessoa } from '../../model/pessoa/pessoa.entity'

import Swal from 'sweetalert2'
import { catchError, finalize } from 'rxjs'
import { Formik } from 'formik';
import { Input } from '../Input/Input'
import * as yup from 'yup'

export const Modal = (prop: any) => {
  const [{ values, loading }, handleChange, handleSubmit] = useForm()
  const [cpf, setCpf] = useState('')
  const [pessoa, setPessoa] = useState('')

  useEffect(() => {}, [prop.pessoa])

  function resetForm() {
    prop.onHide()
  }

  const renderFooter = () => {
    return (
      <div>
        <Button
          type="submit"
          onClick={savePerson}
          icon="pi pi-check"
          className={'p-button-success p-button-text'}
          autoFocus
        >
          {loading ? 'Enviando...' : 'Salvar'}
        </Button>
      </div>
    )
  }

  const validation = yup.object({
    nome: yup
      .string()
      .required('Nome obrigatorio')
      .min(3, 'minimo de 3')
      .max(20, 'max de 10'),
  })

  const savePerson = () => {
    let error = false

    new PessoaService()
      .create(Object.assign(new Pessoa(), values))
      .pipe(
        catchError((err) => {
          error = true
          Swal.fire({
            title: 'Erro',
            text: err,
            icon: 'error',
            confirmButtonText: 'Ok',
          })
          throw err
        }),
        finalize(() => {
          if (!error) prop.onHide()
        }),
      )
      .subscribe()
  }

  return (
    <Formik
       initialValues={{ nome: 'Ricardo', cpf: '', sobrenome: '' }}    
       onSubmit={(values) =>{ 
         alert(JSON.stringify(values))
       }}
       validationSchema={validation}
     >
      {(props: any) => (
        <form className="dialog-demo" noValidate onSubmit={props.handleSubmit}>
          <div className="card">
            <Dialog
              header="Person Registration"
              visible={prop.visible}
              style={{ width: '50vw' }}
              footer={renderFooter()}
              onHide={() => resetForm()}>
              <div className="container form-group">
                <div className="row mt-5">
                  <div className="col">
                  <Input id="nome" name="nome" label="Nome"  ></Input>
                  </div>
                  <div className="col">
                  <Input id="sobrenome" name="sobrenome" label="Sobre Nome"></Input>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col">
                    <span className="p-float-label">
                      <InputMask
                        className="p-inputtext-sm block mb-2"
                        id="cpf"
                        mask="999.999.999-99"
                        value={props.values.cpf}
                        style={{ width: '100%' }}
                        onChange={props.handleChange}
                      ></InputMask>
                      <label htmlFor="cpf">CPF</label>
                    </span>
                  </div>
                </div>
              </div>
            </Dialog>
          </div>
        </form>
      )}
    </Formik>
  )
}
