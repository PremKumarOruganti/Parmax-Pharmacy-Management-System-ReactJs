import react from "react";
import { useEffect, useState } from "react";
import { Row, Container, Col, Table, Button } from "react-bootstrap";
import NavBar from "./NavBar";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";

const PurchaseInvoice = () => {
  //   //////Model/////
  //   const [show, setShow] = useState(false);
  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);
  //   ////
  //////Model/////
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [showEdit, setShowEdit] = useState(false);
  //////
  const [categorty, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    // categoryId: "",
    // categoryName: "",
    selectCategory: "",
    description: "",
    price: "",
    selectStatus: "",
    medicineName: "",
  });
  /////
  const apiUrl = "http://localhost:5000";
  const [medicineData, setMedicineData] = useState([]);
  console.log("medicineData", medicineData);

  const medicineButtonEvent = () => {
    alert("Medicine");
  };

  useEffect(() => {
    fetchData();
    fetchManageMedicinesData();
  }, []);

  function fetchData() {
    fetch(apiUrl + "/" + "manageMedicines")
      .then((res) => res.json())
      .then((data) => setMedicineData(data))
      .catch((error) => console.error("Error fetching data:", console.error));
  }

  /////fetching manageMedicines Data///////

  function fetchManageMedicinesData() {
    fetch(apiUrl + "/" + "manageCategories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) =>
        console.error("Error while fetching categorty :", console.error)
      );
  }
  console.log("categorty", categorty);

  //////////////////
  const editEvent = (editAllData: any) => {
    setShow(true);
    setShowEdit(true);
    setFormData(editAllData);
  };

  ////saveChange Event and POST the data to the api /////
  const [newCategoryId, setNewCategoryId] = useState("");
  const [newMedicineName, setNewMedicineName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const newMedicine = {
    medicineName: newMedicineName,
    // categoryId: newCategoryId,
    description: newDescription,
    price: newPrice,
    status: newStatus,
  };
  //   const saveChangeEvent = () => {
  //     fetch(apiUrl + "/" + "manageMedicines", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newMedicine),
  //     }).then((response) => {
  //       if (response.ok) {
  //         console.log("Data Sent Successfully", newMedicine);
  //         fetchData();
  //         setNewCategoryId("");
  //         setNewMedicineName("");
  //         setNewDescription("");
  //         setNewPrice("");
  //         setNewStatus("");
  //         handleClose(); // Close the modal here
  //       } else {
  //         console.log("Failed to send data");
  //       }
  //     });
  //   };
  //////// New data and Update data////
  const saveEvent = () => {
    const newMedicine = {
      id: null,
      //   categoryId: formData.categoryId,
      //   categoryName: formData.categoryName,
      selectCategory: formData.selectCategory,
      description: formData.description,
      price: formData.price,
      selectStatus: formData.selectStatus,
      medicineName: formData.medicineName,
    };
    let method = "POST";
    let url = apiUrl + "/manageMedicines";
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
      body: JSON.stringify(newMedicine),
    })
      .then((response) => {
        if (response.ok) {
          console.log(
            `Data ${showEdit ? "Updated" : "Added"} Successfully`,
            newMedicine
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

  //////////
  ///////////DeleteEvent/////
  const deleteEvent = (deleteId: any) => {
    console.log("idToDelete", deleteId);
    let confirmval = confirm(
      "Are you sure , Do you want to delete this item ?"
    );
    if (confirmval) {
      fetch(apiUrl + "/manageMedicines/" + deleteId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },

        // body: JSON.stringify(newMedicine),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Data Deleted Successfully", newMedicine);
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
  const handleChange = (event: any) => {
    // const { name, value } = event.target;

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  ////////////
  const addMedicineEvent = () => {
    setShow(true);
    setShowEdit(false);
    setFormData({
      id: null,
      //   categoryId: "",
      //   categoryName: "",
      selectCategory: "",
      description: "",
      price: "",
      selectStatus: "",
      medicineName: "",
    });
  };
  //

  return (
    <div>
      {/* <NavBar /> */}
      <Container fluid className="p-0 mt-2">
        <Row>
          <Col className="d-flex justify-content-end mr-3 h4">
            <Button onClick={addMedicineEvent}>Medicine +</Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>
                  {showEdit ? "Edit Medicine" : "New Medicine"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col md={6}>Medicine Name</Col>
                  <Col md={6}>Category</Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <input
                      type="text"
                      placeholder="Enter Medicine Name"
                      className="form-control"
                      name="medicineName"
                      value={formData.medicineName}
                      onChange={(e) => handleChange(e)}
                    />
                  </Col>
                  <Col md={6}>
                    <select
                      className="form-control"
                      name="selectCategory"
                      value={formData.selectCategory}
                      onChange={(e) => handleChange(e)}
                    >
                      <option>Select</option>
                      {categorty &&
                        categorty.length > 0 &&
                        categorty.map((eachOption: any) => (
                          <>
                            <option key={eachOption.id}>
                              {eachOption.categoryName}
                            </option>
                          </>
                        ))}
                    </select>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>Description</Col>
                  <Col md={6}>Price</Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <input
                      type="text"
                      placeholder="Enter Description"
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={(e) => handleChange(e)}
                    />
                  </Col>
                  <Col md={6}>
                    <input
                      type="number"
                      placeholder="Enter Price"
                      className="form-control"
                      name="price"
                      value={formData.price}
                      onChange={(e) => handleChange(e)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>Status</Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <select
                      className="form-control"
                      name="selectStatus"
                      value={formData.selectStatus}
                      onChange={(e) => handleChange(e)}
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
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Medicine Name</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {medicineData.map((item: any) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.medicineName}</td>
                    <td>{item.selectCategory}</td>
                    {/* <td>{item.categoryId}</td> */}
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.selectStatus}</td>
                    <td
                      className="text-primary"
                      onClick={() => editEvent(item)}
                    >
                      <BiEdit />
                    </td>
                    <td
                      className="text-danger"
                      onClick={() => deleteEvent(item.id)}
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
export default PurchaseInvoice;
