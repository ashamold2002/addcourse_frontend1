import React, { useState, useEffect } from 'react';
import '../../style/AddCourse.css';
import { Container, Row, Col, Card, Form, Modal, Button } from 'react-bootstrap';
import { useDispatch, connect,useSelector } from 'react-redux';
import { createCoursesRequest,createCoursesSuccess } from '../../action/Course/AddCourseAction'; // Assuming this is your action creator
import { addCourse } from '../../middleware/Course/AddCourse';
import { GiCancel } from 'react-icons/gi';
import axios from 'axios';
import { Sidenavbar } from '../../Component/SideNavbar';
import { Header } from '../../Component/Header';
import { useNavigate } from 'react-router-dom';
 


const Course = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const [coursecategory, setCategory] = useState([]);
    const [courselevel, setLevel] = useState([]);
    const [course, setCourse] = useState({
        title: '',
        level: '',
        catagory: '',
        description: '',
        duration: '',
        thumbnailimage: null,
    });
    const isSubmitted = useSelector((state) => state.course.isSubmitted);
    
    

  useEffect(() => {
    if (isSubmitted) {
      navigate('/addtopic'); // Navigate to the next page on success
    }
  }, [isSubmitted, navigate]);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
const categoryResponse = await axios.get('http://localhost:5199/lxp/course/category');
                setCategory(categoryResponse.data.data);
const levelResponse = await axios.get('http://localhost:5199/lxp/course/courselevel/ash');
                setLevel(levelResponse.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    
 
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log("form",course);
           dispatch(createCoursesRequest(course));
            

           } catch (error) {
            console.error('Error creating course:', error);
        }
    };
 
    const handleInputChange = (e) => {
       setCourse({ ...course, [e.target.name]: e.target.value });
    };
 
    const handleThumbnailChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setCourse((prevCourse) => ({ ...prevCourse, thumbnailimage: event.target.files[0] }));
        }
    };
 
    const removeThumbnail = () => {
        setCourse((prevCourse) => ({ ...prevCourse, thumbnailimage: null }));
    };
 
    const [show, setShow] = useState(false);
 
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
                    <Col>
                    <label>
                      Course Category:
                      <select name="catagory" onChange={handleInputChange}>
                        <option value="">Select category</option>
                        {coursecategory.map((category) => (
                          <option key={category.catagoryId} value={category.catagoryId}>
                            {category.category}
                          </option>
                        ))}
                         
                      </select>
                    </label>
                    </Col>
                   
                    <Col>
                    <Button onClick={() => setShow(true)}>+ Add Category</Button>
                    </Col>
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
                        id="thumbnailimage"
                        onChange={handleThumbnailChange}
                        accept="image/*"
                      />
                      {course.thumbnailimage && (
                        <div className="uploaded-file">
                          <img
                            src={URL.createObjectURL(course.thumbnailimage)}
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
 
// const mapStateToProps = (state) => ({
// courses: state.course.courses,
// });
 
// const mapDispatchToProps = (dispatch) => ({
//     createCourses: () => dispatch(createCoursesRequest()), // Assuming this is your create courses action
// });
 
// export default connect(mapStateToProps, mapDispatchToProps)(Course);
export default Course;
