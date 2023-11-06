import { Container, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Addcontent = () => {
    let [content, setcontent] = useState();
    let [course, setcourse] = useState();
    let [duration, setduration] = useState();
    let [fees, setfees] = useState();
    let [select, setselect] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false) };
    const token = localStorage.getItem('token')
    
    useEffect(() => {
        addcourse()
    })
    let addcourse = () => {
        axios.get('http://localhost:5000/course/allcourse',{
            headers: {
                'Authorization': token
            }
        })
            .then((resp) => {
                setselect(resp.data.data1)
            })
    }
    let contenthandle = () => {
        axios.post('http://localhost:5000/course/addcontent', {
            course_id: course,
            content: content,
            duration: duration,
            total_fees: fees
        },
        {
            headers: {
                'Authorization': token
            }
        }
        )
            .then((resp) => {
                console.log(resp);
                if (resp.data.status === 'Content Add Successfully') {
                    setcontent('')
                    setfees('')
                    setduration('')
                    setcourse("")
                    setShow(true)
                   
                }
            })
            .catch((err) => {
                console.log(err);
            })


           
    }
    
    return (
        <>
            
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
                    <p className="text-center">Your Content is Successfully Saved!</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="success" onClick={handleClose}>
                        OK
                    </Button>

                </Modal.Footer>
            </Modal>
            <div className="set">
                <Container className="mt-3" >
                    <Row className='align-items-center p-2 bg-warning mx-0 rounded  '>
                        <Col lg={6} sm={6} className=''>
                            <h3>Viewcontent</h3>
                        </Col>

                        <Col lg={6} sm={6} className='text-end'>
                            <Link to='/dashbord'>Home</Link>/AddContent
                        </Col>
                    </Row>
                    <hr />
                    <div className=" d-flex align-items-center justify-content-center">
                        <div className="content_box">
                            <div className="user_heading">
                                <h1>Choice Your Course</h1>
                            </div>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label className="fw-bold">Select Course</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={(e) => {setcourse(e.target.value) }} >
                                    <option > select Course</option>
                                    {
                                        select.map((item, id) => {
                                            return (
                                                <option key={id} value={item._id}>{item.coursename}</option>

                                            )
                                        })
                                    }

                                </Form.Select>

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label className="fw-bold">Content</Form.Label>
                                <Form.Control type="text"
                                    value={content}
                                    onChange={(e) => { setcontent(e.target.value) }}
                                />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label className="fw-bold">Fees</Form.Label>
                                <Form.Control type="text"
                                    value={fees}
                                    onChange={(e) => { setfees(e.target.value) }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label className="fw-bold">Duration</Form.Label>
                                <Form.Control type="text"
                                    value={duration}
                                    onChange={(e) => { setduration(e.target.value) }}

                                />
                            </Form.Group>
                            <div className="text-center">
                                <button className="login_btn" onClick={contenthandle} >Add Content</button>

                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}
export default Addcontent