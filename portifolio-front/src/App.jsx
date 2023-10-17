import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import ModalInsert from './components/Modal/ModalInsert'
import { useState, useEffect } from 'react'
import Footer from './components/Footer/Footer'
import Table from './components/Table/Table'
import '../src/App.css'
import ModalConfirmation from './components/Modal/ModalConfirmation'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

export default function App(){

    const baseUrl = "https://localhost:7282/api/Foto";

    const [data, setData] = useState([]);

    const pedidoGet = async()=>{
        await axios.get(baseUrl)
        .then(response =>{
            setData(response.data)
        }).catch(error =>{
            console.log(error)
        })
    }

    const pedidoDelete=async(fotoId)=>{
            await axios.delete(`${baseUrl}/${fotoId}`)
            .then(response =>{
                var arrayFiltrado = data.filter( (itemArray) =>  itemArray.id !== fotoId)
                setData(arrayFiltrado)
            }).catch(error =>{
                console.log(error)
            })
    }

    

    const [modalIncluir, setModalIncluir]=useState(false)

    const abrirFecharModalIncluir=()=>{
        setModalIncluir(!modalIncluir)
        
    }

    const [modalConfirmar, setModalConfirmar]=useState(false)

    const abrirFecharModalConfirmar=()=>{
        setModalConfirmar(!modalConfirmar)
    }

    const [modalEditar, setModalEditar]=useState(false)

    const abrirFecharModalEditar=()=>{
        setModalEditar(!modalEditar)
    }
  
    useEffect(() =>{
        pedidoGet();
    }, []) //o array vazio que foi passado de segundo parâmetro serve para executar uma única vez o get

    const recebeFoto = async(fotoSelecionado)=>{
       //foto talvez precise de tratamento
        await axios.post(baseUrl, fotoSelecionado)
        .then(response=>{
            setData(data.concat(response.data))
            abrirFecharModalIncluir();
        }).catch(error =>{
            console.log(error)
        })
    }

    const selecionaFoto=(foto)=>{
        abrirFecharModalConfirmar()
        setFotoSelecionado(foto)
     }

     const [foto, setFotoSelecionado] = useState({})

     
     const deletarFoto=(fotoId)=>{
        console.log(fotoId)
        pedidoDelete(fotoId)
        abrirFecharModalConfirmar()
     }

     const editaFoto=(foto)=>{
        abrirFecharModalEditar()
        setFotoSelecionado(foto)

     }

     const [fotoSelecionado, setFotoSelecionadoEditar] = useState({
        tituloFoto: foto.titulo,
        descricaoFoto: foto.descricaoFoto,
        tamanhoFoto: foto.tamanhoFoto,
        arquivo64Foto: foto.arquivo64Foto
     })

     const handleChange=(e)=>{
        const {name, value} = e.target

        setFotoSelecionadoEditar(
            {...fotoSelecionado,[name]:value}
        )

        console.log(fotoSelecionado)
       
     }


    return(
        <div className='container-app'> 
            <h1 className='title'>Portifólio de fotos</h1>

            <Table data={data} fotoSelecionada={selecionaFoto} fotoSelecionadaEditar={editaFoto}></Table>
            {/* prompt de inclusão nova foto */}
            <ModalInsert IsOpen={modalIncluir} fotoAdicionada={recebeFoto} fecharModal={abrirFecharModalIncluir}></ModalInsert>

            <ModalConfirmation 
            
            IsOpen={modalConfirmar} 
            
            abrirFecharModalConfirmar={()=>abrirFecharModalConfirmar()} 

            fotoSelecionada={foto} 
            
            deletarFoto={()=>deletarFoto(foto.id)}
            
            ></ModalConfirmation>

            <Modal isOpen={modalEditar}>
                <ModalHeader>
                    <p>Editar os dados</p>
                </ModalHeader>

                <ModalBody>
                    
                        <label>Título:</label>
                        <input type="text" className='form-control' name='tituloFoto' placeholder={foto.tituloFoto} onChange={handleChange}/>
                        <br></br>

                        <label>Descrição:</label>
                        <input type="text" className='form-control' name='descricaoFoto'  placeholder={foto.descricaoFoto} onChange={handleChange}/>
                        <br></br>

                        <label>Tamanho:</label>
                        <input type="text" className='form-control' name='tamanhoFoto'  value={foto.tamanhoFoto} readOnly={true}/>
                        <br></br>

                        <label>Arquivo:</label>
                        <br></br>
                        <img src={foto.arquivo64Foto} style={{width: 200, height:200}}></img>
                        <br></br>
                        <input type="file" className='form-control' name='arquivo64Foto'  onChange={handleChange} />
                        <br></br>
                  
                </ModalBody>

                <ModalFooter>
                    <button className='btn btn-primary'>Confirmar</button>{"   "}
                 <button className='btn btn-danger' onClick={abrirFecharModalEditar}>Cancelar</button>
                </ModalFooter>
            </Modal>


            <Footer AbrirModal={abrirFecharModalIncluir}></Footer>
        </div>
    )
}