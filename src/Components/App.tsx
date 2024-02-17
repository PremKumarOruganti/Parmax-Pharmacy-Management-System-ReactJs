import React, { useState } from "react";
import FirstHomePage from "./SigninPage";
import SignUpPage from "./SignUpPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./Home";

// import PharmaxMainApp from "./PharmaxMainApp";
import ManageCategory from "./ManageCategory";
import BillingSales from "./BillingSalesPage";
import ManageAdmin from "./ManageData";
import SalesInvoice from "./SalesInvoice";
import PurchaseInvoice from "./PurchaseInvoice";
import MedicinesPage from "./MedicinesPage";
import NavBar from "./NavBar";
import PharmaxMainApp from "./PharmaxMainApp";
import ShowNavBar from "./ShowNavBar";
import PurchaseBillingPage from "./PurchaseBillingPage";
import ViewSalesInvoicePage from "./ViewSalesInvoicePage";
import EditAndNewSalesInvoice from "./EditAndNewSalesInvoice";
//import EditSalesInvoice from "./EditAndNewSalesInvoice";
import EditAndNewPurchaseInvoice from "./EditAndNewPurchaseInvoice";
import StackDetailsGraph from "./StackDetailsGraph";
import ViewPurchaseInvoicePage from "./ViewPurchaseInvoicePage";

const App = () => {
  const data = {
    categories: ["Purchased", "Sold", "Remaining"],
    quantity: [185, 24, 161],
    amount: [27500, 5200, 22300],
  };
  const [dataFromNav, setDataFromNav] = useState(true);
  const handelModeProps = (darkMode: boolean) => {
    setDataFromNav(darkMode);
  };
  return (
    <>
      {/* <div>
        <StackDetailsGraph data={data} />
      </div> */}

      {/* <TransactionTable /> */}
      <BrowserRouter>
        <div>
          <ShowNavBar>
            <NavBar sendModeProps={handelModeProps} />
          </ShowNavBar>

          <Routes>
            {/* <Route path="/" element={<FirstHomePage />}></Route>
          <Route
            path="/homePage"
            element={<PharmaxMainApp></PharmaxMainApp>}
          ></Route> */}

            {/* <Route
              path="/sale-invoices/invoice/new"
              element={<BillingSales />}
            ></Route> */}

            <Route
              path="/sale-invoices/invoice/new"
              element={<EditAndNewSalesInvoice />}
            ></Route>

            <Route path="/signUpPage" element={<SignUpPage />}></Route>
            <Route path="/firstHomePage" element={<FirstHomePage />}></Route>

            <Route
              path="/"
              element={<PharmaxMainApp dataFromNav={dataFromNav} />}
            ></Route>
            <Route path="/ManageCategory" element={<ManageCategory />}></Route>

            <Route
              path="/manageManageCategory"
              element={<ManageAdmin />}
            ></Route>
            <Route path="/sale-invoices" element={<SalesInvoice />}></Route>
            <Route
              path="/purchase-invoices"
              element={<PurchaseInvoice />}
            ></Route>
            {/* <Route path="/PharmaxHomePage" ></Route> */}
            <Route path="/MedicinesPage" element={<MedicinesPage />}></Route>
            {/* <Route
              path="/sale-invoices/invoice/view/:id"
              element={<ViewDetailedSalesInvoicePage />}
            ></Route> */}
            <Route
              path="/sale-invoices/invoice/view/:id"
              element={<ViewSalesInvoicePage />}
            ></Route>
            <Route
              path="/sale-invoices/invoice/edit/:idFromUrl"
              element={<EditAndNewSalesInvoice />}
            ></Route>

            <Route
              path="/purchase-invoices/invoice/view/:id"
              element={<ViewPurchaseInvoicePage />}
            ></Route>
            <Route
              path="/PurchaseBillingPage"
              element={<PurchaseBillingPage />}
            ></Route>
            <Route
              path="/purchase-invoices/invoice/new"
              element={<EditAndNewPurchaseInvoice />}
            ></Route>
            <Route
              path="/purchase-invoices/invoice/edit/:idFromUrl"
              element={<EditAndNewPurchaseInvoice />}
            ></Route>
            <Route path="stock-details" element={<StackDetailsGraph />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
