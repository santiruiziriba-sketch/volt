import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader" role="status" aria-label="Cargando">
      <div className="preloader__spinner"></div>
    </div>
  );
}

export default Preloader;
