// RegisterSection.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BorderBox from "../shared/BorderBox";
import PrimaryBtn from "../shared/PrimaryBtn";
import Section from "../shared/Section";
import LoadingSpinner from "../shared/LoadingSpinner";
import Input from "../shared/Input";
import ErrorMessage from "../shared/ErrorMessage";
import { useAuth } from "../../contexts/AuthContext";
import { validateRegister } from "./utils";
import type { ValidationError } from "./utils";

const RegisterSection = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  });

  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const { register, error, isLoading, clearError } = useAuth();
  const navigate = useNavigate();

  // Clear error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any previous errors
    clearError();
    setValidationErrors([]);
    
    // Validate form data
    const errors = validateRegister(formData);
    console.log('Frontend validation errors:', errors);
    if (errors.length > 0) {
      setValidationErrors(errors);
      // For now, let's also try to submit to see backend errors
      // return;
    }

    try {
      console.log('Submitting registration data:', formData);
      const result = await register(formData);
      
      if (result.success) {
        // Registration successful, redirect to login page
        navigate("/login", { 
          replace: true,
          state: { 
            message: "Registration successful! Please login with your credentials.",
            email: formData.email // Pass email to pre-fill login form
          }
        });
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Handle backend validation errors
      if (error.response?.status === 422) {
        console.log('Backend validation errors:', error.response.data);
        const validationErrors = error.response.data.errors;
        if (validationErrors) {
          const backendErrors: ValidationError[] = [];
          Object.keys(validationErrors).forEach(field => {
            // Map backend field names to frontend field names
            let frontendField = field;
            if (field === 'first_name') frontendField = 'first_name';
            if (field === 'last_name') frontendField = 'last_name';
            if (field === 'email') frontendField = 'email';
            if (field === 'username') frontendField = 'username';
            if (field === 'password') frontendField = 'password';
            if (field === 'password_confirmation') frontendField = 'password_confirmation';
            
            backendErrors.push({
              field: frontendField,
              message: validationErrors[field][0] // Take first error message
            });
          });
          setValidationErrors(backendErrors);
        }
      }
    }
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return validationErrors.find(error => error.field === fieldName)?.message;
  };

  return (
    <Section>
      <div className="flex justify-center items-center h-full">
        <BorderBox>
          <form onSubmit={handleSubmit} className="w-100 p-4">
            <h1 className="text-2xl source-code">Create Account</h1>

            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <Input
                  label="First Name"
                  type="text"
                  name="first_name"
                  id="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  error={getFieldError('first_name')}
                  required
                />
              </div>
              <div className="flex-1">
                <Input
                  label="Last Name"
                  type="text"
                  name="last_name"
                  id="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  error={getFieldError('last_name')}
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <Input
                label="Email"
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                error={getFieldError('email')}
                required
              />
            </div>

            <div className="mt-4">
              <Input
                label="Username"
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                error={getFieldError('username')}
                required
              />
            </div>

            <div className="mt-4">
              <Input
                label="Password"
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                error={getFieldError('password')}
                required
              />
            </div>

            <div className="mt-4">
              <Input
                label="Confirm Password"
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                error={getFieldError('password_confirmation')}
                required
              />
            </div>

            <div className="mt-4 flex justify-center items-center">
              <PrimaryBtn type="submit" disabled={isLoading}>
                {isLoading ? <LoadingSpinner size="sm" /> : "Register"}
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

export default RegisterSection;
