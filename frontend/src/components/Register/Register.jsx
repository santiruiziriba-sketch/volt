import { useState } from "react";
import { register } from "../../utils/MainApi";
import "./Register.css";

function Register({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  function validateField(field, value) {
    switch (field) {
      case "name":
        if (!value.trim()) return "El nombre es obligatorio.";
        if (value.trim().length < 2) {
          return "El nombre debe tener al menos 2 caracteres.";
        }
        if (value.trim().length > 30) {
          return "El nombre no puede superar los 30 caracteres.";
        }
        return "";

      case "email":
        if (!value.trim()) return "El email es obligatorio.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Ingresá un email válido.";
        }
        return "";

      case "password":
        if (!value) return "La contraseña es obligatoria.";
        if (value.length < 8) {
          return "La contraseña debe tener al menos 8 caracteres.";
        }
        return "";

      default:
        return "";
    }
  }

  function handleChange(event) {
    const { name: field, value } = event.target;

    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);

    setErrors((previousErrors) => ({
      ...previousErrors,
      [field]: validateField(field, value),
    }));

    setServerError("");
  }

  const isFormValid =
    name.trim().length >= 2 &&
    name.trim().length <= 30 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    password.length >= 8 &&
    !Object.values(errors).some(Boolean);

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = {
      name: validateField("name", name),
      email: validateField("email", email),
      password: validateField("password", password),
    };

    setErrors(validationErrors);

    if (Object.values(validationErrors).some(Boolean)) return;

    setIsSubmitting(true);
    setServerError("");

    register({
      name: name.trim(),
      email: email.trim(),
      password,
    })
      .then(() => {
        setIsRegistered(true);
      })
      .catch((error) => {
        setServerError(error.message || "No se pudo crear la cuenta.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  if (isRegistered) {
    return (
      <div className="register">
        <p className="register__success">
          ¡Te registraste correctamente!
        </p>
        <p>Ahora podés iniciar sesión con tu cuenta.</p>
        <button
          type="button"
          className="register__button"
          onClick={onLogin}
        >
          Iniciar sesión
        </button>
      </div>
    );
  }

  return (
    <form className="register" onSubmit={handleSubmit} noValidate>
      <label className="register__label" htmlFor="register-name">
        Nombre
      </label>
      <input
        className="register__input"
        id="register-name"
        name="name"
        type="text"
        value={name}
        onChange={handleChange}
        autoComplete="name"
        required
      />
      {errors.name && (
        <span className="register__error">{errors.name}</span>
      )}

      <label className="register__label" htmlFor="register-email">
        Email
      </label>
      <input
        className="register__input"
        id="register-email"
        name="email"
        type="email"
        value={email}
        onChange={handleChange}
        autoComplete="email"
        required
      />
      {errors.email && (
        <span className="register__error">{errors.email}</span>
      )}

      <label className="register__label" htmlFor="register-password">
        Contraseña
      </label>
      <input
        className="register__input"
        id="register-password"
        name="password"
        type="password"
        value={password}
        onChange={handleChange}
        autoComplete="new-password"
        required
      />
      {errors.password && (
        <span className="register__error">{errors.password}</span>
      )}

      {serverError && (
        <p className="register__server-error">{serverError}</p>
      )}

      <button
        className="register__button"
        type="submit"
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? "Creando cuenta..." : "Registrarme"}
      </button>
    </form>
  );
}

export default Register;

