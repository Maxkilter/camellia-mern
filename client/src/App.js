import React from 'react';
import {BrowserRouter} from "react-router-dom";
import 'materialize-css';
import './App.css';
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";

const App = () => {
    const {logIn, logOut, userId, token, isReady} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    if(!isReady) {
        return <Loader />
    }

  return (
      <AuthContext.Provider value={
          {logIn, logOut, userId, token, isAuthenticated}
      }>
              <BrowserRouter>
                  {isAuthenticated && <Navbar />}
                  <div className="container">
                     {routes}
                  </div>
              </BrowserRouter>
      </AuthContext.Provider>
  );
}

export default App;
