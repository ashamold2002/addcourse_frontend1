import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Course } from "../view/Course/Course";
function App() {
return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Course />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
