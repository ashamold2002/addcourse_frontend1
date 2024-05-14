import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Course from "../view/Course/Course";
import { CourseContent} from "../view/Course/CourseContent";
import { AddTopicview } from "../view/Course/AddTopicview";
function App() {
return (
    <BrowserRouter>
      <Routes>
        <Route path="/course" element={<Course/>} />
        <Route path="/coursecontent" element={<CourseContent/>} />
        <Route path="/addtopic" element={<AddTopicview/>} />
        
      </Routes>
    </BrowserRouter>
  );
}
export default App;
