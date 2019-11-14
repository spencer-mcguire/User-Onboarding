import React from "react";
import SignUpForm from "./components/SignUpForm";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>SIGN UP</h1>
      </header>
      <section className="main-content">
        <SignUpForm />
      </section>
    </div>
  );
}

export default App;
