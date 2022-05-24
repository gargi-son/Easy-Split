import React from 'react';
import { Link } from "@reach/router";
import 'bootstrap/dist/css/bootstrap.css';
import { confirm } from "react-confirm-box";

const Overview = props => {

    const StyleSheet = {
        butn: {
            fontFamily: "Times New Roman",
        },
    };

    const options = {
        labels: {
        confirmable: "Confirm",
        cancellable: "Cancel"
        }
    }

    const clickedDrop = async (key) => {
        const result = await confirm("Are you sure you want to remove this expense?", options);
        if (result) {
            props.dropExpenseAt(key.i);
            return;
        }
    }


    return (
        <div>
            {
                props.expenseList.length < 1 ? (<div className="text-center pt-5 text-success"><h5>No expenses added yet!</h5>
                <h5> Please <Link to="/add-expense" onClick={props.showAddExpense}>Add an Expense</Link> to continue.</h5></div>)
                :
                props.expenseList.map((expense, i) =>{
                    return <li key = {i} className="list-group-item ps-5 pe-5 pt-4 pb-4">   <h4 className="text-center mb-4">Expense Name: {expense.expenseTitle}</h4>
                        <button className = "btn btn-danger float-end" onClick = {(e) =>clickedDrop({i})} disabled=
                        {props.locked} style={StyleSheet.butn}>Remove</button>
                        <h6>Paid by: {expense.paidBy}</h6>
                        <h6>Total cost: {expense.expenseValue}</h6>
                        <h6 className="text-success">Your Share: {(expense.expenseValue/props.totalParticipants).toFixed(2)}</h6>
                    </li>
                })
            }
        </div>
    );
}

export default Overview;