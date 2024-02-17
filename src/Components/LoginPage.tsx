import React, { useState } from "react";

function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Add code to handle form submission and authentication here
  };

  return (
    <div className="container-fluid">
      <div className="row bg-danger">&nbsp;</div>

      <div className="row bg-danger">
        <div className="col-md-2"></div>
        <div className="col-md-8 p-0">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 p-0">
                Image
                {/* <img src="Images/img1.jpg" className="rounded" alt="Cinque Terre" id="img"> */}
              </div>

              <div className="col-md-6" id="secondBgColor">
                <div className="container-fluid">
                  <div className="row p-3">&nbsp;</div>
                  <div className="row font-weight-bolder">
                    <div className="col-md-12 text-center">
                      <h2>Hello !</h2>
                    </div>
                  </div>
                  <div className="row font-weight-bolder p-1">
                    <div className="col-md-12 text-center">
                      <h6>Welcome back you have been missed!</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 text-center p-1">
                      <input
                        type="text"
                        className="form-control form-control border-0 py-3"
                        placeholder="Enter Email"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 text-center p-1">
                      <input
                        type="text"
                        className="form-control form-control border-0 py-3"
                        placeholder="Enter Password"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 text-right">
                      Recovery Password
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 text-center py-3">
                      <button
                        type="button"
                        className="btn btn-primary w-75 border-0 p-2"
                        id="btnColor"
                      >
                        Primary
                      </button>
                    </div>
                  </div>
                  <div className="row text-center font-weight-bolder p-3 mb-1">
                    <div className="col-md-12">
                      Not a member?&nbsp;
                      <span className="text-primary">Register Now</span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <hr />
                    </div>
                    <div className="col-md-4">or signin with</div>
                    <div className="col-md-4">
                      <hr />
                    </div>
                  </div>

                  <div className="row py-2">
                    <div className="col-md-12 text-center">
                      <button className="p-2 border border-white" id="fa">
                        <p>
                          <i className="fa-brands fa-google"></i>
                        </p>
                      </button>
                      &nbsp;&nbsp;
                      <button className="p-2 border border-white" id="fa">
                        <p>
                          <i className="fa-brands fa-apple"></i>
                        </p>
                      </button>
                      &nbsp;&nbsp;
                      <button className="p-2 border border-white" id="fa">
                        <p>
                          <i className="fa-brands fa-facebook"></i>
                        </p>
                      </button>
                      &nbsp;&nbsp;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2 bg-danger">&nbsp;</div>
      </div>

      <div className="row bg-danger">&nbsp;</div>
    </div>

    ////////////////////
    //<form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     name="username"
    //     placeholder="Username or Email"
    //     value={formData.username}
    //     onChange={handleInputChange}
    //   />
    //   <input
    //     type="password"
    //     name="password"
    //     placeholder="Password"
    //     value={formData.password}
    //     onChange={handleInputChange}
    //   />
    //   <button type="submit">Log In</button>
    // </form>
  );
}

export default LoginForm;
