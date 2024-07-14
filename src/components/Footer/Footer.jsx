import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer-contenedor'>
        <div className='footer'>
        
      <div className="acerca-de" >
        <small>acerca de</small>
        <p><Link to='https://portfoliotomascaggiano.netlify.app/'>portfolio</Link></p>
        <p><Link to='https://github.com/TomasCaggiano/e-commerce-firebase'>repositorio</Link></p>
      </div>
      <div>
        <small className='contactoTitulo'>contacto</small>
        <p><Link to='https://www.linkedin.com/in/tomas-caggiano-813139284/'>linkedin</Link></p>
        <p>tomascaggiano03@gmail.com</p>
        <p>+54 9 11 2386-4222</p>
      </div>
    </div>
    <div>
     <br />
      <small className='copyright'>
      © 2024 Tomas Caggiano. Todos los derechos reservados.</small>

    </div>
    </div>
  )
}

export default Footer
