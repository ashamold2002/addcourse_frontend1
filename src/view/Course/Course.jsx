import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createCourse } from "../../middleware/Course/AddCourse";
import { GiCancel } from "react-icons/gi";
import "../../style/AddCourse.css";
import { Header } from "../../Component/Header";
import { Sidenavbar } from "../../Component/SideNavbar";
import axios from "axios";

export const Course = () => {
  const [coursecategory, setCategory] = useState([]);
  const [courselevel, setLevel] = useState([]);
  const [course, setCourse] = useState({
    title: "",
    category: "",
    level: "",
    duration: "",
    description: "",
    Thumbnailimage: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get("http://localhost:5199/lxp/course/category");
        setCategory(categoryResponse.data.data);
        console.log(categoryResponse.data);

        const levelResponse = await axios.get("http://localhost:5199/lxp/course/courselevel/ash");
        setLevel(levelResponse.data.data);
        console.log(levelResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(course);
    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append("title", course.title);
    formData.append("category", course.category);
    formData.append("level", course.level);
    formData.append("duration", Number.parseInt(course.duration));
    formData.append("description", course.description);
    
    // Check if the Thumbnailimage is not null
    if (course.Thumbnailimage) {
      formData.append("Thumbnailimage", course.Thumbnailimage);
    }
    
    // Log formData for debugging
   

    // Dispatch the createCourse action with formData
    dispatch(createCourse(formData));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
  };

  const handleThumbnailChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setCourse((prevCourse) => ({ ...prevCourse, Thumbnailimage: event.target.files[0] }));
    }
  };

  const removeThumbnail = () => {
    setCourse((prevCourse) => ({ ...prevCourse, Thumbnailimage: null }));
  };

  return (
    <>
      <Row>
        <Col><Header /></Col>
        <Col>
          <Sidenavbar />
          <h2>Course Creation</h2>
          <hr />
          <Card className="course-form">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <div className="addcourse">
                  {/* Course Title */}
                  <Row>
                    <label>
                      Course Title:
                      <input
                        type="text"
                        name="title"
                        placeholder="Course title"
                        value={course.title}
                        onChange={handleInputChange}
                      />
                    </label>
                  </Row>
                  {/* Course Category */}
                  <Row>
                    <label>
                      Course Category:
                      <select name="category" onChange={handleInputChange}>
                        <option value="">Select category</option>
                        {coursecategory.map((category) => (
                          <option key={category.catagoryId} value={category.catagoryId}>
                            {category.category}
                          </option>
                        ))}
                      </select>
                    </label>
                  </Row>
                  {/* Course Level */}
                  <Row>
                    <label>
                      Course Level:
                      <select name="level" onChange={handleInputChange}>
                        <option value="">Select level</option>
                        {courselevel.map((level) => (
                          <option key={level.levelId} value={level.levelId}>
                            {level.level}
                          </option>
                        ))}
                      </select>
                    </label>
                  </Row>
                  {/* Course Duration */}
                  <Row>
                    <label>
                      Course Duration (in Hrs):
                      <input
                        type="number"
                        min="0"
                        placeholder="Enter no. of hours"
                        name="duration"
                        value={course.duration}
                        onChange={handleInputChange}
                      />
                    </label>
                  </Row>
                  {/* Course Description */}
                  <Row>
                    <label>
                      Course Description:
                      <textarea
                        placeholder="Enter your description"
                        name="description"
                        value={course.description}
                        onChange={handleInputChange}
                      ></textarea>
                    </label>
                  </Row>
                  {/* Course Thumbnail */}
                  <Row>
                    <label htmlFor="thumbnail">Course Thumbnail:</label>
                    <div className="course-thumbnail">
                      <input
                        type="file"
                        id="Thumbnailimage"
                        onChange={handleThumbnailChange}
                        accept="image/*"
                      />
                      {course.Thumbnailimage && (
                        <div className="uploaded-file">
                          <img
                            src={URL.createObjectURL(course.Thumbnailimage)}
                            alt="uploaded thumbnail"
                            className="thumbnail-image"
                          />
                          <GiCancel
                            onClick={removeThumbnail}
                            className="cancel-icon"
                          />
                        </div>
                      )}
                    </div>
                  </Row>
                  {/* Submit Button */}
                  <Row>
                    <input type="submit" value="CREATE COURSE" />
                  </Row>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
