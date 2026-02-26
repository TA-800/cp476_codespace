/*Course detailed view component*/

import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

/*helper functions*/
import {
  getCourseById,
  getReviewsForCourse,
  getAverageRating,
  getAverageWorkload,
  getAverageGrade,
  getEvaluationTypesForCourse,
  hasGroupWork,
} from "../data/mockData";
import ReviewCard from "../components/ReviewCard";
import "./CourseDetails.css";

/*get course id*/
function CourseDetails() {
  const { id } = useParams();
  const courseId = parseInt(id);
  const course = getCourseById(courseId);

  /*sort order of review by state*/
  const [sortBy, setSortBy] = useState("newest");

  if (!course) {
    return (
      <div className="course-details-page">
        <Link to="/" className="back-link">&larr; Back to Course List</Link>
        <h1>Course Not Found</h1>
        <p>The requested course could not be found.</p>
      </div>
    );
  }

/*fetch & calculate course data*/
  const courseReviews = getReviewsForCourse(courseId);
  const avgRating = getAverageRating(courseId);
  const avgWorkload = getAverageWorkload(courseId);
  const avgGrade = getAverageGrade(courseId);
  const evalTypesForCourse = getEvaluationTypesForCourse(courseId);
  const groupWork = hasGroupWork(courseId);

  /*sorting logic by highest, lowest, newest, oldest*/
  const sortedReviews = [...courseReviews].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.DatePublished) - new Date(a.DatePublished);
    if (sortBy === "oldest") return new Date(a.DatePublished) - new Date(b.DatePublished);
    if (sortBy === "highest") return b.Rating - a.Rating;
    if (sortBy === "lowest") return a.Rating - b.Rating;
    return 0;
  });

  /*link to home/back*/
  /*course metrics*/
  /*individual reviews list*/
  /*render sorted reviews*/
  return (
    <div className="course-details-page">
      <Link to="/" className="back-link">&larr; Back to Course List</Link>

      <div className="course-header">
        <h1>{course.CourseCode} - {course.CourseName}</h1>
        <p className="course-description">{course.CourseDesc}</p>
      </div>

      <div className="overall-ratings">
        <h2>Overall Ratings</h2>
        <div className="ratings-grid">
          <div className="rating-item">
            <span className="rating-label">Average Difficulty</span>
            <span className="rating-value">
              {avgRating > 0 ? avgRating + " / 10" : "N/A"}
            </span>
          </div>
          <div className="rating-item">
            <span className="rating-label">Average Workload</span>
            <span className="rating-value">
              {avgWorkload > 0 ? avgWorkload + " / 10" : "N/A"}
            </span>
          </div>
          {avgGrade && (
            <div className="rating-item">
              <span className="rating-label">Average Grade</span>
              <span className="rating-value">{avgGrade}%</span>
            </div>
          )}
        </div>

        {evalTypesForCourse.length > 0 && (
          <div className="eval-section">
            <span className="rating-label">Evaluation Types:</span>
            <div className="eval-tags">
              {evalTypesForCourse.map((type, i) => (
                <span key={i} className="tag eval-tag">{type}</span>
              ))}
            </div>
          </div>
        )}

        <p className="group-work-info">
          <strong>Group Work:</strong> {groupWork}
        </p>
      </div>

      <div className="reviews-section">
        <div className="reviews-header">
          <h2>Student Reviews ({courseReviews.length})</h2>
          <div className="reviews-controls">
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
            <Link to={"/course/" + courseId + "/review"} className="btn btn-primary">
              + Add Review
            </Link>
          </div>
        </div>

        {sortedReviews.length === 0 ? (
          <div className="no-reviews">
            <p>This course has no student feedback yet! Check back soon or contribute here!</p>
          </div>
        ) : (
          <div className="reviews-list">
            {sortedReviews.map((review) => (
              <ReviewCard key={review.ReviewID} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseDetails;