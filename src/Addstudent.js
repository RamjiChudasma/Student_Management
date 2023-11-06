import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';





const Addstudent = () => {
    //  =========================  object for all data ===============


    let alldata = {
        surname: "",
        studentname: "",
        fathername: "",
        stdcontect: "",
        stdwpno: "",
        parentcontect: "",
        parentwpno: "",
        Address: "",
        dob: "",
        img: "",
        Qualification: "",
        referance: "",
        daily_time: "",
        start_date: "",
        end_date: "",
        job: "",
        faculty: "",
        select_batch: "",
        running_topic: "",
        pc_laptop: "",
        pc_no: "",
        pc_coumpalsory: "",
        extra_note: "",
        reception_note: "",
        installment_details: [{
            amount: 0,
            installment_date: '',
            p_status: "0",
        }],

    }

    let [inputstudent, setinputstudent] = useState(alldata);

    let togetdata = (details) => {
        let input_student_name = details.target.name;
        let input_student_value = details.target.value;
        if (details.target.name === "img") {
            setinputstudent({
                ...inputstudent,
                [input_student_name]: details.target.files[0]
            })
        }
        else {
            setinputstudent({
                ...inputstudent,
                [input_student_name]: input_student_value
            })
        }


    }
    //======================================= instalment   start ======================== 
    let init = {
        amount: "",
        installment_date: ""
    }
    let [defaul, setdefault] = useState(init)


    let print_fees = (e) => {
        setdefault({ ...defaul, [e.target.name]: e.target.value })

    }

    let [printfees, setprintfees] = useState([])
    let feeshandle = () => {
        setprintfees([...printfees, defaul])
        setdefault(init)
    }
    let delet_data = (ind) => {
        const ndata = printfees.filter((i, index) => index !== ind)
        setprintfees(ndata)
    }


    //======================================= instalment   end ======================== 

    // ======================= print course ======================
    let token = localStorage.getItem('token')
    let [course, setcourse] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/course/allcourse', {
            headers: {
                'Authorization': token
            }
        })
            .then((resp) => {
                setcourse(resp.data.data1)
            })
            .catch((err) => {
                alert(err)
            })
    }, [token])
    let [content, setcontent] = useState("");
    let printcontent = (e) => {

        axios.get(`http://localhost:5000/course/viewsinglecourse/${e}`, {
            headers: {
                'Authorization': token
            }
        })
            .then((resp) => {
                let data = resp.data.data
                setcontent(data)

                // setduration(resp.data.data.content_id.duration)
            })
            .catch((err) => {
                alert(err)
            })

    }


    let prints = () => {
        let sum = 0;
        printfees.forEach((Object) => {
            sum += parseInt(Object.amount)
        })
        console.log(sum);
        if (content.content_id?.total_fees === sum) {
            axios.post('http://localhost:5000/course/newadmission', {
                surname: inputstudent.surname,
                studentname: inputstudent.studentname,
                fathername: inputstudent.fathername,
                stu_contact_no: inputstudent.stdcontect,
                stu_whatsapp_no: inputstudent.stdwpno,
                parent_contact_no: inputstudent.parentcontect,
                parent_whatsapp_no: inputstudent.parentwpno,
                address: inputstudent.Address,
                dob: inputstudent.dob,
                image: inputstudent.img,
                qualification: inputstudent.Qualification,
                reference: inputstudent.referance,
                course: inputstudent.course,
                course_duration: content.content_id?.duration || "",
                course_content: content.content_id?.content || "",
                total_fees: parseInt(content.content_id?.total_fees || 0),
                daily_time: inputstudent.daily_time,
                joining_date: inputstudent.start_date,
                ending_date: inputstudent.end_date,
                job_responsbility: inputstudent.job,
                //   college_course: inputstudent.college_course,
                installment_details: printfees,
                faculty: inputstudent.faculty,
                batch_time: inputstudent.select_batch,
                running_topic: inputstudent.running_topic,
                pc_laptop: inputstudent.pc_laptop,
                pc_no: inputstudent.pc_no,
                laptop_compulsory: inputstudent.pc_coumpalsory,
                //   gst: inputstudent.gst,
                extra_note: inputstudent.extra_note,
                reception_note: inputstudent.reception_note
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token
                }
            })
                .then((resp) => {
                    setinputstudent(alldata)
                    setShow(true)
                    setcontent([])
                    setprintfees([])

                })
                .catch((err) => {
                    alert(err)
                    console.log(err);
                })
        }
        else {
            alert("Please Check Your installment Detail Total is not Match")
        }


    }
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false) };


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
                    <p className="text-center"> Student regisitration is complete</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="success" onClick={handleClose}>
                        OK
                    </Button>

                </Modal.Footer>
            </Modal>

            <div className="set">
                <Container fluid className="p-4" style={{ userSelect: 'none' }}>
                    <Row className='align-items-center p-2 bg-warning rounded mx-0 '>
                        <Col lg={6} sm={6} className=''>
                            <h3>Viewcontent</h3>
                        </Col>

                        <Col lg={6} sm={6} className='text-end'>
                            <Link to='/dashbord'>Home</Link>/Addmission
                        </Col>
                    </Row>
                    <hr />
                    <div className="add_student p-4 border">
                        <h3 className="text-center mb-5">New Addmission</h3>
                        <nav>
                            <div className="nav nav-tabs justify-content-center border-warning  tab_border " id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Student Information</button>
                                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Course Information</button>
                                <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Faculty Information</button>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">

                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <Row className="p-3">
                                    <Col lg={4}>

                                        <Form.Group className="mb-3 xyz" controlId="formGroupEmail">
                                            <Form.Label className="fw-bold">Surname</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Surname" value={inputstudent.surname} onChange={togetdata} name="surname" />
                                        </Form.Group>

                                    </Col>
                                    <Col lg={4}>

                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label className="fw-bold">Student Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Your Name" value={inputstudent.studentname} onChange={togetdata} name="studentname" />
                                        </Form.Group>

                                    </Col>
                                    <Col lg={4}>

                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label className="fw-bold">Father Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Father Name" value={inputstudent.fathername} onChange={togetdata} name="fathername" />
                                        </Form.Group>

                                    </Col>
                                </Row>
                                <Row className="p-3">
                                    <Col lg={3} md={6}>
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label className="fw-bold">Student Contact No.</Form.Label>
                                            <Form.Control type="text" placeholder="" value={inputstudent.stdcontect} onChange={togetdata} name="stdcontect" />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={3} md={6}>
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label className="fw-bold">WhatsApp No.</Form.Label>
                                            <Form.Control type="text" placeholder="" value={inputstudent.stdwpno} onChange={togetdata} name="stdwpno" />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={3} md={6}>
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label className="fw-bold">Parent Contact No.</Form.Label>
                                            <Form.Control type="text" placeholder="" value={inputstudent.parentcontect} onChange={togetdata} name="parentcontect" />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={3} md={6}>
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label className="fw-bold">WhatsApp No.</Form.Label>
                                            <Form.Control type="text" placeholder="" value={inputstudent.parentwpno} onChange={togetdata} name="parentwpno" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="p-3">
                                    <Col lg={4}>

                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label className="fw-bold">Address</Form.Label>
                                            <FloatingLabel
                                                controlId="floatingTextarea"
                                                label="Comments"
                                                className="mb-3"

                                            >
                                                <Form.Control as="textarea" placeholder="Your Full Address" value={inputstudent.Address} onChange={togetdata} name="Address" />
                                            </FloatingLabel>
                                        </Form.Group>

                                    </Col>
                                    <Col lg={4}>

                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label className="fw-bold">DOB</Form.Label>
                                            <Form.Control type="date" value={inputstudent.dob} onChange={togetdata} name="dob" />
                                        </Form.Group>

                                    </Col>
                                    <Col lg={4}>

                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label className="fw-bold">Image</Form.Label>
                                            <Form.Control type="file" onChange={togetdata} name="img" />
                                        </Form.Group>

                                    </Col>
                                </Row>
                                <Row className="p-3">
                                    <Col lg={4}>

                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label className="fw-bold">Qualification</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Qualification" value={inputstudent.Qualification} onChange={togetdata} name="Qualification" />
                                        </Form.Group>

                                    </Col>
                                    <Col lg={4}>

                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label className="fw-bold">Referance</Form.Label>
                                            <Form.Select aria-label="Default select example" onChange={togetdata} name="referance">
                                                <option> select Reference</option>
                                                <option value="Faculty">Faculty</option>
                                                <option value="Owner" >Owner</option>
                                                <option value="Land Load" >Land Load</option>
                                            </Form.Select>

                                        </Form.Group>

                                    </Col>
                                    <Col lg={4}>

                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label className="fw-bold">Reference Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Reference Name" value={inputstudent.referance} readOnly />
                                        </Form.Group>

                                    </Col>
                                </Row>

                            </div>

                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" >
                                <Row className="p-3">
                                    <Col lg={4}>

                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label className="fw-bold">Select course</Form.Label>
                                            <Form.Select aria-label="Default select example" onChange={(e) => { printcontent(e.target.value); togetdata(e) }} name="course" value={inputstudent.course}>
                                                <option defaultValue >-------------- select Course -------------------</option>
                                                {
                                                    course.map((item) => {
                                                        return (
                                                            <>
                                                                <option key={item.i_d} value={item._id} >{item.coursename}</option>

                                                            </>
                                                        )
                                                    })
                                                }

                                            </Form.Select>

                                        </Form.Group>

                                    </Col>
                                    <Col lg={4}>

                                        <Form.Group className="mb-3" >
                                            <Form.Label className="fw-bold">
                                                Duration

                                            </Form.Label>
                                            <Form.Control type="text" value={content.content_id?.duration || 0} readOnly />
                                        </Form.Group>

                                    </Col>
                                    <Col lg={4}>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Daily Time</Form.Label>
                                            <Form.Control type="text" onChange={togetdata} name="daily_time" value={inputstudent.daily_time} />
                                        </Form.Group>

                                    </Col>
                                </Row>
                                <Row className="p-3">
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label className="fw-bold">Course Contents</Form.Label>
                                            <FloatingLabel
                                                controlId="floatingTextarea"
                                                label="Comments"
                                                className="mb-3"
                                            >
                                                <Form.Control as="textarea" value={content.content_id?.content || ""} readOnly />
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="p-3">
                                    <Col lg={3}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Total Fees</Form.Label>
                                            <Form.Control type="text" value={content.content_id?.total_fees || 0} readOnly />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={3}>

                                        <Form.Group className="mb-3" >
                                            <Form.Label className="fw-bold">Start Date</Form.Label>
                                            <Form.Control type="date" onChange={togetdata} value={inputstudent.start_date} name="start_date" />
                                        </Form.Group>

                                    </Col>
                                    <Col lg={3}>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">End Date</Form.Label>
                                            <Form.Control type="date" onChange={togetdata} value={inputstudent.end_date} name="end_date" />
                                        </Form.Group>

                                    </Col>
                                    <Col lg={3}>
                                        <Row >
                                            <Col>
                                                <Form.Label className="fw-bold">Job Resposibility</Form.Label>

                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col lg={1} className="">
                                                <Form.Check type="radio" aria-label="radio 1" name="job" onChange={togetdata} value='YES'   />
                                            </Col>
                                            <Col lg={1} className="">
                                                YES
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col lg={1} className="">
                                                <Form.Check type="radio" aria-label="radio 1" name="job" onChange={togetdata} value='NO'  />

                                            </Col>
                                            <Col lg={1} className="text-left">
                                                NO
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>
                                <Row className="p-3">
                                    <Col>
                                        <Form.Label className="fw-bold">Installment Details</Form.Label>
                                    </Col>
                                </Row>
                                <Row className="p-3 align-items-start">
                                    <Col lg={5} >
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text" name="amount" value={defaul.amount} onChange={print_fees} />
                                        </Form.Group>


                                    </Col>
                                    <Col lg={5}>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="date" name="installment_date" value={defaul.installment_date} onChange={print_fees} />
                                        </Form.Group>


                                    </Col>
                                    <Col lg={2}>
                                        <button className="add_btn" onClick={feeshandle}  ><BsPlusLg></BsPlusLg></button>
                                    </Col>
                                </Row>

                                {
                                    printfees.map((i, ind) => {
                                        return (
                                            <Row key={i.amount} className="p-3">
                                                <Col lg={5} >

                                                    <Form.Group className="mb-3">
                                                        <Form.Control type="text" value={i.amount} readOnly />
                                                    </Form.Group>

                                                </Col>
                                                <Col lg={5}>

                                                    <Form.Group className="mb-3">
                                                        <Form.Control type="text" value={i.installment_date} readOnly />
                                                    </Form.Group>

                                                </Col>
                                                <Col lg={2}>
                                                    <button className="delet_btn" onClick={() => { delet_data(ind) }} ><AiOutlineDelete></AiOutlineDelete></button>
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }

                            </div>

                            <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" >
                                <Row className="p-3">
                                    <Col lg={4}>
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label className="fw-bold">Select Faculty</Form.Label>
                                            {/* <Form.Select aria-label="Default select example" onChange={togetdata} name="faculty">
                                                <option value="" >Select Faculty</option>
                                                <option value="mr.chirag">mr.chirag</option>
                                                <option value="mr.jaydip">mr.jaydip</option>
                                                <option value="mr.sindhav">mr.sindhav</option>
                                            </Form.Select> */}
                                            <Form.Control type="text" name="faculty" value={inputstudent.faculty} onChange={togetdata} />


                                        </Form.Group>

                                    </Col>
                                    <Col lg={4}>
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label className="fw-bold">Select Batch Time</Form.Label>
                                            {/* <Form.Select aria-label="Default select example" name="select_batch" onChange={togetdata} >
                                                <option value="">Select Batch</option>
                                                <option value="8:00 To 10:00">8:00 To 10:00</option>
                                                <option value="10:00 To 12:00">10:00 To 12:00</option>
                                                <option value="12:00 To 2:00">12:00 To 2:00</option>

                                            </Form.Select> */}
                                            <Form.Control type="text" name="select_batch" value={inputstudent.select_batch} onChange={togetdata} />


                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} >
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Running Topic</Form.Label>
                                            <Form.Control type="text" onChange={togetdata} value={inputstudent.running_topic} name="running_topic" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="p-3">
                                    <Col lg={4}>
                                        <Form.Label className="fw-bold">PC/LAPTOP</Form.Label>

                                        <div className="d-flex mb-3 border rounded p-1">
                                            <div className="d-flex me-3">
                                                <Form.Check type="radio" aria-label="radio 1" name="pc_laptop" onChange={togetdata} value={'PC'}  />
                                                <div className='ms-2'>PC</div>
                                            </div>
                                            <div className="d-flex">
                                                <Form.Check type="radio" aria-label="radio 1" name="pc_laptop" onChange={togetdata} value={'LAPTOP'}  />
                                                <div className='ms-2'>LAPTOP</div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={4}>
                                    <Form.Group className={(inputstudent.pc_laptop) === "PC" ? 'd-block' : 'd-none'} controlId="formGroupEmail1">
                                            <Form.Label className="fw-bold">PC No.</Form.Label>
                                            <Form.Control type="text" name="pc_no" value={inputstudent.pc_no} onChange={togetdata} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4}>
                                        <Form.Label className="fw-bold">PC Compalsory</Form.Label>

                                        <div className="d-flex mb-3 border p-1 rounded">
                                            <div className="d-flex me-3 ">
                                                <input type="radio" className="me-2" name='pc_coumpalsory' onChange={togetdata} value="YES" checked={inputstudent.pc_coumpalsory === "YES"} /> <div>YES</div>
                                            </div>
                                            <div className="d-flex">
                                                <input type="radio" className="me-2" name='pc_coumpalsory' onChange={togetdata} value="NO" checked={inputstudent.pc_coumpalsory === "NO"} /> <div>NO</div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="p-3">
                                    <Col>
                                        <Col >

                                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                                <Form.Label className="fw-bold">Extra Notes</Form.Label>
                                                <FloatingLabel
                                                    controlId="floatingTextarea"
                                                    label="Comments"
                                                    className="mb-3"
                                                >
                                                    <Form.Control as="textarea" placeholder="Your Full Address" onChange={togetdata}
                                                        value={inputstudent.extra_note}
                                                        name="extra_note" />
                                                </FloatingLabel>
                                            </Form.Group>

                                        </Col>
                                    </Col>
                                </Row>
                                <Row className="p-3">
                                    <Col>
                                        <Col >

                                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                                <Form.Label className="fw-bold">Reception Notes</Form.Label>
                                                <FloatingLabel
                                                    controlId="floatingTextarea"
                                                    label="Comments"
                                                    className="mb-3"

                                                >
                                                    <Form.Control as="textarea" placeholder="Your Full Address"
                                                        onChange={togetdata}
                                                        value={inputstudent.reception_note}
                                                        name="reception_note" />
                                                </FloatingLabel>
                                            </Form.Group>

                                        </Col>
                                    </Col>
                                </Row>
                                <Row className="p-3">
                                    <Col lg={2} className="m-auto">
                                        <button className="border py-2 px-4 login_bg rounded" onClick={prints} >Submit</button>
                                    </Col>
                                </Row>

                            </div>

                        </div>
                    </div>
                </Container>
            </div>
        </>

    )
}
export default Addstudent