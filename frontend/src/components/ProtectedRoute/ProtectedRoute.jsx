import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ProtectedRoute({ children, ...routeProps }) {
  const { currentUser, isAuthLoading } = useContext(CurrentUserContext);

  return (
    <Route
      {...routeProps}
      render={({ location }) => {
        if (isAuthLoading) {
          return <p>Cargando sesión...</p>;
        }

        if (currentUser) {
          return children;
        }

        return (
          <Redirect
            to={{
              pathname: "/",
              state: {
                openLogin: true,
                from: location,
              },
            }}
          />
        );
      }}
    />
  );
}

export default ProtectedRoute;
