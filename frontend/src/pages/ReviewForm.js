/*Review form log and submission validation*/

import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getCourseById,
  reviews,
  evalTypes,
  keywords,
  reviewEvalTypes,
  reviewKeywords,
} from "../data/mockData";
import "./ReviewForm.css";

function ReviewForm() {
  /*retrive course id from URL*/
  const { id } = useParams();
  const navigate = useNavigate();
  const courseId = parseInt(id);
  const course = getCourseById(courseId);

  /*form state with empty fields*/
  const [rating, setRating] = useState("");
  const [workload, setWorkload] = useState("");
  const [groupWork, setGroupWork] = useState("");
  const [selectedEvalTypeIDs, setSelectedEvalTypeIDs] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [comment, setComment] = useState("");
  const [isCompleted, setIsCompleted] = useState("");
  const [gradeAchieved, setGradeAchieved] = useState("");

  /*error and submission message fields*/
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  /*id error validation*/
  if (!course) {
    return (
      <div className="review-form-page">
        <Link to="/" className="back-link">&larr; Back to Course List</Link>
        <h1>Course Not Found</h1>
        <p>Cannot submit a review because the course was not found.</p>
      </div>
    );
  }

  /*Review form log and submission validation*/
  function validate() {
    var newErrors = {};

    /*difficulty rating*/
    if (rating === "") {
      newErrors.rating = "Difficulty rating is required.";
    }

    /*workload*/
    if (workload === "") {
      newErrors.workload = "Workload rating is required.";
    }

    /*groupwork radio*/
    if (groupWork === "") {
      newErrors.groupWork = "Please select whether this course has group work.";
    }

    /*evaluation checkbox*/
    if (selectedEvalTypeIDs.length === 0) {
      newErrors.evaluationTypes = "Please select at least one evaluation type.";
    }

    /*completion indicator*/
    if (isCompleted === "") {
      newErrors.isCompleted = "Please indicate if you completed the course.";
    }

    /*enter grade*/
    if (isCompleted === "yes" && gradeAchieved !== "") {
      var grade = parseFloat(gradeAchieved);
      if (isNaN(grade) || grade < 0 || grade > 100) {
        newErrors.gradeAchieved = "Grade must be between 0 and 100.";
      }
    }

    /*text comment*/
    if (comment.trim() === "") {
      newErrors.comment = "Please write a comment about the course.";
    } else if (comment.trim().length < 10) {
      newErrors.comment = "Comment must be at least 10 characters long.";
    }

    return newErrors;
  }

  /*Toggles an evaluation type checkbox*/
  function handleEvalCheckbox(evalTypeId) {
    if (selectedEvalTypeIDs.indexOf(evalTypeId) !== -1) {
      // already checked - remove it
      setSelectedEvalTypeIDs(selectedEvalTypeIDs.filter((i) => i !== evalTypeId));
    } else {
      // not checked - add it
      setSelectedEvalTypeIDs([...selectedEvalTypeIDs, evalTypeId]);
    }
  }

 /*submit button validation and handles all fields*/
  function handleSubmit() {
    //validate
    var validationErrors = validate();
    setErrors(validationErrors);

    //stop if error
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    //creates review table object with data inputs
    var newReviewID = Math.max(...reviews.map((r) => r.ReviewID)) + 1;
    var newReview = {
      ReviewID: newReviewID,
      UserID: 0,
      CourseID: courseId,
      Rating: parseInt(rating),
      Comment: comment.trim(),
      Workload: parseInt(workload),
      GroupWork: groupWork === "yes",
      IsCompleted: isCompleted === "yes",
      GradeAchieved: (isCompleted === "yes" && gradeAchieved !== "")
        ? parseFloat(gradeAchieved)
        : null,
      DatePublished: new Date().toISOString().slice(0, 19).replace("T", " "),
      DateEditted: null,
    };

    /* save to review array*/
    reviews.push(newReview);

    /*save to review types table*/
    for (var i = 0; i < selectedEvalTypeIDs.length; i++) {
      reviewEvalTypes.push({
        ReviewID: newReviewID,
        EvalTypeID: selectedEvalTypeIDs[i],
      });
    }

    /*save keywords, check if one exists and create/link*/
    var keywordStrings = keywordInput.split(",");
    for (var j = 0; j < keywordStrings.length; j++) {
      var kwTitle = keywordStrings[j].trim();
      if (kwTitle === "") continue;

      /*keyword search*/
      var existing = null;
      for (var k = 0; k < keywords.length; k++) {
        if (keywords[k].KeywordTitle.toLowerCase() === kwTitle.toLowerCase()) {
          existing = keywords[k];
          break;
        }
      }

      /*create keyword*/
      if (existing === null) {
        var newKwID = Math.max(...keywords.map((kw) => kw.KeywordID)) + 1;
        existing = { KeywordID: newKwID, KeywordTitle: kwTitle, KeywordDetails: null };
        keywords.push(existing);
      }

      /*append keyword to review*/
      reviewKeywords.push({
        ReviewID: newReviewID,
        KeywordID: existing.KeywordID,
      });
    }

    console.log("Review submitted:", newReview);

    /*success message and redirect to home*/
    setSubmitted(true);
    setTimeout(function () {
      navigate("/course/" + courseId);
    }, 1500);
  }

  /*page loading*/
  return (
    <div className="review-form-page">
      <Link to={"/course/" + courseId} className="back-link">
        &larr; Back to {course.CourseCode}
      </Link>

      <h1>Review for {course.CourseCode} - {course.CourseName}</h1>

      <p className="form-instructions">
        Share your experience to help fellow students. Fields marked with * are required.
      </p>

      {/*if submitted show success message. Otherwise show the form*/}
      {submitted ? (
        <div className="success-message">
          <p>Thank you! Your review has been submitted successfully.</p>
          <Link to={"/course/" + courseId} className="btn btn-primary">
            Back to Course
          </Link>
        </div>
      ) : (
        <div className="form-container">

          {/*Difficulty Rating - dropdown 1 to 10*/}
          <div className="form-group">
            <label htmlFor="rating">Difficulty Rating (1 = Easy, 10 = Very Hard) *</label>
            <select
              id="rating"
              className={errors.rating ? "input-error" : ""}
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="">-- Select --</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            {errors.rating && <span className="error-message">{errors.rating}</span>}
          </div>

          {/*Workload - dropdown 1 to 10*/}
          <div className="form-group">
            <label htmlFor="workload">Workload (1 = Light, 10 = Very Heavy) *</label>
            <select
              id="workload"
              className={errors.workload ? "input-error" : ""}
              value={workload}
              onChange={(e) => setWorkload(e.target.value)}
            >
              <option value="">-- Select --</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            {errors.workload && <span className="error-message">{errors.workload}</span>}
          </div>

          {/*Group Work - yes/no radio*/}
          <div className="form-group">
            <label>Does this course have group work? *</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="groupWork"
                  value="yes"
                  checked={groupWork === "yes"}
                  onChange={(e) => setGroupWork(e.target.value)}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="groupWork"
                  value="no"
                  checked={groupWork === "no"}
                  onChange={(e) => setGroupWork(e.target.value)}
                />
                No
              </label>
            </div>
            {errors.groupWork && <span className="error-message">{errors.groupWork}</span>}
          </div>

          {/*Evaluation Types - checkboxes from the EvalTypes table*/}
          <div className="form-group">
            <label>Evaluation Types (select all that apply) *</label>
            <div className="checkbox-group">
              {evalTypes.map((et) => (
                <label key={et.EvalTypeID}>
                  <input
                    type="checkbox"
                    checked={selectedEvalTypeIDs.indexOf(et.EvalTypeID) !== -1}
                    onChange={() => handleEvalCheckbox(et.EvalTypeID)}
                  />
                  {et.EvalTitle}
                </label>
              ))}
            </div>
            {errors.evaluationTypes && (
              <span className="error-message">{errors.evaluationTypes}</span>
            )}
          </div>

          {/*Course Completion - yes/no radio*/}
          <div className="form-group">
            <label>Did you complete this course? *</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="isCompleted"
                  value="yes"
                  checked={isCompleted === "yes"}
                  onChange={(e) => setIsCompleted(e.target.value)}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="isCompleted"
                  value="no"
                  checked={isCompleted === "no"}
                  onChange={(e) => setIsCompleted(e.target.value)}
                />
                No
              </label>
            </div>
            {errors.isCompleted && <span className="error-message">{errors.isCompleted}</span>}
          </div>

          {/*Grade - only shows if the user selected "yes"*/}
          {isCompleted === "yes" && (
            <div className="form-group">
              <label htmlFor="gradeAchieved">Grade Achieved (%, optional)</label>
              <input
                type="number"
                id="gradeAchieved"
                className={errors.gradeAchieved ? "input-error" : ""}
                placeholder="e.g. 85"
                min="0"
                max="100"
                value={gradeAchieved}
                onChange={(e) => setGradeAchieved(e.target.value)}
              />
              {errors.gradeAchieved && (
                <span className="error-message">{errors.gradeAchieved}</span>
              )}
            </div>
          )}

          {/*Keywords - text separate by comma*/}
          <div className="form-group">
            <label htmlFor="keywords">Course Topics / Keywords (comma-separated)</label>
            <input
              type="text"
              id="keywords"
              placeholder="e.g. Python, Web Dev, SQL"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
            />
          </div>

          {/*Comment - textarea, min 10 characters*/}
          <div className="form-group">
            <label htmlFor="comment">Your Review *</label>
            <textarea
              id="comment"
              rows="5"
              className={errors.comment ? "input-error" : ""}
              placeholder="Share your experience with this course..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            {errors.comment && <span className="error-message">{errors.comment}</span>}
          </div>

          {/*Submit Button*/}
          <button
            type="button"
            className="btn btn-primary btn-submit"
            onClick={handleSubmit}
          >
            Submit Review
          </button>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;