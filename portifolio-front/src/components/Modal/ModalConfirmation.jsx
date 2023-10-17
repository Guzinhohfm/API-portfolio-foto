import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function ModalConfirmation(props){
    
    
    
    return (
        <div>
          <Modal isOpen={props.IsOpen}>

        <ModalHeader>
            Deseja mesmo excluir esse dado?
            <br></br>
            {props.fotoSelecionada.tituloFoto}
            <br></br>
            <img src= {props.fotoSelecionada.arquivo64Foto} alt='foto arquivada' style={{width:200, height:200}}></img>
           
        </ModalHeader>

        <ModalBody>
            <button className='btn btn-primary'  onClick={props.deletarFoto}>Confirmar</button>
            <button className='btn btn-danger' onClick={props.abrirFecharModalConfirmar}>Cancelar</button>
        </ModalBody>

        </Modal>
        </div>
    )
}