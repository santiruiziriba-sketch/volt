import "./About.css";

function About() {
  return (
    <section className="about">
      <h2 className="about__title">Sobre el autor</h2>
      <p className="about__text">
        Soy Santiago Ruiz, personal trainer y desarrollador web. Volt nace de la
        idea de combinar ambas disciplinas: el criterio de un entrenador para
        planificar y las herramientas para convertir ese conocimiento en una
        aplicación clara, útil y accesible.
      </p>
      <p className="about__text">
        El objetivo es que cada persona reciba una rutina acorde a su meta, su
        nivel y su tiempo disponible, con la misma lógica que aplicaría un
        entrenador, pero disponible en cualquier momento.
      </p>
    </section>
  );
}

export default About;
