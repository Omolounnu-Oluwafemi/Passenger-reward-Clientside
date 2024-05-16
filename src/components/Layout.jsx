import { useState } from 'react';
import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';

function Layout() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);

    return (
        <Container fluid>
            <Row>
                <Col className="col-12 p-0 d-lg-none">
                    <Navbar collapseOnSelect expand="lg" expanded={isOpen} className='p-0 rounded-lg'>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleToggle} />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <SideBar />
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
                <Col className="col-lg-2 p-0 d-none d-lg-block">
                    <SideBar />
                </Col>
                <Col>
                    <Header />
                    <Outlet/>
                </Col>   
            </Row>
        </Container>
    )
}

export default Layout;