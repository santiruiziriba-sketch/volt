import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import CurrentUserContext from "./contexts/CurrentUserContext";
import { getUserInfo } from "./utils/MainApi";
import MisRutinas from "./components/MisRutinas/MisRutinas";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Header from "./components/Header/Header";
import Intro from "./components/Intro/Intro";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import RutinaPage from "./components/RutinaPage/RutinaPage";

import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(() =>
    Boolean(localStorage.getItem("jwt")),
  );
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  }, []);

  return (
    <Router>
      <CurrentUserContext.Provider
        value={{ currentUser, setCurrentUser, isAuthLoading }}
      >
        <div className="app">
          <Header />

          <Switch>
            <Route exact path="/">
              <Intro />
              <About />
            </Route>

            <Route path="/crear-rutina">
              <Main />
            </Route>

            <Route path="/rutina">
              <RutinaPage />
            </Route>

            <ProtectedRoute exact path="/mis-rutinas">
              <MisRutinas />
            </ProtectedRoute>
          </Switch>

          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </Router>
  );
}

export default App;
