/*Course card - displays course code and name*/
import React from "react";
import { Link } from "react-router-dom";
import "./CourseCard.css";

function CourseCard({ course }){
  return(
    <Link to={"/course/" + course.CourseID} className="course-card">
      <div className="course-card-header">
        <span className="course-code">{course.CourseCode}</span>
      </div>
      <h3 className="course-name">{course.CourseName}</h3>
    </Link>
  );
}

export default CourseCard;