// src/App.js

import React from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import { useAuth0 } from "./react-auth0-spa";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header>
        <NavBar />
        <Main />
      </header>
    </div>
  );
}

export default App;