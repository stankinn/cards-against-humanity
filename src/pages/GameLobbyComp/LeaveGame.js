import React from 'react';
import { serviceendpoint } from '../Imports';
import {useNavigate} from 'react-router-dom';
import { lang } from '../../Languages';

export default function LeaveGame(props) {

    let navigate = useNavigate();

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
                navigate('/');
            }
            return res
        })
        .then(res => res.json())
        .catch((error) => {
            console.error('Error:', error);
        });
    }  

    let content = lang;
    props.language === "German"
      ? (content = content.German)
      : (content = content.English);

    return (
        <div id='leaveGame'>
        <button id='leaveBtn' className='continueBtn' onClick={leave}>{content.leaveButton}</button>
        </div>
    )
}