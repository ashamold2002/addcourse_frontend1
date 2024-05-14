import React, { useEffect, useState } from 'react'
import { FaBars, FaBookOpenReader } from "react-icons/fa6";
import { FaSearch, FaUserGraduate, FaHome, FaChartBar } from "react-icons/fa";
//import Draggable from 'react-draggable';
import { FaPlus, FaBell, FaUser, FaChevronUp } from 'react-icons/fa';
import { FaPlay, FaVideo, FaMusic, FaFilePdf, FaFilePowerpoint, FaFileAlt, FaEdit, FaTrash } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import Modal from 'react-modal';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { CiYoutube } from "react-icons/ci";
import { IoIosWarning } from "react-icons/io";
import '../../style/AddTopic.css';
import { BsFiletypePdf, BsFiletypePpt } from "react-icons/bs";
import { CiMusicNote1 } from "react-icons/ci";
import { useSelector, useDispatch } from 'react-redux';
import courseReducer from '../../reducer/Course/AddCourseReducer';
//import { setCourseDetail, addTopic, toggleModal } from '../reducer/courseReducer';
import { validateCourseTopic } from '../../utils/AddTopicalidation';

const AddTopic = () => {
    const [showSideNav, setShowSideNav] = useState(false);
    const [activePage, setActivePage] = useState('home');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [courseTitle,setTitle]=useState('');
    const courseDetail=useSelector((state)=>state.addtopic.courses);
    console.log("courseTopic",courseDetail);
    
    const [showReportDropdown, setShowReportDropdown] = useState(false);
    const handlePageChange = (page) => {
        setActivePage(page);
        if (!showSideNav) {
            setShowSideNav(true);
        }
        if (page === 'reports') {
            setShowReportDropdown(!showReportDropdown);
        }
        if (showReportDropdown) setShowReportDropdown(!showReportDropdown);
    };
    const handleChange = e => {
        const { name, value } = e.target;
        setCourse({
            ...course,
            [name]: value,
        });
        setSearchTerm(e.target.value);
    };
    const toggleSideNav = () => {
        setShowSideNav(!showSideNav);
    }; const [course, setCourse] = useState({
        title: '',
        category: '',
        level: '',
        duration: '',
        description: '',
        thumbnail: null,
        courseTopic: '',
        contentCovered: '',
    });


    const toggleDetails = (index) => {
        setTopics(topics.map((topic, i) => {
            if (i === index) {
                return { ...topic, isExpanded: !topic.isExpanded };
            }
            return topic;
        }));
    };
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
    const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 });
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
    const isPortrait = useMediaQuery({ orientation: 'portrait' });
    const isRetina = useMediaQuery({ minResolution: '2dppx' });

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpens, setModalIsOpens] = useState(false);
    const [modalIsOpenss, setModalIsOpenss] = useState(false);
    const [modalIsOpensss, setModalIsOpensss] = useState(false);
    // Function to open the modal
    // const openModal = () => {
    //     setModalIsOpen(true);
    // };
    const openModal = () => {
        setModalIsOpen(true);
    
        // Reset the course state
        setCourse({
            title: '',
            category: '',
            level: '',
            duration: '',
            description: '',
            thumbnail: null,
            courseTopic: '',
            contentCovered: '',
        });  setError('');
    };
    
    const openModals = () => {
        setModalIsOpens(true);
    };
    // const openModalss = () => {
    //     setModalIsOpenss(true);
    // };
    // const openModalsss = () => {
    //     setModalIsOpensss(true);
    // };

    // Function to close the modal
    // const closeModal = () => {
    //     setModalIsOpen(false);
    // };
    const closeModal = () => {
        setModalIsOpen(false);
    
        // Reset the course state
        setCourse({
            title: '',
            category: '',
            level: '',
            duration: '',
            description: '',
            thumbnail: null,
            courseTopic: '',
            contentCovered: '',
        });
    };
    
    const closeModals = () => {
        setModalIsOpens(false);
    };
    const closeModalss = () => {
        setModalIsOpenss(false);
    };
    const closeModalsss = () => {
        setModalIsOpensss(false);
    };




    const [topics, setTopics] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const error = validateCourseTopic(topics, course);
        setError(error);
        const topicExists = topics.some(topic => topic.courseTopic.toLowerCase() === course.courseTopic.toLowerCase());

    if (topicExists) {
        setError('Topic already exists. Please try with another topic.');
    } else {
        // Proceed with adding the topic if it doesn't exist
        setTopics([...topics, {
            courseTopic: course.courseTopic,
            contentCovered: course.contentCovered,
            isExpanded: true
        }]);

        // Reset the course form
        setCourse({
            title: '',
            category: '',
            level: '',
            duration: '',
            description: '',
            thumbnail: null,
            courseTopic: '',
            contentCovered: '',
        });

        closeModal();
    }

        if (!error) {
            setTopics([...topics, {
                courseTopic: course.courseTopic,
                contentCovered: course.contentCovered,
                isExpanded: true
            }]);

            setCourse({
                title: '',
                category: '',
                level: '',
                duration: '',
                description: '',
                thumbnail: null,
                courseTopic: '',
                contentCovered: '',
            });

            closeModal();
        }
    };
    const [deleteIndex, setDeleteIndex] = useState(null);

    const handleDelete = (index) => {
        const newTopics = [...topics];
        newTopics.splice(index, 1);
        setTopics(newTopics);
        closeModalss();
    };

    const openModalss = (index) => {
        setModalIsOpenss(true);
        setDeleteIndex(index);
    };
    // const [editIndex, setEditIndex] = useState(null);

    // const handleUpdate = (event) => {
    //     event.preventDefault();
    //     const newTopics = [...topics];
    //     newTopics[editIndex] = course;
    //     setTopics(newTopics);
    //     closeModalsss();
    // };

    // const openModalsss = (index) => {
    //     setModalIsOpensss(true);
    //     setEditIndex(index);
    //     setCourse(topics[index]); // Load the current topic data into the form
    // };
    const [editIndex, setEditIndex] = useState(null);

    const handleChanges = (event) => {
        setCourse({
            ...course,
            [event.target.name]: event.target.value
        });
    };

    // const handleUpdate = (event) => {
    //     event.preventDefault();
    //     const newTopics = [...topics];
    //     newTopics[editIndex] = course;
    //     setTopics(newTopics);
    //     closeModalsss();
    // };
    const handleUpdate = (event) => {
        event.preventDefault();
    
        // Check if the course topic already exists
        const topicExists = topics.some(topic => topic.courseTopic.toLowerCase() === course.courseTopic.toLowerCase());
    
        if (topicExists) {
            setError('Topic name already exists. Please try with another topic.');
        } else {
            // Proceed with updating the topic if it doesn't exist
            const newTopics = [...topics];
            newTopics[editIndex] = course;
            setTopics(newTopics);
            closeModalsss();
        }
    };
    
    const openModalsss = (index) => {
        setModalIsOpensss(true);
        setEditIndex(index);
        setCourse(topics[index]); // Load the current topic data into the form
    };
    


    return (
        
            


            <div className="course-creation-page" style={{ display: 'grid', width: '100%', height: '100vh', width: isDesktopOrLaptop ? '100%' : '100vw', width: isBigScreen ? '100%' : '100vw', width: isTabletOrMobile ? '100%' : '100vw', width: isPortrait ? '100%' : '100vw', width: isRetina ? '100%' : '100vw' }}>

                <div className="container" style={{ marginTop: '50px', width: '1054px', height: '1005px' }}>
                    {/* Rest of your code */}     <div className="form-container" style={{ width: '1010px' }} >
                        <div className="course-creation-form" style={{ width: '900px' }}>
                            <div className="content" style={{ width: '1010px' }}>
                                <main className="main-content">
                                    <h1 style={{ paddingRight: '500px' }}>{courseDetail.title}</h1><hr /><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h2>Topics</h2>
                                        <button className="add-topic-btn" style={{
                            backgroundColor: 'blue', width: '120px',
                            height: '32px',
                            top: '530px',
                            left: '856px',
                            gap: '0px',
                            borderradius: '4px 0px 0px 0px',
                            opacity: '0px'
                        }} onClick={openModal}><b>Add Topics</b></button>
                                    </div>
                                    <hr></hr>

                                    {topics.map((topic, index) => (
                                        <div className="course-section" key={index}>
                                            <div className="section-header">
                                                <h4 className="toggle-button" onClick={() => toggleDetails(index)} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>{topic.courseTopic}</span>
                                                    <span>{topic.isExpanded ? <FaChevronUp /> : <FaChevronDown />}</span>
                                                </h4>
                                            </div>
                                            {topic.isExpanded && (
                                                <div className="course-section">
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'self-start', marginTop: '10px' }}>
                                                        <p><b>Content Covered:</b>
                                                            <ul>
                                                                {topic.contentCovered.split(',').map((content, index) => (
                                                                    <li key={index}>{content}</li>
                                                                ))}
                                                            </ul>
                                                        </p>
                                                        <div className="icons">
                                                            <CiYoutube className="icon" style={{ color: 'blue', fontSize: '20px' }} />
                                                            <CiMusicNote1 className="icon" style={{ color: 'blue' }} />
                                                            <BsFiletypePdf className="icon" style={{ color: 'red' }} />
                                                            <BsFiletypePpt className="icon" style={{ color: 'red' }} />
                                                            <FaFileAlt className="icon" style={{ color: 'red' }} />
                                                            {/* <FaEdit className="icon" onClick={openModalsss} style={{ color: 'blue' }} /> */}
                                                            <FaEdit className="icon" onClick={() => openModalsss(index)} style={{ color: 'blue' }} />
                                                            {/* <FaTrash className="icon" onClick={openModalss} style={{ color: 'red' }} /> */}
                                                            <FaTrash className="icon" onClick={() => openModalss(index)} style={{ color: 'red' }} />

                                                        </div>
                                                    </div>
                                                    <p>No Content is available. Add content to display</p>
                                                    <a href='#' style={{ textDecoration: 'none', color: 'blue' }} onClick={openModals}>Add Content</a>
                                                </div>
                                            )}
                                            <hr />
                                        </div>
                                    ))}

                                </main></div></div></div>
                
