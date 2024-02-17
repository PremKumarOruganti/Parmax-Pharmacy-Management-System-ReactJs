import React from "react";
import NavBar from "./NavBar";
import { Container, Row, Col, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

const ManageCategory = () => {
  //////Model/////
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [showEdit, setShowEdit] = useState(false);
  //////

  const [formData, setFormData] = useState({
    id: null,
    categoryName: "",
    status: "",
  });

  const [exitStingData, setExitStingData] = useState(null);

  const [manageCategory, setManageCategory] = useState([]);
  const apiUrl = "http://localhost:5000";

  //////// fetch data from Rest api
  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch(apiUrl + "/" + "manageCategories")
      .then((res) => res.json())
      .then((data) => setManageCategory(data))
      .catch((error) => console.error("Error fetching data:", console.error));
  }
  ///////Save Changes On click POST data///////
  // const saveEvent = () => {
  //   fetch(apiUrl + "/" + "manageCategories", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newCategory),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         console.log("Data sent Successfully", newCategory);
  //         fetchData();
  //         handleClose(); // Close the modal here
  //       } else {
  //         console.log("Failed to send Data");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error", error);
  //     });
  // };

  // mhghj

  const saveEvent = () => {
    const newCategory = {
      categoryName: formData.categoryName,
      status: formData.status,
    };
    let method = "POST";
    let url = apiUrl + "/manageCategories";

    if (showEdit) {
      // If editing, switch to PUT method and update the URL
      method = "PUT";
      url += "/" + formData.id;
    }

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    })
      .then((response) => {
        if (response.ok) {
          console.log(
            `Data ${showEdit ? "Updated" : "Added"} Successfully`,
            newCategory
          );
          fetchData();
          handleClose();
        } else {
          console.log(`Failed to ${showEdit ? "update" : "add"} Data`);
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  ///////////DeleteEvent/////
  const deleteEvent = (deleteId: any) => {
    console.log("idToDelete", deleteId);
    let confirmval = confirm(
      "Are you sure , Do you want to delete this item ?"
    );
    if (confirmval) {
      fetch(apiUrl + "/manageCategories/" + deleteId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(manageCategory),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Data Deleted Successfully", manageCategory);
            fetchData();
            handleClose(); // Close the modal here
          } else {
            console.log("Failed to delete Data. Status:", response.status);
          }
        })
        .catch((error) => {
          console.error("Error", error);
        });
    } else {
      alert("Item is not deleted");
    }
  };

  const handleShow = () => {
    setShow(true);
    setShowEdit(false);
    setFormData({
      id: null,
      categoryName: "",
      status: "",
    });
  };

  //////Edit Event/////
  const editEvent = (editAllData: any) => {
    setShow(true);
    setShowEdit(true);
    setFormData(editAllData);
  };

  const handleChange = (event: any) => {
    // const { name, value } = event.target;

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  console.log("formData", formData);

  return (
    <div>
      {/* <NavBar /> */}
      <Container fluid className="p-0 mt-2">
        <Row>
          <Col className="d-flex justify-content-end mr-3">
            <Button
              variant="primary"
              className="py-2 px-2"
              onClick={handleShow}
            >
              Category +
            </Button>
            {/* Categoty Model */}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {showEdit ? "Edit Category" : "New Category"}
                </Modal.Title>
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
                      name="categoryName"
                      value={formData.categoryName}
                      onChange={(e) => handleChange(e)}
                    />
                  </Col>
                  <Col md={6}>
                    <select
                      className="form-control"
                      name="status"
                      value={formData.status}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="Choose..">Choose..</option>
                      <option value={"Active"}>Active</option>
                      <option value={"Inactive"}>Inactive</option>
                    </select>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  <span onClick={() => saveEvent()}>
                    {showEdit ? "Update" : "Save"}
                  </span>
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
                  <th>Id</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {/* <tbody id="categotyData"> */}
              <tbody>
                {manageCategory.map((eachData: any) => (
                  <>
                    <tr key={eachData.id}>
                      <td>{eachData.id}</td>
                      <td>{eachData.categoryName}</td>
                      <td>{eachData.status}</td>
                      <td
                        className="text-primary"
                        onClick={() => editEvent(eachData)}
                      >
                        {<BiEdit />}
                      </td>
                      <td
                        className="text-danger"
                        onClick={() => deleteEvent(eachData.id)}
                      >
                        {<AiFillDelete />}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default ManageCategory;
