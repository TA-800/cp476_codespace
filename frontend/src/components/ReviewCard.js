/*Review card components*/
import React from "react";

/*import helper functions*/
import {
  getUserName,
  getEvalTypesForReview,
  getKeywordsForReview,
  formatDate,
} from "../data/mockData";
import "./ReviewCard.css";

/*fetch data logic*/
function ReviewCard({ review }) {
  const username = getUserName(review.UserID);
  const evalTypesList = getEvalTypesForReview(review.ReviewID);
  const keywordsList = getKeywordsForReview(review.ReviewID);

  return (
    /*Review card header, difficulty ratings, attaching tags, text body*/
    
    <div className="review-card">
      <div className="review-card-header">
        <span className="review-user">{username}</span>
        <span className="review-date">
          {formatDate(review.DatePublished)}
          {review.DateEditted && " (edited)"}
        </span>
      </div>

      <div className="review-ratings">
        <span>Difficulty: {review.Rating}/10</span>
        <span>Workload: {review.Workload}/10</span>
        <span>Group Work: {review.GroupWork ? "Yes" : "No"}</span>
        {review.IsCompleted && review.GradeAchieved !== null && (
          <span>Grade: {review.GradeAchieved}%</span>
        )}
        {!review.IsCompleted && (
          <span className="not-completed-badge">Did not complete</span>
        )}
      </div>

      <div className="review-tags">
        {evalTypesList.map((type, i) => (
          <span key={"eval-" + i} className="tag eval-tag">{type}</span>
        ))}
        {keywordsList.map((kw, i) => (
          <span key={"kw-" + i} className="tag keyword-tag">{kw}</span>
        ))}
      </div>

      <p className="review-comment">{review.Comment}</p>
    </div>
  );
}

export default ReviewCard;