/*Course list page - fetches from backend API*/
import React, { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import "./CourseList.css";

function CourseList(){
  var [courses, setCourses] = useState([]);
  var [page, setPage] = useState(0);
  var [searchTerm, setSearchTerm] = useState("");

  /*fetch courses when page changes*/
  useEffect(function() {
    fetch("http://localhost:8080/courses?page=" + page)
      .then(function(res) { return res.json(); })
      .then(function(data) { setCourses(data); });
  }, [page]);

  /*client side search filter*/
  var filteredCourses = [];
  for (var i = 0; i < courses.length; i++){
    var term = searchTerm.toLowerCase().trim();
    if (term === "") {
      filteredCourses.push(courses[i]);
    } else {
      var nameMatch = courses[i].CourseName.toLowerCase().indexOf(term) !== -1;
      var codeMatch = courses[i].CourseCode.toLowerCase().indexOf(term) !== -1;
      if (nameMatch || codeMatch) filteredCourses.push(courses[i]);
    }
  }

  return (
    <div className="course-list-page">
      <h1>Computer Science Courses</h1>
      <div className="filters">
        <input type="text" className="search-input"
          placeholder="Search by course name or code..."
          value={searchTerm}
          onChange={function(e) { setSearchTerm(e.target.value); }} />
      </div>

      <div className="course-grid">
        {filteredCourses.map(function(course){
          return <CourseCard key={course.CourseID} course={course} />;
        })}
      </div>

      {filteredCourses.length === 0 &&(
        <p className="no-results">No courses match your search.</p>
      )}

      <div style={{display:"flex", gap:"10px", marginTop:"20px", justifyContent:"center"}}>
        <button className="btn btn-primary" disabled={page === 0}
          onClick={function() { setPage(page - 1); }}>Previous</button>
        <span style={{padding:"10px"}}>Page {page + 1}</span>
        <button className="btn btn-primary" disabled={courses.length < 10}
          onClick={function() { setPage(page + 1); }}>Next</button>
      </div>
    </div>
  );
}

export default CourseList;