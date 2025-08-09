export interface ValidationError {
  field: string;
  message: string;
}

export interface RegisterFormData {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
}

export const validateRegister = (formData: RegisterFormData): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  console.log('Validating form data:', formData);

  // First Name validation
  if (!formData.first_name.trim()) {
    errors.push({ field: 'first_name', message: 'First name is required' });
  } else if (formData.first_name.trim().length < 2) {
    errors.push({ field: 'first_name', message: 'First name must be at least 2 characters long' });
  } else if (!/^[a-zA-Z\s]+$/.test(formData.first_name.trim())) {
    errors.push({ field: 'first_name', message: 'First name can only contain letters and spaces' });
  }

  // Last Name validation
  if (!formData.last_name.trim()) {
    errors.push({ field: 'last_name', message: 'Last name is required' });
  } else if (formData.last_name.trim().length < 2) {
    errors.push({ field: 'last_name', message: 'Last name must be at least 2 characters long' });
  } else if (!/^[a-zA-Z\s]+$/.test(formData.last_name.trim())) {
    errors.push({ field: 'last_name', message: 'Last name can only contain letters and spaces' });
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }
  }

  // Username validation
  if (!formData.username.trim()) {
    errors.push({ field: 'username', message: 'Username is required' });
  } else if (formData.username.trim().length < 3) {
    errors.push({ field: 'username', message: 'Username must be at least 3 characters long' });
  } else if (formData.username.trim().length > 20) {
    errors.push({ field: 'username', message: 'Username must be less than 20 characters long' });
  } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username.trim())) {
    errors.push({ field: 'username', message: 'Username can only contain letters, numbers, and underscores' });
  }

  // Password validation
  if (!formData.password) {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (formData.password.length < 8) {
    errors.push({ field: 'password', message: 'Password must be at least 8 characters long' });
  } else if (!/(?=.*[a-z])/.test(formData.password)) {
    errors.push({ field: 'password', message: 'Password must contain at least one lowercase letter' });
  } else if (!/(?=.*[A-Z])/.test(formData.password)) {
    errors.push({ field: 'password', message: 'Password must contain at least one uppercase letter' });
  } else if (!/(?=.*\d)/.test(formData.password)) {
    errors.push({ field: 'password', message: 'Password must contain at least one number' });
  }

  // Password confirmation validation
  if (!formData.password_confirmation) {
    errors.push({ field: 'password_confirmation', message: 'Please confirm your password' });
  } else if (formData.password !== formData.password_confirmation) {
    errors.push({ field: 'password_confirmation', message: 'Passwords do not match' });
  }

  return errors;
};
