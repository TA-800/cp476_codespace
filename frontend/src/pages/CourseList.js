/*Course list page components*/

import React, { useState } from "react";

/*import course data*/
import { courses, getAverageRating } from "../data/mockData";
import CourseCard from "../components/CourseCard";
import "./CourseList.css";

/*states for search and filter*/
function CourseList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  /*filter logic*/
  const filteredCourses = courses.filter((course) => {
    const term = searchTerm.toLowerCase().trim();
    let matchesSearch = true;

    /*search logic*/
    if (term !== "") {
      const nameMatch = course.CourseName.toLowerCase().indexOf(term) !== -1;
      const codeMatch = course.CourseCode.toLowerCase().indexOf(term) !== -1;
      matchesSearch = nameMatch || codeMatch;
    }

    /*get ratings filter*/
    const avgRating = parseFloat(getAverageRating(course.CourseID));
    let matchesDifficulty = true;
    if (difficultyFilter === "easy") {
      matchesDifficulty = avgRating > 0 && avgRating <= 4;
    } else if (difficultyFilter === "medium") {
      matchesDifficulty = avgRating > 4 && avgRating <= 7;
    } else if (difficultyFilter === "hard") {
      matchesDifficulty = avgRating > 7;
    }

    /*search results if matched*/
    return matchesSearch && matchesDifficulty;
  });

  return (
    /*title*/
    <div className="course-list-page">
      <h1>Computer Science Courses</h1>

    {/*filters and search*/}
      <div className="filters">
        <input
          type="text"
          className="search-input"
          placeholder="Search by course name or code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
        >
          {/*Difficulty*/}
          <option value="all">All Difficulties</option>
          <option value="easy">Easy (1-4)</option>
          <option value="medium">Medium (5-7)</option>
          <option value="hard">Hard (8-10)</option>
        </select>
      </div>

      {/*coursecard components grid*/}
      <div className="course-grid">
        {filteredCourses.map((course) => (
          <CourseCard key={course.CourseID} course={course} />
        ))}
      </div>
    
    {/*render for empty search results*/}
      {filteredCourses.length === 0 && (
        <p className="no-results">No courses match your search.</p>
      )}
    </div>
  );
}

export default CourseList;