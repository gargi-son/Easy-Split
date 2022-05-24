import React from 'react';
import useCollapse from 'react-collapsed';
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "@reach/router";


const StyleSheet = {
    summary: {
    width: "auto",
    minHeight: "3px",
    boxShadow: "0 0 10px black",
    margin: "auto",
    backgroundColor: "white",
    marginTop: "10px",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    fontFamily: "Times New Roman",
    },
};
function Collapsible() {

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
return (
    <div className="collapsible" style={StyleSheet.summary} text-al>
        <div className="header" {...getToggleProps()}>
            {isExpanded ? 'Adding new Participant' : 'Adding new Participant'}
        </div>
        <div {...getCollapseProps()}>
            <div className="content" style={StyleSheet.summary}>
                1. You land on the ‘Add a Participant’ page, where you can see the option to fill in details about the participants you want to split the expense with.<br></br>
                2. Go ahead and add some details, such as Name, Phone number, and email address.<br></br>
                3. All the fields in the form are mandatory, so make sure you fill in all the details. <br></br>
                4. Click on the ‘Add Participant’ button, to save the participants' details. <br></br>
                5. If you wish to add another participant, repeat steps 2-4.<br></br>
                6.Next, add some expenses.<br></br>
            </div>
        </div>
        <div className="header" {...getToggleProps()}>
            {isExpanded ? 'Adding new Expenses' : 'Adding new Expenses'}
        </div>
        <div {...getCollapseProps()}>
            <div className="content" style={StyleSheet.summary}>
                1. Once you’ve added the participants, it’s time to add the expenses.<br></br>
                2. Select the participant from the dropdown who had paid for the expense.<br></br>
                3. Enter the expense amount in the ‘Amount’ field.<br></br>
                4. You also have the option to enter what the expense type is to better organize them.<br></br>
                5. Clicking on ‘Add Expense’ will save the expense for that participant, and will be visible on the Expense Dashboard.<br></br>
                6. You will be able to see a success message, and the page will reset itself for the next addition.<br></br>
                7. All the fields in this form are mandatory.<br></br>
                8. If you wish to add another expense, repeat the steps 2-5.<br></br>
            </div>
        </div>
        <div className="header" {...getToggleProps()}>
            {isExpanded ? 'Viewing your added Participants' : 'Viewing your added Participants'}
        </div>
        <div {...getCollapseProps()}>
        <div className="content" style={StyleSheet.summary}>
                1. Good job with adding the participants!<br></br>
                2. You can view their details here, by clicking on the ‘View Participants’ button on the side navigation bar.<br></br>
                3. You can also remove a participant if you wish to, by clicking on the red ‘Remove’ button on the right. <br></br>
                4. You can also view the expenses by going to the Expense Dashboard<br></br>
            </div>
        </div>
        <div className="header" {...getToggleProps()}>
            {isExpanded ? 'The Expense Dashboard' : 'The Expense Dashboard'}
        </div>
        <div {...getCollapseProps()}>
            <div className="content" style={StyleSheet.summary}>
                1. This page is the final step in the process of calculating the expenses.
                2. You can view the expenses for every participant you have added under the ‘Expense Summary’ list. The expense summary also shows the individual share of the expense added for each participant.<br></br>
                3. If you wish to remove an expense from the list, EasySplit provides a ‘Remove’ button on the right for each expense. You can click on this to delete the expense you don’t need anymore.<br></br>
                4. To calculate the individual split after multiple expenses, i.e. the amount each person owes, click on the ‘Calculate the Final Results’ button.<br></br>
                5. Please note: if you have just one participant added, the calculate split button won’t work. You need to add more than one participant to split the amount.<br></br>
                6. The display will show what each participant owes every other participant, for e.g.  A owes B $10.5, B owes None $0. Here, B paid more than A paid, so B does not owe any amount to A.<br></br>
                7. Once the split is calculated, the buttons on the side navigation bar except ‘Start Over’ are disabled. You need to start again for a new split, by clicking on Start Over button on the side navigation bar.<br></br>
            </div>
        </div>
        <div className="header" {...getToggleProps()}>
            {isExpanded ? 'Start Over' : 'Start Over'}
        </div>
        <div {...getCollapseProps()}>
            <div className="content" style={StyleSheet.summary} >
                1. Once the split is calculated, the buttons on the side navigation bar are disabled.<br></br>
                2. You need to start again for a new split, by clicking on Start Over on the side navigation bar.<br></br>
                3. This will redirect you to the ‘Add a Participant’ Form to start the process of Calculating the split again.<br></br>
                4. This will also clear all the previously entered data and the calculations so that you can start fresh.<br></br>
            </div>
        </div>
    </div>

    );
}
function HelpPage() {
    return (
    <Collapsible/>
    );
}
export default HelpPage;