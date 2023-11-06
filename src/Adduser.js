import { Container, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { AiOutlineUser, AiOutlineUnlock } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


const Adduser = () => {
    let [email, setemail] = useState();
    let [password, setpassword] = useState();

    let handleuser = () => {
        axios.post('http://localhost:5000/Register', {
            email: email,
            password: password
        })
            .then((resp) => {
                console.log(resp);
                if (resp.data.status === 'Admin Add Successfully') {
                    setemail('')
                    setpassword('')
                }
            })
            .catch((err) => {
                alert(err)
            })
    }
    return (
        <>

            
            <div className="set">
                <Container fluid className="p-3 ">
                    <Row className='align-items-center p-2 bg-warning mx-0 rounded '>
                        <Col lg={6} sm={6} className=''>
                            <h3>Add User</h3>
                        </Col>

                        <Col lg={6} sm={6} className='text-end'>
                            <Link to='/dashbord'>Home</Link>/Adduser
                        </Col>
                    </Row>
                    <hr />
                    <div className=" d-flex align-items-center justify-content-center">
                        <div className="login_box">
                            <div className="user_heading">
                                <h1>New user</h1>
                            </div>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><AiOutlineUser></AiOutlineUser> </InputGroup.Text>
                                <Form.Control
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={email}
                                    onChange={(e) => { setemail(e.target.value) }}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><AiOutlineUnlock></AiOutlineUnlock> </InputGroup.Text>
                                <Form.Control
                                    placeholder="Password"
                                    aria-label="Username"
                                    type="password"
                                    aria-describedby="basic-addon1"
                                    value={password}
                                    onChange={(e) => { setpassword(e.target.value) }}
                                />
                            </InputGroup>
                            <div className="text-center">
                                <button className="login_btn" onClick={handleuser}>Add User</button>

                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}
export default Adduser;