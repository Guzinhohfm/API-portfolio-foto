export default function Header(props){
    return(
        <div>
            <header className="d-flex justify-content-center py-3"> 
             
                <button className='btn btn-success' onClick={props.AbrirModal} style={{width:200, height:200}}>
                <img src='./src/assets/insertpicture.png' alt='insert-picture' style={{width:200, height:200}}></img>
                </button>
            </header>
        </div>
    )
}