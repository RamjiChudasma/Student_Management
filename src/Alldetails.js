import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button';

const Alldetails = () => {
    const params = useParams()
    let token = localStorage.getItem("token")
    let [print, setprint] = useState([])
    let [coursename, setcoursename] = useState('')
    let [instalment, setinstallment] = useState([])
    useEffect(() => {

        axios.get(`http://localhost:5000/course/viewstudentDetail/${params.id}`, {
            headers: {
                "Authorization": token
            }
        })
            .then((resp) => {
                console.log(resp);
                if (resp.data.status === 'View Student_Data Successfully') {
                    let data = resp.data.data
                    setprint(data)
                    setcoursename(resp.data)
                    setinstallment(data.installment_details)
                }

            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <>

            <Container fluid className="p-3">
                <Row className='align-items-center mb-2 bg-warning mx-0 rounded p-2 '>
                    <Col lg={6} md={6}>
                        <h3>Studentdetails</h3>

                    </Col>
                    <Col lg={6} md={6} className='text-end '>
                        <Link to='/dashbord'>Home</Link>/viewstudent/studentdetails
                    </Col>
                </Row>
                <hr />
                <div className="max_height">

                    <h1 className="text-center mb-4 bg-secondary text-white rounded-pill ">Persnol Details</h1>
                    <>

                        <Row className="p-2 align-items-center">
                            <Col md={6}>
                                <div className="">
                                    <div className="student_box bg-black  rounded-circle mx-auto">
                                        <img src={print.image ? 'http://localhost:5000/images/' + print.image : ""} alt="" className="img-fluid   object-fit-cover" />
                                    </div>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="text-center text-md-start">
                                    <div><h5>Student Name:- <span className="text-warning ">{print.surname} {print.studentname}</span> </h5> </div>
                                    <div><h5>DOB:- <span className="text-warning">{print.dob}</span> </h5> </div>
                                    <div><h5>Mo:- <span className="text-warning">{print.stu_contact_no}</span> </h5> </div>
                                    <div><h5>Parent Mo:- <span className="text-warning">{print.parent_contact_no}</span> </h5> </div>
                                    <div><h5>Address:- <span className="text-warning">{print.address}</span> </h5> </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="align-items-center p-2">
                            <h1 className="text-center my-4 bg-secondary text-white rounded-pill">Course Details</h1>

                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Course Name</th>
                                        <td scope="col">{coursename.coursename}</td>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Content</th>
                                        <td>{print.course_content}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">Course Duration</th>
                                        <td>{print.course_duration}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">Course Fees</th>
                                        <td>{print.total_fees}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">Running Topic</th>
                                        <td>{print.running_topic}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">Starting Date</th>
                                        <td>{print.joining_date}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">Ending Date</th>
                                        <td>{print.ending_date}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row"> Daily Time</th>
                                        <td>{print.daily_time}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">Laptop / Pc </th>
                                        <td>{print.pc_laptop}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">Laptop Coumplesory </th>
                                        <td>{print.laptop_compulsory}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">Reference </th>
                                        <td>{print.reference}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">Job Responsbility </th>
                                        <td>{print.job_responsbility}</td>

                                    </tr>

                                </tbody>
                            </table>
                        </Row>
                        <Row className="p-2">
                            <h1 className="text-center my-4 bg-secondary text-white rounded-pill">Fees Details</h1>
                            <Col md={2} className="bg-warning ">
                                <h4 className="" >Amount</h4>
                            </Col>
                            <Col md={10} className="bg-warning ">
                                <h4 className="">installment_date</h4>
                            </Col>

                        </Row>
                        {
                            instalment.map((item, index) => {
                                return (
                                    <Row key={index} className="bg-black rounded-pill m-1 text-white mb-5"  >
                                        <Col md={2}><h5>{item.amount}</h5></Col>
                                        <Col md={10}><h5>{item.installment_date}</h5></Col>

                                    </Row>
                                )
                            })
                        }
                        <Row className="justify-content-center text-center mb-3">
                            <Col>
                            <Link to="/viewstudent"> 
                            <Button variant="outline-success">Success</Button>
                            </Link>
                            
                            </Col>
                        </Row>

                    </>
                </div>


            </Container >
        </>
    )
}






export default Alldetails