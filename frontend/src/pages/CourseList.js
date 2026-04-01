/*Course list page - fetches from backend API*/
import React, { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import "./CourseList.css";

function CourseList(){
  var [courses, setCourses] = useState([]);
  var [searchTerm, setSearchTerm] = useState("");

  /*fetch all courses on page load*/
  useEffect(function(){
    var allCourses = [];
    var fetches = [];
    for (var i = 0; i <= 7; i++){
      fetches.push(
        fetch("http://localhost:8080/courses?page=" + i)
          .then(function(res) { return res.json(); })
      );
    }
    Promise.all(fetches).then(function(results){
      for (var j = 0; j < results.length; j++) {
        for (var k = 0; k < results[j].length; k++){
          allCourses.push(results[j][k]);
        }
      }
      setCourses(allCourses);
    });
  }, []);

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

    </div>
  );
}

export default CourseList;
