import { Button, Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Row className="align-items-center py-5">
      <Col md={6}>
        <Stack gap={3}>
          <h1 className="display-5 fw-bold">
            Drive on demand with ZoomRide
          </h1>
          <p className="text-secondary">
            Find, book, and manage short-term car rentals across major Indian
            cities. Responsive design, instant availability, secure booking.
          </p>
          <div>
            <Button as={Link} to="/search" size="lg" className="me-3">
              Browse Cars
            </Button>
            {!isAuthenticated && (
              <Button as={Link} to="/register" variant="outline-primary" size="lg">
                Create Account
              </Button>
            )}
          </div>
        </Stack>
      </Col>
      <Col md={6} className="text-center">
        <img
          src="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=900&q=80"
          alt="ZoomRide city driving"
          className="img-fluid rounded shadow"
        />
      </Col>
    </Row>
  );
};

export default HomePage;

