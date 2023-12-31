import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

const Viewcourse = () => {
  let [course, setcourse] = useState([]);
  const token = localStorage.getItem('token')
  let [page, setpage] = useState(1)
  const [totalpage, settotalpage] = useState(0)
  var [pages, setpages] = useState([]);
  let [start, setstart] = useState()
  var arr = []


  useEffect(() => {
    viewcourse()
    for (let i = 1; i <= totalpage; i++) {
      arr.push(i)
    }

    setpages(arr)

  }, [page,totalpage])
  // ================to print data========================




  let viewcourse = () => {

    axios.get(`http://localhost:5000/course/allcourse?page_no=${page}`, {
      headers: {
        'Authorization': token
      }
    })
      .then((resp) => {

        if (resp.data.status === 'All Course Find Successfully') {
          setcourse(resp.data.data);
          settotalpage(resp.data.lastpage)
          setstart(resp.data.start)

        }
      })
      .catch((err) => {
        alert(err)
      })

  }
  // ============= to delete data ==========================
  let [alerts, setalerts] = useState(false)
  let deletehandle = (content_id) => {
    axios.delete(`http://localhost:5000/course/coursedelete/${content_id}`,
      {
        headers: {
          'Authorization': token
        }
      })
      .then((resp) => {
        console.log(resp);
        if (resp.data.status === 'Course Delete Successfully') {
          viewcourse();
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
  // ================ to update data ==============================
  const [show, setShow] = useState(false);
  let [updateemail, setupdateemail] = useState()
  let [id, setid] = useState()
  let [update, setupdate] = useState(false)
  const handleClose = () => {
    setShow(false);
    axios.put('http://localhost:5000/course/updatecourse', {
      course_id: id,
      coursename: updateemail
    }, {
      headers: {
        'Authorization': token
      }
    })
      .then((resp) => {
        viewcourse()
        setupdate(true)
        setTimeout(() => {
          setupdate(false)

        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      })
  };
  let updatehandle = (_id) => {

    setShow(true);
    axios.get(`http://localhost:5000/course/viewsinglecourse/${_id}`, {
      headers: {
        'Authorization': token
      }
    })
      .then((resp) => {
        console.log(resp);
        setupdateemail(resp.data.data.coursename)
        setid(resp.data.data._id)
      })
      .catch((err) => {

      })
  }
  // =================== search =========================
  let searchHandle = (e) => {
    axios.get(`http://localhost:5000/course/searchcourse?search=${e.target.value}`,
      {
        headers: {
          'Authorization': token
        }
      })
      .then((resp) => {
        setcourse(resp.data.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return (
    <>

      <div >
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Your Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                  value={updateemail}
                  onChange={(e) => { setupdateemail(e.target.value) }}
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
        <Container className='mt-3'>
          <Row className='align-items-center mb-2 bg-warning mx-0 rounded p-2 '>
            <Col lg={6} md={6}>
              <h3>ViewCourse</h3>
            </Col>
            <Col lg={6} md={6} className='text-end '>
              <Link to='/dashbord'>Home</Link>/Viewcourse
            </Col>
          </Row>
          <hr />
          <Alert variant='danger' className={(alerts) ? 'd-block' : 'd-none'} >
            Your Data Is Delete Successfully !
          </Alert>
          <Alert variant='success' className={(update) ? 'd-block' : 'd-none'} >
            Your Data Is Update Successfully !
          </Alert>

          <Form className="d-flex mb-3">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={searchHandle}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <div className="view_user overflow-scroll">
            <table className="table table-striped text-center table-hover ">
              <thead className='sticky-top' >
                <tr className='tbl_head_bg' >
                  <th scope="col">#</th>
                  <th scope="col">User Name</th>
                  <th scope="col" colSpan={2}>Handle</th>
                </tr>
              </thead>
              <tbody>
                {
                  course.map((item, id) => {
                    return (
                      <tr key={item._id}>
                        <th scope="row" >{id + 1 + start}</th>
                        <td>{item.coursename}</td>
                        <td><AiOutlineDelete onClick={() => { deletehandle(item._id) }} className="text-danger mx-3" /><FiEdit onClick={() => { updatehandle(item._id) }} className="text-info mx-3 " /> </td>
                      </tr>
                    )
                  })
                }

              </tbody>
            </table>
            <div className="text-center mb-3">
              <AiOutlineDoubleLeft className='fs-3 me-2' />
              {
                pages.map((ele, ind) => {
                  return <button key={ind} className='btn btn-outline-warning rounded-circle me-2' value={ele} onClick={(e) => setpage(e.target.value)} >{ele}</button>
                })
              }
              <AiOutlineDoubleRight className='fs-3 ' />
            </div>

          </div>

        </Container>
      </div>
    </>
  )
}

export default Viewcourse
