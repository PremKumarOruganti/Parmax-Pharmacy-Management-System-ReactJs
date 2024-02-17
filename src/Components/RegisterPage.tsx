import React from "react";

const RegisterPage = () => {
  return (
    <div className="container">
      <div className="input_space">
        <input placeholder="Enter User Name" type="text" />
      </div>
      <div className="input_space">
        <input placeholder="Enter Password" type="password" />
      </div>
      <div className="input_space">
        <input placeholder="Re-Enter Password" type="password" />
      </div>

      <button>Register</button>
    </div>
  );
};

export default RegisterPage;
