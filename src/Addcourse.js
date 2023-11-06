import { Container, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const token = localStorage.getItem('token')


const Addcourse = (props) => {
    let [course, setcourse] = useState()
    let handlecourse = () => {
        axios.post('http://localhost:5000/course/addcourse', {
            coursename: course
        },
            {
                headers: {
                    'Authorization': token
                }
            }
        )
            .then((resp) => {

                if (resp.data.status === 'Course Add Successfully') {
                    setcourse('')
                    setShow(true)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false) };



    return (
        <>

            {/* model for add course successfully */}


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header >
                    <Modal.Title className="text-center">

                        <img src={require('./img/right.gif')} className="img-fluid w-25" alt="" />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2 className="text-success text-center">Congratutions!</h2>
                    <p className="text-center">Your Course is Successfully Saved!</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="success" onClick={handleClose}>
                        OK
                    </Button>

                </Modal.Footer>
            </Modal>


            {/* model for add course successfully */}
           
            <div className="set">
                <Container fluid className="p-3">
                    <Row className='align-items-center p-2 bg-warning rounded mx-0 '>
                        <Col lg={6} sm={6} className=''>
                            <h3>AddCourse</h3>
                        </Col>

                        <Col lg={6} sm={6} className='text-end'>
                            <Link to='/dashbord'>Home</Link>/Add-Course
                        </Col>
                    </Row>
                    <hr />
                    <div className=" d-flex align-items-center justify-content-center">
                        <div className="login_box">
                            <div className="user_heading">
                                <h1>Add Course</h1>
                            </div>

                            <Form.Group className="mb-5 ">
                                <Form.Label className="fw-bold">Course</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Add Course"
                                    value={course}
                                    onChange={(e) => { setcourse(e.target.value) }}
                                />
                            </Form.Group>
                            <div className="text-center">
                                <button className="login_btn border border-white" onClick={handlecourse} >Add Course</button>

                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}
export default Addcourse;