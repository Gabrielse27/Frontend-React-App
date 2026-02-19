 import React, { useState, useEffect } from 'react';

function App() {
  // --- 1. LÅDOR FÖR DATA (State) ---
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]); 
  
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [processingRegistrering,setProcessingRegistrering] = useState(false);
  const [registreringSuccess, setRegistreringSuccess ] = useState(false);

  // --- 2. HÄMTA DATA (Backend) ---
  useEffect(() => {
    // A) Hämta Studenter
    fetch('https://localhost:7005/api/students')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(err => console.error("Fel studenter:", err));

    // B) Hämta Kurser 
    fetch('https://localhost:7005/api/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(err => console.error("Fel kurser:", err));
  }, []);


  
  const handleRegisterCourse = (courseId) => {
    
    // Har användaren valt en student?
    if (selectedStudentId === null) {
        alert("🛑 Du måste välja en student i listan till vänster först!");
        return;
    }

    
    
    setProcessingRegistrering(true);
    
    // ANROPA BACKEND (POST /api/enrollments)
    const url = `https://localhost:7005/api/enrollments?studentId=${selectedStudentId}&courseId=${courseId}`;

    fetch(url, { method: 'POST' })
      .then(response => {
          if(response.ok) {
              // Om det gick bra:
              setProcessingRegistrering(false);
              setRegistreringSuccess(true);
              setTimeout(() => setRegistreringSuccess(false), 3000); // Stäng poppupen efter 3 sekunder
              
              
fetch('https://localhost:7005/api/students')
    .then(res => res.json())
    .then(data => setStudents(data));
              
          } else {
              alert("Något gick fel vid registreringen!");
              setProcessingRegistrering(false);
          }
      })
      .catch(err => {
          console.error(err);
          setProcessingRegistrering(false);
      });
  }


  // Funktion för att ta bort student
  const handleDeleteStudent = (id) => {
    if (window.confirm("Är du säker på att du vill ta bort denna student?")) {
        fetch(`https://localhost:7005/api/students/${id}`, { 
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setStudents(students.filter(student => student.id !== id));
                // Om vi tog bort den valda studenten, nollställ valet
                if (selectedStudentId === id) setSelectedStudentId(null);
            }
        });
    }
  };


  // --- STYLING (CSS) ---
  const popupStyle = {
    position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
    backgroundColor: "white", padding: "40px", boxShadow: "0 0 20px rgba(0,0,0,0.5)",
    borderRadius: "10px", textAlign: "center", zIndex: 1000, border: "2px solid #FFB3C7"
  };


const [selectedCity, setSelectedCity] = useState("Alla");
const uniqueCities = ["Alla", ...new Set(courses.map(course => course.location))];
const filteredCourses = selectedCity === "Alla" ? courses : courses.filter(course => course.location === selectedCity);





  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "1400px", margin: "0 auto" }}>
      
      <h1 style={{ textAlign: "center", color: "#333" }}>Min Skola Dashboard</h1>

      
      <p style={{textAlign: "center", color: "#666"}}>
        1. Klicka på en student ("Välj"). <br/>
        2. Klicka på "Registrera Kurs" vid en kurs.
      </p>

      <div style={{ display: "flex", gap: "50px", marginTop: "30px" }}>
        
        {/* --- VÄNSTER: STUDENTER --- */}
        <div style={{ flex: 1 }}>
          <h2 style={{ color: "blue" }}>Studenter 🎓</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {students.map(student => (
              <li key={student.id} 
                  style={{ 
                      // Om studenten är vald blir den GUL, annars ljusblå
                      background: selectedStudentId === student.id ? "#fffacd" : "#f0f8ff", 
                      border: selectedStudentId === student.id ? "2px solid orange" : "none",
                      padding: "10px", marginBottom: "10px", borderRadius: "5px",
                      display: "flex", justifyContent: "space-between", alignItems: "center"
                  }}>
                
<div>
    <span style={{ fontWeight: "bold", fontSize: "1.1em" }}>
        {student.firstName} {student.lastName}
    </span>
    
    {/* Här kollar vi om studenten har några kurser, och ritar ut dem! */}
    {student.courses && student.courses.length > 0 ? (
        <ul style={{ fontSize: "0.85em", color: "#555", marginTop: "5px", paddingLeft: "20px" }}>
            {student.courses.map((course, index) => (
                <li key={index}>{course}</li>
            ))}
        </ul>
    ) : (
        <div style={{ fontSize: "0.8em", color: "#999", marginTop: "5px", fontStyle: "italic" }}>
            Inga kurser registrerade
        </div>
    )}
</div>


                <div>
                    {/* KNAPP FÖR ATT VÄLJA STUDENT */}
                    <button 
                        onClick={() => setSelectedStudentId(student.id)}
                        style={{ marginRight: "10px", cursor: "pointer" }}
                    >
                        {selectedStudentId === student.id ? "Vald ✅" : "Välj"}
                    </button>

                    <button 
                        onClick={() => handleDeleteStudent(student.id)}
                        style={{ backgroundColor: "red", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                    >
                        🗑️
                    </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* --- HÖGER: KURSER --- */}
        <div style={{ flex: 2 }}> 
            <h2 style={{ color: "green" }}>Tillgängliga Kurser 📚</h2>



<div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px", fontWeight: "bold" }}>Filtrera på stad:</label>
        <select 
            value={selectedCity} 
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{ padding: "8px", borderRadius: "5px" }}
        >
            {uniqueCities.map((city, index) => (
                <option key={index} value={city}>
                    {city}
                </option>
            ))}
        </select>
    </div>






            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "10px" }}>
                
                {filteredCourses.map(course => (
                    <div key={course.id} style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "2px 2px 10px #eee" }}>
                        
                        <h3>{course.title}
                          {course.location && (
        <span style={{ fontSize: "0.8em", color: "gray", marginLeft: "8px" }}>
            ({course.location})
        </span>
    )}
                        </h3>
                        <p style={{color: "#555"}}>{course.description}</p>
                        
                      
                        <button 
                            // OBS: Nu skickar vi med ID (course.id) istället för namn!
                            onClick={() => handleRegisterCourse(course.id)}
                            style={{
                                backgroundColor: "#13e87a", 
                                border: "none", padding: "10px 30px", borderRadius: "6px",
                                fontWeight: "bold", cursor: "pointer", width: "100%", 
                            }}
                        >
                            Registrera Kurs
                        </button>

                    </div>
                ))}

            </div>
        </div>

      </div>


      {registreringSuccess && (
          <div style={popupStyle}>
              <div style={{fontSize: "30px"}}>✅</div>
              <h3>Studenten är Godkänt!</h3>
              <p>
                Studenten Registrerat på kursen!
              </p>
          </div>
      )}







    </div>
  );
}

export default App;