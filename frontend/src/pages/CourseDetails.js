/*Course detail page - fetches course and reviews from backend*/

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import "./CourseDetails.css";

function CourseDetails(){
  var id = useParams().id;
  var courseId = parseInt(id);

  var [course, setCourse] = useState(null);
  var [courseReviews, setCourseReviews] = useState([]);
  var [loading, setLoading] = useState(true);
  var [sortBy, setSortBy] = useState("newest");

  /*fetch course and reviews from backend*/
  useEffect(function(){
    fetch("http://localhost:8080/courses/" + courseId)
      .then(function(res) { return res.json(); })
      .then(function(result) {
        setCourse(result.data);
        setCourseReviews(result.reviews || []);
        setLoading(false);
      })
      .catch(function() { setLoading(false); });
  }, [courseId]);

  if (loading) {
    return <div className="course-details-page"><p>Loading...</p></div>;
  }
  if (!course) {
    return (
      <div className="course-details-page">
        <Link to="/" className="back-link">&larr; Back to Course List</Link>
        <h1>Course Not Found</h1>
      </div>
    );
  }

  /*calculate averages from review data*/
  var avgRating = "N/A";
  var avgWorkload = "N/A";
  var avgGrade = null;

  if (courseReviews.length > 0){
    var totalRating = 0;
    var totalWorkload = 0;
    var gradeSum = 0;
    var gradeCount = 0;

    for (var i = 0; i < courseReviews.length; i++){
      totalRating += courseReviews[i].Rating;
      totalWorkload += courseReviews[i].Workload || 0;
      if (courseReviews[i].IsCompleted && courseReviews[i].GradeAchieved !== null) {
        gradeSum += courseReviews[i].GradeAchieved;
        gradeCount++;
      }
    }
    avgRating = (totalRating / courseReviews.length).toFixed(1) + " / 10";
    avgWorkload = (totalWorkload / courseReviews.length).toFixed(1) + " / 10";
    if (gradeCount > 0) avgGrade = (gradeSum / gradeCount).toFixed(1) + "%";
  }

  /*collect all eval types across reviews*/
  var allEvalTypes = {};
  for (var j = 0; j < courseReviews.length; j++){
    if (courseReviews[j].evalTypes) {
      for (var k = 0; k < courseReviews[j].evalTypes.length; k++) {
        allEvalTypes[courseReviews[j].evalTypes[k]] = true;
      }
    }
  }
  var evalTypesList = Object.keys(allEvalTypes);

  /*group work majority*/
  var groupWorkText = "N/A";
  if (courseReviews.length > 0){
    var yesCount = 0;
    for (var g = 0; g < courseReviews.length; g++) {
      if (courseReviews[g].GroupWork) yesCount++;
    }
    groupWorkText = yesCount > courseReviews.length / 2 ? "Yes" : "No";
  }

  /*sort reviews*/
  var sortedReviews = courseReviews.slice();
  sortedReviews.sort(function(a, b) {
    if (sortBy === "newest") return new Date(b.DatePublished) - new Date(a.DatePublished);
    if (sortBy === "oldest") return new Date(a.DatePublished) - new Date(b.DatePublished);
    if (sortBy === "highest") return b.Rating - a.Rating;
    if (sortBy === "lowest") return a.Rating - b.Rating;
    return 0;
  });

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
            <span className="rating-value">{avgRating}</span>
          </div>
          <div className="rating-item">
            <span className="rating-label">Average Workload</span>
            <span className="rating-value">{avgWorkload}</span>
          </div>
          {avgGrade && (
            <div className="rating-item">
              <span className="rating-label">Average Grade</span>
              <span className="rating-value">{avgGrade}</span>
            </div>
          )}
        </div>
        {evalTypesList.length > 0 && (
          <div className="eval-section">
            <span className="rating-label">Evaluation Types:</span>
            <div className="eval-tags">
              {evalTypesList.map(function(type, i) {
                return <span key={i} className="tag eval-tag">{type}</span>;
              })}
            </div>
          </div>
        )}
        <p className="group-work-info"><strong>Group Work:</strong> {groupWorkText}</p>
      </div>

      <div className="reviews-section">
        <div className="reviews-header">
          <h2>Student Reviews ({courseReviews.length})</h2>
          <div className="reviews-controls">
            <select className="filter-select" value={sortBy}
              onChange={function(e) { setSortBy(e.target.value); }}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
            <Link to={"/course/" + courseId + "/review"} className="btn btn-primary">+ Add Review</Link>
          </div>
        </div>
        {sortedReviews.length === 0 ? (
          <div className="no-reviews"><p>No student feedback yet!</p></div>
        ) : (
          <div className="reviews-list">
            {sortedReviews.map(function(review, index) {
              return <ReviewCard key={index} review={review} onDelete={function() {
               fetch("http://localhost:8080/courses/" + courseId)
                .then(function(res) { return res.json(); })
                .then(function(result) {
                  setCourseReviews(result.reviews || []);
                });
                }}/>;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseDetails;