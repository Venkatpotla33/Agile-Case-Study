import { useEffect, useState } from "react";
import { Alert, Stack } from "react-bootstrap";
import apiClient from "../services/apiClient.js";
import BookingCard from "../components/BookingCard.jsx";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get("/bookings");
      setBookings(data.bookings);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      await apiClient.post(`/bookings/${bookingId}/cancel`);
      await loadBookings();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  return (
    <Stack gap={3}>
      <div>
        <h1>My bookings</h1>
        <p className="text-secondary">Manage your upcoming and past trips.</p>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <div>Loading bookings…</div>}
      {bookings.length === 0 && !loading ? (
        <p className="text-muted">No bookings yet. Find a car to get started.</p>
      ) : (
        bookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            onCancel={handleCancel}
          />
        ))
      )}
    </Stack>
  );
};

export default MyBookingsPage;

