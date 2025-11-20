import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import CarCard from "../components/CarCard.jsx";
import apiClient from "../services/apiClient.js";

const SearchPage = () => {
  const [formState, setFormState] = useState({
    city: "",
    startDate: "",
    endDate: "",
  });
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInitialCars = async () => {
      setLoading(true);
      try {
        const { data } = await apiClient.get("/cars");
        setCars(data.cars);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to fetch cars");
      } finally {
        setLoading(false);
      }
    };

    loadInitialCars();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (formState.city) params.set("city", formState.city);
      if (formState.startDate) params.set("startDate", formState.startDate);
      if (formState.endDate) params.set("endDate", formState.endDate);

      const { data } = await apiClient.get(`/cars?${params.toString()}`);
      setCars(data.cars);
    } catch (err) {
      setError(err.response?.data?.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack gap={4}>
      <div>
        <h1 className="mb-3">Search available cars</h1>
        <p className="text-secondary">
          Filter cars by city and preferred trip window.
        </p>
      </div>

      <Form onSubmit={handleSearch} className="bg-white p-3 rounded shadow-sm">
        <Row className="g-3 align-items-end">
          <Col md={4}>
            <Form.Group controlId="city">
              <Form.Label>Pickup city</Form.Label>
              <Form.Control
                type="text"
                placeholder="E.g. Mumbai"
                name="city"
                value={formState.city}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="startDate">
              <Form.Label>Start date/time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="startDate"
                value={formState.startDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="endDate">
              <Form.Label>End date/time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="endDate"
                value={formState.endDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Button type="submit" className="w-100" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </Col>
        </Row>
      </Form>

      {error && <div className="alert alert-danger">{error}</div>}

      <Row xs={1} sm={2} lg={3} className="g-4">
        {cars.length === 0 && !loading && (
          <p className="text-muted">No cars available for selected filters.</p>
        )}
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </Row>
    </Stack>
  );
};

export default SearchPage;

