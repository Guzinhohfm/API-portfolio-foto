import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Modal from './components/Modal/Modal'
import { useState, useEffect } from 'react'
import Footer from './components/Footer/Footer'
import Table from './components/Table/Table'
import '../src/App.css'

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

    return(
        <div className='container-app'> 
            <h1 className='title'>Portifólio de fotos</h1>
            <Table data={data} deletarFoto={pedidoDelete}></Table>
            {/* prompt de inclusão nova foto */}
            <Modal IsOpen={modalIncluir} fecharModal={abrirFecharModalIncluir}  fotoAdicionada={recebeFoto} ></Modal>
            <Footer AbrirModal={abrirFecharModalIncluir}></Footer>
        </div>
    )
}