import { useState } from 'react';
import SapnaLogo from './Logo/SapnaLogo.png';
import { Link ,useLocation} from "react-router-dom";
import './FrontPageNavbar.css'
import { MessageBox } from '../MessageBox';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const OtherPageNavbar = () => {
  const[showModal,setShowModal]=useState(false)
  const[modalContent,setModalContent]=useState({
    title:"",
    body:""
  })
  const history=useHistory()
  const location=useLocation()

const handleClick=()=>{
  setModalContent({
    title:"Logout",
    body:"Do you really want to logout form dashboard."
  })
  setShowModal(true)
}
const handleConfirm=()=>{
  localStorage.clear()
  sessionStorage.clear()
  localStorage.setItem("isAuthenticated", "false");
  history.replace('/login')
}
  return (
    <header className='header'>
      <div className='logo-container'>
        <Link to='/ngoPage' className='logo-link'>
          <img src={SapnaLogo} alt='logo of ngo' className='logo-image' />
          <h3 className='ngo-name'>Anandam Home For The Homeless</h3>
          {/* Anandam-home for the homeless */}
        </Link> 
      </div>
     
      <nav>
        <ul>
          <li><Link to='/form' className={`link ${location.pathname === '/form' ? 'active':''}`}>New Application</Link></li>
          <li><Link to='/patientdata' className={`link ${location.pathname === '/patientdata' ? 'active':''}`}>Browse</Link></li>

         <li className='logout' onClick={handleClick}>Logout</li>
        </ul>
      </nav>
      
      <MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={()=>handleConfirm()}
        title={modalContent.title}
        body={modalContent.body}
      />
    </header>
  );
}

export default OtherPageNavbar;

