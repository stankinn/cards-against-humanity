import React from 'react'
import {serviceendpoint, gameURL, playerURL} from './Imports';
import {useState, useEffect} from 'react';

export default function Play(props){
    
    function checkGames() {
        if(document.getElementById('playBtn').classList.contains('disabled')){
            console.log('No PLayer existing.')
        }else{
                
            gameURL.then(data=>{
                console.log("all games:" + JSON.stringify(data.games))
                if(data.games.length === 0){
                    addGame();
                    console.log("New game is being created")
                }else {
                    console.log("joining available game")
                    joinGame();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }

    function addGame(){

        const serviceendpoint = "https://gruppe7.toni-barth.com";
        var playerID= '';

        //spielerID wird herausgefunden
        playerURL.then(data=>{
                playerID= data.players[data.players.length-1].id;
                console.log("PlayerID:" + playerID);

                //neues Spiel wird erstellt mit eigener SpielerID
                fetch(serviceendpoint + '/games/', {
                    method: "POST",
                    body: JSON.stringify({ owner: playerID}),
                    headers: { "Content-Type": "application/json" }
                })
                .then(response => response.json())
                .then(data=>{
                    console.log(data.owner.name)
                    document.getElementById('playerCreation').classList.add('hidden');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    }

  function joinGame() {

        var playerID= '';
        var gameID= '';
        
        playerURL.then(data=>{
            playerID = data.players[data.players.length-1].id;

            gameURL.then(data =>{
                console.log("all games: " + data.games.length);

                for(var i = 0; i < data.games.length; i++){
                    if (data.games[i].running === false){
                        gameID = data.games[i].id;
                    }
                }
                //console.log("GAME ID: " + gameID);
                document.getElementById('playerCreation').classList.add('hidden');
                fetch(serviceendpoint + '/games/'+ gameID + '/'+ playerID, {
                    method: "PATCH",
                    body: JSON.stringify({ player: playerID, action: "join"}),
                    headers: { "Content-Type": "application/json" }
                })
                .then(response => response.json())
                .catch((error) => {
                    console.error('Error:', error);
                });
            })
    })}  
  
  
    //   deleteGame(){
  
    //       const serviceendpoint = "https://gruppe7.toni-barth.com";
    //       fetch(serviceendpoint + '/games/')
    //       .then(response => response.json())
    //       .then(data => {
    //           if(data.games.length !== 0){
    //               var gameID = data.games[data.games.length-1].id;
    //               console.log('All Games: ' + JSON.stringify(data.games));
    //               console.log('Game to be deleted: ' + gameID);
              
    //               fetch(serviceendpoint + '/games/' + gameID, {
    //                   method: "DELETE",
    //                   headers: { "Content-Type": "application/json" }
    //               })
    //               .then(response => response.json())
    //               .catch((error) => {
    //                   console.error('Error:', error);
    //               });
    //           }else{
    //               console.log('No Games existing.');
    //           }    
    //       })
  
    //   }

    return (
        <>
            <button id='playBtn' className='continueBtn' onClick={checkGames}>PLAY</button>
        </>
    );

}