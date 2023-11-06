import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";



const Viewuser = () => {
    return (
        <>
        
        <div className="set">
            <Container fluid className="p-4">
                <Row className='align-items-center mb-2 bg-warning mx-0 rounded p-2 '>
                    <Col lg={6} md={6}>
                        <h3>Viewcontent</h3>

                    </Col>
                    <Col lg={6} md={6} className='text-end '>
                        <Link to='/dashbord'>Home</Link>/Viewcontent
                    </Col>
                </Row>
                <hr />
                <div className="view_user overflow-y-scroll">

                    <table className="table table-striped text-center">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">User Name</th>

                                <th scope="col" colSpan={2}>Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>@Ramji Chudasma</td>
                                <td><AiOutlineDelete className="text-danger mx-3"></AiOutlineDelete><FiEdit className="text-info mx-3 "></FiEdit> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </Container>
        </div>
        </>
    )
}
export default Viewuser;