import './aboutUs.css'
import "../index.css"
import Owners from "../../images/owners.jpg"

function AboutUs() {
    return (
        <div className='aboutUs'>
            <div className='aboutUs__text'>
                <h2>Conectamos propietarios y compradores con profesionalismo</h2>
                <p>
                    En <strong>Legado Automóviles</strong> ofrecemos un servicio especializado en la <strong>publicación y promoción</strong> de vehículos en venta, conectando a propietarios con compradores de manera <strong>efectiva y profesional</strong>.  
                </p>
                <p>
                    Nuestro enfoque se basa en la creación de <strong>publicaciones profesionales</strong> que generan <strong>mayor visibilidad</strong> y en brindar un <strong>asesoramiento personalizado</strong>.  
                    Además, destacamos en nuestro <strong>stock</strong>, ya que <strong>seleccionamos los mejores vehículos</strong> para nuestros clientes.
                </p>
                </div>
            <div className='aboutUs__img'>
                <img src={Owners} alt="Sobre nosotros" />
            </div>
        </div>
    )
}

export { AboutUs }