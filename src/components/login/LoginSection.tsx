import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { validateLogin } from "./utils";
import type { ValidationError } from "./utils";

import BorderBox from "../shared/BorderBox";
import PrimaryBtn from "../shared/PrimaryBtn";
import Section from "../shared/Section";
import LoadingSpinner from "../shared/LoadingSpinner";
import Input from "../shared/Input";
import ErrorMessage from "../shared/ErrorMessage";

const LoginSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [successMessage, setSuccessMessage] = useState(location.state?.message || "");
  const { login, error, isLoading, clearError } = useAuth();

  // Clear error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any previous errors and success message
    clearError();
    setValidationErrors([]);
    setSuccessMessage("");
    
    // Validate inputs
    const errors = validateLogin(email, password);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await login({ email, password });
      
      // Redirect to the page they were trying to access, or user-info-setup
      const from = location.state?.from?.pathname || "/user-info-setup";
      navigate(from, { replace: true });
    } catch (error) {
      // Error is handled by the auth context
    }
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return validationErrors.find(error => error.field === fieldName)?.message;
  };

  return (
    <Section>
      <div className="flex justify-center items-center h-full">
        <BorderBox>
          <form onSubmit={handleLogin} className="w-100 p-4">
            <h1 className="text-2xl source-code">Welcome back!</h1>
            
            {successMessage && (
              <div className="mt-4">
                <ErrorMessage message={successMessage} type="info" />
              </div>
            )}
            <div className="mt-4">
              <Input
                label="Email"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSuccessMessage(""); // Clear success message when typing
                }}
                error={getFieldError('email')}
                required
              />
            </div>
            <div className="mt-4">
              <Input
                label="Password"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setSuccessMessage(""); // Clear success message when typing
                }}
                error={getFieldError('password')}
                required
              />
            </div>
            <div className="mt-4 flex justify-center items-center">
              <PrimaryBtn type="submit" disabled={isLoading}>
                {isLoading ? <LoadingSpinner size="sm" /> : "Login"}
              </PrimaryBtn>
            </div>
          </form>
          {error && (
            <div className="mt-4">
              <ErrorMessage message={error} type="error" />
            </div>
          )}
        </BorderBox>
      </div>
    </Section>
  );
};

export default LoginSection;
