import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { useState } from 'react'



export default function Prompt(props){

    const [fotoSelecionado, setFotoSelecionado]=useState({
        tituloFoto: "",
        descricaoFoto: "",
        tamanhoFoto: "200x200",
        arquivo64Foto: ""
    })

    
    const handleChange=  e=>{
        const {name, value} = e.target;
      
        if(e.target.name == "arquivo64Foto"){
            let file = e.target.files;
            let reader = new FileReader();
            reader.readAsDataURL(file[0])
            reader.onload = (e) =>{
                let fotoBase64 = e.target.result
                setFotoSelecionado({
                    ...fotoSelecionado,[name]:fotoBase64
                })
            }
           
        } else {
            setFotoSelecionado({
                ...fotoSelecionado,[name]:value
            });
        }
    
    }


    function enviaFoto(){
        props.fotoAdicionada(fotoSelecionado)
    }


    return(
        <div>
             <Modal isOpen={props.IsOpen}>
                <ModalHeader>Inserir nova foto</ModalHeader>

                <ModalBody>
                    <div className='form-group'>
                        <label>Título:</label>
                        <input type="text" className='form-control' name='tituloFoto' onChange={handleChange}/>
                        <br></br>
                        <label>Descrição:</label>
                        <input type="text" className='form-control' name='descricaoFoto' onChange={handleChange}/>
                        <br></br>
                        {/* <label>Tamanho:</label>
                        <input type="text" className='form-control'  name='tamanhoFoto' onChange={handleChange}/>
                        <br></br> */}
                        <label>Arquivo:</label>
                        <input type="file" className='form-control' name='arquivo64Foto' onChange={handleChange} />
                        <br></br>

                        <ModalFooter>
                            <button className='btn btn-primary'onClick={()=>enviaFoto()}>Incluir</button>{"   "}
                            <button className='btn btn-danger' onClick={props.fecharModal}>Cancelar</button>
                        </ModalFooter>
                    </div>
                </ModalBody>
            </Modal>

        </div>
    )
}