import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTopicsRequest } from '../../action/Course/FetchTopicsAction';
import { useSelector } from 'react-redux';

// import '../../style/AddTopic.css'

import EditIcon from '@mui/icons-material/Edit';

import DeleteIcon from '@mui/icons-material/Delete';
//edit
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTopicsRequest } from '../../action/Course/AddTopicAction'
import { fetchEditTopicsRequest } from '../../action/Course/FetchEditTopicRequest'
import { updateTopicsRequest } from '../../action/Course/UpdateTopicsAction'
import { deleteTopicsRequest } from '../../action/Course/DeleteTopicsAction';
//import DialogContentText from '@mui/material/DialogContentText';
import { useParams ,useNavigate, Link} from 'react-router-dom';
//----------------------------------------------------------------------------------------------DELETE----------
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DialogContentText from '@mui/material/DialogContentText';

export default function SavedTopics(props) {
    // const topicsDetail=useSelector((state)=>state);
    const selectorTopicsDetail = useSelector((state) => state.fetchTopic.topics[0]);
    const [topicsDetail, setTopicsDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteId,setDeleteId] = useState("");
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    sessionStorage.setItem("userName", "karni");


    //Delete
    // const[topicId,setSelectedTopicId]=useState(null);

    //const [courseId, setCourseId] = useState("273a1881-adb6-498c-9c35-5ba7d4b0c64b");
    // const courseId={id};
    //Edit operation
    const [open, setOpen] = React.useState(false);
    // const [topics, setTopics] = useState({
    //     courseId:props.courseId??"273a1881-adb6-498c-9c35-5ba7d4b0c64b",
    //     topicName: "",
    //     topicDescription: "",
    //     // modifiedBy: sessionStorage.getItem("userName")

    // });
    //Edit topic to get that topicId
    const [updateTopic, setUpdateTopic] = useState({
        topicId: "",
        name: "",
        description: "",
        modifiedBy: sessionStorage.getItem("userName")

    })

    // console.log("Check the seleted topic list", topics);

    useEffect(() => {
        fetchTopics();
        setLoading(true);
        //     const response=fetchTopics();
        //   console.log(response)
        //     setTopicsDetails(selectorTopicsDetail)
        //         console.log(";t.,:",topicsDetail);
    }, []);


    const fetchTopics = async () => {
        try {
            await
             dispatch(fetchTopicsRequest(id));
            setLoading(false);
        }
        catch (error) {
            console.error('Error fetching topics:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectorTopicsDetail && Array.isArray(selectorTopicsDetail.topics)) {
            setTopicsDetails(selectorTopicsDetail.topics);
        }
        else {
            setTopicsDetails([]);
        }
    }, [selectorTopicsDetail]);

    //fetch topic details for edit and get using useSelector

    let  topicForEdit = useSelector((state) => state.fetchEditTopic.topics);
    // let topicForEdit= selectorTopicById;

    //Edit operation
    const handleEditClickOpen = (topicId) => {
        console.log("topicId", topicId);
        

    dispatch(fetchEditTopicsRequest(topicId))
    
        setOpen(true);

    };
    useEffect(()=>{
        setUpdateTopic({
            topicId: topicForEdit.topicId,
            name: topicForEdit.name,
            description: topicForEdit.description,
            modifiedBy: sessionStorage.getItem("userName")

        })
    },[topicForEdit])
   
    const handleClose = () => {
        setOpen(false);
        setUpdateTopic({
            topicId: "",
            name: "",
            description: "",
            modifiedBy: sessionStorage.getItem("userName")
    
        })
    };
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     dispatch(createTopicsRequest(topics))
    //     // navigate('/savedtopics')
    //     handleEditClose();
    // };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // const {name,description,isactive}=e.target;
        setUpdateTopic((updateTopic) => ({ ...updateTopic, [name]: value }));
    };
    //---------------------------------------------UPDATE-------------------------------------

    const handleUpdate = (event) => {
        event.preventDefault();
        console.log("lecec")
        // setTopicForEdit({...topicForEdit, modifiedBy: sessionStorage.getItem("userName")})
        dispatch(updateTopicsRequest(updateTopic))
        handleClose();
        dispatch(fetchTopicsRequest(id));
    }
    //----------------------------------------------------DELETE------------------------------------
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleDelete = (topicId) => {
        console.log("delete topic", topicId);
        dispatch(deleteTopicsRequest(topicId));
        handleDeleteClose();
        

    }
    
  const handleDeleteClickOpen = (topicId) => {
    setDeleteId(topicId)
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
    setDeleteId("");
    dispatch(fetchTopicsRequest(id));

  };
  //----------------------------------------------------------------------------------------------
//   const handleNavigate=(id)=>{
//     // id.preventDefault();
//       navigate(`/addcontent/${id}`)
//   }



    //----------------------------------------------------------------------------------------------
    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                topicsDetail.map((topic, index) => (
                    <Accordion key={index}>

                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index + 1}-content`}
                            id={`panel${index + 1}-header`}
                        ><div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <span>  {topic.topicName}</span>
                                <div>
                                    <EditIcon style={{ marginRight: 16 }} variant="outlined" onClick={() => handleEditClickOpen(topic.topicId)} />
                                    <DeleteIcon onClick={() => handleDeleteClickOpen(topic.topicId)} /></div></div>
                                    {/* <DeleteIcon onClick={() => handleDelete(topic.topicId)} /></div></div> */}

                        </AccordionSummary>

                        <AccordionDetails>
                           Description : {topic.topicDescription}
                           <Link to={`/addcontent/${topic.topicId}`}>Add Content</Link>
                            {/* <Button onClick={handleNavigate(topic.topicId)} >Add Content</Button> */}
                        </AccordionDetails>

                    </Accordion>



                ))
            )}
            {/* //-------------------------------------------UPDATE-------------------------------------- */}
            <Dialog
                open={open}
                onClose={handleClose}
            // PaperProps={{
            //     component: 'form',
            //     onSubmit: handleSubmit,
            // }}

            >
                <DialogTitle className='dialog-clr'>Edit Topics</DialogTitle>
                <DialogContent className='dialog-content'>

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Course Topic"
                        type="longtext"
                        fullWidth
                        variant="standard"
                        // value={topics.topicName}
                        value={updateTopic.name}
                        onChange={handleInputChange}
                    // onChange={(e) => setTopics({ ...topics, name: e.target.value })}
                    // style={{margin:'10px'}}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        name="description"
                        multiline
                        rows={4}
                        fullWidth
                        // value={topics.topicDescription}
                        value={updateTopic.description}
                        onChange={handleInputChange}

                        // onChange={(e) => setTopics({ ...topics,description: e.target.value })}
                        style={{ marginTop: '45px' }}

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
            {/* //---------------------------------------------------------DELETE----------------------------------------------------- */}

            <Dialog
                // fullScreen={fullScreen}
                open={openDelete}
                onClose={handleDeleteClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Confirm Deletion"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       Are you sure you want to delete the topics ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleDeleteClose}>
                        Cancel
                    </Button>
                <Button autoFocus onClick={()=> handleDelete(deleteId)}>
                        Delete
                    </Button>
                    {/* <Button autoFocus onClick={handleDeleteClose}>
                        Cancel
                    </Button> */}
                   
                </DialogActions>
            </Dialog>

            {/* //---------------------------------------------------ADD CONTENT------------------------------------------ */}


        </div>
    );
}



