export interface ValidationError {
  field: string;
  message: string;
}

export const validateLogin = (email: string, password: string): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Email validation
  if (!email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }
  }

  // Password validation
  if (!password.trim()) {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters long' });
  }

  return errors;
};
