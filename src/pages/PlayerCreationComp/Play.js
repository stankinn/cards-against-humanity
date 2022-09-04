import React from 'react'
import {useNavigate, Link} from 'react-router-dom';
import { serviceendpoint} from '../Imports';
import { lang } from '../../Languages';

export default function Play(props) {
    
    let navigate = useNavigate();

    function setGameID(id) {
        sessionStorage.setItem('gameID', id);
    }

    function checkGames() {
        
        if (document.getElementById('playBtn').classList.contains('disabled')) {
            console.log('No PLayer existing.')
        } else {
            // creating or joining available game
            navigate('/lobby');
        }
    }

    function addGame() {

        // new game with own playerID will be created and navigate to lobby
        fetch(serviceendpoint + '/games/', {
            method: 'POST',
            body: JSON.stringify({ owner: Number(localStorage.getItem('playerID'))}),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(data => {
            setGameID(data.id);
            sessionStorage.setItem('ownerID', data.owner.id);
            console.log('created game ' + Number(sessionStorage.getItem('gameID')) + ' successful.');
            navigate('/lobby');
                
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }



    function joinGame() {

        // joining available game and navigate to lobby
        fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')) + '/' + Number(localStorage.getItem('playerID')), {
            method: 'PATCH',
            body: JSON.stringify({ player: Number(localStorage.getItem('playerID')), action: "join" }),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => {
            if(res.ok){
                console.log('joined game ' + Number(sessionStorage.getItem('gameID')) + ' successful.');
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
        <>
            <button id='playBtn' className='continueBtn' onClick={() => checkGames()}>{content.playButton}</button>
        </>
    );

}