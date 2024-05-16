import { Nav } from 'react-bootstrap';
import profileImage from './../assets/JanKoum.jpeg'; 

function Header() {
    return (
        <Nav className="justify-content-end py-3 px-0" activeKey="/home">
            <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                    Welcome Home
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <div className="d-flex align-items-center ">
                    <img src={profileImage} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%', border: '1px solid black' }} />
                </div>
            </Nav.Item>
        </Nav>
    );
}

export default Header;