import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import ModalInsert from './components/Modal/ModalInsert'
import { useState, useEffect } from 'react'
import Footer from './components/Footer/Footer'
import Table from './components/Table/Table'
import '../src/App.css'
import ModalConfirmation from './components/Modal/ModalConfirmation'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import ModalEdit from './components/Modal/ModalEdit'
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

    
     const [modalEditar, setModalEditar]=useState(false)

    const abrirFecharModalEditar=()=>{
        setModalEditar(!modalEditar)
    }

    const editaFoto=(foto)=>{
        abrirFecharModalEditar()
        setFotoSelecionadoEditar(foto)
     }



    const [fotoSelecionado, setFotoSelecionadoEditar] = useState({
        tituloFoto: foto.titulofoto,
        descricaoFoto: foto.descricaoFoto,
        tamanhoFoto: foto.tamanhoFoto,
        arquivo64Foto: foto.arquivo64Foto
     })


     const pedidoPut=async(fotoId)=>{
        await axios.put(`${baseUrl}/${fotoId}`, fotoSelecionado)
        .then(response =>{
            var resposta = response.data;
            var dadosAuxiliar = data;
            dadosAuxiliar.map(foto =>{
                if(foto.id === fotoSelecionado.id){
                    foto.tituloFoto = resposta.tituloFoto;
                    foto.descricaoFoto = resposta.descricaoFoto;
                    foto.arquivo64Foto = resposta.arquivo64Foto;
                }
            })
            abrirFecharModalEditar();
           
        }).catch(error=>{
            console.log(error);
        })
     }


    return(
        <div className='container-app'> 
            <h1 className='title'>Portifólio de fotos</h1>

            <Table data={data} fotoSelecionada={selecionaFoto} fotoSelecionadaEditar={editaFoto}></Table>
            {/* prompt de inclusão nova foto */}
          
            <ModalInsert IsOpen={modalIncluir} fotoAdicionada={recebeFoto} fecharModal={abrirFecharModalIncluir}></ModalInsert>

            <ModalConfirmation   IsOpen={modalConfirmar}      fotoSelecionada={foto}     deletarFoto={()=>deletarFoto(foto.id)}  ></ModalConfirmation>

            <ModalEdit isOpen={modalEditar} fotoSelecionado={fotoSelecionado} abrirFecharModalEditar={abrirFecharModalEditar} setFotoSelecionadoEditar={setFotoSelecionadoEditar}></ModalEdit>

           
            <Footer AbrirModal={abrirFecharModalIncluir}></Footer>
        </div>
    )
}