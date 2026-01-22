 // src/courseService.js
const API_URL = "https://localhost:7005/api/courses";

export const getAllCourses = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
        console.log("Inget svar från servern.");
        return [];
    }
    return await response.json();
  } catch (error) {
    console.error("Kunde inte hämta data:", error);
    return [];
  }
};