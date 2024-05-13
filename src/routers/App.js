import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Course from "../view/Course/Course";
import { AddTopic } from "../view/Course/AddTopic";
function App() {
return (
    <BrowserRouter>
      <Routes>
        <Route path="/course" element={<Course/>} />
        <Route path="/addtopic" element={<AddTopic/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
