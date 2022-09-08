import React, {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom';
import { serviceendpoint} from '../Imports';
import { lang } from '../../Languages';

import '../../components-styles/CreateGame.css'

export default function CreateGame(props) {

    const packsLength = 0;
     let content = lang;
    props.language === "German"
      ? (content = content.German)
      : (content = content.English);

    fetch(serviceendpoint + '/packs/')
    .then(response => response.json())
    .then(data => {
        packsLength = data.packs.length
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    let navigate = useNavigate();
    let [pointGoal, setGoal] = useState();
    let [checkedPacks, setPacks] = useState(
        new Array(packsLength).fill(false)
    );
    // https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/


    function setGameID(id) {
        sessionStorage.setItem('gameID', id);
    }

    function addGame() {

        if(!pointGoal){
            setGoal = 10;
        }

        // new game with own playerID will be created and navigate to gameLobby
        fetch(serviceendpoint + '/games/', {
            method: 'POST',
            body: JSON.stringify({ owner: Number(localStorage.getItem('playerID')), goal: Number(pointGoal)}),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(data => {
            setGameID(data.id);
            
            console.log("owner: " + JSON.stringify(data));
            sessionStorage.setItem('ownerID', data.owner.id);
            console.log('created game ' + Number(sessionStorage.getItem('gameID')) + ' successful.');
            navigate('/lobby/'+ Number(sessionStorage.getItem('gameID')));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    //Make sure the point goal input makes sense
    const handleChange = event => {
        let result;
        if(event.target.value < 1){

            event.target.value = 1;
        }else if(event.target.value > 100){

            event.target.value = 100;
        }

        result = event.target.value

        setGoal(result);
      };
    
    return (
        <div className='createLayout'>
            <h2 id='headerCG'>Create Game</h2>
            <p id='pointsCG'>Points</p>
            <input type='number' id='inputGoal' className='input' min={1} max={100} onChange={handleChange}/>
            <p id='packsCG'>Packs</p>
            <div id='packsListCG' className='list'></div>
            <button className='continueBtn' onClick={() => addGame()}>Create</button>
        </div>
    );

}