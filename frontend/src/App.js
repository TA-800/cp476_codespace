/*routing for application pages*/

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CourseList from "./pages/CourseList";
import CourseDetails from "./pages/CourseDetails";
import ReviewForm from "./pages/ReviewForm";
import "./App.css";

/*link pathways for 3 pages*/
function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/course/:id/review" element={<ReviewForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
