import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import jwt from "jsonwebtoken";
const Activate = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: true,
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);

    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);
  const { name, token, show } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/account_activation`,
      data: { token },
    })
      .then((response) => {
        setValues({
          ...values,
          show: false,
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("Account activation Error", error.response.data);
        toast.error(error.response.data.error);
      });
  };
  const activationLink = () => {
    return (
      <div className="text-center">
        <h1 className="p-5 text-center">
          Hey {name}, Click on the button to activate your account
        </h1>
        <button className="btn btn-outline-primary" onClick={clickSubmit}>
          SignIn
        </button>
      </div>
    );
  };

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {activationLink()}
      </div>
    </Layout>
  );
};

export default Activate;
