import react, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Container, Row, Col, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import Form from "react-bootstrap/Form";
const Billing = ({}) => {
  //////Fetching data////
  const apiUrl = "http://localhost:5000";
  const [invoiceData, setInvoiceData] = useState([]);

  function fetchData() {
    fetch(apiUrl + "/" + "invoices")
      .then((res) => res.json())
      .then((data) => setInvoiceData(data))
      .catch((error) => console.error("Error fetching data:", console.error));
  }

  useEffect(() => {
    fetchData();
  }, []);

  ///Taking data from Input boxes ///
  /////// Generating UUID /////

  function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: any) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  const GUID1: any = uuidv4();
  const [GUID, setNewGuid] = useState(GUID1);

  console.log("GUID", GUID);

  /// Current Date ///
  const currentDate = new Date();
  const currentFormatedDate = currentDate.toISOString();

  //// Getting total Amount ///
  const [GrandtotalSumAmount, setGrandtotalSumAmount] = useState();
  ////Getting total no of Medicines////
  const [totalNoOfMedicines, setTotalNoOfMedicines] = useState();
  // Save data to localStorage

  const [selectedMedicine, setSelectedMedicine] = useState<{
    price: number;
    description: string;
  } | null>(null);

  //new GUID
  // const [newGuid, setNewGuid] = useState(null);

  const [invoiceFormData, setInvoiceFormData] = useState({
    id: 0,
    uNo: "",
    nameOfParty: "",
    age: "",
    mobile: "",
    email: "",
    address: "",
    transactionType: "Sales",
    totalQuantity: totalNoOfMedicines,
    totalAllAmounts: GrandtotalSumAmount,
    date: currentFormatedDate,
    invoiceNum: GUID,
  });

  const InvoiceDataHandelChange = (event: any) => {
    setInvoiceFormData({
      ...invoiceFormData,
      [event.target.name]: event.target.value,
    });
  };
  console.log("invoiceFormData", invoiceFormData);
  /////
  //
  // Get the actual length of the array

  ////////////
  // Get the current array from localStorage
  //const [localStotageLenght, setLocalStotageLenght] = useState<number>(0);
  //const saveGUID = GUID;
  const [transcationFormData, setTranscationFormData] = useState({
    //id: 0,
    transactionType: "Sales",
    medicineId: 0,
    medicineName: "",
    quantity: 0,
    amount: 0,
    invoiceNum: GUID,
    description: "",
  });

  const [editData, setEditData] = useState<any>(0);
  // const transcationDataHandelChange = (event: any) => {
  //   const { name, value } = event.target;

  //   setTranscationFormData((prevData: any) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));

  //   // If in edit mode, update the editData state

  //   if (editData) {
  //     const updatedEditData = [...editData];
  //     updatedEditData[0][name] = value;
  //     setEditData(updatedEditData);
  //   }
  // };
  // console.log("transcationFormData969799", transcationFormData);

  //// Save Event/////
  function calculateTotalQuantityAndAmount() {
    const storedData = localStorage.getItem("transactionData");
    const existingData = storedData ? JSON.parse(storedData) : [];

    // Calculate the sum of amounts from existing data
    const totalAmount = existingData.reduce(
      (sum: any, item: any) => sum + item.amount * item.quantity,
      0
    );
    // Set GrandtotalSumAmount
    setGrandtotalSumAmount(totalAmount);

    //// Calculating the total number of medicines
    const totalNoOfMedicines = existingData.reduce(
      (sum: any, item: any) => parseInt(sum) + parseInt(item.quantity),
      0
    );
    setTotalNoOfMedicines(totalNoOfMedicines);
  }
  useEffect(() => {
    calculateTotalQuantityAndAmount();
  }, []); // Empty dependency array ensures this effect runs once on mount

  ///

  const [transactionArrData, setTransactionArrData] = useState<any[]>([]);
  let saveGUID = GUID;

  const saveEvent = () => {
    const storedData = localStorage.getItem("transactionData");
    const existingData = storedData ? JSON.parse(storedData) : [];

    // Update the array with the new transaction data
    const updatedData = [...existingData, transcationFormData];

    // Update the state and localStorage with the updated array
    setTransactionArrData(updatedData);
    localStorage.setItem("transactionData", JSON.stringify(updatedData));
    //Calculating total amount and quantity
    calculateTotalQuantityAndAmount();
    // Reset the form data after saving
    setTranscationFormData({
      //id: nextId,
      transactionType: "Sales",
      medicineId: 0,
      medicineName: "",
      quantity: 0,
      amount: 0,
      invoiceNum: saveGUID,
      description: "",
    });
  };

  // Fetch data from localStorage on component mount
  ///

  ///
  const storedData = localStorage.getItem("transactionData");
  useEffect(() => {
    if (storedData) {
      setTransactionArrData(JSON.parse(storedData));
    }
    console.log("storedData", storedData);
  }, []);

  //// Save Event/////

  ///// sending data to the API on SUBMIT/////
  // const [tt, settt] = useState([]);
  // const transactionsArray = [
  //   {
  //     transactionType: "Salest1",
  //     medicineId: 123,
  //     quantity: 5,
  //   },
  //   {
  //     transactionType: "Salest2",
  //     medicineId: 456,
  //     quantity: 3,
  //   },

  //   // Add more transactions as needed
  // ];
  const localStorageData = localStorage.getItem("transactionData");
  let transactionsArray: any = [];

  if (localStorageData !== null) {
    transactionsArray = JSON.parse(localStorageData);
  }
  console.log("transactionsArray", transactionsArray);

  function deleteLocalStorage() {
    localStorage.clear();
  }

  const generateNewGUID = () => {
    const newGUID = uuidv4();
    setNewGuid(newGUID);
    return newGUID;
  };

  async function submitEvent() {
    const numericAge = parseInt(invoiceFormData.age as string, 10);
    const numericMobile = parseInt(invoiceFormData.mobile as string, 10);

    // Create a new object with numeric values
    const numericInvoiceData = {
      ...invoiceFormData,
      // uNo: numericPanNumber,
      age: numericAge,
      mobile: numericMobile,
    };

    // Generate a new GUID
    const newGUID = generateNewGUID();

    fetch(apiUrl + "/" + "invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(numericInvoiceData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data sent Successfully", numericInvoiceData);
          saveTransactionsToDatabase(transactionsArray);
          // saveTransactions();
          fetchData(); /// after posting data to api, calling the complete api to the web page

          // setNewGuid()
          deleteLocalStorage();
          setInvoiceFormData({
            id: 0,
            uNo: "",
            nameOfParty: "",
            age: "",
            mobile: "",
            email: "",
            address: "",
            transactionType: "Sales",
            totalQuantity: totalNoOfMedicines,
            totalAllAmounts: GrandtotalSumAmount,
            date: currentFormatedDate,
            invoiceNum: newGUID,
          });

          setTranscationFormData({
            //id: nextId,
            transactionType: "Sales",
            medicineId: 0,
            medicineName: "",
            quantity: 0,
            amount: 0,
            invoiceNum: newGUID,
            description: "",
          });
          setTransactionArrData([]);

          // deleteLocalStorage();
        } else {
          console.log("Failed to send Data");
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });

    ///// sending transactions data to API ////
    // Assume your array is stored in localStorage under the key 'myData'

    ///////////////////////////////////////////////////////////////////////////

    console.log("transactionArrData", transactionArrData);
    //setNewGuid(uuidv4());
  }
  //

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

  async function saveTransactionsToDatabase(transactionArray: any) {
    for (const transaction of transactionArray) {
      await saveTransactionToDatabase(transaction);
    }

    console.log("All transactions saved to the database.");
  }

  const storedData3 = localStorage.getItem("transactionData");

  ///

  ///
  const [tempEditId, setTempEditId] = useState(null);
  const editEvent = (id: any) => {
    alert(id);
    setTempEditId(id);
    if (storedData3) {
      let localData = JSON.parse(storedData3);
      let newEditData = localData.filter((item: any) => item.id == id);
      setEditData(newEditData.length > 0 ? newEditData : null);
    }
  };
  console.log("tempEditId", tempEditId);

  const cancelEvent = () => {
    // Reset the form data after saving
    setTranscationFormData({
      // id: 0,
      transactionType: "Sales",
      medicineId: 0,
      medicineName: "",
      quantity: 0,
      amount: 0,
      invoiceNum: 0,
      description: "",
    });
    // Reset the editData state
    setEditData(null);
  };

  const updateEvent = (id: number, index: number, event: any) => {
    const newEditData = [...editData];
    newEditData[index][event.target.name] = event.target.value;

    // Update the data in local storage
    const storedData = localStorage.getItem("transactionData");
    if (storedData) {
      let localData = JSON.parse(storedData);

      // Find the index of the item in localData array that needs to be updated
      const dataIndex = localData.findIndex(
        (item: any) => item.id === tempEditId
      );

      if (dataIndex !== -1) {
        const newDataArray = [...localData];
        newDataArray[dataIndex] = newEditData[index];

        // Update the state and localStorage with the updated array
        setTransactionArrData(newDataArray);
        localStorage.setItem("transactionData", JSON.stringify(newDataArray));

        // Reset the form data after saving
        setTranscationFormData({
          // id: 0,
          transactionType: "Sales",
          medicineId: 0,
          medicineName: "",
          quantity: 0,
          amount: 0,
          invoiceNum: 0,
          description: "",
        });
        // Reset the editData state
        setEditData(null);
        calculateTotalQuantityAndAmount();
      } else {
        console.error("Item with id not found in localData");
        // If needed, handle the case where the item is not found (e.g., show an error message)
      }
    }
  };

  console.log("editData", editData);
  const [updatedLocalStorage, setUpdatedLocalStorage] = useState([]);
  const deleteEvent = (id: number) => {
    let confirmval = confirm(
      "Are you sure , Do you want to delete this item ?"
    );
    if (confirmval) {
      if (storedData3) {
        let localData = JSON.parse(storedData3);
        let newLocalData = localData.filter((item: any) => item.id != id);
        //setUpdatedLocalStorage(newLocalData);
        localStorage.setItem("transactionData", JSON.stringify(newLocalData));
        setTransactionArrData(newLocalData);

        //storedData;
      } else {
        alert("ID is not found");
      }
    }
  };
  ///////////////////
  /// Medicines Data from API
  const [medicinesData, setMedicinesData] = useState([]);
  useEffect(() => {
    fetchMedicinesData();
  }, []);
  function fetchMedicinesData() {
    fetch(apiUrl + "/" + "manageMedicines")
      .then((res) => res.json())
      .then((data) => setMedicinesData(data))
      .catch((error) => console.error("Error fetching data:", console.error));
  }
  //handleMedicineChange
  // const [selectedMedicine, setSelectedMedicine] = useState<{
  //   price: number;
  //   description: string;
  // } | null>(null);

  // {
  //   price: 0,
  //   description: "",
  // }

  // const handleMedicineChange = (event: any) => {
  //   const selectedMedicineName = event.target.value;
  //   const selectedMedicineData = medicinesData.find(
  //     (medicine: any) => medicine.medicineName === selectedMedicineName
  //   );
  //   setSelectedMedicine(selectedMedicineData ?? null);
  // };

  const transcationDataHandelChange = (event: any) => {
    const { name, value } = event.target;
    const selectedMedicineName = event.target.value;
    const selectedMedicineData = medicinesData.find(
      (medicine: any) => medicine.medicineName === selectedMedicineName
    );
    setSelectedMedicine(selectedMedicineData ?? null);
    console.log("selectedMedicineData", selectedMedicineData);

    setTranscationFormData((prevData: any) => ({
      ...prevData,
      amount: selectedMedicine?.price,
      [name]: value,
    }));

    // If in edit mode, update the editData state

    if (editData) {
      const updatedEditData = [...editData];
      updatedEditData[0][name] = value;
      setEditData(updatedEditData);
    }
  };
  console.log("MainData", transcationFormData);

  return (
    <>
      {/* <NavBar /> */}
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
              className="form-control py-1 "
              placeholder="Enter PAN number"
              name="uNo"
              value={invoiceFormData.uNo}
              onChange={(e) => InvoiceDataHandelChange(e)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control py-1 "
              placeholder="Enter name"
              name="nameOfParty"
              value={invoiceFormData.nameOfParty}
              onChange={(e) => InvoiceDataHandelChange(e)}
            />
          </Col>
          <Col>
            <input
              type="number"
              className="form-control py-1 "
              placeholder="Enter age"
              name="age"
              value={invoiceFormData.age}
              onChange={(e) => InvoiceDataHandelChange(e)}
            />
          </Col>
          <Col>
            <input
              type="number"
              className="form-control py-1 "
              placeholder="Enter mobile number"
              name="mobile"
              value={invoiceFormData.mobile}
              onChange={(e) => InvoiceDataHandelChange(e)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control py-1 "
              placeholder="Enter email"
              name="email"
              value={invoiceFormData.email}
              onChange={(e) => InvoiceDataHandelChange(e)}
            />
          </Col>
          <Col md={2}>
            {/* <Form.Control as="textarea" rows={3} /> */}
            <textarea
              //type="text"
              className="form-control py-1"
              placeholder="Enter address"
              name="address"
              value={invoiceFormData.address}
              onChange={(e) => InvoiceDataHandelChange(e)}
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
          {editData ? (
            editData.map((item: any, index: number) => (
              <>
                <Col md={4}>
                  {medicinesData.map((item1: any) => (
                    <select
                      className="form-control py-1 text-center"
                      placeholder="Enter medicine name"
                      name="medicineName"
                      value={item.medicineName}
                      onChange={(e) => transcationDataHandelChange(e)}
                    >
                      <option>{item.medicineName}</option>
                      <option>Benzac 2.5%AC</option>
                      <option>Tretin 0.5%</option>
                      <option>Dot</option>
                      <option>Saradon</option>
                      <option>Vicks500</option>
                    </select>
                  ))}
                </Col>
                <Col md={3}>
                  <textarea
                    //  type="text"
                    className="form-control py-1"
                    style={{ width: "100%", height: "100px" }}
                    placeholder="Enter description"
                    name="description"
                    value={item.description}
                    onChange={(e) => transcationDataHandelChange(e)}
                  />
                </Col>
                <Col>
                  <input
                    type="number"
                    className="form-control py-1"
                    placeholder="Enter amount per piece"
                    name="amount"
                    value={item.amount}
                    onChange={(e) => transcationDataHandelChange(e)}
                  />
                </Col>
                <Col>
                  <input
                    type="number"
                    className="form-control py-1"
                    placeholder="Enter quantity"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => transcationDataHandelChange(e)}
                  />
                </Col>
              </>
            ))
          ) : (
            <>
              <Col md={4}>
                <select
                  className="form-control py-1 text-center"
                  placeholder="Enter medicine name"
                  name="medicineName"
                  value={
                    editData
                      ? editData[0].medicineName
                      : transcationFormData.medicineName
                  }
                  onChange={(e) => transcationDataHandelChange(e)}
                >
                  <option>--- Select ---</option>
                  {medicinesData.map((item2: any) => (
                    <>
                      <option>{item2.medicineName}</option>
                    </>
                  ))}
                </select>
              </Col>
              {/* <Col md={3}>
                <select
                  onChange={handleMedicineChange}
                  className="form-control py-1 text-center"
                >
                 
                  {medicinesData.map((medicine: any) => (
                    <option key={medicine.id} value={medicine.medicineName}>
                      {medicine.medicineName}
                    </option>
                  ))}
                </select>
              </Col> */}
              <Col md={3}>
                <textarea
                  // type="text"
                  className="form-control py-1"
                  placeholder="Enter description"
                  name="description"
                  // value={
                  //   editData
                  //     ? editData[0].description
                  //     : transcationFormData.description
                  // }
                  value={selectedMedicine?.description}
                  onChange={(e) => transcationDataHandelChange(e)}
                />
                {/* <Form.Control as="textarea" rows={3} /> */}
              </Col>
              <Col>
                <input
                  type="number"
                  className="form-control py-1"
                  placeholder="Enter amount per piece"
                  name="amount"
                  value={selectedMedicine?.price}
                  // value={
                  //   editData ? editData[0].amount : transcationFormData.amount
                  // }
                  onChange={(e) => transcationDataHandelChange(e)}
                />
              </Col>
              <Col>
                <input
                  type="number"
                  className="form-control py-1"
                  placeholder="Enter quantity"
                  name="quantity"
                  value={
                    editData
                      ? editData[0].quantity
                      : transcationFormData.quantity
                  }
                  onChange={(e) => transcationDataHandelChange(e)}
                />
              </Col>
            </>
          )}
        </Row>
        <Row>
          {editData ? (
            editData.map((item: any, index: number) => (
              <>
                <Col md={8}>&nbsp;</Col>
                <Col md={2} className="pt-3 text-right pr-0">
                  <Button className="py-1 px-5" onClick={cancelEvent}>
                    cancel
                  </Button>
                </Col>

                <Col md={2} className="pt-3 text-center">
                  <Button
                    className="py-1 px-5"
                    onClick={(event) => updateEvent(editData.id, index, event)}
                  >
                    Update
                  </Button>
                </Col>
              </>
            ))
          ) : (
            <Col className="pt-3 pr-4 d-flex justify-content-end">
              <Button className="py-1 px-5" onClick={saveEvent}>
                Save
              </Button>
            </Col>
          )}
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
                {transactionArrData &&
                  transactionArrData.length > 0 &&
                  transactionArrData.map((item: any) => (
                    <tr>
                      <td>{item.medicineName}</td>
                      <td>{item.description}</td>
                      <td>{item.amount}</td>
                      <td>{item.quantity}</td>
                      <td>{item.quantity * item.amount}</td>
                      <td
                        className="text-primary"
                        onClick={() => editEvent(item.id)}
                      >
                        {<BiEdit />}
                      </td>
                      <td
                        className="text-danger"
                        onClick={() => deleteEvent(item.id)}
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
            <h6>Total Purchase Amount (₹) : {GrandtotalSumAmount}</h6>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={8}></Col>
          <Col md={4}>
            <h6>Total Quantity : {totalNoOfMedicines}</h6>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={8}></Col>
          <Col md={4}>
            <h6>Grand Total (₹) : {GrandtotalSumAmount}</h6>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end pt-3 pb-2">
            <Button
              variant="primary"
              className="py-1 px-5"
              onClick={submitEvent}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Billing;
