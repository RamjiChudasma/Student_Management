import { Col, Container, Row } from 'react-bootstrap';
import { AiOutlineDelete, AiOutlineEye,AiOutlineDoubleLeft,AiOutlineDoubleRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Viewstudent = () => {
    let token = localStorage.getItem('token')
    let [alldetails, setalldetails] = useState([])
    let [page, setpage] = useState(0)
    let arr = []
    let [pageprint, setpageprint] = useState([]);
    let [start,setstart]=useState(0)
    useEffect(() => {
        for (let i = 1; i <= page; i++) {
            arr.push(i)
        }
        setpageprint(arr)
        printdata()

    }, [page])
    let printdata = () => {
        axios.get('http://localhost:5000/course/allstudent_detail', {
            headers: {
                'Authorization': token
            }
        })
            .then((resp) => {
                // console.log(resp.data.data);
                setalldetails(resp.data.data)
                setpage(resp.data.lastpage)
                setalerts(resp.data.start)
                


            })
    }
    let [alerts, setalerts] = useState(false)
    let deletehandle = (id) => {
        axios.delete(`http://localhost:5000/course/deletestudentDetail/${id}`, {
            headers: {
                'Authorization': token
            }
        })
            .then((resp) => {
                printdata()
                setalerts(true)
                setTimeout(() => {
                    setalerts(false)

                }, 5000);
            })
            .catch((err) => {
                alert(err)
                console.log(err);
            })
    }
    // =======================  search ====================
    let searchHandle = (e) => {
        axios.get(`http://localhost:5000/course/searchstudentdetails?&search=${e.target.value}`, {
            headers: {
                'Authorization': token
            }
        })
            .then((resp) => {
                setalldetails(resp.data.data)
            })
            .catch((err) => {
                alert(err)
                console.log(err);
            })
    }


    return (
        <>
            <Container className="p-md-4 p-1 container-lg-fluid   ">
                <Row className='align-items-center p-2 bg-warning mx-0 rounded '>
                    <Col lg={6} sm={6} className=''>
                        <h3>ViewStudent</h3>
                    </Col>

                    <Col lg={6} sm={6} className='text-end'>
                        <Link to='/dashbord'>Home</Link>/ViewStudent
                    </Col>
                </Row>
                <hr />
                <Alert variant='danger' className={(alerts) ? 'd-block' : 'd-none'} >
                    Your Data Is Delete Successfully !
                </Alert>
                {/* <Alert variant='success' className={(update) ? 'd-block' : 'd-none'} >
                    Your Data Is Update Successfully !
                </Alert> */}
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

                <div className="view_user width_720 overflow-scroll table-responsive ">

                    <table className="table text-center w-100 table-hover">
                        <thead className='sticky-top'>
                            <tr className='tbl_head_bg'>
                                <th scope="col">#</th>
                                <th scope="col">Profile</th>
                                <th scope="col">UserName</th>
                                <th scope="col">Fees</th>
                                <th scope="col">Duration</th>
                                <th scope="col">Student_contect</th>
                                <th scope="col">Parent_contect</th>
                                <th scope="col">Daily_Time</th>
                                <th scope="col">Starting_data</th>
                                <th scope="col" colSpan={3}>Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                alldetails.map((resp, index) => {
                                    return (
                                        <tr key={index} >
                                            <th scope="row">{index + 1 + start}</th>
                                            <td>
                                                <div className='imgs d-flex justify-content-center w-100'>
                                                    <img src={'http://localhost:5000/images/' + resp.image} alt="" className='img-fluid' />
                                                </div>
                                            </td>
                                            <td>{resp.surname} {resp.studentname}</td>

                                            <td>{resp.total_fees}</td>
                                            <td>{resp.course_duration}</td>
                                            <td>{resp.stu_contact_no}</td>
                                            <td>{resp.parent_contact_no}</td>
                                            <td>{resp.daily_time}</td>
                                            <td>{resp.starting_date}</td>
                                            <td>
                                                <div className="d-flex">
                                                    <Link ><AiOutlineDelete className="text-danger" onClick={() => { deletehandle(resp._id) }} /></Link>
                                                    <Link to={`/updatestudent/${resp._id}`}><FiEdit className="text-info mx-3" /></Link>
                                                    <Link to={`/alldetails/${resp._id}`}> <AiOutlineEye className="text-success " /></Link>

                                                </div>
                                            </td>


                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                    <div className="text-center mb-3">
                        <AiOutlineDoubleLeft className='fs-3 me-2' />
                        {
                            pageprint.map((ele, ind) => {
                                return <button key={ind} className='btn btn-outline-warning rounded-circle me-2' value={ele} onClick={(e) => setpage(e.target.value)} >{ele}</button>
                            })
                        }
                        <AiOutlineDoubleRight className='fs-3 ' />
                    </div>
                </div>

            </Container>

        </>
    )
}
export default Viewstudent;