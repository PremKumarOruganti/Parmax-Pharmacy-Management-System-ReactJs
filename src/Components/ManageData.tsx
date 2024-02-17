import react from "react";
import { useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FiSun } from "react-icons/fi";
import { BsThreeDots, BsFillBellFill, BsFillMoonFill } from "react-icons/bs";

const ManageAdmin = () => {
  const [darkMode, setDarkMode] = useState(false);
  const linkStyle = {
    color: darkMode ? "white" : "black",
  };
  const toggleColorMode = () => {
    let currentMode = !darkMode;
    setDarkMode(currentMode);
  };

  return (
    <>
      {/* <Navbar
        bg={darkMode ? "dark" : "light"}
        data-bs-theme={darkMode ? "dark" : "light"}
      >
        <Container fluid>
          <Navbar.Brand href="#home" style={linkStyle}>
            PharmX
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="mr-3" style={linkStyle}>
                Manage Users
              </Nav.Link>
              <Nav.Link href="#link" className="mr-3" style={linkStyle}>
                Manage Categories
              </Nav.Link>
              <Nav.Link href="#link" className="mr-3" style={linkStyle}>
                Manage Medicines
              </Nav.Link>
            </Nav>

            <div className="ml-auto">
              <span onClick={toggleColorMode}>
                {darkMode ? (
                  <FiSun className="text-white" />
                ) : (
                  <BsFillMoonFill />
                )}
              </span>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
      <div>Admin Page</div>
    </>
  );
};
export default ManageAdmin;
