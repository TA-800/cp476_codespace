/*Review card - displays one review with delete button and backend data*/
import React from "react";
import "./ReviewCard.css";

/*format date helper*/
function formatDate(dateString){
  if (!dateString) return "";
  var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var d = new Date(dateString);
  return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

function ReviewCard({ review, onDelete }){

  /*send delete request to backend*/
  function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    fetch("http://localhost:8080/reviews/" + review.ReviewID,{
      method: "DELETE"
    })
    .then(function(res) { return res.json(); })
    .then(function() {
      if (onDelete) onDelete();
    })
    .catch(function(err) { console.error("Delete failed:", err); });
  }

  return (
    <div className="review-card">
      <div className="review-card-header">
        <span className="review-user">{review.UserName}</span>
        <span className="review-date">
          {formatDate(review.DatePublished)}
          {review.DateEdited && " (edited)"}
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
        {review.evalTypes && review.evalTypes.map(function(type, i) {
          return <span key={"eval-" + i} className="tag eval-tag">{type}</span>;
        })}
        {review.keywords && review.keywords.map(function(kw, i) {
          return <span key={"kw-" + i} className="tag keyword-tag">{kw}</span>;
        })}
      </div>

      <p className="review-comment">{review.Comment}</p>

      {/*delete button*/}
      <button className="btn-delete" onClick={handleDelete}>Delete Review</button>
    </div>
  );
}

export default ReviewCard;