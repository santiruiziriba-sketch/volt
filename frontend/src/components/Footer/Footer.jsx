import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        Datos de ejercicios provistos por{" "}
        <a
          className="footer__link"
          href="https://api-ninjas.com"
          target="_blank"
          rel="noreferrer"
        >
          API Ninjas
        </a>
      </p>
    </footer>
  );
}

export default Footer;
