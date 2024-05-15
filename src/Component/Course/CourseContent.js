import React, { useState,useEffect } from "react";
//import './Relevantz.png'
// import { FaBars, FaBookOpenReader, FaDeleteLeft } from "react-icons/fa6";
// import { FaSearch, FaUserGraduate, FaHome, FaChartBar } from "react-icons/fa";
// import Draggable from "react-draggable";
// import { FaPlus, FaBell, FaUser, FaChevronUp } from "react-icons/fa";
import {
  FaPlay,
  FaVideo,
  FaMusic,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileAlt,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
// import { useMediaQuery } from "react-responsive";
// import Modal from "react-modal";
// import { connect } from "react-redux";
import '../../style/CourseContent.css';
import { RiDeleteBin5Line } from "react-icons/ri";
import {  useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { fetchCategoryRequest, fetchLevelRequest } from "../../action/Course/AddCourseAction";
import { fetchCourseTopic } from "../../action/Course/AddTopicAction";
import { Modal } from "react-bootstrap";
// import CourseCreationForm from "./Content_Page";
const Content = () => {
    //const [content,setContent]=useState([]);
    const dispatch=useDispatch();
    const course=useSelector((state)=>state.course.courses[0]);
    console.log("content",course);
    // useEffect(() => {
    //     setContent(course);
    //     // dispatch(fetchCategoryRequest());
    //     // dispatch(fetchLevelRequest());
    //     console.log("contenteffect",content);
    //     }
    //   , []);
    
  const [showPopup, setShowPopup] = useState(false);

  
  const [showModal, setShowModal] = useState(false);

  
  
const navigate=useNavigate();
const handleAddTopic=(e)=>{
  e.preventDefault(); // Prevent default form submission behavior
  sessionStorage.setItem("course",course.courseId)
   dispatch(fetchCourseTopic(course));
//     navigate('/addtopic')
    
}
const iscourse=useSelector((state)=>state.addtopic.isNavigate)

    // console.log("course_topic",courseDetail);
    useEffect(()=>{
        if(iscourse){
             
             navigate('/addtopic')
        }
    },[iscourse,navigate])
 

  const handleViewClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [isActive, setIsActive] = useState(true); // Initial state: active

  const handleToggle = () => {
    setIsActive(!isActive); // Toggle the state
  };

  return (
    <div className="dashboard">
      <div
        className="course-creation-page"
        style={{ display: "grid", width: "100%", height: "100vh" }}
      >
        <div
          className="container"
          style={{ width: "1054px", height: "640px" }}
        >
          {/* Rest of your code */}{" "}
          <div
            className="form-container"
            style={{ width: "1010px", height: "600px" }}
          >
            <div className="course-creation-form" style={{ width: "900px" }}>
              <div className="content" style={{ width: "1010px" }}>
                <main className="main-content" style={{ paddingRight: "80px" }}>
                  <h1 style={{ paddingRight: "410px" }}>
                   {course.title}
                  </h1>
                  <hr />
                  <div className="course-details">
                    <div
                      className="course-header"
                      style={{ marginLeft: "760px" }}
                    >
                      <FaEdit
                        className="edit-icon"
                        style={{
                          fontSize: "20px",
                          color: "blue",
                          marginRight: "20px",
                        }}
                      />
                      <RiDeleteBin5Line
                        className="edit-icon"
                        style={{ fontSize: "20px", color: "red" }}
                      />
                    </div>
                    <div className="course-info">
                      <p style={{ paddingRight: "280px" }}>
                        Course Category{" "}
                        <span
                          className="info-value"
                          style={{ paddingLeft: "150px" }}
                        >
                          : {course.catagory}
                        </span>
                      </p>
                      <p style={{ paddingRight: "280px" }}>
                        Course Level{" "}
                        <span
                          className="info-value"
                          style={{ paddingLeft: "179px" }}
                        >
                          : {course.level}
                        </span>
                      </p>
                      <p style={{ paddingRight: "290px" }}>
                        Course Duration{" "}
                        <span
                          className="info-value"
                          style={{ paddingLeft: "160px" }}
                        >
                          : {course.duration} Hrs
                        </span>
                      </p>
                    </div>
                    <div className="course-description">
                      <p style={{ paddingRight: "290px" }}>
                        Course Description
                        
                        <span style={{ paddingLeft: "139px" }}>
                          : {course.description}{" "}
                          {/* <span style={{ paddingLeft: "258px" }}>
                            hard or did not have time or money?{" "}
                          </span> */}
                        </span>
                        <button
                          className="btn"
                          style={{
                            width: "119px",
                            height: "33px",
                            color: "blue",
                            backgroundColor: "#D9D9D9",
                            marginLeft: "10px",
                            width: "121px",
                            height: "32px",
                            gap: "0px",
                            borderradius: "4px 0px 0px 0px",
                            opacity: " 1",
                          }}
                          onClick={() => setShowPopup(true)}
                        >
                          Show More
                        </button>
                        {showPopup && (
                          <div
                            style={{
                              position: "fixed",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              backgroundColor: "white",
                              padding: "20px",
                              zIndex: 1000,
                              width: "705px",
                            }}
                          >
                            <h1>Course Description</h1>
                            <hr />
                            <p>
                              {course.description}
                            </p>
                            <br />
                            <br />

                            <button
                              onClick={() => setShowPopup(false)}
                              style={{
                                backgroundColor: "red",
                                width: "121px",
                                height: "32px",
                                gap: "0px",
                                borderradius: "4px 0px 0px 0px",
                                opacity: " 1",
                                marginLeft: "530px",
                              }}
                            >
                              Close
                            </button>
                          </div>
                        )}
                        {showPopup && (
                          <div
                            style={{
                              position: "fixed",
                              top: 0,
                              bottom: 0,
                              left: 0,
                              right: 0,
                              backgroundColor: "rgba(0,0,0,0.3)",
                              zIndex: 999,
                            }}
                            onClick={() => setShowPopup(false)}
                          />
                        )}
                      </p>
                    </div>
                    
                    <div
                      className="course-thumbnail"
                      style={{ paddingRight: "210px" }}
                    >
                      Course Thumbail
                      <button
                        className="btn"
                        onClick={handleViewClick}
                        style={{
                          marginLeft: "160px",
                          backgroundColor: "#D9D9D9",
                          color: "blue",
                          width: "121px",
                          height: "32px",
                          gap: "0px",
                          borderradius: "4px 0px 0px 0px",
                          opacity: " 1",
                        }}
                      >
                        View
                      </button>
                      {showModal && (
                        <Modal show={showModal} onHide={handleCloseModal}  centered>
                        <Modal.Header closeButton></Modal.Header>
                          
                        
                        <Modal.Body>
                        <img src={course.thumbnail} alt="Course Thumbnail"></img>
                            {/* <button
                              className="close-btn"
                              onClick={handleCloseModal}
                            >
                              X
                            </button> */}
                        </Modal.Body>
                       
                      </Modal>
                        /* <div className="modal">
                          <div className="modal-content">
                            <img src={course.thumbnail} alt="Course Thumbnail"></img>
                            <button
                              className="close-btn"
                              onClick={handleCloseModal}
                            >
                              X
                            </button>
                          </div>
                        </div> */
                      )}
                    </div>
                    <br />
                    <br />
                    <div className="course-actions">
                      {/* <a
                        href="/addtopic"
                        style={{ textDecoration: "none", color: "white" }}
                      > */}
                        <button
                          className={`content-btn ${
                            isActive ? "active" : "inactive"
                          }`}
                          style={{
                            backgroundColor: "blue",
                            marginLeft: "585px",
                          }}
                        onClick={handleAddTopic}
                        >
                          Content
                        </button>
                      {/* </a> */}
                      <button
                        className={`inactive-btn ${
                          isActive ? "inactive" : "active"
                        }`}
                        onClick={handleToggle}
                        style={{ width: "123px" }}
                      >
                        {isActive ? "Make Inactive" : "Make Active"}
                      </button>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};
export default Content;
