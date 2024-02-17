import react, { useState } from "react";
import { Row, Container, Col, Table, Button } from "react-bootstrap";
import NavBar from "./NavBar";
import { AiFillDelete } from "react-icons/ai";
import { MdRemoveRedEye } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";

const SalesInvoice = () => {
  //////Model/////
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);
  ////
  const [newinvoiceNum, setNewinvoiceNum] = useState("");
  const [newmedicineId, setMedicineId] = useState("");
  const [newquntity, setNewQuantity] = useState("");
  const [newAmountPerPeace, setAmountPerPeace] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newInvoicetype, setNewInvoicetype] = useState("");
  const [newstatus, setNewstatus] = useState("");

  const newSalesData = {
    invoiceNum: newinvoiceNum,
    medicineId: newmedicineId,
    quntity: newquntity,
    amountPerPeace: newAmountPerPeace,
    category: newCategory,
    invoicetype: newInvoicetype,
    status: newstatus,
  };

  ///////Save Changes On click///////
  const saveEvent = () => {
    fetch(apiUrl + "/" + "manageCategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSalesData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data sent Successfully", newSalesData);
          fetchData();
          setNewinvoiceNum("");
          setMedicineId("");
          handleClose(); // Close the modal here
        } else {
          console.log("Failed to send Data");
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };
  ///// Delete Event /////
  const deleteEvent = () => {
    alert("Sales invoices are not suppose to delete");
  };

  //////Fetching data////
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
  ////// Sending invoiceParticulars to ViewDetailedSalesInvoicePage ////

  //////Sales Data finding//////
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const salesData = invoiceParticulars.filter(
      (item: any) => item.transactionType === "Sales"
    );
    setSalesData(salesData);
  }, [invoiceParticulars]);
  console.log("salesData", salesData);

  return (
    <div>
      <Container fluid className="p-0 mt-2">
        <Row>
          <Col className="d-flex justify-content-end mr-3">
            <Link to="/sale-invoices/invoice/new">
              <Button
                variant="primary"
                className="py-2 px-4 "
                //   onClick={handleShow}
              >
                Add Slaes +
              </Button>
            </Link>
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
                  <th>S.NO</th>
                  <th>invoiceNum</th>
                  <th>Customer</th>
                  <th>Age</th>
                  <th>Mobile</th>
                  <th>Date</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Total Quantity</th>
                  <th>Total Amount</th>
                  <th>View</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((item: any) => (
                  <tr key={item.invoiceNum}>
                    <td>{item.id}</td>
                    <td>{item.invoiceNum}</td>
                    <td>{item.nameOfParty}</td>
                    <td>{item.age}</td>
                    <td>{item.mobile}</td>
                    <td>{item.date}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td>{item.totalQuantity}</td>
                    <td>{item.totalAllAmounts}</td>
                    <td>
                      <Link
                        to={`/sale-invoices/invoice/view/${item.invoiceNum}`}
                      >
                        {<MdRemoveRedEye />}
                      </Link>
                      {/* <Link
                        to={`/sale-invoices/invoice/view/${item.invoiceNum}`}
                      >
                        {<MdRemoveRedEye />}
                      </Link> */}
                      {/* <Link
                        to={`/ViewDetailedSalesInvoicePage?invoiceNum=${item.invoiceNum}`}
                      >
                        {<MdRemoveRedEye />}
                      </Link> */}
                    </td>
                    <td className="text-primary">
                      <Link
                        to={`/sale-invoices/invoice/edit/${item.invoiceNum}`}
                      >
                        <BiEdit />
                      </Link>
                    </td>
                    <td
                      className="text-danger"
                      // onClick={() => deleteEvent(item.invoiceNum)}
                      onClick={() => deleteEvent()}
                    >
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
export default SalesInvoice;
