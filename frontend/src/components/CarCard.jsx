import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => (
  <Col>
    <Card className="h-100 shadow-sm">
      {car.imageUrl && (
        <Card.Img
          variant="top"
          src={car.imageUrl}
          alt={car.title}
          style={{ height: 180, objectFit: "cover" }}
        />
      )}
      <Card.Body className="d-flex flex-column">
        <Card.Title>{car.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {car.brand} • {car.model}
        </Card.Subtitle>
        <Card.Text className="flex-grow-1">
          <strong>City:</strong> {car.city}
          <br />
          <strong>Seats:</strong> {car.seats}
          <br />
          <strong>Fuel:</strong> {car.fuelType}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div className="fw-bold">₹{car.ratePerHour}/hr</div>
            <div className="text-muted small">₹{car.ratePerDay}/day</div>
          </div>
          <Link to={`/cars/${car._id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </Card.Body>
    </Card>
  </Col>
);

export default CarCard;

