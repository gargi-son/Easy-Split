import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Overview from '../components/Overview';
import Summary from '../components/Summary';

const Dashboard = props => {

    const StyleSheet = {
        summary: {
            width: '85%',
            minHeight: '180px',
            boxShadow: '0 0 10px black',
            margin: 'auto',
            backgroundColor: 'white',
            marginTop: '20px',
            padding: '10px',
            fontFamily: "Times New Roman",
        },
        line: {
            height: '5px',
            width: '98%',
            borderRadius: '30%',
            backgroundColor: 'gray',
            marginTop: '50px',
            margin: 'auto',
            marginBottom: '40px',
        },
        overview: {
            width: '85%',
            minHeight: '400px',
            boxShadow: '0 0 10px black',
            margin: 'auto',
            backgroundColor: 'white',
            marginTop: '20px',
            fontFamily: "Times New Roman",
        },
        heading: {
            textAlign: 'center',
            fontFamily: "Times New Roman",
        },
    };

    const dropExpenseAt = key => {
        props.dropExpenseAtKey(key);
    }

    const doCalculation = () => {
        props.clickedCalculate();
    }

    return (
        <div>
            <h4 style={StyleSheet.heading}>Calculate individual Split</h4>
            <div className="summary" style = {StyleSheet.summary}>
                <Summary splitTable={props.splitTable} locked={props.locked} doCalculation={doCalculation} hasExpenseItem={props.expenseList.length > 0} multipleParticipants={
                props.participants.length > 1}/>
            </div>
            <div className="line" style={StyleSheet.line}></div>
            <h4 style={StyleSheet.heading}>Expense Summary</h4>
            <div className="overview" style={StyleSheet.overview}>
                <Overview expenseList={props.expenseList} totalParticipants={props.participants.length} dropExpenseAt={dropExpenseAt} locked={props.locked}/>
            </div>
        </div>
);
}

export default Dashboard;