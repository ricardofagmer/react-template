import { BreadCrumb } from 'primereact/breadcrumb'
import style from './ConsultarPessoa.module.scss'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useEffect, useRef, useState } from 'react'
import { PessoaService } from '../../services/pessoa.service'
import { FilterMatchMode } from 'primereact/api'
import { Button } from 'primereact/button'
import { Modal } from '../../components/Dialog/PessoaForm'
import { Pessoa } from '../../model/pessoa/pessoa.entity'

import { ConfirmPopup } from 'primereact/confirmpopup'
import { confirmPopup } from 'primereact/confirmpopup'
import { useDispatch, useSelector } from 'react-redux'
import { ParceiroService } from '../../services/parceiro.service'
import { PessoaActions } from '../../store/actions/pessoa.action'
import { ParceiroActions } from '../../store/actions/parceiro.action'


export const ConsultarPessoa = () => {
    const home = {
        icon: 'pi pi-home',
        url: 'https://www.primefaces.org/primereact',
    }
    const items = [{ label: 'Cadastros' }, { label: 'Pessoa' }]

    const [pessoa, setPessoa] = useState();
    const [visible, setVisible] = useState(false)
    const [formVisible, setFormVisible] = useState(false)
    const toast = useRef() as any

    const pessoaService = new PessoaService(PessoaActions);
    const parceiroService = new ParceiroService(ParceiroActions);
    const dispatch = useDispatch();

    const { pessoas, isLoading } = useSelector((state: any) => state.pessoa);

    useEffect(() => {
        dispatch(parceiroService.list());
        dispatch(pessoaService.list());
    }, []);


    async function loadPeople() {      
        console.log(isLoading);        
    }

    const filters = {
        inventoryStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
    }

    function edit(rowData: any) {
        setFormVisible(true);
        setPessoa(rowData);
    }

    const disablePerson = async (pessoa: Pessoa) => {
        pessoa.desativadoEm = new Date();
        Promise.all([
            await dispatch(pessoaService.update(Object.assign(new Pessoa(), pessoa))),
            await dispatch(pessoaService.list()),           
        ]).then();      

        
        // setPessoas(pessoas.filter(el => el['id'] !== pessoa.id));
    }

    function load() {
        setFormVisible(false);
        loadPeople();
    }

    const accept = () => {
        toast.current.show({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'You have accepted',
            life: 3000,
        })
    }

    const reject = () => {
        toast.current.show({
            severity: 'warn',
            summary: 'Rejected',
            detail: 'You have rejected',
            life: 3000,
        })
    }

    const confirm = (event: any) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you wanna disable this one?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => disablePerson(event),
            reject: () => null,
        })
    }

    const actionBodyTemplate = (rowData: any) => {
        return (
            <>
                <Button
                    type="button"
                    icon="pi pi-pencil"
                    className="p-button-info"
                    onClick={() => edit(rowData)}
                    style={{ marginRight: '5px' }}
                ></Button>
                <Button
                    type="button"
                    icon="pi pi-times"
                    onClick={() => confirm(rowData)}
                    className="p-button-danger"
                ></Button>

                <ConfirmPopup
                    visible={visible}
                    onHide={() => setVisible(false)}
                    message="Are you sure you want to proceed?"
                    icon="pi pi-exclamation-triangle"
                    accept={accept}
                    reject={reject}
                />
            </>
        )
    }

    return (
        <div className={style.bread}>
            <BreadCrumb
                model={items}
                home={home}
                style={{ marginTop: '15px' }}
            ></BreadCrumb>

            <div className='mt-3 text-right'>
                <Button className='p-button-info' onClick={() => console.log(pessoas)}>New Peson</Button>
            </div>

            <div style={{ marginTop: '20px' }}>
                <DataTable
                    loading={isLoading}
                    value={pessoas}
                    rows={8}
                    paginator
                    filters={filters}
                    size="small">
                    <Column field="id" header="ID"></Column>
                    <Column field="nome" header="Name"></Column>
                    <Column field="sobrenome" header="Last Name"></Column>
                    <Column field="criadoEm" header="Register"></Column>
                    <Column
                        bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
                        body={actionBodyTemplate}
                    />
                </DataTable>
                <Modal visible={formVisible} pessoa={pessoa} onHide={() => load()}></Modal>
            </div>
        </div>
    )
}
