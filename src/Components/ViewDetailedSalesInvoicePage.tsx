import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";

const ViewDetailedSalesInvoicePage = () => {
  const location = useLocation();
  // const invoiceNum = new URLSearchParams(location.search).get("invoiceNum");
  const { id }: any = useParams();

  //alert({ id });
  /////fetching Invoice data from API //////
  const apiUrl = "http://localhost:5000";
  const [transcations, settranscations] = useState([]);
  console.log("transcations", transcations);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch(`${apiUrl}/transactions/`)
      .then((res) => res.json())
      .then((data) => settranscations(data))
      .catch((error) => console.error("Error fetching data:", error));
  }

  console.log("selectedInvoiceTest", transcations);

  let filteredSalesData = transcations.filter(
    (item: any) => item.invoiceNum === id
  );

  console.log("filteredData11", filteredSalesData);

  return (
    <div>
      <Container fluid className="p-0">
        <Row>
          <Col className="d-flex justify-content-end mr-3"></Col>
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
                  <th>invoiceNum</th>
                  <th>Medicine Name</th>
                  <th>Quantity</th>
                  <td>Purchase Amount</td>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalesData.map((item: any) => (
                  <tr key={item.invoiceNum}>
                    <td>{item.invoiceNum}</td>
                    <td>{item.medicineName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.amount}</td>
                    <td>{item.quantity * item.amount}</td>
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

export default ViewDetailedSalesInvoicePage;
