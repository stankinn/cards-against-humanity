import React from 'react'
import {useState, useEffect} from 'react';
import {serviceendpoint, playerURL} from './Imports';

export default function Player() {

    
  let [name, setName] = useState('No Players existing.');

  function showPlayer() {
    playerURL.then(data=>{
        setName (data.players[data.players.length-1].name);  
        document.getElementById('playBtn').classList.add('disabled');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  function addPlayer() {

    var input = document.getElementById('inputName').value;

    playerURL.then(data=>{
            if(input === ''){
              input = 'Player69'
            }
            fetch(serviceendpoint + '/players/',{
                method: 'POST',
                body:JSON.stringify({name: input}),
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data.id + ' New Player: ' + data.name)
                document.getElementById('playBtn').classList.remove('disabled');
                showPlayer();
              
            })
            .catch((error) =>{
                console.error('Error: ', error);
            });
       
    })
    .catch((error) => {
        console.error('Error:', error);
        });
 
  }

  function deletePlayer() {
      playerURL.then(data=>{
        
            var playerId = 0;
            if(data.players.length !== 0){
              if(data.players.id !== 0){
                playerId= data.players[data.players.length-1].id;
              }
              fetch(serviceendpoint + '/players/' + playerId, {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" }
              })
              .then(res => console.log(res))
              .catch((error) =>{
                console.error('Error: ', error);
            });
            }
            else{
              console.log('No Player existing.')
            }
      });
  }

    return (
        <>
          <p id='curNameContent'>{name}</p>
          <button className='delBtn' onClick={deletePlayer}>DEL</button>
          <button className='addBtn' onClick={addPlayer}>ADD</button>
        </>
    );
}