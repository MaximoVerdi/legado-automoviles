
import '../index.css'
import "./navItem.css";

function NavItem(props) {
    return (
        <li className='header__nav-item'>
            <a href={props.href}>{props.section}</a>
        </li> 
    )
}

export { NavItem }