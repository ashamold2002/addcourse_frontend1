import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTopicsRequest } from '../../action/Course/AddTopicAction'
import { fetchTopicsRequest } from '../../action/Course/FetchTopicsAction';

import '../../style/AddTopic.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';

export default function AddTopic(props) {
  //remove for integration
  sessionStorage.setItem("userName","Mano");
  //end
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const {id}=useParams();
  //const [courseId,setCourseId]=useState(props.courseId??"273a1881-adb6-498c-9c35-5ba7d4b0c64b")
  // const Id=id;
  //console.log("topic inside courseId",Id);

  const [open, setOpen] = React.useState(false);
  const [topics, setTopics] = useState({

    courseId:id,
    name: "",
    description: "",
    createdBy:"Mano"
   
  });
  //const[topics,setTopics]=useState([]);

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("createdispatch",topics);
    dispatch(createTopicsRequest(topics))
    // setTopics({
    //   courseId:Id,
    //   name: "",
    //   description: "",
    //   createdBy:sessionStorage.getItem("userName")
     
    // });

    

   // navigate('/savedtopics')
    handleClose();
    //dispatch(fetchTopicsRequest(Id));
  

  };

  const handleInputChange=(e)=>{
    const { name, value } = e.target;
    // const {name,description,isactive}=e.target;
    setTopics({...topics,[name]:value });
  }
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Topic
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle className='dialog-clr'>Add Topics</DialogTitle>
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
            value={topics.name}
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
            value={topics.description}
            onChange={handleInputChange}

            // onChange={(e) => setTopics({ ...topics,description: e.target.value })}
            style={{ marginTop: '45px' }}

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" >Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
