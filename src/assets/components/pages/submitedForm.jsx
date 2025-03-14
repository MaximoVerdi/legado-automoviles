import { Header } from "../componentes";
import { Link } from "react-router-dom";
import "./submitedform.css"

const SubmitedForm = () => {

    return (
        <>
            <Header />
            <div className="submitedform">
                <h1>Correo Enviado con Exito!</h1>
                <p>Gracias por contactarnos</p>
                <Link to="/">Volver</Link>
            </div>
        </>
    )


}

export { SubmitedForm };