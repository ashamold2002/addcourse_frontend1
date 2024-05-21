import React from 'react'
import { Row,Col,Container } from 'react-bootstrap'
import { Header } from '../../Component/Header'
import { Sidenavbar } from '../../Component/SideNavbar'
import AddContentComponent from '../../Component/Course/AddContentComponent'
import FetchContentComponent from '../../Component/Course/FetchContentComponent'
function AddMaterial() {

  return (
    <Container fluid>
        
    <Row>
      <Col md={12}><Header/></Col>
      <Row>
      
      <Col xs={2} md={2}><Sidenavbar/></Col>

      <Col xs={10} md={10} className='pt-4' >
      <AddContentComponent />
      <FetchContentComponent/>
      </Col>

      </Row>
      
      

    </Row>

    </Container>

  )
}

export default AddMaterial
