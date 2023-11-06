import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';






const Viewcontent = () => {
  const token = localStorage.getItem('token')
  let [contentstore, setcontentstore] = useState([])
  useEffect(() => {
    viewcontent();
  }, [])
  //  ===============  print   ==================================
  let viewcontent = () => {
    axios.get('http://localhost:5000/course/allcontent', {
      headers: {
        Authorization: token
      }
    })
      .then((resp) => {
        setcontentstore(resp.data.data)
      })
  }
  let [alerts, setalerts] = useState(false)
  // ====================  delete ================================
  let deletehandle = (_id) => {
    axios.delete(`http://localhost:5000/course/contentdelete/${_id}`, {
      headers: {
        Authorization: token
      }
    })
      .then((resp) => {
        console.log(resp);
        if (resp.data.status === 'Content Delete Successfully') {
          viewcontent();
          setalerts(true)
          setTimeout(() => {
            setalerts(false)

          }, 5000);

        }
      })
      .catch((err) => {
        alert(err)
      })
  }
  // ==================== update  ====================================
  let [duration, setduration] = useState();
  let [fees, setfees] = useState();
  let [content, setcontent] = useState()
  let updatehandle = (_id) => {

    axios.get(`http://localhost:5000/course/viewsinglecontent/${_id}`, {
      headers: {
        Authorization: token
      }
    })
      .then((resp) => {
        setfees(resp.data.data.total_fees)
        setcontent(resp.data.data.content)
        setduration(resp.data.data.duration)
        setid(resp.data.data._id)
      })
      .catch((err) => {
        alert(err)
        console.log(err);
      })
    setShow(true)
  }
  const [show, setShow] = useState(false);
  let [id, setid] = useState();
  let handleClose = () => {
    setShow(false)
    axios.put('http://localhost:5000/course/updatecontent', {
      content_id: id,
      content: content,
      duration: duration,
      total_fees: fees
    },
      {
        headers: {
          Authorization: token
        }
      })
      .then((resp) => {
        viewcontent()
      })
      .catch((err) => {
        alert(err)
      })

  }
  // ============= search ===============================
  let [search, setsearch] = useState();
  let searchhandle = (e) => {
    axios.get(`http://localhost:5000/course/searchcontent?search=${e.target.value}`, {

      headers: {
        'Authorization': token
      }
    })
      .then((resp) => {
        setcontentstore(resp.data.data)
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <>

      <div className='set'>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Your Content</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  value={content}
                  onChange={(e) => { setcontent(e.target.value) }}

                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  value={duration}
                  onChange={(e) => { setduration(e.target.value) }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Fees</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  value={fees}
                  onChange={(e) => { setfees(e.target.value) }}

                />
              </Form.Group>

            </Form>
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
        <Container fluid className="p-md-4 p-1">
          <Row className='align-items-center p-2 bg-warning mx-0 rounded  '>
            <Col lg={6} sm={6} className=''>
              <h3>Viewcontent</h3>
            </Col>

            <Col lg={6} sm={6} className='text-end'>
              <Link to='/dashbord'>Home</Link>/Viewcontent
            </Col>
          </Row>
          <hr />
          <Alert variant='success' className={(alerts) ? 'd-block' : 'd-none'} >
            Your Data Is Delete Successfully !
          </Alert>
          <Form className="d-flex mb-3">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={searchhandle}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <div className="view_user overflow-y-scroll">
            <table className="table table-striped text-center table-hover  ">
              <thead className='sticky-top'>
                <tr className='tbl_head_bg '>
                  <th scope="col">#</th>
                  <th scope="col">Course</th>
                  <th scope="col">Content</th>
                  <th scope="col">Fees</th>
                  <th scope="col">Duration</th>
                  <th scope="col" colSpan={2}>Handle</th>
                </tr>
              </thead>
              <tbody>
                {
                  contentstore.map((item, id) => {
                    return (
                      <tr key={id}>
                        <th scope="row">{id + 1}</th>
                        <td>{item?.coursename}</td>
                        <td>{item.content_id?.content}</td>
                        <td>{item.content_id?.total_fees}</td>
                        <td>{item.content_id?.duration}</td>
                        <td ><AiOutlineDelete className="text-danger mx-3" onClick={() => { deletehandle(item.content_id?._id) }}></AiOutlineDelete><FiEdit className="text-info mx-3" onClick={() => { updatehandle(item.content_id?._id) }}></FiEdit> </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>

        </Container>
      </div>
    </>

  )
}

export default Viewcontent
