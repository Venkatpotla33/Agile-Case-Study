import { useForm } from "react-hook-form";
import { useState } from "react";
import { Alert, Button, Card, Form, Stack } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../services/apiClient.js";
import useAuth from "../hooks/useAuth.js";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values) => {
    try {
      setServerError(null);
      const { data } = await apiClient.post("/auth/login", values);
      login({ user: data.user, token: data.token });
      const redirectTo = location.state?.from?.pathname || "/search";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Incorrect credentials. Try again."
      );
    }
  };

  return (
    <Card className="mx-auto shadow-sm" style={{ maxWidth: 480 }}>
      <Card.Body>
        <Stack gap={3}>
          <div>
            <h2>Welcome back</h2>
            <p className="text-secondary">Log in to manage your bookings.</p>
          </div>
          {serverError && <Alert variant="danger">{serverError}</Alert>}
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack gap={3}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="you@example.com"
                  isInvalid={Boolean(errors.email)}
                  {...register("email", { required: "Email is required" })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  isInvalid={Boolean(errors.password)}
                  {...register("password", { required: "Password is required" })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Log in"}
              </Button>
            </Stack>
          </Form>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default LoginPage;

