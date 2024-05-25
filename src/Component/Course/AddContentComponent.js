import React from 'react'
import { CloseButton, Form ,Button,Col,Row, Container} from 'react-bootstrap'
import { Alert } from "@mui/material";
import { Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import { useCallback } from 'react';
import { useDropzone } from "react-dropzone";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { fetchMaterialTypeRequest } from '../../action/Course/FetchMaterialTypeAction';
import { fetchContentRequest } from '../../action/Course/FetchContentAction';
import { createContentRequest } from '../../action/Course/AddContentAction';
import {validateContentForm} from "../../utils/AddContentValidation";
import { setVideoDuration } from '../../action/Course/VideoDuration';
import { useRef } from 'react';
function AddContentComponent() {
  // const { topicId,materialTypeId } = props
  sessionStorage.setItem("userName","Mano");
  const { MaterialTypeId } = {  "MaterialTypeId": "02950b1f-6bf6-4463-896e-e5319da2fd6f" }
  const [materialType, setMaterialType] = useState(MaterialTypeId);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = React.useState(false);
 const {id}=useParams();
  const [material, setMaterial] = useState({
    topicId:id,
    materialTypeId:materialType,
    name:"",
    material:null,
    createdBy:sessionStorage.getItem("userName"),
    duration:0

   
  });
 
  const materialTypeMap = {};

  const [selectedImage, setSelectedImage] = useState(null);
  // const {courseId}
  const dispatch = useDispatch();
  const VideoDuration=useSelector((state)=>state.VideoDuration)
  const videoRef=useRef();
  const selectorMaterialType = useSelector((state) => state.fetchMaterialType.materialtype);
  const selectorContent = useSelector((state) => state.fetchContent.content)
  console.log("material", selectorMaterialType);
  useEffect(() => {
    dispatch(fetchMaterialTypeRequest());
    // console.log(TopicId)
    // console.log(MaterialTypeId)
    console.log("ddd",material)
   
  }, []);
  useEffect(() => {
    fetchContentByType(id, materialType)
    setMaterial({...material,materialTypeId:materialType})

  }, [materialType])
  
  // useEffect=(()=>{
  //   console.log("topic"+topicId);
  //   console.log("materialType"+materialType);

  // });

  // useEffect(() => {
  // dispatch(fetchMaterialTypeRequest());


  // });
  const fetchContentByType = (id, materialTypeId) => {
    // console.log("tid" + topicId);
    // console.log("mtid" + materialTypeId);
    const formData = {
      "topicId": id,
      "materialTypeId": materialTypeId
    }
    console.log(formData);
    dispatch(fetchContentRequest(formData));
  }
  const isExist=useSelector((state)=>state.addContent.isExisted);
  const [existMsg,setExistMsg]=useState('');
  useEffect(()=>{
    if(isExist){
        setExistMsg('Material already exists');
        const timer = setTimeout(() => {
            setExistMsg('');
          }, 5000);

          return()=>clearTimeout(timer);
    }
  },[isExist])

  const addCategorySuccessState=useSelector((state)=>state.addContent.isSubmitted);
  
  const [successMsg,setSuccessMsg]=useState('')
  useEffect(()=>{
    if(addCategorySuccessState){
      
       setSuccessMsg('Material added successfully');
       
       const timer = setTimeout(() => {
        setSuccessMsg('');
      }, 7000);

      // Clear the timeout if the component unmounts
      return () => clearTimeout(timer);
      
       
       
    }
  },[addCategorySuccessState])


  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    setSelectedImage(fileUrl);
    handleMaterial({target:{files:[file]}});
  }, []);
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // const {name,description,isactive}=e.target;
    setMaterial((material) => ({ ... material, [name]: value }));
};

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "*/*",
   
  });
  const handleMaterial = (event) => {
    if (event.target.files && event.target.files[0]) {
      setMaterial((material) => ({
        ... material,
        material: event.target.files[0],
      }));
      const file = event.target.files[0];
      console.log(file)
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const handleMaterialType = (event) => {
    setMaterialType(event.target.value);
console.log("eventdisplay",event.target.innerText);
  }

  const removethumbnail=()=>{
    setSelectedImage(null);
  }
  

  const handleSubmit=(event)=>{
    event.preventDefault();
    selectorMaterialType.forEach((item) => {
      materialTypeMap[item.materialTypeId] = item.type;
    });
    console.log(materialTypeMap);
    const selectedLabel = materialTypeMap[materialType];
    console.log(selectedLabel);
    if(selectedLabel==='VIDEO'){
      
    }
    const isFormValid = validateContentForm(material, setErrors,selectedLabel);
    
      if (isFormValid) {
        try {
          dispatch(createContentRequest(material));
        } catch (error) {
          console.error('Error creating course:', error);
        }
      }
    console.log("material",material);
    
    // console.log("createcontentrequest",dispatch(createContentRequest(material)));
    
  }
  const divStyle = {
    boxShadow: '0px 4px 8px #23275c', // Replace #yourShadowColor with your color
  };

  return (
    <>
      {/* <section className='w-25' >
        

      </section> */}
      <Container style={divStyle}>
      <Row>
        <Col></Col>
        <Col>
        {!open && successMsg && (
        <Alert  severity="success" className="mt-3">
          {successMsg}
        </Alert>)}
        {!open && existMsg && (
        <Alert severity="warning" className="mt-3">
          {existMsg}
        </Alert>
      )}
      
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>

      <section className='pt-5' >
        <Form onSubmit={handleSubmit}>
        <Form.Select aria-label="Default select example" value={materialType} onChange={(e) => handleMaterialType(e)}>
        <option>Select Material Type</option>

{selectorMaterialType.map((materialType) => (

  <option value={materialType.materialTypeId}>{materialType.type}</option>

))}
</Form.Select>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            {/* <Form.Label>Content Name</Form.Label> */}
            <Form.Control type="text" placeholder="Content Name" 
            name="name"
           
            value={material.name}
            onChange={handleInputChange}/>
          </Form.Group>
          {errors.name && <p className="error">{errors.name}</p>}

          <Form.Group>
            <Form.Label>Content Upload</Form.Label>
            {/* <Form.Control
            type="file"
            onChange={handleThumbnailChange}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          /> */}
            <Card {...getRootProps()} className="dropzone">
              <Card.Body className="text-center">
                <input {...getInputProps()} type='file' />
                {selectedImage ? (
                  <Card>
                    <CloseButton className='position-absolute top-0 end-0' style={{color:'red'}} onClick={removethumbnail} aria-label="remove file"/>
                    <img src={selectedImage} alt="Course Material" className="img-thumbnail" />
                  </Card>
                  
                ) : (
                  <p>{isDragActive ? " Drag & Drop the Material here ..." : "click to select Material"}</p>
                )}
              </Card.Body>
              {/* <Card.Footer></Card.Footer> */}
            </Card>
            <div className='bg-light mt-1'>
              {}
            </div>
            {/* {errors.thumbnailimage && <p className="error">{errors.thumbnailimage}</p>} */}
          </Form.Group>
          {errors.material && <p className="error">{errors.material}</p>}

          <Button className="mt-3" style={{paddingLeft:'25px',paddingRight:'25px'}} type="submit">Add Material</Button>
        </Form>

      </section>
      <section className='pt-5'>

        <ListGroup  className='overflow-auto'>
          {/* {selectorContent == undefined ? <>Loading...</> : selectorContent.map((content) => (
            <>
              <ListGroup.Item>
                <div>
                  <div class="row">
                    <div class="col">
                      
                    </div>
                    <div class="col-8">
                      <h4>{content.name}</h4>
                      <h6>{content.topicName}</h6>
                    </div>
                    <div class="col">
                      <button className='ms-1 '><FaRegEdit /></button>
                      <button className='ms-1 ' ><MdOutlineDelete /></button>
                    </div>
                  </div>
                </div>

              </ListGroup.Item>

            </>
          ))} */}
        </ListGroup>
      </section>
      </Col>
        <Col md={3}></Col>
      </Row>
      </Container>


    </>
  )
}

export default AddContentComponent

