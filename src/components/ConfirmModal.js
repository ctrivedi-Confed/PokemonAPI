import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const ConfirmModal = (props) => {
    const personlInfromation = JSON.parse(localStorage.getItem("formData"));
    const pokemon = localStorage.getItem("pokemon").split("-")[2];
    
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Confirm Details
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Personal Information</h4>
            <Table striped="columns">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{personlInfromation.firstName}</td>
                        <td>{personlInfromation.lastName}</td>
                        <td>{personlInfromation.address + ", " + personlInfromation.province + ", " + personlInfromation.country}</td>
                        <td>{personlInfromation.phoneNo}</td>
                    </tr>
                </tbody>
            </Table>
            <h4>Favourite Pokemon: {pokemon}</h4>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onSuccess}>Submit</Button>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
    );
}

export default ConfirmModal