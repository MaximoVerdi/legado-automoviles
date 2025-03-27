import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/authContext'; // Asegúrate de que esta ruta sea correcta
import { Header } from '../componentes';
import './userForms.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, loading, error } = useAuth(); // Usamos el contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Usamos la función del contexto
      navigate('/');
    } catch (error) {
      // El error ya está manejado en el AuthContext, no necesitamos hacer alert
      console.error(error); // Opcional: para debugging
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
            disabled={loading} // Deshabilitamos durante la carga
            required
            />
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
            disabled={loading} // Deshabilitamos durante la carga
            required
            />
          <button type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>
        <p>
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
        {error && <div className="error-message">{error}</div>} {/* Mostramos el error del contexto */}
      </div>
    </>
  );
};