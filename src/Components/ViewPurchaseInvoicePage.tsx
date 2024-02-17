import react, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Container, Row, Col, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useLocation, useParams } from "react-router-dom";

const ViewPurchaseInvoicePage = ({}) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const location = useLocation();
  // const invoiceNum = new URLSearchParams(location.search).get("invoiceNum");
  const { id }: any = useParams();

  //alert({ id });

  /////fetching Medicines data from transactions data from API //////
  const apiUrl = "http://localhost:5000";
  const [transcations, settranscations] = useState([]);
  console.log("transcations", transcations);

  useEffect(() => {
    fetchTransactionsData();
  }, []);

  function fetchTransactionsData() {
    fetch(`${apiUrl}/transactions/`)
      .then((res) => res.json())
      .then((data) => settranscations(data))
      .catch((error) => console.error("Error fetching data:", error));
  }

  console.log("selectedInvoiceTest", transcations);

  let filteredSalesTransactionsData = transcations.filter(
    (item: any) => item.invoiceNum === id
  );

  console.log("filteredData11", filteredSalesTransactionsData);

  const [GrandtotalSumAmount, setGrandtotalSumAmount] = useState(0);
  const [totalNoOfMedicines, setTotalNoOfMedicines] = useState(0);
  useEffect(() => {
    const GrandtotalSumAmount = filteredSalesTransactionsData.reduce(
      (sum: any, item: any) => sum + item.quantity * item.amount,
      0
    );
    setGrandtotalSumAmount(GrandtotalSumAmount);

    const totalNoOfMedicines = filteredSalesTransactionsData.reduce(
      (sum: any, item: any) => parseInt(sum) + parseInt(item.quantity),
      0
    );
    setTotalNoOfMedicines(totalNoOfMedicines);
  }, [filteredSalesTransactionsData]);

  //////Fetching data Customers Data in invoices////

  const [invoiceParticulars, setInvoiceParticulars] = useState([]);

  function fetchInvoicesData() {
    fetch(apiUrl + "/" + "invoices")
      .then((res) => res.json())
      .then((data) => setInvoiceParticulars(data))
      .catch((error) => console.error("Error fetching data:", console.error));
  }

  useEffect(() => {
    fetchInvoicesData();
  }, []);
  const [salesCustomerData, setSalesData] = useState([]);

  useEffect(() => {
    const salesCustomerData = invoiceParticulars.filter(
      (item: any) => item.invoiceNum == id
    );
    setSalesData(salesCustomerData);
  }, [invoiceParticulars]);
  console.log("salesCustomerData", salesCustomerData);
  ////
  const printEvent = () => {
    window.print();
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col className=" h2 pb-3">View Sales Invoice</Col>
        </Row>
        <Row>
          <Col>PAN</Col>
          <Col>Name</Col>
          <Col>Age</Col>
          <Col>Mobile</Col>
          <Col>Email</Col>
          <Col>Address</Col>
        </Row>
        <Row>
          {salesCustomerData.map((item: any) => (
            <>
              <Col>
                <label>{item.uNo}</label>
              </Col>
              <Col>
                <label>{item.nameOfParty}</label>
              </Col>
              <Col>
                <label>{item.age}</label>
              </Col>
              <Col>
                <label>{item.mobile}</label>
              </Col>
              <Col>
                <label>{item.email}</label>
              </Col>
              <Col>
                <label>{item.address}</label>
              </Col>
            </>
          ))}
        </Row>

        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table
              striped
              bordered
              hover
              variant="dark"
              className="text-center"
            >
              <thead>
                <tr>
                  {/* <th>S.No</th> */}
                  <th>Medicine Name</th>
                  <th>Quantity</th>
                  <td>Purchase Amount</td>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalesTransactionsData.map(
                  (item: any, index: number) => (
                    <tr key={`${item.invoiceNum}-${index}`}>
                      {/* <td>{item.id}</td> */}
                      <td>{item.medicineName}</td>
                      <td>{item.quantity}</td>
                      <td>{item.amount}</td>
                      <td>{item.quantity * item.amount}</td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={8}></Col>
          <Col md={4}>
            <h6>Total Purchase Amount(₹):{GrandtotalSumAmount}</h6>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={8}></Col>
          <Col md={4}>
            <h6>Total Quantity:{totalNoOfMedicines}</h6>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={8}></Col>
          <Col md={4}>
            <h6>Grand Total(₹):{GrandtotalSumAmount}</h6>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end pt-3 pb-2">
            <Button
              variant="primary"
              className="py-1 px-5"
              onClick={printEvent}
            >
              Print
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ViewPurchaseInvoicePage;
