import './header.css'
import './index.css'
import 'boxicons/css/boxicons.min.css';

function Header() {

  return (
    <>
     <header className='header'>
        <div className='header__logo'>
        <span><strong>Legado</strong> Automoviles</span>
        </div>
        <nav className='header__nav'>
            <ul className='header__nav-list'>
                <li className='header__nav-item'><a href='#'>Inicio</a></li>
                <li className='header__nav-item'><a href='#'>Servicios</a></li>
                <li className='header__nav-item'><a href='#'>Stock</a></li>
                <li className='header__nav-item'><a href='#'>Nosotros</a></li>
                <li className='header__nav-item'><a href='#'><i class='bx bx-question-mark'></i></a></li>
            </ul>
        </nav>
     </header>
    </>
  )
}

export default Header
