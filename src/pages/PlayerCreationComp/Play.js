import React from 'react'
import {useNavigate} from 'react-router-dom';
import { serviceendpoint} from '../Imports';
import { lang } from '../../Languages';

export default function Play(props) {

    const playerID = Number(localStorage.getItem('playerID'));
    let navigate = useNavigate();

    function setGameID(id) {
        localStorage.setItem('gameID', id);
    }

    function checkGames() {
        
        if (document.getElementById('playBtn').classList.contains('disabled')) {
            console.log('No PLayer existing.')
        } else {

            fetch(serviceendpoint + '/games/')
            .then(res =>res.json())
            .then(data => {
                console.log(data.games.length)
                if (data.games.length !== 0) {
                    for (var i = 0; i < data.games.length; i++) {
                        if (data.games[i].running === false) {
                            if(!localStorage.getItem('gameID')){
                                console.log('try joing game ' + data.games[i].id + '...')
                                setGameID(data.games[i].id);
                                joinGame();
                            }
                        }
                    }
                    if(!localStorage.getItem('gameID')){
                        console.log('try creating...')
                        addGame();
                    }
                } else {
                    console.log('try creating...')
                    addGame();
                }
            })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    function addGame() {

        //neues Spiel wird erstellt mit eigener SpielerID

        console.log('playerID: ' + playerID)
        console.log('NumberplayerID: ' + Number(localStorage.getItem('playerID')))

        fetch(serviceendpoint + '/games/', {
            method: 'POST',
            body: JSON.stringify({ owner: Number(localStorage.getItem('playerID'))}),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(data => {
            setGameID(data.id);
            localStorage.setItem('ownerID', data.owner.id);
            console.log('created game ' + Number(localStorage.getItem('gameID')) + ' successful.');
            navigate('/gameLobby');
                
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }



    function joinGame() {

        fetch(serviceendpoint + '/games/' + Number(localStorage.getItem('gameID')) + '/' + Number(localStorage.getItem('playerID')), {
            method: 'PATCH',
            body: JSON.stringify({ player: Number(localStorage.getItem('playerID')), action: "join" }),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => {
            if(res.ok){
                console.log('joined game ' + Number(localStorage.getItem('gameID')) + ' successful.');
                navigate('/gameLobby');
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
            <button id='playBtn' className='continueBtn' onClick={checkGames}>{content.playButton}</button>
        </>
    );

}