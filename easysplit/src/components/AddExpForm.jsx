import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from '@reach/router';
import { useAlert } from 'react-alert'

const AddPeopleForm = (props) => {
    const initialValues = {
        paidBy: props.participants.length > 0 ? props.participants[0].name : "",
        expenseValue: undefined,
        expenseTitle: "",
    };

    /*using a state variable to store the success message*/
    const [formValues, setFormValues] = useState(initialValues);
    const [paidByError, setPaidByError] = useState("");
    const [expenseValueError, setExpenseValueError] = useState("");
    const [expenseTitleError, setExpenseTitleError] = useState("");
    const [selectedPerson, setSelectedPerson] = useState("");

    const alert = useAlert();

    useEffect(() => {
        props.participants.length > 0
        ? setSelectedPerson(props.participants[0].name)
        : setSelectedPerson("");
    }, []);

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
        content: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        },
        align: {
            alignSelf: "center",
            textAlign: "center",
        },
    };

    /*update the state values by defining a handler*/
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
        if (
        e.target.name === "expenseValue" &&
        (e.target.value === 0 || e.target.value === "")
        ) {
        setExpenseValueError("Please enter an expense. It cannot be 0!");
        } else {
        setExpenseValueError("");
        }
        if (e.target.name === "expenseTitle" && e.target.value.length === 0) {
        setExpenseTitleError("Please enter an title!");
        } else {
        setExpenseTitleError("");
        }
    };

    /* Calling the validate function and passing the form values and that outcome we set in form errors object*/
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValues.paidBy !== "" && formValues.expenseTitle !== "" && formValues.expenseValue !== 0 && formValues.expenseValue !== undefined) {
            props.addExpenseToList(formValues);
            setSelectedPerson(formValues.paidBy);
            alert.show("Success!!", {type: 'success'});
            e.target.reset();
            setFormValues({
                paidBy: props.participants.length > 0 ? props.participants[0].name : "",
                expenseValue: undefined,
                expenseTitle: "",
            });
        } else {
            if (formValues.paidBy === "") {
                setPaidByError("Please reselect the participant who paid!");
            } else {
                setPaidByError("");
            }
            if (
                formValues.expenseValue === 0 ||
                formValues.expenseValue === undefined
            ) {
                setExpenseValueError("Please enter an expense. It cannot be 0!");
            } else {
                setExpenseValueError("");
            }
            if (formValues.expenseTitle === "") {
                setExpenseTitleError("Please enter a title!");
            } else {
                setExpenseTitleError("");
            }

        alert.show("Error!!", {type: 'error'});
        }
    };

    return (
        <div className="container" style={StyleSheet.summary}>
            <h4 className="text-center p-2 ">New Expense Form</h4>
            <h5 className="text-center p-2 pt-0 text-decoration-underline" style={StyleSheet.centerAlign}
            >Add an Expense</h5>
            {selectedPerson === "" ? (
                <div>
                    <h6 className="text-danger text-center m-3">
                    **Please add participants before adding expense**
                    </h6>
                    <Link to="/add-participant" onClick={props.showAddParticipants}><button className='btn btn-primary m-4'>Add participant</button></Link>
                </div>
            ) : (
            <div style={StyleSheet.content}>
            <form className="col-sm-12 p-4 mb-2" onSubmit={handleSubmit}>
                <small style={StyleSheet.req} className='text-center'>*Required</small>
                <div class="row mb-4 mt-3">
                    <label for="name" class="col-sm-4 col-form-label">*Paid by</label>
                    <div class="col-sm-8">
                        <select name="paidBy" onChange={handleChange} value={selectedPerson.name} class='form-control'>
                        {props.participants.map((person, i) => {
                            return (
                            <option key={i} name="paidBy" value={person.name}>
                                {person.name}
                            </option>
                            );
                        })}
                        </select>
                    </div>
                </div>
                <div class="row mb-3 mt-3">
                    <label for="name" class="col-sm-4 col-form-label">*Amount</label>
                    <div class="col-sm-8">
                        <input
                        type="number"
                        name="expenseValue"
                        placeholder="Expense Amount"
                        value={formValues.expenseValue}
                        className='form-control'
                        onChange={handleChange}
                        />
                        <small className="text-danger font-size-small">{expenseValueError}</small>
                    </div>
                </div>
                <div class="row mb-3 mt-3">
                    <label for="name" class="col-sm-4 col-form-label">*Expense Name</label>
                    <div class="col-sm-8">
                        <input
                        type="text"
                        name="expenseTitle"
                        placeholder="Expense Title"
                        value={formValues.expenseTitle}
                        className='form-control'
                        onChange={handleChange}
                        />
                        <small className="text-danger">{expenseTitleError}</small>
                    </div>
                </div>
                <button className="btn btn-primary m-4 float-end" type="submit">
                    Add Expense
                </button>
            </form>
            <div className='text-center'>
                <h6 className="text-success mb-3">Done adding expenses? Go to<Link to="/expense-dashboard" onClick={props.showAddExpense}> dashboard and calculate split</Link> </h6>
                <h6 className="text-success mb-3"> Or need to <Link to="/add-participant" onClick={props.showAddParticipants}>add more participants</Link>?</h6>
            </div>
            </div>
        )}
        </div>
    );
};

export default AddPeopleForm;
