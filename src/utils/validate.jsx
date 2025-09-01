export const validateData = (email, password, name) => {
  const errors = {};
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/.test(
    password
  );
  const isNameValid = /^[A-Za-z\s]{2,}$/.test(name);

  if (!email) {
    errors.email = "Email is required";
  } else if (!isEmailValid) {
    errors.email = "Please enter a valid email address";
  }

  // Password validation (at least 6 chars, 1 letter, 1 number)
  if (!password) {
    errors.password = "Password is required";
  } else if (!isPasswordValid) {
    errors.password =
      "Password must be at least 6 characters and include a letter and a number";
  }

  // Name validation
  if (name) {
    if (!isNameValid) {
      errors.name =
        "Name must be at least 2 letters and contain only alphabets";
    }
  }
  return errors;
};
