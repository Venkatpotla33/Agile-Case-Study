import { Card, Badge, Button } from "react-bootstrap";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const statusVariant = {
  Draft: "secondary",
  PendingPayment: "warning",
  Confirmed: "success",
  Cancelled: "secondary",
};

const BookingCard = ({ booking, onCancel }) => (
  <Card className="mb-3 shadow-sm">
    <Card.Body>
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <Card.Title>{booking.car?.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {booking.car?.brand} {booking.car?.model} • {booking.pickupCity}
          </Card.Subtitle>
        </div>
        <Badge bg={statusVariant[booking.status] || "secondary"}>
          {booking.status}
        </Badge>
      </div>
      <Card.Text className="mb-1">
        {dayjs(booking.startDate).format("MMM D, YYYY h:mm A")} →{" "}
        {dayjs(booking.endDate).format("MMM D, YYYY h:mm A")}
      </Card.Text>
      <Card.Text className="mb-1">
        Payment Status: <strong>{booking.paymentStatus}</strong>
      </Card.Text>
      <div className="d-flex gap-2 mt-3">
        <Button as={Link} to={`/bookings/${booking._id}`} variant="outline-primary">
          View
        </Button>
        {booking.status !== "Cancelled" && (
          <Button variant="outline-danger" onClick={() => onCancel(booking._id)}>
            Cancel
          </Button>
        )}
      </div>
    </Card.Body>
  </Card>
);

export default BookingCard;

