import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const NavigationBar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg" className="border-bottom mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          ZoomRide
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/search">
              Search
            </Nav.Link>
            {isAuthenticated && (
              <Nav.Link as={NavLink} to="/bookings">
                My Bookings
              </Nav.Link>
            )}
            {user?.role === "admin" && (
              <Nav.Link as={NavLink} to="/admin">
                Admin Dashboard
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Log In
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Sign Up
                </Nav.Link>
              </>
            ) : (
              <>
                <Navbar.Text className="me-3">
                  Signed in as <strong>{user.fullName}</strong>
                </Navbar.Text>
                <Button variant="outline-secondary" onClick={handleLogout}>
                  Log Out
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

