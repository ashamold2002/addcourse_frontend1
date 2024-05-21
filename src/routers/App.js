import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddCourseView } from "../view/Course/AddCourseView";
import { CourseContent } from "../view/Course/CourseContentView";
import Topics from "../view/Course/Topics";
import SavedTopics from "../Component/Course/SavedTopics";
function App() {
return (
    <BrowserRouter>
      <Routes>
        <Route path="/addcourse" element={<AddCourseView/>} />
        <Route path="/coursecontent" element={<CourseContent/>} />
        <Route path="/addtopic/:id" element={<Topics/>} />
        <Route path="/savedtopics/:topicId" element={<SavedTopics/>} />

        
      </Routes>
    </BrowserRouter>
  );
}
export default App;
