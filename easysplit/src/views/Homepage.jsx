import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Dashboard from "./Dashboard";
import People from "../components/People";
import AddPeopleForm from "../components/AddPeopleForm";
import AddExpForm from "../components/AddExpForm";
import HelpPage from "../components/HelpPage";
import {Router, Link, Redirect } from'@reach/router';

const Homepage = (props) => {
    const [locked, setLocked] = useState(false);
    const [activeTab, setActiveTab] = useState('addParticipants');
    const [participants, setParticipants] = useState([]);
    const [expenseList, setExpenseList] = useState([]);
    const [splitTable, setSplitTable] = useState([]);
    var tallyTable = [];
    var debitList = [];
    var creditList = [];
    var splitHolder = [];
    const missingParticipants = [];

    const StyleSheet = {
        butnR: {
        backgroundColor: locked ? "gray" : undefined,
        fontFamily: "Times New Roman",
        },
        butnA: {
        backgroundColor: locked ? "gray" : '#0d6efd',
        fontFamily: "Times New Roman",
        },
        help: {
            color : 'blue',
        },
        font:{
            fontFamily: "Times New Roman",
        },
    };

    const showDashboard = (e) => {
        setActiveTab('dashboard');
    };
    const showViewParticipants = (e) => {
        setActiveTab('showParticipants');
    };
    const showAddParticipants = (e) => {
        setActiveTab('addParticipants');
    };
    const showAddExpense = (e) => {
        setActiveTab('addExpense');
    };
    const settleAll = (e) => {
        window.location = "/add-participant";
    };
    const showHelp = (e) => {
        setActiveTab('help');
    };

    const createTallyTable = () => {
        for (var i = 0; i < participants.length; i++) {
        var a = {
            name: participants[i].name,
            totalPaid: 0,
            totalOwed: 0,
            tally: 0,
        };
        tallyTable.push(a);
        }
    };

    const updateTallyTable = () => {
        for (var i = 0; i < expenseList.length; i++) {
        for (var j = 0; j < tallyTable.length; j++) {
            if (tallyTable[j].name === expenseList[i].paidBy) {
            tallyTable[j].totalPaid += parseInt(expenseList[i].expenseValue);
            updateTallyOwed(
                parseInt(expenseList[i].expenseValue) / participants.length
            );
            }
        }
        }
    };

    const calculateTally = () => {
        for (var i = 0; i < tallyTable.length; i++) {
        tallyTable[i].tally = tallyTable[i].totalPaid - tallyTable[i].totalOwed;
        if (tallyTable[i].tally < 0) {
            var a = { name: tallyTable[i].name };
            debitList.push(a);
        }
        }
    };

    const updateTallyOwed = (addAmount) => {
        for (var i = 0; i < tallyTable.length; i++) {
        tallyTable[i].totalOwed += addAmount;
        }
    };

    const createCreditList = () => {
        for (var i = 0; i < tallyTable.length; i++) {
        if (tallyTable[i].tally > 0) {
            var split = tallyTable[i].tally / debitList.length;
            split = split.toFixed(2);
            var a = { name: tallyTable[i].name, split: split };
            creditList.push(a);
        }
        }
    };

    const createSplitHolder = () => {
        let debtors = [];
        for (var i = 0; i < creditList.length; i++) {
        for (var j = 0; j < debitList.length; j++) {
            var a = {
                owedBy: debitList[j].name,
                owedTo: creditList[i].name,
                amount: creditList[i].split,
            };
            splitHolder.push(a);
            debtors.push(debitList[j].name);
        }
        }
        checkMissingParticipantDisplay(debtors);
        for(let i=0; i<missingParticipants.length;i++){
            let a = {
                owedBy: missingParticipants[i],
                owedTo: "None",
                amount: 0
            };
            splitHolder.push(a);
        }
    };

    const checkMissingParticipantDisplay = (debtors) =>{
        for (let i = 0; i < participants.length ; i++){
            if(debtors.indexOf(participants[i].name) === -1){
                missingParticipants.push(participants[i].name);
            }
        }
    }

    const dropExpenseAtKey = (key) => {
        setExpenseList([
        ...expenseList.filter((exp) => expenseList.indexOf(exp) !== key),
        ]);
    };

    const dropParticipantAtKey = (key) => {
        setParticipants([
        ...participants.filter((part) => participants.indexOf(part) !== key),
        ]);
    };

    const clickedCalculate = () => {
        setLocked(true);
        createTallyTable();
        updateTallyTable();
        calculateTally();
        createCreditList();
        createSplitHolder();
        setSplitTable(splitHolder);
    };

    const addExpenseToList = (formData) => {
        setExpenseList([...expenseList, formData]);
    };

    const addParticipantsToList = (formData) => {
        setParticipants([...participants, formData]);
    };


    return (
        <div className="container p-0 bg-dark">
        <div className="header">
            <h3 className="pb-3 easyn" >
            E A S Y <span className="display-5"> | </span> S P L I T
            </h3>
            <div className="user">
                <img
                    src={require("../images/ninja.jpeg")}
                    alt="User"
                    className="avatar me-4"
                />
                <h3 className="easy me-4 font-weight-bold">Jane Doe </h3>
            </div>
        </div>
        <div className="content">
            <div className="sideNav">
            <Link to="/help" onClick={showHelp} className="help">
                {
                    activeTab==='help' ? 
                    <div style={StyleSheet.help}>
                    <span style={StyleSheet.font}>Need help </span><img src={props.help_blue} alt="Help"/>
                    </div>
                    :
                    <div>
                    <span style={StyleSheet.font}>Need help </span><img src={props.help_white} alt="Help"/>
                    </div>
                }
            </Link>
                <Link to="/expense-dashboard"><button
                    onClick={showDashboard}
                    className="sideTab mt-5"
                    style={activeTab==='dashboard' ? StyleSheet.butnA : undefined}
                    >
                    Expense Dashboard
                </button></Link>
                <Link to="/add-participant"><button
                    disabled={locked}
                    onClick={showAddParticipants}
                    className="sideTab"
                    style={activeTab==='addParticipants' ? StyleSheet.butnA : StyleSheet.butnR}
                    >
                    Add a Participant
                </button></Link>
                <Link to="/add-expense"><button
                    disabled={locked}
                    onClick={showAddExpense}
                    className="sideTab"
                    style={StyleSheet.butn}
                    style={activeTab==='addExpense' ? StyleSheet.butnA : StyleSheet.butnR}
                    >
                    Add a new expense
                </button></Link>
                <Link to="/participants"><button
                    disabled={locked}
                    onClick={showViewParticipants}
                    className="sideTab"
                    style={StyleSheet.butn}
                    style={activeTab==='showParticipants' ? StyleSheet.butnA : StyleSheet.butnR}
                >
                    View all Participants
                </button></Link>
                <button onClick={settleAll} className="sideTab btn-danger">
                    Start over
                </button>
            </div>
            <div className="mainContent pt-3">
        <Router>
            <Redirect from="/" to="/add-participant" />
            <Dashboard path="/expense-dashboard"
                expenseList={expenseList}
                participants={participants}
                splitTable={splitTable}
                dropExpenseAtKey={dropExpenseAtKey}
                locked={locked}
                clickedCalculate={clickedCalculate}
                showDashboard={showDashboard}
                showAddParticipants={showAddParticipants}
                showViewParticipants={showViewParticipants}
                showAddExpense={showAddExpense}
                showHelp={showHelp}
            />
            <People path="/participants"
                participants={participants}
                dropParticipantAtKey={dropParticipantAtKey}
                locked={locked}
                showDashboard={showDashboard}
                showAddParticipants={showAddParticipants}
                showViewParticipants={showViewParticipants}
                showAddExpense={showAddExpense}
                showHelp={showHelp}
            />
            <AddPeopleForm path="/add-participant" addParticipantsToList={addParticipantsToList} showDashboard={showDashboard}
                showAddParticipants={showAddParticipants}
                showViewParticipants={showViewParticipants}
                showAddExpense={showAddExpense}
                showHelp={showHelp}/>
            <AddExpForm path="/add-expense" addExpenseToList={addExpenseToList} participants={participants} showDashboard={showDashboard}
                showAddParticipants={showAddParticipants}
                showViewParticipants={showViewParticipants}
                showAddExpense={showAddExpense}
                showHelp={showHelp} />
            <HelpPage path="/help" showDashboard={showDashboard}
                showAddParticipants={showAddParticipants}
                showViewParticipants={showViewParticipants}
                showAddExpense={showAddExpense}
                showHelp={showHelp} />
        </Router>

            </div>
        </div>
        <div className="footer">
            <div className="pt-3 pb-3">
                <a href="https://www.linkedin.com">
                    <img src={props.linkedin} alt="" />
                </a>
                <a href="https://www.github.com" className="ms-3">
                    <img src={props.github} alt="" />
                </a>
            </div>
            <p className="text-center pt-2" style={StyleSheet.font}>
            &copy; SWE632-MedhaAasthaGargi-Spring2022 <span id="date"></span>
            </p>
        </div>
        </div>
    );
};

export default Homepage;
