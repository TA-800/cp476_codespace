/*Course card components*/

import React from "react";
import { Link } from "react-router-dom";
import { getAverageRating, getAverageWorkload, getReviewsForCourse } from "../data/mockData";
import "./CourseCard.css";

/*get ratings and reviews*/
function CourseCard({course}) {
  const avgRating = getAverageRating(course.CourseID);
  const avgWorkload = getAverageWorkload(course.CourseID);
  const reviewCount = getReviewsForCourse(course.CourseID).length;

  /*wrapped in links
  , difficulty and workload rating*/
  return (
    <Link to={"/course/" + course.CourseID} className="course-card">
      <div className="course-card-header">
        <span className="course-code">{course.CourseCode}</span>
        <span className="review-count">
          {reviewCount} review(s)
        </span>
      </div>

      <h3 className="course-name">{course.CourseName}</h3>

      <div className="course-stats">
        <div className="stat">
          <span className="stat-label">Difficulty</span>
          <span className="stat-value">
            {avgRating > 0 ? avgRating + " / 10" : "N/A"}
          </span>
        </div>

        <div className="stat">
          <span className="stat-label">Workload</span>
          <span className="stat-value">
            {avgWorkload > 0 ? avgWorkload + " / 10" : "N/A"}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;