 import React, { useState, useEffect } from 'react';

function App() {
  // --- 1. LÅDOR FÖR DATA (State) ---
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]); 
  
  // NYTT: Vi måste hålla reda på VEM som handlar!
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  // Lådor för Klarna-popupen
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);


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


  // --- 3. FUNKTION FÖR ATT KÖPA (Nu kopplad till Backend!) ---
  const handleBuyCourse = (courseId) => {
    
    // Har användaren valt en student?
    if (selectedStudentId === null) {
        alert("🛑 Du måste välja en student i listan till vänster först!");
        return;
    }

    // Starta "Klarna"-animationen
    setProcessingPayment(true);
    
    // ANROPA BACKEND (POST /api/enrollments)
    const url = `https://localhost:7005/api/enrollments?studentId=${selectedStudentId}&courseId=${courseId}`;

    fetch(url, { method: 'POST' })
      .then(response => {
          if(response.ok) {
              // Om det gick bra:
              setProcessingPayment(false);
              setPaymentSuccess(true);
              setTimeout(() => setPaymentSuccess(false), 3000); // Dölj rutan efter 3 sek
          } else {
              alert("Något gick fel vid köpet!");
              setProcessingPayment(false);
          }
      })
      .catch(err => {
          console.error(err);
          setProcessingPayment(false);
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

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "1400px", margin: "0 auto" }}>
      
      <h1 style={{ textAlign: "center", color: "#333" }}>Min Skola Dashboard</h1>

      {/* Info-text så man fattar hur man gör */}
      <p style={{textAlign: "center", color: "#666"}}>
        1. Klicka på en student ("Välj"). <br/>
        2. Klicka på "Köp" vid en kurs.
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
                
                <span>{student.firstName} {student.lastName}</span>

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
        <div style={{ flex: 2 }}> {/* Lite bredare för kurserna */}
            <h2 style={{ color: "green" }}>Tillgängliga Kurser 📚</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
                
                {courses.map(course => (
                    <div key={course.id} style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "2px 2px 10px #eee" }}>
                        
                        <h3>{course.title}</h3>
                        <p style={{color: "#555"}}>{course.description}</p>
                        
                        {/* KÖP KNAPPEN */}
                        <button 
                            // OBS: Nu skickar vi med ID (course.id) istället för namn!
                            onClick={() => handleBuyCourse(course.id)}
                            style={{
                                backgroundColor: "#6bee94", // Klarna-rosa
                                border: "none", padding: "10px 20px", borderRadius: "6px",
                                fontWeight: "bold", cursor: "pointer", width: "100%"
                            }}
                        >
                            Registrera Kurs
                        </button>

                    </div>
                ))}

            </div>
        </div>

      </div>

      {/* --- POPUPS --- */}
      {processingPayment && (
          <div style={popupStyle}>
              <div style={{fontSize: "30px"}}>⏳</div>
              <h3>Kontaktar Klarna...</h3>
              <p>Vad god vänta tills vi behandlar din betalning !!...</p>
          </div>
      )}

      {paymentSuccess && (
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