import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddCourseView } from "../view/Course/AddCourseView";
import { CourseContent } from "../view/Course/CourseContentView";
import { AddTopicview } from "../view/Course/AddTopicview";
function App() {
return (
    <BrowserRouter>
      <Routes>
        <Route path="/addcourse" element={<AddCourseView/>} />
        <Route path="/coursecontent" element={<CourseContent/>} />
        <Route path="/addtopic/:id" element={<AddTopicview/>} />
        
      </Routes>
    </BrowserRouter>
  );
}
export default App;
