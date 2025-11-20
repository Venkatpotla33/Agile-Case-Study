import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Form,
  Row,
  Stack,
  Table,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import apiClient from "../services/apiClient.js";

const AdminDashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      brand: "",
      model: "",
      city: "",
      ratePerHour: "",
      ratePerDay: "",
      seats: "",
      fuelType: "",
      transmission: "automatic",
      imageUrl: "",
      pickupLocations: "",
    },
  });

  const loadData = async () => {
    try {
      const [summaryRes, carsRes, bookingsRes] = await Promise.all([
        apiClient.get("/admin/summary"),
        apiClient.get("/admin/cars"),
        apiClient.get("/admin/bookings"),
      ]);
      setSummary(summaryRes.data);
      setCars(carsRes.data.cars);
      setBookings(bookingsRes.data.bookings);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load admin data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onCreateCar = async (values) => {
    try {
      setError(null);
      setSuccess(null);
      const payload = {
        ...values,
        pickupLocations: values.pickupLocations
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        ratePerHour: Number(values.ratePerHour),
        ratePerDay: Number(values.ratePerDay),
        seats: Number(values.seats),
      };
      await apiClient.post("/admin/cars", payload);
      setSuccess("Car added successfully");
      reset();
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add car");
    }
  };

  return (
    <Stack gap={4}>
      <div>
        <h1>Admin dashboard</h1>
        <p className="text-secondary">
          Manage fleet inventory, bookings, and monitor key activity.
        </p>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row xs={1} md={3} className="g-3">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total cars</Card.Title>
              <Card.Text className="display-6">
                {summary?.carsCount ?? "-"}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total bookings</Card.Title>
              <Card.Text className="display-6">
                {summary?.bookingsCount ?? "-"}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Successful payments</Card.Title>
              <Card.Text className="display-6">
                {summary?.successfulPayments ?? "-"}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Body>
          <Stack gap={3}>
            <div>
              <Card.Title>Add new car</Card.Title>
              <Card.Subtitle className="text-secondary">
                Populate model details to expand the fleet.
              </Card.Subtitle>
            </div>
            <Form onSubmit={handleSubmit(onCreateCar)} noValidate>
              <Row className="g-3">
                <Col md={4}>
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" required {...register("title")} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" required {...register("brand")} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="model">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" required {...register("model")} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" required {...register("city")} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="ratePerHour">
                    <Form.Label>Rate per hour</Form.Label>
                    <Form.Control
                      type="number"
                      required
                      min={0}
                      {...register("ratePerHour")}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="ratePerDay">
                    <Form.Label>Rate per day</Form.Label>
                    <Form.Control
                      type="number"
                      required
                      min={0}
                      {...register("ratePerDay")}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="seats">
                    <Form.Label>Seats</Form.Label>
                    <Form.Control
                      type="number"
                      required
                      min={1}
                      {...register("seats")}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="fuelType">
                    <Form.Label>Fuel type</Form.Label>
                    <Form.Control type="text" required {...register("fuelType")} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="transmission">
                    <Form.Label>Transmission</Form.Label>
                    <Form.Select {...register("transmission")}>
                      <option value="automatic">Automatic</option>
                      <option value="manual">Manual</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="imageUrl">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type="url" {...register("imageUrl")} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="pickupLocations">
                    <Form.Label>Pickup locations (comma separated)</Form.Label>
                    <Form.Control {...register("pickupLocations")} />
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" className="mt-3" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Add car"}
              </Button>
            </Form>
          </Stack>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>Manage cars</Card.Title>
          <Table responsive hover className="mt-3">
            <thead>
              <tr>
                <th>Title</th>
                <th>City</th>
                <th>Rates</th>
                <th>Seats</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id}>
                  <td>{car.title}</td>
                  <td>{car.city}</td>
                  <td>
                    ₹{car.ratePerHour}/hr <br />₹{car.ratePerDay}/day
                  </td>
                  <td>{car.seats}</td>
                  <td>
                    <Badge bg={car.isActive ? "success" : "secondary"}>
                      {car.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>Recent bookings</Card.Title>
          <Table responsive hover className="mt-3">
            <thead>
              <tr>
                <th>Car</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.car?.title}</td>
                  <td>
                    {booking.user?.fullName}
                    <br />
                    <span className="text-secondary small">
                      {booking.user?.email}
                    </span>
                  </td>
                  <td>{booking.status}</td>
                  <td>{booking.paymentStatus}</td>
                  <td>{new Date(booking.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Stack>
  );
};

export default AdminDashboardPage;

