import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  Badge,
  Button,
  Card,
  Form,
  Stack,
} from "react-bootstrap";
import dayjs from "dayjs";
import apiClient from "../services/apiClient.js";

const BookingDetailsPage = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentStatus, setPaymentStatus] = useState("Success");
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    const loadBooking = async () => {
      try {
        const { data } = await apiClient.get(`/bookings/${bookingId}`);
        setBooking(data.booking);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load booking");
      }
    };

    loadBooking();
  }, [bookingId]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!booking) {
    return <div className="py-5 text-center">Loading booking…</div>;
  }

  const handlePayment = async (event) => {
    event.preventDefault();
    setPaymentError(null);
    setPaymentSuccess(null);
    setIsPaying(true);
    try {
      const payload = {
        bookingId,
        amount: booking.totalAmount || 0,
        method: paymentMethod,
        status: paymentStatus,
      };
      const { data } = await apiClient.post("/payments", payload);
      setPaymentSuccess(data.message);
      const refreshed = await apiClient.get(`/bookings/${bookingId}`);
      setBooking(refreshed.data.booking);
    } catch (err) {
      setPaymentError(err.response?.data?.message || "Payment failed");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Stack gap={3}>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <Card.Title>{booking.car?.title}</Card.Title>
              <Card.Subtitle className="text-secondary">
                {booking.car?.brand} {booking.car?.model} • {booking.pickupCity}
              </Card.Subtitle>
            </div>
            <Stack direction="horizontal" gap={2}>
              <Badge bg="info">{booking.paymentStatus}</Badge>
              <Badge bg="primary">{booking.status}</Badge>
            </Stack>
          </div>
          <div>
            <strong>Trip window:</strong>{" "}
            {dayjs(booking.startDate).format("MMM D, YYYY h:mm A")} →{" "}
            {dayjs(booking.endDate).format("MMM D, YYYY h:mm A")}
          </div>
          <div>
            <strong>Pickup location:</strong>{" "}
            {booking.pickupLocation || "Assigned after confirmation"}
          </div>
          <div>
            <strong>Created:</strong>{" "}
            {dayjs(booking.createdAt).format("MMM D, YYYY h:mm A")}
          </div>
          <div>
            <h5>Total</h5>
            <p className="display-6">₹{booking.totalAmount || 0}</p>
          </div>

          {paymentSuccess && <Alert variant="success">{paymentSuccess}</Alert>}
          {paymentError && <Alert variant="danger">{paymentError}</Alert>}

          {booking.paymentStatus !== "Success" && (
            <Form
              onSubmit={handlePayment}
              className="border rounded p-3 bg-light"
            >
              <h5 className="mb-3">Complete payment</h5>
              <Stack gap={3}>
                <Form.Group controlId="paymentMethod">
                  <Form.Label>Payment method</Form.Label>
                  <Form.Select
                    value={paymentMethod}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  >
                    <option value="card">Card</option>
                    <option value="upi">UPI</option>
                    <option value="wallet">Wallet</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="paymentStatus">
                  <Form.Label>Mock status</Form.Label>
                  <Form.Select
                    value={paymentStatus}
                    onChange={(event) => setPaymentStatus(event.target.value)}
                  >
                    <option value="Success">Success</option>
                    <option value="Failure">Failure</option>
                    <option value="Pending">Pending</option>
                  </Form.Select>
                </Form.Group>

                <Button type="submit" disabled={isPaying}>
                  {isPaying ? "Processing…" : "Submit payment"}
                </Button>
              </Stack>
            </Form>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default BookingDetailsPage;

