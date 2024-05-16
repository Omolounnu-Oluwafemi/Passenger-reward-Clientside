import { Nav } from "react-bootstrap";
import { useContext } from 'react';
import './../App.css'
import { UserContext } from './../api/api.jsx';
import { useNavigate } from 'react-router-dom';

function SideBar() {
  const { setUserId } = useContext(UserContext);
  const navigate = useNavigate();
  

const logout = () => {
    setUserId(null);
    navigate('/login');
};

  return (
<Nav defaultActiveKey="/dashboard" className="flex-column bg-black vh-100 pt-5 sidebar">
    <div>
        <h2 className="text-white">KATAB</h2>
        <Nav.Link href="/dashboard" className="text-white nav-link">Dashboard</Nav.Link>
        <Nav.Link href="/dashboard/newtrip" className="text-white nav-link">New Trip</Nav.Link>
    </div>
    <div>
        <Nav.Link eventKey="/logout" className="text-white nav-link" onClick={logout}>Logout</Nav.Link>
    </div>
</Nav>
  )
}

export default SideBar;
