import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "@reach/router";
import { useAlert } from 'react-alert'

const AddPeopleForm = (props) => {
    /*creating an initial usestate object*/

    const initialValues = {
        name: "",
        contactNumber: "",
        mailAddress: "",
    };

    /*using a state variable to store the success message*/
    const [formValues, setFormValues] = useState(initialValues);
    const [nameError, setNameError] = useState("");
    const [contactNumberError, setContactNumberError] = useState("");
    const [mailAddressError, setMailAddressError] = useState("");

    const alert = useAlert();

    const StyleSheet = {
        summary: {
            width: "85%",
            minHeight: "180px",
            boxShadow: "0 0 10px black",
            margin: "auto",
            backgroundColor: "white",
            marginTop: "10px",
            marginBottom: "10px",
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
            fontFamily: "Times New Roman",
        },
        req: {
            display: 'block',
            textAlign: 'center',
            marginBottom: '30px',
        },
        centerAlign: {
            textAlign: "center",
        },
        align: {
            alignSelf: "center",
            textAlign: "center",
        },
    };

    /*update the state values by defining a handler*/
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
        if (e.target.name === "name" && e.target.value.length === 0) {
            setNameError("Please enter a name!");
        } else {
            setNameError("");
        }
        if (
        e.target.name === "contactNumber" && (e.target.value === 0 || e.target.value === "")) {
            setContactNumberError("Please enter a phone number!");
        } else {
            setContactNumberError("");
        }
        if (e.target.name === "mailAddress" && e.target.value.length === 0) {
            setMailAddressError("Please enter an email!");
        } else {
            setMailAddressError("");
        }
    };

    /* Calling the validate function and passing the form values and that outcome we set in form errors object*/
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValues.name !== "" && formValues.mailAddress !== "" && formValues.contactNumber !== 0) {
            props.addParticipantsToList(formValues);
            alert.show("Success!!", {type: 'success'});
            setFormValues({
                name: "",
                contactNumber: "",
                mailAddress: "",
            });
        } else {
            if (formValues.name === "") {
                setNameError("Please enter a name!");
            } else {
                setNameError("");
            }
            if (formValues.mailAddress === "") {
                setMailAddressError("Please enter an email!");
            } else {
                setMailAddressError("");
            }
            if (formValues.contactNumber === "") {
                setContactNumberError("Please enter a phone number!");
            } else {
                setContactNumberError("");
            }
            alert.show("Error!!", {type: 'error'});
        }
    };

    return (
        <div className="container" style={StyleSheet.summary}>
            <h4 className="text-center p-2 ">New Participant Form</h4>
            <h5 className="text-center p-3 pt-0 text-decoration-underline" style={StyleSheet.centerAlign}>Add a participant</h5>
            <form className="col-sm-10 p-4 mb-2" onSubmit={handleSubmit}>
                <small style={StyleSheet.req}>*Required</small>
                <div className="row mb-3 mt-3">
                    <label for="name" className="col-sm-4 col-form-label">*Name</label>
                    <div className="col-sm-8">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formValues.name}
                        className="form-control" 
                        onChange={handleChange}/>
                    {nameError.length > 0 ? (
                        <small className="text-danger">{nameError}</small>
                        ) : (
                        <p></p>
                    )}
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="contactNumber" className="col-sm-4 col-form-label">*Phone Number</label>
                    <div className="col-sm-8">
                    <input
                        type="text"
                        name="contactNumber"
                        placeholder="Phone number"
                        value={formValues.contactNumber}
                        className="form-control" 
                        onChange={handleChange}
                    ></input>
                    {contactNumberError.length > 0 ? (
                        <small className="text-danger">{contactNumberError}</small>
                        ) : (
                        <p></p>
                    )}
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="contactNumber" className="col-sm-4 col-form-label">*Email</label>
                    <div className="col-sm-8">
                    <input
                        type="text"
                        name="mailAddress"
                        placeholder="Email"
                        value={formValues.mailAddress}
                        className="form-control" 
                        onChange={handleChange}
                    ></input>
                    {mailAddressError.length > 0 ? (
                        <small className="text-danger">{mailAddressError}</small>
                        ) : (
                        <p></p>
                    )}
                    </div>
                </div>
                <button className="btn btn-primary m-4 float-end" type="submit">
                Add Participant
                </button>
            </form>
            <h6 className="text-success mb-3">Done adding participants? <Link to="/add-expense" onClick={props.showAddExpense}>Now add an expense</Link> </h6>
            <h6 className="text-success mb-3">Or <Link to="/participants" onClick={props.showViewParticipants}>View all participants</Link></h6>
        </div>
    );
};

export default AddPeopleForm;
