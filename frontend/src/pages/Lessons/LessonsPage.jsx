import React from "react";
import LessonGrid from "../../components/Lessons/LessonGrid";
import PropTypes from "prop-types";

export default function LessonsPage() {
  return (
    <div>
      <h1 style={{ padding: "1.5rem 2rem 0 2rem" }}>Your Lessons</h1>
      <LessonGrid />
    </div>
  );
}
LessonsPage.propTypes = {};
