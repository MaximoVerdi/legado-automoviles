import "./service.css";
import "../index.css";

function Service(props) {

  return (
    <>
            <div className="service__item">
                <img src={props.img} alt={props.alt} /> 
                <div>
                <p>{props.p}</p>
                <span>{props.span}</span>
                </div>
            </div>
            
    </>
    )
}

export { Service }
