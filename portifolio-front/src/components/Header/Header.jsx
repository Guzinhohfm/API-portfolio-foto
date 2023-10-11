export default function Header(props){
    return(
        <div>
            <header className="d-flex justify-content-center py-3"> 
                <button className='btn btn-success' onClick={props.AbrirModal} >Incluir foto</button>
            </header>
        </div>
    )
}