import '../index.css';
import './navItem.css';
import { Link } from 'react-router-dom';

function NavItem(props) {
    return (
        <li className='header__nav-item'>
            <Link to={props.href || "/"}>{props.section}</Link>
        </li> 
    );
}

export { NavItem };
