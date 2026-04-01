/*Review form - fetches eval types and posts review to backend*/
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ReviewForm.css";

function ReviewForm(){
  var id = useParams().id;
  var navigate = useNavigate();
  var courseId = parseInt(id);

  var [course, setCourse] = useState(null);
  var [evalTypes, setEvalTypes] = useState([]);
  var [loading, setLoading] = useState(true);

  var [rating, setRating] = useState("");
  var [workload, setWorkload] = useState("");
  var [groupWork, setGroupWork] = useState("");
  var [selectedEvalTypeIDs, setSelectedEvalTypeIDs] = useState([]);
  var [keywordInput, setKeywordInput] = useState("");
  var [comment, setComment] = useState("");
  var [isCompleted, setIsCompleted] = useState("");
  var [gradeAchieved, setGradeAchieved] = useState("");
  var [errors, setErrors] = useState({});
  var [submitted, setSubmitted] = useState(false);

  /*fetch course info and eval types on load*/
  useEffect(function() {
    fetch("http://localhost:8080/courses/" + courseId)
      .then(function(res) { return res.json(); })
      .then(function(result) { setCourse(result.data); });

    fetch("http://localhost:8080/evaltypes")
      .then(function(res) { return res.json(); })
      .then(function(data) {
        setEvalTypes(data);
        setLoading(false);
      });
  }, [courseId]);

  if (loading){
    return <div className="review-form-page"><p>Loading...</p></div>;
  }
  if (!course){
    return(
      <div className="review-form-page">
        <Link to="/" className="back-link">&larr; Back to Course List</Link>
        <h1>Course Not Found</h1>
      </div>
    );
  }

  /*validate all required fields*/
  function validate(){
    var newErrors = {};
    if (rating === "") newErrors.rating = "Difficulty rating is required.";
    if (workload === "") newErrors.workload = "Workload rating is required.";
    if (groupWork === "") newErrors.groupWork = "Please select whether this course has group work.";
    if (selectedEvalTypeIDs.length === 0) newErrors.evaluationTypes = "Please select at least one evaluation type.";
    if (isCompleted === "") newErrors.isCompleted = "Please indicate if you completed the course.";
    if (isCompleted === "yes" && gradeAchieved !== "") {
      var grade = parseFloat(gradeAchieved);
      if (isNaN(grade) || grade < 0 || grade > 100) newErrors.gradeAchieved = "Grade must be between 0 and 100.";
    }
    if (comment.trim() === "") newErrors.comment = "Please write a comment about the course.";
    else if (comment.trim().length < 10) newErrors.comment = "Comment must be at least 10 characters long.";
    return newErrors;
  }

  /*toggle eval type checkbox*/
  function handleEvalCheckbox(evalTypeId){
    if (selectedEvalTypeIDs.indexOf(evalTypeId) !== -1) {
      setSelectedEvalTypeIDs(selectedEvalTypeIDs.filter(function(i) { return i !== evalTypeId; }));
    } else {
      setSelectedEvalTypeIDs(selectedEvalTypeIDs.concat(evalTypeId));
    }
  }

  /*submit review to backend*/
  function handleSubmit(){
    var validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    var keywordStrings = keywordInput.split(",")
      .map(function(k) { return k.trim(); })
      .filter(function(k) { return k !== ""; });

    fetch("http://localhost:8080/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        UserID: 1,
        CourseID: courseId,
        Rating: parseInt(rating),
        Comment: comment.trim(),
        Workload: parseInt(workload),
        GroupWork: groupWork === "yes",
        IsCompleted: isCompleted === "yes",
        GradeAchieved: (isCompleted === "yes" && gradeAchieved !== "")
          ? parseFloat(gradeAchieved) : null,
        EvalTypeIDs: selectedEvalTypeIDs,
        Keywords: keywordStrings
      })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      console.log("Review submitted:", data);
      setSubmitted(true);
      setTimeout(function() { navigate("/course/" + courseId); }, 1500);
    })
    .catch(function(err) { console.error("Submit failed:", err); });
  }

  return(
    <div className="review-form-page">
      {/*back navigation link*/}
      <Link to={"/course/" + courseId} className="back-link">&larr; Back to {course.CourseCode}</Link>
      <h1>Review for {course.CourseCode} - {course.CourseName}</h1>
      <p className="form-instructions">Share your experience to help fellow students. Fields marked with * are required.</p>

      {submitted ?(
        <div className="success-message">
          <p>Thank you! Your review has been submitted successfully.</p>
          <Link to={"/course/" + courseId} className="btn btn-primary">Back to Course</Link>
        </div>
      ) : (

        <div className="form-container">
          {/*difficulty rating dropdown*/}
          <div className="form-group">
            <label htmlFor="rating">Difficulty Rating (1 = Easy, 10 = Very Hard) *</label>
            <select id="rating" className={errors.rating ? "input-error" : ""} value={rating} onChange={function(e) { setRating(e.target.value); }}>
              <option value="">-- Select --</option>
              <option value="1">1</option><option value="2">2</option><option value="3">3</option>
              <option value="4">4</option><option value="5">5</option><option value="6">6</option>
              <option value="7">7</option><option value="8">8</option><option value="9">9</option>
              <option value="10">10</option>
            </select>
            {errors.rating && <span className="error-message">{errors.rating}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="workload">Workload (1 = Light, 10 = Very Heavy) *</label>
            <select id="workload" className={errors.workload ? "input-error" : ""} value={workload} onChange={function(e) { setWorkload(e.target.value); }}>
              <option value="">-- Select --</option>
              <option value="1">1</option><option value="2">2</option><option value="3">3</option>
              <option value="4">4</option><option value="5">5</option><option value="6">6</option>
              <option value="7">7</option><option value="8">8</option><option value="9">9</option>
              <option value="10">10</option>
            </select>
            {errors.workload && <span className="error-message">{errors.workload}</span>}
          </div>

          <div className="form-group">
            <label>Does this course have group work? *</label>
            <div className="radio-group">
              <label><input type="radio" name="groupWork" value="yes" checked={groupWork === "yes"} onChange={function(e) { setGroupWork(e.target.value); }} /> Yes</label>
              <label><input type="radio" name="groupWork" value="no" checked={groupWork === "no"} onChange={function(e) { setGroupWork(e.target.value); }} /> No</label>
            </div>
            {errors.groupWork && <span className="error-message">{errors.groupWork}</span>}
          </div>

          <div className="form-group">
            <label>Evaluation Types (select all that apply) *</label>
            <div className="checkbox-group">
              {evalTypes.map(function(et) {
                return (
                  <label key={et.EvalTypeID}>
                    <input type="checkbox" checked={selectedEvalTypeIDs.indexOf(et.EvalTypeID) !== -1} onChange={function() { handleEvalCheckbox(et.EvalTypeID); }} />
                    {et.EvalTitle}
                  </label>
                );
              })}
            </div>
            {errors.evaluationTypes && <span className="error-message">{errors.evaluationTypes}</span>}
          </div>
              {/*radio buttons*/}
          <div className="form-group">
            <label>Did you complete this course? *</label>
            <div className="radio-group">
              <label><input type="radio" name="isCompleted" value="yes" checked={isCompleted === "yes"} onChange={function(e) { setIsCompleted(e.target.value); }} /> Yes</label>
              <label><input type="radio" name="isCompleted" value="no" checked={isCompleted === "no"} onChange={function(e) { setIsCompleted(e.target.value); }} /> No</label>
            </div>
            {errors.isCompleted && <span className="error-message">{errors.isCompleted}</span>}
          </div>

          {isCompleted === "yes" && (
            <div className="form-group">
              <label htmlFor="gradeAchieved">Grade Achieved (%, optional)</label>
              <input type="number" id="gradeAchieved" className={errors.gradeAchieved ? "input-error" : ""} placeholder="e.g. 85" min="0" max="100" value={gradeAchieved} onChange={function(e) { setGradeAchieved(e.target.value); }} />
              {errors.gradeAchieved && <span className="error-message">{errors.gradeAchieved}</span>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="keywords">Course Topics / Keywords (comma-separated)</label>
            <input type="text" id="keywords" placeholder="e.g. Python, Web Dev, SQL" value={keywordInput} onChange={function(e) { setKeywordInput(e.target.value); }} />
          </div>

          <div className="form-group">
            <label htmlFor="comment">Your Review *</label>
            <textarea id="comment" rows="5" className={errors.comment ? "input-error" : ""} placeholder="Share your experience with this course..." value={comment} onChange={function(e) { setComment(e.target.value); }}></textarea>
            {errors.comment && <span className="error-message">{errors.comment}</span>}
          </div>

          <button type="button" className="btn btn-primary btn-submit" onClick={handleSubmit}>Submit Review</button>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;