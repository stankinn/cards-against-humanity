import React, {useEffect} from 'react'
import { serviceendpoint, gameURL} from './Imports';

export default function Play(props) {

  const playerID = Number(localStorage.getItem('playerID'));

  function setGameID(id) {
    sessionStorage.setItem('gameID', id);
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
                            if(!sessionStorage.getItem('gameID')){
                                console.log('try joing game ' + data.games[i].id + '...')
                                setGameID(data.games[i].id);
                                joinGame();
                            }
                        }
                    }
                    if(!sessionStorage.getItem('gameID')){
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
            console.log('created game ' + Number(sessionStorage.getItem('gameID')) + ' successful.');
            document.getElementById('playerCreation').classList.add('hidden');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function joinGame() {

        fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')) + '/' + Number(localStorage.getItem('playerID')), {
            method: 'PATCH',
            body: JSON.stringify({ player: Number(localStorage.getItem('playerID')), action: "join" }),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => {
            if(res.ok){
                console.log('joined game ' + Number(sessionStorage.getItem('gameID')) + ' successful.');
                document.getElementById('playerCreation').classList.add('hidden');
            }
            return res
        })
        .then(res => res.json())
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <>
            <button id='playBtn' className='continueBtn' onClick={checkGames}>PLAY</button>
        </>
    );

}