{/* ----------------------------------add topic--------------------------------------------------- */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Add Topic"
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.75)'
                            
                           
                           
                           
                          
                            
                        },
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            width: '30%',
                            height: 'auto',
                            padding: '20px',
                            overflow: 'hidden'
                        }
                    }}
                >
                    {error && <div style={{
                    border: '1px solid #E01950',
                    backgroundColor: '#FFDBDB',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '5px'
                }}><p style={{ color: 'red' }}>{error}</p></div>}
                    <h2>Add Topic</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Course Topic:
                            <input type="text" name="courseTopic" value={course.courseTopic} required onChange={handleChange} style={{ width: '410px' }} />
                            {course.title === '' && <span className="warning"><h5 ><IoIosWarning style={{ fontSize: '20px', color: 'orange', marginRight: '7px' }} /> Make sure that topic does not already exist.</h5></span>}
                        </label><br></br>
                        <label>
                            Content Covered:
                            <input type="text" name="contentCovered" value={course.contentCovered} required onChange={handleChange} style={{ width: '410px' }} />
                        </label>
                        <button className="btn btn-danger btn-size" onClick={closeModal} style={{
                            backgroundColor: 'red', width: '120px',
                            height: '32px',
                            top: '530px',
                            left: '856px',
                            gap: '0px',
                            borderradius: '4px 0px 0px 0px',
                            opacity: '0px'
                        }}>Cancel</button>
                        <button className="btn btn-primary btn-size" type="submit" style={{
                            backgroundColor: 'blue', width: '120px',
                            height: '32px',
                            top: '530px',
                            left: '856px',
                            gap: '0px',
                            borderradius: '4px 0px 0px 0px',
                            opacity: '0px'
                        }}>Add</button>
                    </form>
                </Modal>
                {/* ---------------------------------add content------------------------------------------------------ */}
                <Modal
                    isOpen={modalIsOpens}
                    onRequestClose={closeModals}
                    contentLabel="Add Topic"
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.75)'
                        },
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            width: '35%',
                            height: 'auto',
                            padding: '20px',
                            overflow: 'hidden'
                        }
                    }}
                >
                    <h2>Choose Content Type</h2>

                    <div className="content-options">
                        <button className="content-btn" style={{
                            fontSize: '15px', width: ' 82px', backgroundColor: '#D9D9D9', color: 'black',
                            height: '91px',
                            top: '414px',
                            left: '465px',
                            gap: '0px',
                            borderradius: '4px 0px 0px 0px',
                            opacity: '0px'
                        }}><CiYoutube style={{ fontSize: '23px', color: 'blue' }} /> VIDEOS</button>
                        <button className="content-btn" style={{
                            fontSize: '15px', width: ' 82px', backgroundColor: '#D9D9D9', color: 'black',
                            height: '91px',
                            top: '414px',
                            left: '465px',
                            gap: '0px',
                            borderradius: '4px 0px 0px 0px',
                            opacity: '0px'
                        }}><CiMusicNote1 style={{ fontSize: '23px', color: 'blue' }} /> AUDIO</button>
                        <button className="content-btn" style={{
                            fontSize: '15px', width: ' 82px', backgroundColor: '#D9D9D9', color: 'black',
                            height: '91px',
                            top: '414px',
                            left: '465px',
                            gap: '0px',
                            borderradius: '4px 0px 0px 0px',
                            opacity: '0px'
                        }}><BsFiletypePdf style={{ fontSize: '23px', color: 'red' }} /> PDF</button>
                        <button className="content-btn" style={{
                            fontSize: '15px', width: ' 82px', backgroundColor: '#D9D9D9', color: 'black',
                            height: '91px',
                            top: '414px',
                            left: '465px',
                            gap: '0px',
                            borderradius: '4px 0px 0px 0px',
                            opacity: '0px'
                        }}><BsFiletypePpt style={{ fontSize: '23px', color: 'red' }} /> PPT</button>
                        <button className="content-btn" style={{
                            fontSize: '15px', width: ' 82px', backgroundColor: '#D9D9D9', color: 'black',
                            height: '91px',
                            top: '414px',
                            left: '465px',
                            gap: '0px',
                            borderradius: '4px 0px 0px 0px',
                            opacity: '0px'
                        }}><FaFileAlt style={{ fontSize: '23px', color: 'red' }} /> TEXT</button>
                    </div>

                </Modal>
                {/* ------------------------------------------------------------------------------------------*/}
                  {/* --------------------delete------------------------------------------ */}
                <Modal
                    isOpen={modalIsOpenss}
                    onRequestClose={closeModalss}
                    contentLabel="Add Topic"
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.75)'
                        },
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            width: '30%',
                            height: 'auto',
                            padding: '20px',
                            overflow: 'hidden'
                        }
                    }}
                >
                    {/* {error && <div style={{
                    border: '1px solid #E01950',
                    backgroundColor: '#FFDBDB',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '5px'
                }}></div>} */}
                    <h2><IoIosWarning style={{ color: 'red' }} />Confirm Deletion</h2>
                    <p>Are you certain that you intend to delete the
                        entire topic and its content ?</p>
                    {/* <form onSubmit={handleSubmit}>
                        <label>
                            Course Topic:
                            <input type="text" name="courseTopic" value={course.courseTopic} required onChange={handleChange} style={{ width: '410px' }} />
                            {course.title === '' && <span className="warning"><h5 ><IoIosWarning style={{ fontSize: '20px', color: 'orange', marginRight: '7px' }} /> Make sure that topic does not already exist.</h5></span>}
                        </label><br></br>
                        <label>
                            Content Covered:
                            <input type="text" name="contentCovered" value={course.contentCovered} required onChange={handleChange} style={{ width: '410px' }} />
                        </label>
                        <button className="btn btn-danger btn-size" onClick={closeModal}>Cancel</button>
                        <button className="btn btn-primary btn-size" type="submit" >Add</button>
                    </form> */}
                    <button className="btn btn-danger btn-size" style={{
                        width: '120px',
                        height: '32px',
                        top: '530px',
                        left: '856px',
                        gap: '0px',
                        borderradius: '4px 0px 0px 0px',
                        opacity: '0px'
                    }} onClick={() => handleDelete(deleteIndex)} >Delete</button>
                    <button className="btn btn-primary btn-size" type="submit" onClick={closeModalss} style={{
                        width: '120px',
                        height: '32px',
                        top: '530px',
                        left: '856px',
                        gap: '0px',
                        borderradius: '4px 0px 0px 0px',
                        opacity: '0px'
                    }}>Cancel</button>
                </Modal>
                {/* -- ---------------------------edit--------------------------------*/}
                <Modal
    isOpen={modalIsOpensss}
    onRequestClose={closeModalsss}
    contentLabel="Edit Topic"
    style={{
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            height: 'auto',
            padding: '20px',
            overflow: 'hidden'
        }
    }}
