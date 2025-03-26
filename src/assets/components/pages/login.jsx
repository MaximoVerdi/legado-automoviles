import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Header } from '../componentes';
import './userForms.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
      <>
      <Header />
        <div className='login-form'>
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese su correo"
                name='email'
              />
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
              />
              <button type="submit">Iniciar sesión</button>
            </form>
            <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
        </div>
    </>
    
  );
};