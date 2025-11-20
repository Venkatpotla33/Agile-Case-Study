import { useForm } from "react-hook-form";
import { useState } from "react";
import { Alert, Button, Card, Form, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient.js";
import useAuth from "../hooks/useAuth.js";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [serverError, setServerError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { fullName: "", email: "", password: "" },
  });

  const onSubmit = async (values) => {
    try {
      setServerError(null);
      const { data } = await apiClient.post("/auth/register", values);
      login({ user: data.user, token: data.token });
      navigate("/search");
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <Card className="mx-auto shadow-sm" style={{ maxWidth: 480 }}>
      <Card.Body>
        <Stack gap={3}>
          <div>
            <h2>Create your account</h2>
            <p className="text-secondary">
              Sign up to start booking your next ride.
            </p>
          </div>
          {serverError && <Alert variant="danger">{serverError}</Alert>}
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack gap={3}>
              <Form.Group controlId="fullName">
                <Form.Label>Full name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="E.g. Priya Sharma"
                  isInvalid={Boolean(errors.fullName)}
                  {...register("fullName", { required: "Full name is required" })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fullName?.message}
                </Form.Control.Feedback>
              </Form.Group>

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
                  placeholder="Minimum 8 characters"
                  isInvalid={Boolean(errors.password)}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Create account"}
              </Button>
            </Stack>
          </Form>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default RegisterPage;

