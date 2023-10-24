import Image from '../Image/Image'

export default function Table(props){

    function selecionarFoto(foto){
        props.fotoSelecionada(foto)

    }

    function editarFoto(foto){
        props.fotoSelecionadaEditar(foto)

    }


    return(
        <div className="table">
            <table className='table table-striped'>
                <thead>
                    <tr className='table-success'>
                        <th>Título da foto</th>
                        <th>Descrição</th>
                        <th>Tamanho</th>
                        <th>Imagem</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody className='table-light'>
                    {/*mapeando os dados retornados no response*/}
                    {props.data.map(foto=>(
                        <tr key={foto.id}>
                            <td>{foto.tituloFoto}</td>
                            <td>{foto.descricaoFoto}</td>
                            <td>{foto.tamanhoFoto}</td>
                            <td><Image arquivo={foto.arquivo64Foto}></Image></td>
                            <td>
                            <button className='btn btn-primary' onClick={()=>editarFoto(foto)}>Editar</button>{"   "} 

                            <button className='btn btn-danger'  onClick={()=>selecionarFoto(foto)}>Excluir</button>
                            
                            {/* inserir confirmação de delete */}
                            </td> 
                        </tr>
                    ))}
                </tbody>
                
            </table>
        </div>
    )
}