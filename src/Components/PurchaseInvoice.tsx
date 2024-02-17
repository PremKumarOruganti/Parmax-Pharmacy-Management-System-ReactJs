import react, { useEffect, useState } from "react";
import { Row, Container, Col, Table, Button } from "react-bootstrap";
import NavBar from "./NavBar";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import { MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";

const PurchaseInvoice = () => {
  //////Model/////
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  ////
  const editEvent = () => {
    alert("edit Event");
  };
  const deleteEvent = () => {
    alert("Purchases Invoices are not suppose to delete");
  };
  ///////fetching data from API/////
  const apiUrl = "http://localhost:5000";
  const [invoiceParticulars, setInvoiceParticulars] = useState([]);
  function fetchData() {
    fetch(apiUrl + "/" + "invoices")
      .then((res) => res.json())
      .then((data) => setInvoiceParticulars(data))
      .catch((error) => console.error("Error fetching data:", console.error));
  }
  useEffect(() => {
    fetchData();
  }, []);
  ////////
  //////Sales Data finding//////
  const [purchaseData, setpurchaseData] = useState([]);

  useEffect(() => {
    const purchaseData = invoiceParticulars.filter(
      (item: any) => item.transactionType === "Purchase"
    );
    setpurchaseData(purchaseData);
  }, [invoiceParticulars]);
  ////

  ////
  console.log("purchaseData", purchaseData);

  return (
    <div>
      {/* <NavBar /> */}
      <Container fluid className="p-0 mt-2">
        <Row>
          <Col className="d-flex justify-content-end mr-3">
            <Link to="/purchase-invoices/invoice/new">
              <Button
                variant="primary"
                className="py-2 px-4 "
                //   onClick={handleShow}
              >
                Add Purchase +
              </Button>
            </Link>
            {/* <Button onClick={handleShow}>Add Purchase +</Button> */}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>Category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col md={6}>Category</Col>
                  <Col md={6}>Status</Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <input
                      type="text"
                      placeholder="Enter category"
                      className="form-control"
                      //   onChange={(e) => setNewinvoiceNum(e.target.value)}
                    />
                  </Col>
                  <Col md={6}>
                    <select
                      className="form-control"
                      //   onChange={(e) => setNewstatus(e.target.value)}
                    >
                      <option>Select</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  <span>Save Changes</span>
                  {/* <span onClick={saveEvent}>Save Changes</span> */}
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
        <Row>
          <Col className="pt-2">
            <Table
              striped
              bordered
              hover
              variant="dark"
              className="text-center"
            >
              <thead>
                <tr>
                  <th>Vendor Name</th>
                  <th>GSTIN</th>
                  <th>Mobile</th>
                  <th>Date</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Total Quantity</th>
                  <th>Total Amount</th>
                  <th>view Details</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {purchaseData.map((item: any) => (
                  <tr>
                    <td>{item.nameOfParty}</td>
                    <td>{item.uNo}</td>
                    <td>{item.mobile}</td>
                    <td>{item.date}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td>{item.totalQuantity}</td>
                    <td>{item.totalAllAmounts}</td>
                    <td className="text-center text-primary">
                      <Link
                        to={`/purchase-invoices/invoice/view/${item.invoiceNum}`}
                      >
                        {<MdRemoveRedEye />}
                      </Link>
                    </td>
                    {/* <Link
                        to={`/sale-invoices/invoice/view/${item.invoiceNum}`}
                      >
                        {<MdRemoveRedEye />}
                      </Link> */}
                    <td className="text-primary">
                      <Link
                        to={`/purchase-invoices/invoice/edit/${item.invoiceNum}`}
                      >
                        <BiEdit />
                      </Link>
                    </td>
                    <td className="text-danger" onClick={() => deleteEvent()}>
                      <AiFillDelete />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default PurchaseInvoice;
