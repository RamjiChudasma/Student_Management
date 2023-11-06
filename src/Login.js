import { Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { AiOutlineUser, AiOutlineUnlock, AiFillEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import login from './img/login2.svg'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Regester from "./Regester";

const Login = () => {
    // ===========for view password======================start======

    let [show, setshow] = useState(false)
    let Password = () => {
        (!show) ? setshow(true) : setshow(false)
    }

    // ===========for view password======================End======


    // =============login details===============================

    let [emails, setemail] = useState('');
    let [passwords, setpassword] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        console.log(localStorage.getItem('token'))
    }, [])

    let handlesubmit = () => {

        axios.post('http://localhost:5000/Login', {
            email: emails,
            password: passwords
        })
            .then((resp) => {
                // console.log(resp);
                if (resp.data.status === 'Login Successfully') {
                    navigate("/dashbord");
                    localStorage.setItem('token', resp.data.token)
                    setemail('')
                    setpassword('')
                    // window.location = 'home';
                }
            })
            .catch((err) => {
                console.log(err);
                alert('No Data Found')
            })
    }



    return (
        <>
            <Container fluid className="p-4 d-flex justify-content-center">
               
               
                <Row className="align-items-center mt-5 border rounded border-2 p-3 box_login">
                    <Col lg={6} className="d-lg-block d-none" >
                        <div className="">
                            <img src={login} alt="" className="img-fluid" />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="">
                            <h3 className="mb-5 loginpage p-3 text-white rounded text-center">Login Page</h3>
                            <label className="mb-2 fw-bold">User Name</label>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><AiOutlineUser></AiOutlineUser> </InputGroup.Text>
                                <Form.Control
                                    placeholder="Enter Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={emails}
                                    onChange={(e) => { setemail(e.target.value) }}
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
                                    value={passwords}
                                    onChange={(e) => { setpassword(e.target.value) }}
                                />
                                <InputGroup.Text onClick={Password} id="basic-addon1">{show ? <AiTwotoneEyeInvisible /> : <AiFillEye />} </InputGroup.Text>
                            </InputGroup>
                            <div className="d-flex justify-content-between mb-5">
                                <a href="$">Forgot Password ?</a>
                                <Link to='' >Don't have an account ? sign up ?</Link>

                            </div>

                            <div className="text-center">
                                <button className="login_btn" onClick={handlesubmit} >Login</button>
                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>
            <Routes>
                <Route path="/register" element={<Regester />} />
            </Routes>
        </>
    )
}
export default Login;