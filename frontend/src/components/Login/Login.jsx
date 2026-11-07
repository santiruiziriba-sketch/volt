import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { getUserInfo, login } from "../../utils/MainApi";
import "./Login.css";

function Login({ onClose, onRegister }) {
  const { setCurrentUser } = useContext(CurrentUserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateField(field, value) {
    if (field === "email") {
      if (!value.trim()) return "El email es obligatorio.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Ingresá un email válido.";
      }
    }

    if (field === "password" && !value) {
      return "La contraseña es obligatoria.";
    }

    return "";
  }

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: validateField(name, value),
    }));

    setServerError("");
  }

  const isFormValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    password.length > 0 &&
    !Object.values(errors).some(Boolean);

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = {
      email: validateField("email", email),
      password: validateField("password", password),
    };

    setErrors(validationErrors);

    if (Object.values(validationErrors).some(Boolean)) return;

    setIsSubmitting(true);
    setServerError("");

    login({
      email: email.trim(),
      password,
    })
      .then((data) => {
        if (!data?.token) {
          throw new Error("El servidor no devolvió un token válido.");
        }

        localStorage.setItem("jwt", data.token);
        return getUserInfo();
      })
      .then((user) => {
        setCurrentUser(user);
        onClose();
      })
      .catch((error) => {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setServerError(error.message || "No se pudo iniciar sesión.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <form className="login" onSubmit={handleSubmit} noValidate>
      <label className="login__label" htmlFor="login-email">
        Email
      </label>
      <input
        className="login__input"
        id="login-email"
        name="email"
        type="email"
        value={email}
        onChange={handleChange}
        autoComplete="email"
        required
      />
      {errors.email && (
        <span className="login__error">{errors.email}</span>
      )}

      <label className="login__label" htmlFor="login-password">
        Contraseña
      </label>
      <input
        className="login__input"
        id="login-password"
        name="password"
        type="password"
        value={password}
        onChange={handleChange}
        autoComplete="current-password"
        required
      />
      {errors.password && (
        <span className="login__error">{errors.password}</span>
      )}

      {serverError && (
        <p className="login__server-error">{serverError}</p>
      )}

      <button
        className="login__button"
        type="submit"
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
      </button>

      <p className="login__register-text">
        ¿Todavía no tenés cuenta?{" "}
        <button
          type="button"
          className="login__register-link"
          onClick={onRegister}
        >
          Registrarme
        </button>
      </p>
    </form>
  );
}

export default Login;

