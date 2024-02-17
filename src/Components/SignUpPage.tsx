import React, { useState } from "react";

import { useRef } from "react";
import FirstHomePage from "./SigninPage";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate, Navigate } from "react-router-dom";
//let arr1=localStorage.setItem('data',[]);
const SignUpPage = () => {
  const newUserName = useRef<HTMLInputElement>(null);
  const newUserEmail = useRef<HTMLInputElement>(null);
  const newUserPassword = useRef<HTMLInputElement>(null);

  const Navigate = useNavigate();

  const registerVerification = () => {
    const localArr = JSON.parse(localStorage.getItem("data") || "[]");

    let validUserName = localArr.find(
      (item: any) =>
        item.userName.toUpperCase() === newUserName.current?.value.toUpperCase()
    );
    console.log("validUserName", validUserName);

    //let validUserNameInUpperCase = validUserName.toUpperCase();
    //console.log(validUserNameInUpperCase);
    console.log("validUserName", validUserName);
    if (validUserName) {
      alert("Please try with another user name");
    } else if (
      newUserName.current?.value == "" &&
      newUserEmail.current?.value == "" &&
      newUserPassword.current?.value == ""
    ) {
      alert("Please enter the all fields");
    } else {
      const newContact = {
        userName: newUserName.current?.value,
        userEmail: newUserEmail.current?.value,
        userPassword: newUserPassword.current?.value,
      };

      let localArr1 = localStorage.getItem("data");
      let arr2 =
        localArr1 == "" || localArr1 == null || localArr1 == undefined
          ? []
          : JSON.parse(localArr1);
      arr2.push(newContact);
      console.log(arr2);
      localStorage.setItem("data", JSON.stringify(arr2));
      let registerSuccessfullAlert = alert("Your registration is successful"); //

      clearIN();

      Navigate("/");
    }
  };

  function clearIN() {
    let UN = document.getElementById("userName") as HTMLInputElement | null;
    let UE = document.getElementById("userEmail") as HTMLInputElement | null;
    let UP = document.getElementById("userPassword") as HTMLInputElement | null;

    if (UN) {
      UN.value = "";
    }
    if (UE) {
      UE.value = "";
    }
    if (UP) {
      UP.value = "";
    }
  }

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center mt-0"
      style={{ height: "100vh", backgroundColor: "#E2CF81" }}
    >
      <Form
        className="p-4 rounded mt-0"
        style={{
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form.Group className="mb-3">
          <Form.Control
            placeholder="Enter User Name"
            type="text"
            id="userName"
            ref={newUserName}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            placeholder="Enter Email"
            type="email"
            id="userEmail"
            ref={newUserEmail}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            id="userPassword"
            placeholder="Enter Password"
            type="password"
            ref={newUserPassword}
          />
        </Form.Group>
        {/* <Form.Group className="mb-3">
          <Form.Control
            id="reUserPassword"
            placeholder="Re-Enter Password"
            type="password"
            ref={newUserPassword}
          />
        </Form.Group> */}
        <Button
          variant="primary"
          onClick={registerVerification}
          style={{ width: "100%" }}
        >
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default SignUpPage;
