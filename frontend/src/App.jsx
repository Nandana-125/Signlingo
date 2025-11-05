import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Flashscreen from "./pages/Flashscreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Flashscreen />} />
      </Routes>
    </Router>
  );
}

export default App;