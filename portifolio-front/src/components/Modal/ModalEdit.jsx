import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { useState } from 'react'

export default function ModalEdit(props){

    
     const handleChange=(e)=>{
        const {name, value} = e.target

        props.setFotoSelecionadoEditar(
            {...props.fotoSelecionado,[name]:value}
            
        )
       
        console.log(props.fotoSelecionado)
     }


    return(
        <div>
            <Modal isOpen={props.isOpen}>
                <ModalHeader>
                    <p>Editar os dados</p>
                </ModalHeader>

                <ModalBody>
                        <input type='hidden' className='form-control' value={props.fotoSelecionado && props.fotoSelecionado.id}></input>
                        <label>Título:</label>
                        <input type="text" className='form-control' name='tituloFoto'  
                        value={props.fotoSelecionado && props.fotoSelecionado.tituloFoto}

                        onChange={handleChange}/>
                        <br></br>

                        <label>Descrição:</label>
                        <input type="text" className='form-control' name='descricaoFoto' 
                        value={props.fotoSelecionado && props.fotoSelecionado.descricaoFoto}
                        onChange={handleChange}/>
                        <br></br>

                        <label>Arquivo:</label>
                        <br></br>
                        <img src={props.fotoSelecionado.arquivo64Foto} style={{width: 250, height:250}}></img>
                        <br></br>
                        <input type="file" className='form-control' name='arquivo64Foto' 
                        
                        onChange={handleChange} />
                        <br></br>
                  
                </ModalBody>

                <ModalFooter>
                    <button className='btn btn-primary' onClick={()=>pedidoPut(fotoSelecionado.id)}>Confirmar</button>{"   "}
                 <button className='btn btn-danger' onClick={props.abrirFecharModalEditar}>Cancelar</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}