import 'bootstrap/dist/css/bootstrap.min.css'
import '../Image/Styles/Image.css'

export default function Image(props){

    return (
        <div>
          <img src={props.arquivo} alt="" className="rounded float-left" />
        </div>
    )
}