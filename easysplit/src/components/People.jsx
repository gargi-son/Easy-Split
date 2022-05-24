import React from 'react';
import { Link } from "@reach/router";
import { confirm } from 'react-confirm-box';

const People = props => {
    const StyleSheet = {
        overview: {
            width: '85%',
            minHeight: '400px',
            boxShadow: '0 0 10px black',
            margin: 'auto',
            backgroundColor: 'white',
            marginTop: '20px',
            fontFamily: "Times New Roman",
        },
        font:{
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
        const result = await confirm("Are you sure you want to remove this participant?", options);
        if (result) {
            props.dropParticipantAtKey(key.i);
            return;
        }
    }

    return (
        <div>
            <h3 className="text-center p-5 " style={StyleSheet.font}>Participant Dashboard</h3>
            <div className="overview" style={StyleSheet.overview}>
            {
                props.participants.length < 1 ? (<div className="text-center pt-5 text-success"><h5>No participant added yet!</h5>
                <h5> Please <Link to="/add-participant" onClick={props.showAddParticipants}>Add participant</Link> to continue.</h5></div>)
                :
                props.participants.map((person, i) =>{
                    return <li key = {i} className="list-group-item ps-5 pe-5 pt-4 pb-4">
                            <button className = "btn btn-danger float-end" onClick = {(e) =>clickedDrop({i})} disabled={props.locked}>Remove</button>
                            <h4 style={StyleSheet.title} className="mb-4">{person.name}</h4>
                            <h6>Contact number: {person.contactNumber}</h6>
                            <h6>Email: {person.mailAddress}</h6>
                        </li>
                })
            }
            </div>
        </div>
    );
};

export default People;