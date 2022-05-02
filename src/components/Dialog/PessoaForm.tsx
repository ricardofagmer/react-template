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
import { Formik } from 'formik'
import { Input } from '../Input/Input'
import * as yup from 'yup'

export const Modal = (prop: any) => {
  const [{ values, loading }, handleChange, handleSubmit] = useForm()
  const [cpf, setCpf] = useState('')
  const [pessoa, setPessoa] = useState('')

  const [initialValues = {}, setInitialValues] = useState()

  useEffect(() => {
    if (prop?.pessoa?.id) {
      setInitialValues(prop.pessoa);
    }
  }, [prop.pessoa])

  function resetForm() {
    prop.onHide()
  }

  const renderFooter = () => {
    return (
      <div className='row'>
        <div className='col text-right mt-3 mr-2'>
          <Button
            style={{width: '25%'}}
            type="submit"
            icon="pi pi-check"
            className={'p-button-success p-button-text'}
            autoFocus
          >
            {loading ? 'Enviando...' : 'Salvar'}
          </Button>
        </div>
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

  const savePerson = (values: any) => {
    let error = false

   /*  if (prop.pessoa.id) {
      const pessoa = Object.assign(new Pessoa(), values);

      new PessoaService().update(pessoa).pipe(
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
      ).subscribe();
    } else {
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
    } */
  }

  return (
    <Dialog
      appendTo={document.body}
      header="Person Registration"
      visible={prop.visible}
      style={{ width: '50vw' }}
      onHide={() => resetForm()}
    >
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(values) => savePerson(values)}
        validationSchema={validation}
      >
        {(props: any) => (
          <form name='form' className="dialog-demo" onSubmit={props.handleSubmit} noValidate>
            <div className="container form-group">
              <div className="row mt-5">
                <div className="col">
                  <Input id="nome" name="nome" label="Nome"></Input>
                </div>
                <div className="col">
                  <Input
                    id="sobrenome"
                    name="sobrenome"
                    label="Sobre Nome"
                  ></Input>
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
            {renderFooter()}
          </form>
        )}
      </Formik>
    </Dialog>
  )
}
