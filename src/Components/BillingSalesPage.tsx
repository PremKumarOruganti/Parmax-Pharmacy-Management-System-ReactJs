import react, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Container, Row, Col, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import Form from "react-bootstrap/Form";
const BillingSales = () => {
  //Api Url
  const apiUrl = "http://localhost:5000";

  function uuidv41() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: any) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  const GUID1: any = uuidv4();
  const [GUID, setNewGuid] = useState(GUID1);

  /// Current Date ///
  const currentDate = new Date();
  const currentFormatedDate = currentDate.toISOString();

  const [invoicesData, setInvoicesData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  const [medicinesData, setMedicinesData] = useState([]);
  const [editData1, setEditData1] = useState(false);

  const [totalAmount, setTotalAmount] = useState(0);
  const [TotalQuantity, setTotalQuantity] = useState(0);
  //edit
  const [editData, setEditData] = useState<{
    editId: any;
    transactionType: string;
    medicineName: any;
    description: any;
    quantity: any;
    amount: any;
    totalAmount: any;
    invoiceNum: any;
  } | null>(null);

  const [invoiceFormData, setInvoiceFormData] = useState({
    uNo: "",
    nameOfParty: "",
    age: 0,
    mobile: 0,
    email: "",
    address: "",
    transactionType: "Sales",
    totalQuantity: 0,
    totalAllAmounts: 0,
    date: currentFormatedDate,
    invoiceNum: GUID,
  });
  // "id": 3,
  //     "uNo": "fdghdf",
  //     "nameOfParty": "jeevan",
  //     "age": 25,
  //     "mobile": 3749462345,
  //     "email": "jeevan@gmail.com",
  //     "address": "chittoor",
  //     "transactionType": "Sales",
  //     "totalQuantity": 32,
  //     "totalAllAmounts": 204,
  //     "date": "2023-11-30T09:12:23.986Z",
  //     "invoiceNum": "2adbbf2d-3bf2-4628-8115-69fddc8d92f2"

  const [savedData, setSavedData] = useState<any[]>([]); // Explicitly specify the type as an array of any

  const [selectedMedicine, setSelectedMedicine] = useState({
    medicineName: "--Select--",
    description: "",
    price: 0,
  });

  const [quantity, setQuantity] = useState(0);

  const handleMedicineSelection = (e: any) => {
    const selectedMedicineName = e.target.value;
    const selectedMedicineData = medicinesData.find(
      (medicine: any) => medicine.medicineName === selectedMedicineName
    );

    setSelectedMedicine(
      selectedMedicineData || { medicineName: "", description: "", price: 0 }
    );
  };
  //GUID
  function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: any) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  //Save Button
  const handleSaveAndUpdate = () => {
    setEditData1(false);
    const totalAmountForItem = quantity * selectedMedicine.price;
    const newGuId = uuidv4();

    const newData = {
      editId: newGuId,
      transactionType: "Sales",
      medicineName: selectedMedicine.medicineName,
      description: selectedMedicine.description,
      quantity: quantity,
      amount: selectedMedicine.price,
      totalAmount: totalAmountForItem,
      invoiceNum: GUID,
    };

    // Edit event
    if (editData) {
      setSavedData((prevSavedData: any[]) =>
        prevSavedData.map((item: any) =>
          item.editId === editData.editId ? newData : item
        )
      );
      setEditData(null);
    } else {
      setSavedData((prevSavedData: any) => [...prevSavedData, newData]);
    }

    const updatedTotalAmountSum = [
      ...savedData.filter((item) => item.editId !== editData?.editId),
      newData,
    ].reduce((sum, data) => sum + data.totalAmount, 0);

    const updatedTotalQuantitySum = [
      ...savedData.filter((item) => item.editId !== editData?.editId),
      newData,
    ].reduce((sum, data) => sum + parseInt(data.quantity), 0);

    setTotalAmount(updatedTotalAmountSum);
    setTotalQuantity(updatedTotalQuantitySum);

    setSelectedMedicine({
      medicineName: "--Select--",
      description: "",
      price: 0,
    });
    setQuantity(0);
  };
  const handleEdit = (item: any) => {
    setEditData1(true);
    setEditData({
      editId: item.editId || null,
      transactionType: "Sales",
      medicineName: item.medicineName,
      description: item.description,
      quantity: item.quantity,
      amount: item.amount,
      totalAmount: item.totalAmount,
      invoiceNum: item.invoiceNum,
    });
    setSelectedMedicine({
      medicineName: item.medicineName,
      description: item.description,
      price: item.amount,
    });
    setQuantity(item.quantity);
  };
  // quantity

  console.log("savedData234", savedData);

  //Getting TransactionsData from Api

  const fetchTransactionsData = async () => {
    try {
      const response = await fetch(apiUrl + "/" + "transactions");
      const result = await response.json();
      setTransactionsData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Getting InvoiceData from  from Api
  const fetchInvoiceData = async () => {
    try {
      const response = await fetch(apiUrl + "/" + "invoices");
      const result = await response.json();
      setInvoicesData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Getting manageMedicines from  from Api
  const fetchMedicinesDataData = async () => {
    try {
      const response = await fetch(apiUrl + "/" + "manageMedicines");
      const result = await response.json();
      setMedicinesData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInvoiceData();
    fetchTransactionsData();
    fetchMedicinesDataData();
  }, []);
  //Field Change event
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInvoiceFormData({
      ...invoiceFormData,
      [name]: value,
    });
  };

  const generateNewGUID = () => {
    const newGUID = uuidv4();
    setNewGuid(newGUID);
    return newGUID;
  };

  //handleSubmit
  const handleSubmit = async () => {
    // Calculate totalQuantity and totalAllAmounts
    const updatedTotalQuantitySum = savedData.reduce(
      (sum, data) => sum + parseInt(data.quantity),
      0
    );
    const updatedTotalAmountSum = savedData.reduce(
      (sum, data) => sum + data.totalAmount,
      0
    );

    setTotalQuantity(updatedTotalQuantitySum);
    setTotalAmount(updatedTotalAmountSum);

    setInvoiceFormData({
      ...invoiceFormData,
      totalQuantity: updatedTotalQuantitySum,
      totalAllAmounts: updatedTotalAmountSum,
    });
    const newInvoiceFormData = {
      ...invoiceFormData,
      totalQuantity: updatedTotalQuantitySum,
      totalAllAmounts: updatedTotalAmountSum,
    };
    console.log("invoiceFormData", invoiceFormData);
    console.log("newInvoiceFormData", newInvoiceFormData);
    // Generate a new GUID
    const newGUID = generateNewGUID();
    try {
      const response = await fetch(apiUrl + "/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInvoiceFormData),
      });
      saveTransactionsToDatabase(savedData);
      //clearTransactionsFormData();
      setInvoiceFormData({
        uNo: "",
        nameOfParty: "",
        age: 0,
        mobile: 0,
        email: "",
        address: "",
        transactionType: "Sales",
        totalQuantity: 0,
        totalAllAmounts: 0,
        date: currentFormatedDate,
        invoiceNum: newGUID,
      });
      setSavedData([]);
      setQuantity(0); // Reset quantity state
      setSelectedMedicine({
        medicineName: "",
        description: "",
        price: 0,
      });
      setTotalAmount(0);
      setTotalQuantity(0);

      // Handle response or update UI accordingly
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  async function saveTransactionsToDatabase(transactionArray: any) {
    for (const transaction of transactionArray) {
      await saveTransactionToDatabase(transaction);
    }

    console.log("All transactions saved to the database.");
  }

  async function saveTransactionToDatabase(transactionData: any) {
    try {
      const response = await fetch(apiUrl + "/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        console.log("Transaction saved successfully:", transactionData);
      } else {
        console.error("Failed to save transaction:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  }

  console.log("editData", editData);

  /// Cancel Event ///
  const CancelEvent = () => {
    setSelectedMedicine({
      medicineName: "--Select--",
      description: "",
      price: 0,
    });
    setQuantity(0);
  };
  /// Delete Event ///
  const deleteEvent = (id: any) => {
    let confirmval = confirm(
      "Are you sure , Do you want to delete this item ?"
    );
    if (confirmval) {
      if (savedData) {
        let newSavedData = savedData.filter((item: any) => item.editId != id);
        setSavedData(newSavedData);
      } else {
        alert("ID is not found");
      }
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col className=" h2 pb-3">Sales Billing Page</Col>
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
          <Col>
            <input
              type="text"
              className="form-control py-1"
              placeholder="Enter PAN number"
              name="uNo"
              value={invoiceFormData.uNo}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control py-1"
              placeholder="Enter name"
              name="nameOfParty"
              value={invoiceFormData.nameOfParty}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <input
              type="number"
              className="form-control py-1"
              placeholder="Enter age"
              name="age"
              value={invoiceFormData.age}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <input
              type="number"
              className="form-control py-1"
              placeholder="Enter mobile number"
              name="mobile"
              value={invoiceFormData.mobile}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control py-1"
              placeholder="Enter email"
              name="email"
              value={invoiceFormData.email}
              onChange={handleChange}
            />
          </Col>
          <Col md={2}>
            <textarea
              className="form-control py-1"
              placeholder="Enter address"
              name="address"
              value={invoiceFormData.address}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="pt-5">
          <Col md={4}>Medicine Name</Col>
          <Col md={3}>Description</Col>
          <Col>Amount</Col>
          <Col>Quantity</Col>
        </Row>
        <Row>
          <>
            <Col md={3}>
              <select
                className="form-control py-1 text-center"
                value={selectedMedicine.medicineName}
                onChange={(e) => handleMedicineSelection(e)}
              >
                <option value="--Select--">--Select--</option>
                {medicinesData.map((medicine: any) => (
                  <option key={medicine.id} value={medicine.medicineName}>
                    {medicine.medicineName}
                  </option>
                ))}
              </select>
            </Col>
            <Col md={3}>
              <textarea
                className="form-control py-1"
                placeholder="Enter description"
                name="description"
                value={selectedMedicine.description}
                disabled={!selectedMedicine.medicineName}
              />
            </Col>
            <Col>
              <input
                type="number"
                className="form-control py-1"
                placeholder="Enter amount per piece"
                name="amount"
                value={selectedMedicine.price}
                disabled={!selectedMedicine.medicineName}
              />
            </Col>
            <Col>
              <input
                type="number"
                className="form-control py-1"
                placeholder="Enter quantity"
                name="quantity"
                value={quantity}
                onChange={(e: any) => setQuantity(e.target.value)}
              />
            </Col>
          </>
        </Row>
        <Row>
          <Col className="pt-3 pr-4 d-flex justify-content-end">
            <Button className="py-1 px-5" onClick={handleSaveAndUpdate}>
              {editData1 ? "Update" : "Save"}
            </Button>
            &nbsp;&nbsp;
            {editData1 && (
              <Button className="py-1 px-5" onClick={CancelEvent}>
                Cancel
              </Button>
            )}
          </Col>
        </Row>

        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  {/* <th>Id</th> */}
                  <th>Medicine Name</th>
                  <th>Description</th>
                  <th>Amount per pease</th>
                  <th>Quantity</th>
                  <th>Total Amount</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {savedData.map((item: any, index: any) => (
                  <tr key={index}>
                    <td>{item.medicineName}</td>
                    <td>{item.description}</td>
                    <td>{item.amount}</td>
                    <td>{item.quantity}</td>
                    <td>{item.totalAmount}</td>
                    <td
                      className="text-primary"
                      onClick={() => handleEdit(item)}
                    >
                      {<BiEdit />}
                    </td>
                    <td
                      className="text-danger"
                      onClick={() => deleteEvent(item.editId)}
                    >
                      {<AiFillDelete />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={8}></Col>
          <Col md={4}>
            <h6>Total Purchase Amount (₹) : {totalAmount} </h6>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={8}></Col>
          <Col md={4}>
            <h6>Total Quantity :{TotalQuantity}</h6>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={8}></Col>
          <Col md={4}>
            <h6>Grand Total (₹) : {totalAmount}</h6>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end pt-3 pb-2">
            <Button
              variant="primary"
              className="py-1 px-5"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default BillingSales;
