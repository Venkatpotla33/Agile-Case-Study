import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Row,
  Stack,
} from "react-bootstrap";
import apiClient from "../services/apiClient.js";

const ReservationPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [serverSuccess, setServerSuccess] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
      pickupCity: "",
      pickupLocation: "",
    },
  });

  useEffect(() => {
    const loadCar = async () => {
      try {
        const { data } = await apiClient.get(`/cars/${carId}`);
        setCar(data.car);
      } catch (error) {
        setServerError(error.response?.data?.message || "Failed to load car");
      }
    };

    loadCar();
  }, [carId]);

  const onSubmit = async (values) => {
    try {
      setServerError(null);
      const payload = { ...values, carId };
      const { data } = await apiClient.post("/bookings", payload);
      setServerSuccess(data.message);
      setTimeout(() => {
        navigate(`/bookings/${data.booking._id}`);
      }, 1200);
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Could not create booking"
      );
    }
  };

  if (!car && !serverError) {
    return <div className="py-5 text-center">Loading reservation…</div>;
  }

  return (
    <Row className="justify-content-center">
      <Col md={8}>
        <Card className="shadow-sm">
          <Card.Body>
            <Stack gap={4}>
              <div>
                <h2>Reserve {car?.title}</h2>
                <p className="text-secondary">
                  Provide your trip details to finalize the reservation.
                </p>
              </div>
              {serverError && <Alert variant="danger">{serverError}</Alert>}
              {serverSuccess && <Alert variant="success">{serverSuccess}</Alert>}
              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="pickupCity">
                      <Form.Label>Pickup city</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="City"
                        isInvalid={Boolean(errors.pickupCity)}
                        {...register("pickupCity", {
                          required: "Pickup city is required",
                        })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.pickupCity?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="pickupLocation">
                      <Form.Label>Pickup location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Location or landmark"
                        {...register("pickupLocation")}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="startDate">
                      <Form.Label>Start date & time</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        isInvalid={Boolean(errors.startDate)}
                        {...register("startDate", {
                          required: "Start date is required",
                        })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.startDate?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="endDate">
                      <Form.Label>End date & time</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        isInvalid={Boolean(errors.endDate)}
                        {...register("endDate", {
                          required: "End date is required",
                        })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.endDate?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Button type="submit" className="mt-4" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Confirm reservation"}
                </Button>
              </Form>
            </Stack>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ReservationPage;