>
    {error && <div style={{
        border: '1px solid #E01950',
        backgroundColor: '#FFDBDB',
        color: '#E01950',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '10px'
    }}>
        <p>{error}</p>
    </div>}
                    <h2>Edit Topic</h2>
                    <form onSubmit={handleUpdate}>

                        <label>
                            Course Topic:
                            <input type="text" name="courseTopic" value={course.courseTopic} required onChange={handleChanges} style={{ width: '410px' }} />
                            
                            {/* <input type="text" name="courseTopic" value={course.courseTopic} required style={{ width: '410px' }} /> */}
                            {/* <input type="text" name="courseTopic" value={editingCourse.course.courseTopic} required onChange={(e) => setEditingCourse({ ...editingCourse, course: { ...editingCourse.course, courseTopic: e.target.value } })} style={{ width: '410px' }} /> */}
                            {course.title === '' && <span className="warning"><h5 ><IoIosWarning style={{ fontSize: '20px', color: 'orange', marginRight: '7px' }} /> Make sure that topic does not already exist.</h5></span>}
                        </label><br></br>
                        <label>
                            Content Covered:
                            <input type="text" name="contentCovered" value={course.contentCovered} required onChange={handleChanges} style={{ width: '410px' }} />
                            {/* <input type="text" name="contentCovered" value={course.contentCovered} required style={{ width: '410px' }} /> */}
                            {/* <input type="text" name="contentCovered" value={editingCourse.course.contentCovered} required onChange={(e) => setEditingCourse({ ...editingCourse, course: { ...editingCourse.course, contentCovered: e.target.value } })} style={{ width: '410px' }} /> */}
                        </label>
                        <button className="btn btn-danger btn-size" style={{
                            backgroundColor: 'blue', width: '120px',
                            height: '32px',
                            top: '530px',
                            left: '856px',
                            gap: '0px',
                            borderradius: '4px 0px 0px 0px',
                            opacity: '0px'
                        }}>Update</button>
                        <button className="btn btn-primary btn-size" type="submit" onClick={closeModalsss} style={{
                            backgroundColor: 'red', width: '120px',
                            height: '32px',
                            top: '530px',
                            left: '856px',
                            gap: '0px',
                            borderradius: '4px 0px 0px 0px',
                            opacity: '0px'
                        }} >Cancel</button>
                    </form>
                </Modal>
            </div>

            {/* ------------------------------------------------------------------------------------ */}


        </div>
    );
};
export default AddTopic;

