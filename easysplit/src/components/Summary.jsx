import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Summary = props => {

    const StyleSheet = {
        summary: {
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: "Times New Roman",
        },
        summ: {
            margin: '10px',
            border: '2px solid black',
            borderRadius: '25px',
            padding: '15px',
        },
        calc: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        btn: {
            fontSize: '30px',
            alignSelf: 'center',
        }
    }
    const calculate = e => {
        props.doCalculation();
    }
    return (
        <div  style={StyleSheet.summary}>
            {
                props.locked ? 
                    props.splitTable.map((split, i) =>{
                        return <li key = {i} className="list-group">   <h4 style={StyleSheet.summ}>{split.owedBy} owes {split.owedTo} ${split.amount}</h4>
                            </li>
                    })
                : 
                    <div style={StyleSheet.calc}>
                        <p>Once you are done adding all the expenses, click the button below to see who owes what amount.</p>
                        <div>
                            <button disabled={!props.hasExpenseItem || !props.multipleParticipants} className="btn btn-success" onClick={(e) => calculate()}>Calculate the final results</button>
                            {
                                !props.hasExpenseItem ? <p className="text-danger font-size-small">**You need to add atleast one expense to be able to calculate the split.</p> : !props.multipleParticipants ?
                                <p className="text-danger font-size-small">**You need to add more than one participant to be able to calculate the split.</p> : <p></p>
                            }
                        </div>
                    </div>
            }
        </div>
    );
}

export default Summary;