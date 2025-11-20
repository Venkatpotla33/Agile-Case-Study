import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import apiClient from "../services/apiClient.js";

const CarDetailsPage = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await apiClient.get(`/cars/${carId}`);
        setCar(data.car);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load car details");
      }
    };

    fetchCar();
  }, [carId]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!car) {
    return <div className="text-center py-5">Loading car details…</div>;
  }

  return (
    <Row className="gy-4">
      <Col md={6}>
        {car.imageUrl && (
          <img
            src={car.imageUrl}
            alt={car.title}
            className="img-fluid rounded shadow-sm"
          />
        )}
      </Col>
      <Col md={6}>
        <Stack gap={3}>
          <div>
            <h1>{car.title}</h1>
            <p className="text-secondary">
              {car.brand} {car.model} • {car.city}
            </p>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <Badge bg="light" text="dark">
              {car.seats} seats
            </Badge>
            <Badge bg="light" text="dark">
              {car.fuelType}
            </Badge>
            <Badge bg="light" text="dark">
              {car.transmission}
            </Badge>
          </div>
          <div className="bg-light p-3 rounded">
            <h4 className="mb-1">₹{car.ratePerHour}/hour</h4>
            <p className="text-secondary mb-0">₹{car.ratePerDay}/day</p>
          </div>
          <div>
            <h5>Pickup locations</h5>
            <ul>
              {car.pickupLocations?.map((location) => (
                <li key={location}>{location}</li>
              ))}
            </ul>
          </div>
          <Button as={Link} to={`/reserve/${car._id}`} size="lg">
            Book now
          </Button>
        </Stack>
      </Col>
    </Row>
  );
};

export default CarDetailsPage;

