import Image from '../Image/Image'

export default function Table(props){

    function deletarFotoPeloId(fotoId){
        props.deletarFoto(fotoId)
    }


    return(
        <div className="table">
            <table className='table table-striped table-dark'>
                <thead>
                    <tr>
                        <th>Título da foto</th>
                        <th>Descrição</th>
                        <th>Tamanho</th>
                        <th>Imagem</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {/*mapeando os dados retornados no response*/}
                    {props.data.map(foto=>(
                        <tr key={foto.id}>
                            <td>{foto.tituloFoto}</td>
                            <td>{foto.descricaoFoto}</td>
                            <td>{foto.tamanhoFoto}</td>
                            <td><Image arquivo={foto.arquivo64Foto}></Image></td>
                            <td>
                            <button className='btn btn-primary'>Editar</button>{"   "} 

                            <button className='btn btn-danger' onClick={ ()=>deletarFotoPeloId(foto.id) }> Excluir </button>
                            </td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}