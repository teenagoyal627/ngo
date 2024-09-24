import SapnaLogo from './Logo/SapnaLogo.png';
import { Link } from "react-router-dom";
import './FrontPageNavbar.css'
const FrontPageNavbar = () => {

  return (
    <header className='header'>
   
      <div className='logo-container'>

        <Link to='/' className='logo-link'>
          <img src={SapnaLogo} alt='logo of ngo' className='logo-image' />
          <h3 style={{width:"20rem",fontSize:"1rem",marginLeft:"1rem"}} className='ngo-name'>Anandam Home For The Homeless</h3>
        </Link> 
      </div>
      {/* <nav>
        <ul>
          <li><Link to='/login' className="link">Login</Link></li>
         
        </ul>
      </nav> */}
    </header>
  );
}

export default FrontPageNavbar;
