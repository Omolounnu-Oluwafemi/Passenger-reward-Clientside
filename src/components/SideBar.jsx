import { Nav } from "react-bootstrap";

function SideBar() {
    return (
        <Nav defaultActiveKey="/dashboard" className="flex-column bg-black vh-100 pt-5">
            <h2 className="text-white">KATAB</h2>
      <Nav.Link href="/dashboard" className="text-white">Dashboard</Nav.Link>
      <Nav.Link href="/dashboard/newtrip" className="text-white">New Trip</Nav.Link>
      <Nav.Link eventKey="/logout" className="text-white">Logout</Nav.Link>
    </Nav>
    )
}

export default SideBar;