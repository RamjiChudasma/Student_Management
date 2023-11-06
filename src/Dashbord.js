import { Col, Container, Row } from "react-bootstrap";
import { HiMiniShoppingBag, HiChartBar } from "react-icons/hi2";
import { BsFillPersonPlusFill, BsArrowRightShort } from "react-icons/bs";
import { IoIosPie } from "react-icons/io";
import { Link } from "react-router-dom";

const Dashbord = () => {
   
    return (
        <>
       
        
        <div className="set">
            
            <Container fluid className="p-3">
                <Row className="p-2 mx-0 bg-warning rounded">
                    <Col >
                    <div className="d-flex align-items-center justify-content-between">
                    <h3 >Dashbord</h3>
                    <div>
                        <Link to='/dashbord'>Home</Link>/ViewUsers
                    </div>
                </div>
                    </Col>
                </Row>
                <hr />
                <Row className="p-3">
                    <Col lg={3} md={6}>
                        <div className="bg-info text-white rounded mb-lg-0 mb-3 icon_hover ">
                            <div className="d-flex  justify-content-between p-3">
                                <div>
                                    <h3>150</h3>
                                    <p>New Students</p>
                                </div>
                                <div className="hvr">
                                    <HiMiniShoppingBag className="card_icon opacity-25"></HiMiniShoppingBag>
                                </div>
                            </div>
                            <div className="trans text-center rounded-bottom">
                                <a href="$">Moreinfo</a><BsArrowRightShort className="fs-3"></BsArrowRightShort>

                            </div>
                        </div>
                    </Col>

                    <Col lg={3} md={6}>
                        <div className="bg-success text-white rounded mb-lg-0 mb-3 icon_hover  ">
                            <div className="d-flex  justify-content-between p-3">
                                <div>
                                    <h3>53 <sup>%</sup></h3>
                                    <p>Placement Rate</p>
                                </div>
                                <div className="hvr">
                                    <HiChartBar className="card_icon opacity-25"></HiChartBar>
                                </div>
                            </div>
                            <div className="trans text-center rounded-bottom">
                                <a href="$">Moreinfo</a><BsArrowRightShort className="fs-3"></BsArrowRightShort>
                            </div>

                        </div>
                    </Col>

                    <Col lg={3} md={6}>
                        <div className="bg-warning  rounded mb-lg-0 mb-3 icon_hover ">
                            <div className="d-flex  justify-content-between p-3">
                                <div>
                                    <h3>44</h3>
                                    <p>User Registration</p>
                                </div>
                                <div className="hvr">
                                    <BsFillPersonPlusFill className="card_icon opacity-25"></BsFillPersonPlusFill>
                                </div>
                            </div>
                            <div className="trans text-center rounded-bottom">
                                <a href="$">Moreinfo</a><BsArrowRightShort className="fs-3"></BsArrowRightShort>

                            </div>
                        </div>

                    </Col>
                    <Col lg={3} md={6}>
                        <div className="bg-danger text-white rounded mb-lg-0 mb-3 icon_hover   ">
                            <div className="d-flex  justify-content-between p-3">
                                <div>
                                    <h3>65</h3>
                                    <p>Unique Visitor</p>
                                </div>
                                <div className="hvr">
                                    <IoIosPie className="card_icon opacity-25"></IoIosPie>
                                </div>
                            </div>
                            <div className="trans text-center rounded-bottom">
                                <a href="$">Moreinfo</a><BsArrowRightShort className="fs-3"></BsArrowRightShort>

                            </div>
                        </div>


                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}
export default Dashbord;