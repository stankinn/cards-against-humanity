import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { serviceendpoint } from '../Imports';
import { lang } from '../../Languages';

import '../../components-styles/CreateGame.css'

export default function CreateGame(props) {

    
    let content = lang;
    props.language === "German"
        ? (content = content.German)
        : (content = content.English);

    let navigate = useNavigate();

    let [pointGoal, setGoal] = useState();
    let [packs, setPackOffer] = useState([]); //all card packs
    let [checkedPacks, setPacks] = useState([]); //determine which packs are checked (true or false values)                                      
    let helpArr = []; 
    let [selectedPacks, setSelectedPacks] = useState([]); 
    // https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/

    useEffect(() => {
    fetch(serviceendpoint + '/packs/')
        .then(response => response.json())
        .then(data => {
            setPacks(new Array(data.packs.length).fill(false));
            setPackOffer(data.packs);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    }, []);


    function setGameID(id) {
        sessionStorage.setItem('gameID', id);
    }

    function addGame() {

        if (!pointGoal) {
            setGoal = 10;
        }

        //if no packs selected, select all
        if (selectedPacks.length === 0) {
            
            packs.map(
                (pack) => {
                    helpArr = helpArr.concat(pack.id);
                }
              );
                setSelectedPacks(helpArr);
        }

        // new game with own playerID will be created and navigate to gameLobby
        fetch(serviceendpoint + '/games/', {
            method: 'POST',
            body: JSON.stringify({ owner: Number(localStorage.getItem('playerID')), goal: Number(pointGoal), packs: selectedPacks }),
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(data => {
                setGameID(data.id);

                console.log("game: " + JSON.stringify(data));
                sessionStorage.setItem('ownerID', data.owner.id);
                console.log('created game ' + Number(sessionStorage.getItem('gameID')) + ' successful.');
                navigate('/lobby/' + Number(sessionStorage.getItem('gameID')));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleOnSelectionChange = (position) => {

    ;
    const updatedCheckedState = checkedPacks.map((item, index) =>
      index === position ? !item : item
    );
    setPacks(updatedCheckedState);
    
    updatedCheckedState.map(
        (currentState, index) => {
          if (currentState === true) {
            helpArr = helpArr.concat(packs[index].id);
          }
        }
      );
        setSelectedPacks(helpArr);
}


    //Make sure the point goal input makes sense
    const handleGoalChange = event => {
        let result;
        if (event.target.value < 1) {

            event.target.value = 1;
        } else if (event.target.value > 100) {

            event.target.value = 100;
        }

        result = event.target.value

        setGoal(result);
    };

    function addAllPacks(){

        setPacks(new Array(packs.length).fill(true));

    }

    function deselectPacks(){

        setPacks(new Array(packs.length).fill(false));

    }

    return (
        <div className='createLayout'>
            <h2 id='headerCG'>Create Game</h2>
            <p id='pointsCG'>Points</p>
            <input type='number' id='inputGoal' className='input' min={1} max={100} onChange={handleGoalChange} />
            <p id='packsCG'>Packs</p>
            <div id='buttonsCG'>
                <button className='selectBtn' onClick={()=> addAllPacks()}>Select all</button>
                <button className='deselectBtn' onClick={()=> deselectPacks()}>Deselect all</button>
            </div>
            <div id='packsListCG'>
                {packs.map((pack, index) => {
                    return(
                        <div id='containerCG'>
                            <div className='checkboxContainer'>
                                <input
                                    id={`pack-checkbox-${index}`}
                                    type='checkbox' 
                                    key={pack.id} 
                                    value={pack.name}
                                    checked={checkedPacks[index]}
                                    onChange={()=> handleOnSelectionChange(index)}
                                />
                            </div>
                            <p id='packTitleCG' for={`pack-checkbox-${index}`}>{pack.name}</p>
                        </div>);
                })}
            </div>

            <button className='continueBtn' onClick={() => addGame()}>Create</button>
        </div>
    );

}