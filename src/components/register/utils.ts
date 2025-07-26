export const validateRegister = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!firstName || !lastName) {
    return false;
  }

  if (!emailRegex.test(email)) {
    return false;
  }
  if (password.length < 6) {
    return false;
  }
  return true;
};
