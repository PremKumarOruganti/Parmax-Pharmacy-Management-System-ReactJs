import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import NavBar from "./NavBar";
import Footer from "./Footer";
import person1Image from "../assets/Images.ts/HomePagePerson1.jpg";
import person2Image from "../assets/Images.ts/HoemPagePerson_2.jpg";
import CategoryWiseSandAmountBargraph from "./CategoryWiseS,ABargraph";
import Table from "react-bootstrap/Table";

const userName = new URLSearchParams(location.search).get("userName");

interface modeProps {
  dataFromNav: boolean;
}

const PharmaxMainApp = ({ dataFromNav }: modeProps) => {
  /////
  const [userRole, setUserRole] = useState(false);
  //////////////////////////////////////////////////////////////////////
  // const setMA = (mode: boolean) => {
  //   setUserRole(mode);
  // };
  /////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (userName) {
      setUserRole(true);
    } else {
      setUserRole(false);
    }
    console.log("userName", userName);

    //   // const user = registrationData.find((user) => user.userName === userName);
    //   // if (user) {
    //   //   setUserRole(user.role);
    //   // }
  }, [userName]);
  ////
  const [displayMode, setDisplayMode] = useState(false);
  const setMode = (mode: boolean) => {
    setDisplayMode(mode);
  };
  //////////

  /////////
  //////fetchning sales Invoices
  const [stockdata, setStockData] = useState([]);
  const apiUrl = "http://localhost:5000";
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl + "/" + "invoices");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setStockData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log("invoices", stockdata);
  let grandTotalAmount = 0;
  let totalQuantity = 0;

  // Iterate through each sale invoice
  stockdata.forEach((invoice) => {
    // Add Grand Total Amount to the grandTotalAmount variable
    grandTotalAmount += invoice["Grand Total Amount"];

    // Add Total quantity to the totalQuantity variable
    totalQuantity += invoice["Total quantity"];
  });
  /////////
  /////////// Sales invoice
  const [saleInvoices, setSaleInvoices] = useState([]);

  // useEffect(() => {
  //   // Fetch data from your API
  //   fetch(apiUrl + "/" + "saleInvoices")
  //     .then((response) => response.json())
  //     .then((data) => setSaleInvoices(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);
  // console.log("salesInvoice", saleInvoices);

  ////////fetching customersData ///////
  const [customersData, setCustomersData] = useState([]);
  useEffect(() => {
    fetch(apiUrl + "/" + "customers")
      .then((res) => res.json())
      .then((data) => setCustomersData(data))
      .catch((error) => console.error("Error fetching data:", console.error));
  }, []);
  if (stockdata.length > 0) {
    var temp: string = "";
    stockdata.forEach((v: any, i: any) => {
      temp = `<tr><td>${v.id}</td><td>${v.vendorOrCustomerID}</td><td>${v.date}</td><td>${v.NoOfMedicines}</td><td>${v.totalQuantity}</td><td>${v.totalQuantity}</td><td>${v.totalQuantity}</td></tr>`;
    });
    //document.getElementById("data").innerHTML = temp;
    document.getElementById("data")!.innerHTML = temp;
  }
  return (
    <Container
      fluid
      className={`bg-body-tertiary p-0 ${
        dataFromNav ? "light-Mode" : "dark-Mode"
      }`}
    >
      {/* <Row>
        <Col>
          <NavBar setMode={setMode} ManageAdmin={userRole} />
          <NavBar />
        </Col>
      </Row> */}

      <Row>
        <Col className="mx-0">
          <main>
            <Container
              fluid
              className={`bg-body-tertiary ${
                dataFromNav ? "light-Mode" : "dark-Mode"
              }`}
            >
              <Row>
                <Col md={6} className="pt-2">
                  <Row>
                    <Col>Total Sales Invoice:{totalQuantity}</Col>
                    <Col md={1}>|</Col>
                    <Col>Total Amount:{grandTotalAmount}</Col>
                    {/* <Col md={3} className="pb-2">
                      <select className="form-control py-0 h-100 bg-warning">
                        <option>Today</option>
                        <option>Yesterday</option>
                        <option>This week</option>
                        <option>This Month</option>
                        <option>This year</option>
                      </select>
                    </Col> */}
                  </Row>
                </Col>
                {/* <Col md={6} className="pt-2 pb-2 bg-danger"> */}
                <Col
                  md={6}
                  className={`pt-2 pb-2 ${
                    dataFromNav ? "light-Mode" : "dark-Mode"
                  }`}
                >
                  <Row>
                    <Col>
                      Barchart:
                      {/* <CategoryWiseSandAmountBargraph salesData={saleInvoices} /> */}
                    </Col>
                    {/* <Col md={3} className="pb-2 mr-3">
                      <select className="form-control py-0 h-100 bg-danger">
                        <option>Today</option>
                        <option>Yesterday</option>
                        <option>This week</option>
                        <option>This Month</option>
                        <option>This year</option>
                      </select>
                    </Col> */}
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col className="mx-0">
                  <Row>
                    <h5>Recent sales invoice :</h5>
                  </Row>
                  <Row>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Name</th>
                          <th>Mobile</th>
                          <th>No of medicines</th>
                          <th>Total quantity</th>
                          <th>Grand Total Amount</th>
                          <th>Invoicetype</th>
                        </tr>
                      </thead>
                      <tbody id="data">
                        <tr>
                          <td>1</td>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Mark</td>
                          <td>Larry the Bird</td>
                          <td>@twitter</td>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Row>
                  export default BasicExample;
                </Col>
              </Row>
              <Row>
                <Col className="">
                  <input
                    type="text"
                    placeholder="Search for the Medicines and Health Products...."
                    className="w-100 h-100 b-0 py-2 form-control"
                  />
                </Col>
              </Row>
              <Row>
                <Col className="text-center fs-5 h1">Carousel</Col>
              </Row>
              <Row>
                <Col className="text-center fs-5 h1">TESTIMONIALS</Col>
              </Row>
              <Row>
                <Col className="text-center w-25">
                  <Image
                    src={person1Image}
                    alt="Img"
                    className="w-25"
                    roundedCircle
                  />
                </Col>
              </Row>
              <Row>
                <Col md={3}>&nbsp;</Col>
                <Col className="text-center" md={6}>
                  “Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Nemo omnis voluptatem consectetur quam tempore obcaecati
                  maiores voluptate aspernatur iusto eveniet, placeat ab quod
                  tenetur ducimus. Minus ratione sit quaerat unde.”
                  <br />— "Kelly Holmes"
                </Col>
                <Col md={3}>&nbsp;</Col>
              </Row>
              <Row>
                <Col className="text-center w-25">
                  <Image
                    src={person2Image}
                    alt="Img"
                    className="w-25"
                    roundedCircle
                  />
                </Col>
              </Row>
              <Row>
                <Col md={3}>&nbsp;</Col>
                <Col className="text-center" md={6}>
                  “It is a long established fact that a reader will be
                  distracted by the readable content of a page when looking at
                  its layout. The point of using Lorem Ipsum is that it has a
                  more-or-less normal distribution of letters, as opposed to
                  using 'Content here, content here', making it look like
                  readable English”
                  <br />— "Rebecca Morando"
                </Col>
                <Col md={3}>&nbsp;</Col>
              </Row>
              <Row>
                <Col></Col>
              </Row>
            </Container>
          </main>
        </Col>
      </Row>
      {/* Footer */}
      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
};

export default PharmaxMainApp;
