import Styles from '../Styles/Form.module.css'
import Button from '../components/Button/Button'

export default function Forms(){
    return(
        <div className={Styles.form}>
        <Button value="Adicionar Foto"></Button>
        <Button value="Remover foto"></Button>
        <Button value="Listar fotos"></Button>
        </div>
    
    )
}

