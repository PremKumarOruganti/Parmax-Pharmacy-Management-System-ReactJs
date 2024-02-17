import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import imgBc from "./../assets/Images.ts/img1.jpg";

interface User {
  userName: string;
  password: string;
  role: string;
  // Other properties if any
}

const FirstHomePage: React.FC = () => {
  const [IuserName, setUserName] = useState("");
  const [Ipassword, setPassword] = useState("");
  const [errordisplay, setErrorDisplay] = useState(false);

  const Navigate = useNavigate();
  const apiUrl = "http://localhost:5000";
  const [apiUserName, setApiUserName] = useState<User[]>([]);

  useEffect(() => {
    fetch(apiUrl + "/registrationData")
      .then((response) => response.json())
      .then((data) => setApiUserName(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const validateUser = () => {
    const userExists = apiUserName.filter(
      (item) => item.userName === IuserName && item.password === Ipassword
    );

    if (userExists.length > 0) {
      const user = userExists[0];

      alert("User exists");

      if (user.role === "Admin") {
        Navigate(`/?userName=${IuserName}`);
      } else if (user.role === "Employee") {
        Navigate("/");
      } else {
        setErrorDisplay(true);
      }
    } else {
      setErrorDisplay(true);
    }
  };

  return (
    <Form>
      <Container fluid p-0>
        <Row style={{ backgroundColor: "#E2CF81" }}>&nbsp;</Row>

        <Row>
          <Col md={2} style={{ backgroundColor: "#E2CF81" }}></Col>
          <Col md={8} className="p-0">
            <Container fluid>
              <Row>
                <Col md={6} className="p-0">
                  <img
                    src={imgBc}
                    className="rounded"
                    alt="Cinque Terre"
                    id="img"
                    style={{ width: "100%" }}
                  />
                </Col>

                <Col md={6} id="secondBgColor">
                  <Container fluid>
                    <Row className="p-3">&nbsp;</Row>
                    <Row className="font-weight-bolder">
                      <Col md={12} className="text-center">
                        <h2>Welcome to the Pharmacy</h2>
                      </Col>
                    </Row>
                    <Row className="font-weight-bolder p-1">
                      <Col md={12} className="text-center">
                        <h6>
                          Always there for you to giving your Health a new Lift
                        </h6>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12} className="text-center p-1">
                        <input
                          className="form-control"
                          placeholder="Enter User Name"
                          type="text"
                          value={IuserName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12} className="text-center p-1">
                        <input
                          className="form-control"
                          placeholder="Enter Password"
                          type="Password"
                          value={Ipassword}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12} className="text-center"></Col>
                    </Row>
                    {errordisplay && (
                      <label className="text-danger">
                        Please enter correct User name and Password
                      </label>
                    )}
                    <Row>
                      <Col md={12} className="text-center py-3">
                        <Button
                          type="button"
                          className="btn btn-primary w-75 border-0"
                          id="btnColor"
                          onClick={validateUser}
                        >
                          Login
                        </Button>
                      </Col>
                    </Row>
                    <Row className="text-center font-weight-bolder p-3 mb-1">
                      <Col md={12}>
                        Not a member? <Link to="/signUpPage">Register Now</Link>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col md={2} style={{ backgroundColor: "#E2CF81" }}>
            &nbsp;
          </Col>
        </Row>

        <Row style={{ backgroundColor: "#E2CF81" }}>&nbsp;</Row>
      </Container>
    </Form>
  );
};

export default FirstHomePage;

// import React, { useRef, useState } from "react";
// import { Link } from "react-router-dom";

// const FirstHomePage = () => {
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");

//   const validateUser = () => {
//     const userN = useRef<HTMLInputElement>(null);
//     const userP = useRef<HTMLInputElement>(null);

//     const localStorageArr = JSON.parse(localStorage.getItem("data") || "[]");

//     const userExists = localStorageArr.some(
//       (item: any) => item.userName === userN.current?.value
//     );

//     if (userExists) {
//       alert("User exists");
//       <Link to="/homePage"></Link>;
//       // Perform navigation programmatically here
//     } else {
//       alert("No such user");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="input_space">
//         <input
//           placeholder="Enter User Name"
//           type="text"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//         />
//       </div>
//       <div className="input_space">
//         <input
//           placeholder="Enter Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <button onClick={validateUser}>Login</button>

//       <div>
//         Not a member? <Link to="/signUpPage">Register Now</Link>
//       </div>
//     </div>
//   );
// };

// export default FirstHomePage;

// import React, { useRef } from "react";
// import SignUpPage from "./SignUp";
// import ReactDOM from "react-dom/client";
// import { Link } from "react-router-dom";
// import RegisterPage from "./RegisterPage";
// import App1 from "./App1";
// import "./SigntUpCss.css";

// function validateUser() {
//   const userN = useRef<HTMLInputElement>(null);
//   const userP = useRef<HTMLInputElement>(null);

//   const localStorageArr = JSON.parse(localStorage.getItem("data") || "[]");

//   const userExists = localStorageArr.map(
//     (item: any) => item.userName === userN.current?.value
//   );

//   if (userExists) {
//     alert("userExists");
//     <Link to="/homePage">logIn</Link>;
//   } else {
//     alert("No such user");
//   }
// }

// const FirstHomePage = () => {
//   return (
//     <div className="container">
//       <div className="input_space">
//         <input placeholder="Enter User Name" type="text" />
//       </div>
//       <div className="input_space">
//         <input placeholder="Enter Password" type="password" />
//       </div>
//       <button onClick={validateUser}>login</button>

//       <div>
//         Not a member?<Link to="/signUpPage">Register Now</Link>
//       </div>
//     </div>
//   );
// };

// export default FirstHomePage;
