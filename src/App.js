 import React, { useState, useEffect } from 'react';

function App() {
  // --- 1. Vi skapar två "lådor" (State) ---
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]); // Ny låda för kurser!

const [processingPayment, setProcessingPayment] = useState(false);
const [paymentSuccess, setPaymentSuccess] = useState(false);


  // --- 2. Hämta data när sidan startar ---
  useEffect(() => {
    // A) Hämta Studenter
    fetch('https://localhost:7005/api/students')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(err => console.error("Fel vid hämtning av studenter:", err));


    // B) Hämta Kurser 
    fetch('https://localhost:7005/api/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(err => console.error("Fel vid hämtning av kurser:", err));
  }, []);

  // Funktion för att hantera köp av kurs
const handleBuyCourse = (courseName) => {
    // 1. Starta "Klarna"-processen
    setProcessingPayment(true);
    setPaymentSuccess(false);
    
    console.log(`Startar köp av ${courseName} via Klarna...`);

    // 2. Vänta 2 sekunder (fejka laddning)
    setTimeout(() => {
        // Här skulle vi egentligen anropat din Backend för att spara i databasen
        
        // 3. Visa att det är klart
        setProcessingPayment(false);
        setPaymentSuccess(true);

        // 4. Ta bort den gröna rutan efter 3 sekunder
        setTimeout(() => setPaymentSuccess(false), 3000);
    }, 2000);
}


const popupStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "40px",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
    borderRadius: "10px",
    textAlign: "center",
    zIndex: 1000,
    border: "2px solid #FFB3C7" // Klarna-rosa kant
};


const handleDeleteStudent = (id) => {
    if (window.confirm("Är du säker på att du vill ta bort denna student?")) {
        fetch(`https://localhost:7005/api/students/${id}`, { // Kolla att portnumret (7005) stämmer med din backend!
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                // Ta bort studenten från listan på skärmen direkt (så slipper vi ladda om)
                setStudents(students.filter(student => student.id !== id));
            } else {
                alert("Gick inte att ta bort.");
            }
        })
        .catch(error => console.error("Fel:", error));
    }
};


  // --- 3. Visa allt på skärmen ---
  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "1400px", margin: "0 auto" }}>
      
      <h1 style={{ textAlign: "center", color: "#333" }}>Min Skola Dashboard</h1>

      <div style={{ display: "flex", gap: "50px", marginTop: "30px" }}>
        
        {/* Vänster kolumn: Studenter */}
        <div style={{ flex: 1 }}>
          <h2 style={{ color: "blue" }}>Studenter 🎓</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {students.map(student => (
              <li key={student.id} style={{ background: "#f0f8ff", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
                <strong>{student.firstName} {student.lastName}</strong>
              </li>
            ))}
          </ul>
        </div>


{courses.map(course => (
    <li key={course.id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}>
        
        <h3>{course.title}</h3> {/* Eller vad din titel heter */}
        <p>{course.description}</p>
        
        {/* HÄR ÄR DEN NYA KNAPPEN */}
        <button 
            onClick={() => handleBuyCourse(course.title)}
            style={{
                backgroundColor: "#FFB3C7", // Klarna-rosa färg!
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "10px"
            }}
        >
            Köp med Klarna (Demo)
        </button>

    </li>
))}










        {/* Höger kolumn: Kurser */}
        <div style={{ flex: 1 }}>
          <h2 style={{ color: "green" }}>Kurser 📚</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {courses.map(course => (
              <li key={course.id} style={{ background: "#f0fff0", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
                <strong>{course.title}</strong>
                <br/>
                <span style={{fontSize: "0.9em", color: "#555"}}>{course.description}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>


{/* --- FAKE KLARNA POPUP --- */}
{processingPayment && (
    <div style={popupStyle}>
        <div style={{fontSize: "30px"}}>⏳</div>
        <h3>Kontaktar Klarna...</h3>
        <p>Var god vänta medan vi behandlar din betalning !!</p>
    </div>
)}

{paymentSuccess && (
    <div style={popupStyle}>
        <div style={{fontSize: "30px"}}>✅</div>
        <h3>Betalning Godkänd!</h3>
        <p>Tack för din beställning !!</p>
    </div>
)}



    </div>
  );
}

export default App;