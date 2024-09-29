import SapnaLogo from './Logo/SapnaLogo.png';
import { Link } from "react-router-dom";
import './FrontPageNavbar.css'
const FrontPageNavbar = () => {

  return (
    <header className='header'>
   
      <div className='logo-container'>

        <Link to='/' className='logo-link'>
          <img src={SapnaLogo} alt='logo of ngo' className='logo-image' />
          <h3 style={{width:"40rem",fontSize:"1.5rem",marginLeft:".1rem",marginTop:"1rem"}} className='ngo-name'>Anandam Home For The Homeless</h3>
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
