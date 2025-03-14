import '../index.css'
import "./reel.css";

function Reel(props) {
    return (
        <video autoPlay loop muted playsInline>
            <source src={props.video} type="video/mp4"  />
        </video> 
    )
}

export { Reel }
// 