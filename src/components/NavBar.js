// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-spa";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <nav class="navbar navbar-light bg-light">
        <div>
          {!isAuthenticated && (
            <button
              className="btn btn-primary"
              onClick={() => loginWithRedirect({})}
            >
              Log in
            </button>
          )}
          {isAuthenticated && (
            <button className="btn btn-primary" onClick={() => logout()}>
              Log out
            </button>
          )}
        </div>
        <h6>TwitWars</h6>
    </nav>
  );
};

export default NavBar;
