 // src/App.js
import React, { useEffect, useState } from 'react';
import { getAllCourses } from './courseService';

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses().then(data => {
      setCourses(data);
    });
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      <h1>Gabriels Kurser</h1>
      
      {courses.length === 0 ? (
        <p>Laddar kurser (eller så är listan tom)...</p>
      ) : (
        <ul>
          {courses.map(course => (
            <li key={course.id} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc" }}>
              {/* Om inget namn syns, prova byt course.title mot course.name */}
              <strong>{course.title || course.name}</strong> (ID: {course.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;