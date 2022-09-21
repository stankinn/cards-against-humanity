import React from 'react';
import { serviceendpoint } from '../Imports';
import {useNavigate} from 'react-router-dom';
import { lang } from '../../Languages';

export default function LeaveGame(props) {

    let navigate = useNavigate();

    function leave(){
       
        // leaving game and returning to start-page
        fetch(serviceendpoint + '/games/'+ Number(localStorage.getItem('gameID')) + '/'+ Number(localStorage.getItem('playerID')), {
            method: 'PATCH',
            body: JSON.stringify({ player: localStorage.getItem('playerID'), action: "leave"}),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => {
            if(res.ok){
                localStorage.removeItem('gameID');
                localStorage.removeItem('ownerID');
                navigate('/lobby');
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