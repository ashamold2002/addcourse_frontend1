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
import { validateForm } from '../../utils/AddCourseValidation';
 


const Course = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const [coursecategory, setCategory] = useState([]);
    const [courselevel, setLevel] = useState([]);
    const [show, setShow] = useState(false);
    
    
    const [errors, setErrors] = useState({});
    const [course, setCourse] = useState({
        title: '',
        level: '',
        catagory: '',
        description: '',
        createdby:'Asha',
        duration: '',
        thumbnailimage: null,
    });
    const isSubmitted = useSelector((state) => state.course.isSubmitted);
    
    

  useEffect(() => {
    if (isSubmitted) {
      navigate('/coursecontent'); // Navigate to the next page on success
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
    
 
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
        
    //     try {
    //         console.log("form",course);
    //        dispatch(createCoursesRequest(course));
            

    //        } catch (error) {
    //         console.error('Error creating course:', error);
    //     }
    // };
    const handleSubmit = async (event) => {
      event.preventDefault();
      const isFormValid = validateForm(course, setErrors);
    
      if (isFormValid) {
        try {
          console.log("form", course);
          dispatch(createCoursesRequest(course));
        } catch (error) {
          console.error('Error creating course:', error);
        }
      }
    };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
 
    const handleInputChange = (e) => {
      const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
      //  setCourse({ ...course, [e.target.name]: e.target.value });
      if (name === "catagory" && value === "Add category") {
        // Show modal for adding a new category
        handleShow();
    }
    };
    
 
    const handleThumbnailChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setCourse((prevCourse) => ({ ...prevCourse, thumbnailimage: event.target.files[0] }));
        }
    };
 
    const removeThumbnail = () => {
        setCourse((prevCourse) => ({ ...prevCourse, thumbnailimage: null }));
    };
 
    
 
    return (
      <>
      <Row>
        <Col md={12} ><Header /></Col>
        <Col md={12}>
          <Sidenavbar />
          <Container className='courseForm mt-5'>
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
                    {errors.title && <p className="error">{errors.title}</p>}
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
                        <option value="Add category">+ Add Category</option>
                         
                      </select>
                    </label>
                    {errors.catagory && <p className="error">{errors.catagory}</p>}
                    </Col>
                   
                    {/* <Col>
                    <Button onClick={() => setShow(true)}>+ Add Category</Button>
                    </Col> */}
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
                    {errors.level && <p className="error">{errors.level}</p>}
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
                    {errors.duration && <p className="error">{errors.duration}</p>}
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
                    {errors.description && <p className="error">{errors.description}</p>}
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
                    {errors.thumbnailimage && <p className="error">{errors.thumbnailimage}</p>}
                  </Row>
                  {/* Submit Button */}
                  <Row>
                    <input type="submit" value="CREATE COURSE" />
                  </Row>
                </div>
              </Form>
              
            </Card.Body>
          </Card>
          </Container>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}  centered>
              <Modal.Header closeButton>
                <Modal.Title>Add Category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  type="text"
                  placeholder="Enter new category"
                  value={course.catagory}
                  onChange={handleInputChange}
                  name="category"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
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
