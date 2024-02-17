import react, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Container, Row, Col, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const EditAndNewSalesInvoice = () => {
  const location = useLocation();
  // const { id }: any = useParams();
  // console.log("ideee", id);
  const { idFromUrl }: any = useParams();
  console.log("ideee", idFromUrl);

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
  let GUID1: any = uuidv4();
  let GUID2 = idFromUrl ? idFromUrl : GUID1;
  const [GUID, setNewGuid] = useState(GUID2);

  /// Current Date ///
  const currentDate = new Date();
  const currentFormatedDate = currentDate.toISOString();

  const [invoicesData, setInvoicesData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  console.log("transactionsData221", transactionsData);

  const [medicinesData, setMedicinesData] = useState([]);
  const [editData1, setEditData1] = useState(false);

  const [GrandTotalAmount, setGrandTotalAmount] = useState(0);
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
    id: 0,
  });

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

    setGrandTotalAmount(updatedTotalAmountSum);
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
  console.log("invoicesData222", invoicesData);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Create a copy of invoiceParticulars
    const updatedInvoiceParticulars = { ...invoiceFormData };

    // Update the specific field in the copied array
    (updatedInvoiceParticulars as any)[name] = value;

    // Set the updated array back to state
    //setInvoiceParticulars(updatedInvoiceParticulars);
    // Set the updated data to the form data
    //delete updatedInvoiceParticulars.id
    setInvoiceFormData(updatedInvoiceParticulars);
  };

  const generateNewGUID = () => {
    const newGUID = uuidv4();
    setNewGuid(newGUID);
    return newGUID;
  };

  //handle-Submit
  //putMethodForInvoices
  function putMethodForInvoices(newInvoiceFormData: any) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newInvoiceFormData,
        date: currentFormatedDate,
        invoiceNum: invoiceFormData.invoiceNum,
        id: invoiceFormData.id,
        //modified: "2023-09-11T04:03:18.039Z",
        /* your data */
      }),
    };

    //
    fetch(apiUrl + "/invoices/" + invoiceFormData.id, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Handle the successful response data
        console.log("Success:", data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error making PUT request:", error);
      });
  }
  //postMethodForInvoices
  async function postMethodForInvoices(newInvoiceFormData: any) {
    //
    try {
      const response = await fetch(apiUrl + "/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInvoiceFormData),
      });

      if (response.ok) {
        console.log("Invoice saved successfully:", newInvoiceFormData);
        setSavedData([]);
      } else {
        console.error("Failed to save invoice:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  }

  // Delete Functionality
  async function deleteTransactionsFromDatabase(
    transactionArray: any,
    idFromUrl: any
  ) {
    for (let i = 0; i < transactionArray.length; i++) {
      const transaction = transactionArray[i];
      if (transaction.invoiceNum === idFromUrl) {
        console.log("transaction.id", transaction.id);

        await deleteTransactionFromDatabase1(transaction.id);
      }
    }

    console.log(
      `All transactions with invoiceNumber ${idFromUrl} deleted from the database.`
    );
  }
  async function deleteTransactionFromDatabase1(transactionId: any) {
    try {
      const response = await fetch(apiUrl + "/transactions/" + transactionId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("succe");
        console.log("Transaction deleted successfully:", transactionId);
      } else {
        alert("fai");
        console.error("Failed to delete transaction:", response.statusText);
      }
    } catch (error) {
      alert("bbh");
      console.error("Error deleting transaction:", error);
    }
  }

  // deleteTransactionFromDatabase(transactionIdToDelete);

  // const handleDelete = async () => {
  //   deleteTransactionsFromDatabase(transactionsData, idFromUrl);
  // };

  console.log("transactionsDataout", transactionsData);
  console.log("savedData55", savedData);

  const handleSubmit = async () => {
    if (idFromUrl) {
      deleteTransactionsFromDatabase(transactionsData, idFromUrl);
    }
    ///
    let filterdTRD = transactionsData.filter(
      (item: any) => item.invoiceNum != idFromUrl
    );
    //setfilterdTRDBONURLID(filterdTRD);
    ///
    try {
      // Calculate totalQuantity and totalAllAmounts
      const updatedTotalQuantitySum = savedData.reduce(
        (sum, data) => sum + parseInt(data.quantity),
        0
      );
      const updatedTotalAmountSum = savedData.reduce(
        (sum, data) => sum + data.totalAmount,
        0
      );
      // Generate a new GUID
      const newGUID = generateNewGUID();

      setTotalQuantity(updatedTotalQuantitySum);
      setGrandTotalAmount(updatedTotalAmountSum);

      const { id, ...newInvoiceFormData } = {
        ...invoiceFormData,

        totalQuantity: updatedTotalQuantitySum,
        totalAllAmounts: updatedTotalAmountSum,
        transactionType: "Sales",
        date: currentFormatedDate,
        invoiceNum: GUID,
      };
      {
        idFromUrl
          ? ///putMethodForInvoices
            putMethodForInvoices(newInvoiceFormData)
          : ///postMethodForInvoices
            postMethodForInvoices(newInvoiceFormData);
      }
      saveTransactionsToDatabase(savedData);

      // const combinedArray: any[] = [...filterdTRD, ...savedData];
      // console.log("combinedArray", combinedArray);

      setTransactionsData([]);
      // Send a DELETE request to your API endpoint based on invoiceNum

      //`http://localhost:5000/transactions?invoiceNum=${idFromUrl}`
      //http://localhost:5000/transactions?invoiceNum=43811142-efd8-4578-a38f-7e09d3051b7b
      //apiUrl + "/invoices/" + idFromUrl
      //const targetinvoiceNum = "43811142-efd8-4578-a38f-7e09d3051b7b"; // Set the target invoiceNum

      //Send a DELETE request using the Fetch API
      // const response = await fetch("http://localhost:5000/transactions", {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json", // adjust content type if needed
      //   },
      // });

      // if (!response.ok) {
      //   const errorMessage = await response.text(); // Get the error message from the response body
      //   console.error(
      //     `Failed to delete data. Status: ${response.status}. Error: ${errorMessage}`
      //   );
      //   throw new Error("Failed to delete data");
      // }

      //saveTransactionsToDatabase(savedData);

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
        id: 0,
      });

      setQuantity(0);
      setSelectedMedicine({
        medicineName: "",
        description: "",
        price: 0,
      });
      setGrandTotalAmount(0);
      setTotalQuantity(0);
    } catch (error) {
      console.error("Error deleting transactions:", error);
      // Handle error if the delete request fails
    }
  };

  async function saveTransactionsToDatabase(transactionArray: any) {
    for (const transaction of transactionArray) {
      delete transaction.id;
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
        setSavedData([]);
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
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //alert({ id });

  /////fetching Medicines data from transactions data from API //////
  //const apiUrl = "http://localhost:5000";
  const [transcations, settranscations] = useState([]);
  console.log("transcations", transcations);
  function fetchTransactionsDataforEdit() {
    fetch(`${apiUrl}/transactions/`)
      .then((res) => res.json())
      .then((data) => {
        settranscations(data);
        setSavedData(data.filter((item: any) => item.invoiceNum === idFromUrl));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  useEffect(() => {
    fetchTransactionsDataforEdit();
  }, []);

  //Calculating updatedTotalAmountSum and updatedTotalQuantitySum bydefault

  useEffect(() => {
    const updatedTotalAmountSum = savedData.reduce(
      (sum, data) => sum + data.totalAmount,
      0
    );

    const updatedTotalQuantitySum = savedData.reduce(
      (sum, data) => sum + parseInt(data.quantity),
      0
    );

    setGrandTotalAmount(updatedTotalAmountSum);
    setTotalQuantity(updatedTotalQuantitySum);
  }, [savedData]);

  //////Fetching data Customers Data in invoices////

  // const [invoiceParticulars, setInvoiceParticulars] = useState<any[]>([]);

  function fetchInvoicesData() {
    fetch(apiUrl + "/" + "invoices")
      .then((res) => res.json())
      .then((data) => {
        //settranscations(data);
        //delete data.id;
        // const { id, ...dataWithoutId } = data;
        // console.log("data22", dataWithoutId);
        setInvoiceFormData(
          data.find((item: any) => item.invoiceNum === idFromUrl) || ""
        );
      })

      //.then((data) => setInvoiceParticulars(data))
      .catch((error) => console.error("Error fetching data:", console.error));
  }
  // alert(invoiceFormData.id);

  useEffect(() => {
    fetchInvoicesData();
  }, []);

  // fetch(apiUrl, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //     // Add any additional headers as needed
  //   },
  //   body: JSON.stringify({
  //     uNo: "CMurali",
  //     nameOfParty: "CMurali",
  //     age: 20,
  //     mobile: 66666677763,
  //     email: "chandukarnam227@gmail.com",
  //     address: "Chittoor",
  //     transactionType: "Sales",
  //     totalQuantity: 0,
  //     totalAllAmounts: 0,
  //     date: currentFormatedDate,
  //     invoiceNum: "4475ca2b-afec-4784-a887-b8a41004359f",
  //     id: 1,
  //     modified: "2023-09-11T04:03:18.039Z",

  //     /* your data */
  //   }),
  // })
  //   .then((response) => response.json())
  //   .then((responseData) => {
  //     // Handle the response data as needed
  //     // setData(responseData);
  //     alert("Sucess");
  //   })

  //   .catch((error) => {
  //     alert("faile");
  //     // Handle errors
  //     console.error("Error making PUT request:", error);
  //   });
  // };

  //const [salesCustomerData, setSalesData] = useState([]);

  // useEffect(() => {
  //   const salesCustomerData = invoiceParticulars.filter(
  //     (item: any) => item.invoiceNum == id
  //   );
  //   setSalesData(salesCustomerData);
  // }, [invoiceParticulars]);
  // console.log("salesCustomerData", salesCustomerData);
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      {/* <NavBar /> */}
      <Container fluid>
        <Row>
          <Col className=" h2 pb-3">
            {idFromUrl ? "Edit Billing Page" : "Sales Billing Page"}
          </Col>
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
                {/* {filteredSalesTransactionsData.map((item: any) => (
                  <tr key={item.id}>
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
                ))} */}
                {savedData &&
                  savedData.length > 0 &&
                  savedData.map((item: any, index: any) => (
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
            <h6>Total Purchase Amount (₹) : {GrandTotalAmount} </h6>
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
            <h6>Grand Total (₹) : {GrandTotalAmount}</h6>
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
            {/* <Button
              variant="primary"
              className="py-1 px-5"
              onClick={handleDelete}
            >
              Delete
            </Button> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default EditAndNewSalesInvoice;
