import React, {useState, useEffect} from 'react'
import {serviceendpoint} from './Imports';

export default function Player(props) {

  const playerID = localStorage.getItem('playerID');
  const playerName = localStorage.getItem('playerName');
  const [content, setContent] = useState(playerName ? playerName : 'No Player existing.');

  function setPlayer(name, id) {
    localStorage.setItem('playerName',name);
    localStorage.setItem('playerID',id);
    console.log('Your Player: ' + playerName + '(' + playerID + ')');
  }

  useEffect(() =>{
    if(playerID === null){
      document.getElementById('playBtn').classList.add('disabled');
    }else{
      document.getElementById('playBtn').classList.remove('disabled');
    }
  })  

  function addPlayer() {

    var input = document.getElementById('inputName').value;

    console.log('cur PlayerID: ' + playerID)

    if(playerID){
      console.log('There already is a Player.');
    }else{
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
        setPlayer(data.name, data.id);
        setContent(data.name);
      })
      .catch((error) =>{
        console.error('Error: ', error);
      });
    }
  }

  function deletePlayer() {
      
    console.log(localStorage);
    if(!playerID){
      console.log('No Player existing.');
    }else{
      fetch(serviceendpoint + '/players/' + playerID, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
      })
      .then(res => console.log(res))
      .catch((error) => {
        console.error('Error:', error);
      });

      //setPlayer('No Player existing.', null);
          localStorage.removeItem('playerID');
          localStorage.removeItem('playerName');
          setContent('No Player existing.');

    }
  }

  return (
    <>
      <p id='curNameContent'>{content}</p>
      <button className='delBtn' onClick={deletePlayer}>delete</button>
      <button className='addBtn' onClick={addPlayer}>new</button>
    </>
  );
}