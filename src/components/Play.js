import React, {useEffect} from 'react'
import { serviceendpoint, gameURL, playerID, playerURL } from './Imports';

export default function Play(props) {

    function checkGames() {
        console.log('play Button');
        if (document.getElementById('playBtn').classList.contains('disabled')) {
            console.log('No PLayer existing.')
        } else {

            gameURL.then(data => {
                if (data.games.length === 0) {
                    console.log("New game is being created")
                    addGame();

                } else {
                    console.log("joining available game")
                    joinGame();
                }
            })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    useEffect(() =>{
        gameURL.then(data =>{console.log(data.games.length)})
      })

    function addGame() {

        //neues Spiel wird erstellt mit eigener SpielerID
        playerURL.then(data=>console.log(JSON.stringify(data.players)));
            console.log("player: " + playerID);
            fetch(serviceendpoint + '/games/', {
                method: 'POST',
                body: JSON.stringify({ owner: playerID }),
                headers: {"Content-Type": "application/json"}
            })
                .then(response => response.json())
                //.then(() => { document.getElementById('playerCreation').classList.add('hidden'); })
                .catch((error) => {
                    console.error('Error:', error);
                });

    }

    function joinGame() {

        var gameID = '';

        gameURL.then(data => {
            console.log("all games: " + data.games.length);
            for (var i = 0; i < data.games.length; i++) {
                if (data.games[i].running === false) {
                    gameID = data.games[i].id;

                }
            }
            //console.log("GAME ID: " + gameID);
            document.getElementById('playerCreation').classList.add('hidden');
            fetch(serviceendpoint + '/games/' + gameID + '/' + playerID, {
                method: 'PATCH',
                body: JSON.stringify({ player: playerID, action: "join" }),
                headers: { "Content-Type": "application/json" }
            })
                .then(response => response.json())
                .catch((error) => {
                    console.error('Error:', error);
                });
        })
    }

    return (
        <>
            <button id='playBtn' className='continueBtn' onClick={checkGames}>PLAY</button>
        </>
    );

}