import React from 'react'
import { Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { AiOutlineUser, AiOutlineUnlock, AiFillEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import login from './img/login2.svg';
import { useState } from "react";
import axios from 'axios';



const Regester = () => {
    let [show, setshow] = useState(false)
    let Password = () => {
        (!show) ? setshow(true) : setshow(false)
    }
    let [email,setemail]=useState();
    let [password,setpassword]=useState();
    let registerhandle = ()=>{
        axios.post('http://localhost:5000/Register',
        {
            email:email,
            password:password
        })
        .then((resp)=>{
            if(resp.data.status === 'Admin Add Successfully')
            {
                setemail('')
                setpassword('')
            }
        })
        .catch((err)=>{
            alert(err)
        })
    }
  return (
    <>
      <Container fluid className='p-4' >
      <Row className="align-items-center mt-5 border rounded border-2 p-3">
                    
                    <Col lg={6}>
                        <div className="">
                            <h3 className="mb-5 loginpage p-3 text-white rounded text-center">Sign Up</h3>
                            <label className="mb-2 fw-bold">User Name</label>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><AiOutlineUser></AiOutlineUser> </InputGroup.Text>
                                <Form.Control
                                    placeholder="Enter Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={email}
                                    onChange={(e)=>{setemail(e.target.value)}}
                                    
                                />
                            </InputGroup>
                            <label className="mb-2 fw-bold">Password</label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><AiOutlineUnlock></AiOutlineUnlock> </InputGroup.Text>
                                <Form.Control
                                    placeholder=" EnterPassword"
                                    aria-label="Username"
                                    type={`${(show) ? 'text' : 'password'}`}
                                    aria-describedby="basic-addon1"
                                    value={password}
                                    onChange={(e)=>{setpassword(e.target.value)}}
                                />
                                <InputGroup.Text onClick={Password} id="basic-addon1">{show ? <AiTwotoneEyeInvisible /> : <AiFillEye />} </InputGroup.Text>
                            </InputGroup>
                        
                            <div className="text-center">
                                <button className="login_btn" onClick={registerhandle}  >Register</button>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6} className="d-lg-block d-none" >
                        <div className="">
                            <img src={login} alt="" className="img-fluid" />
                        </div>
                    </Col>
                </Row>
      </Container>
    </>
  )
}

export default Regester
