import React from 'react';
import { serviceendpoint } from '../Imports';
import { lang } from '../Languages';

export default function LeaveGame(props) {

    let content = lang;
    props.language === "German"
      ? (content = content.German)
      : (content = content.English);

    function leave(){
        console.log("PLAYER ID: " + localStorage.getItem('playerID'));
       
        fetch(serviceendpoint + '/games/'+ Number(sessionStorage.getItem('gameID')) + '/'+ Number(localStorage.getItem('playerID')), {
            method: 'PATCH',
            body: JSON.stringify({ player: localStorage.getItem('playerID'), action: "leave"}),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => {
            if(res.ok){
                sessionStorage.clear();
                document.getElementById('playerCreation').classList.remove('hidden');
            }
            return res
        })
        .then(res => res.json())
        .catch((error) => {
            console.error('Error:', error);
        });
    }  

    return (
        <div id='leaveGame'>
        <button id='leaveBtn' className='continueBtn' onClick={leave}>{content.leaveButton}</button>
        </div>
    )
}