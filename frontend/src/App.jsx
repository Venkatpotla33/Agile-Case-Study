import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import CarDetailsPage from "./pages/CarDetailsPage.jsx";
import ReservationPage from "./pages/ReservationPage.jsx";
import MyBookingsPage from "./pages/MyBookingsPage.jsx";
import BookingDetailsPage from "./pages/BookingDetailsPage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => (
  <AuthProvider>
    <NavigationBar />
    <main>
      <Container className="pb-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cars/:carId" element={<CarDetailsPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/reserve/:carId" element={<ReservationPage />} />
            <Route path="/bookings" element={<MyBookingsPage />} />
            <Route path="/bookings/:bookingId" element={<BookingDetailsPage />} />
          </Route>
          <Route element={<ProtectedRoute roles={["admin"]} />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Route>
        </Routes>
      </Container>
    </main>
  </AuthProvider>
);

export default App;

