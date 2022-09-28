import React from 'react';
import '../../components-styles/Cards.css'
import { serviceendpoint } from '../Imports';
import { useState, useEffect } from 'react';
import {lang} from '../../Languages';

export default function WhiteCards(props) {

    let [answer, setAnswer] = useState([]); // white cards text in general
    let [running, setRunning] = useState(); // check if game is running
    let [list, setList] = useState([]);     // set list of selected cards for offer
    let [spaces, setSpaces] = useState();   // how many cards need to be selected
    let [offers, setOffers] = useState();   // get offered cards
    let [waitingPlayers, setPlayers] = useState();  //how many players have to make their offers
    let [czarID, setCzarID] = useState();   //Czar ID for warning display
    let [offered, setOffered] = useState(); //has the player offered his cards
    let [winner, setWinner] = useState();   //did the czar choose a winning card/s
    let [winningCards, setWinningCards] = useState([]); //chosen winning card/s

    let [order, setOrder] = useState();  

    var helpArray= [];

    let content = lang;
    props.language === "German"
      ? (content = content.German)
      : (content = content.English);

    useEffect(() => {
        const interval = setInterval(() => {

            //set running state and white cards
            fetch(serviceendpoint + '/games/')
            .then(response => response.json())
            .then(data => {
                for (var i = 0; i < data.games.length; i++) {
                    if (data.games[i].id === Number(localStorage.getItem('gameID'))) {
                        if (data.games[i].running === true) {
                            fetch(serviceendpoint + '/games/' + Number(localStorage.getItem('gameID')) + '/cards/' + Number(localStorage.getItem('playerID')))
                            .then(response => response.json())
                            .then(data => {
                                let cards = data.cards;
                                setAnswer(cards);
                                setRunning(true);
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });

                        } else {
                            console.log('White Cards cannot be shown yet. Game is not running')
                            setRunning(false);
                        }
                        i = data.games.length;
                        break;
                    }
                }
            })

            //set space number from black card and waiting for players state
            fetch(serviceendpoint + '/games/' + Number(localStorage.getItem('gameID')))
            .then(response => response.json())
            .then(data => {
                var spaceNumber = data.currentBlackCard.pick;
                var waiting = data.waitingForPlayers;
                var czar = data.czar.id;
                setSpaces(spaceNumber);
                setPlayers(waiting);
                if(czarID !== czar){
                    setCzarID(czar);
                    setOffered(false);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            //show offer button, if enough cards have been selected
            if (list.length === spaces && waitingPlayers > 0 && offered === false) {
                document.getElementById('choosingBtn').style.visibility = "visible";
            }else{
                document.getElementById('choosingBtn').style.visibility = "hidden";
            }

            //show offers, once all players selected cards
            if (waitingPlayers === 0) {
    
                if(list.length !== 0 || (czarID === Number(localStorage.getItem('playerID')) && offered === false)){
                    setList([]);
                    getOffers();
                    setOffered(true);
                    setWinner(false);

                    // add OrderNumber to cards
                    fetch(serviceendpoint + '/games/' + Number(localStorage.getItem('gameID')) + '/offers/' + Number(localStorage.getItem('playerID')))
                    .then(res => res.json())
                    .then(data => {
                        
                        for (let i = 0; i < data.offers.length; i++) {
                            if(data.offers[i].length > 0){
                                for (let j = 0; j < spaces; j++) {
                                    document.getElementById(data.offers[i][j].id).querySelector('#orderNumber').innerHTML = j;
                                }
                            }
                        }

                    })
                }
            }
            
            //if you are the czar, display overlay on screen
            if (czarID === Number(localStorage.getItem('playerID'))) {
                document.getElementById('overlay').style.visibility = "visible";
                document.getElementById('czarWarning').style.visibility = "visible";
                if(winner === true){
                    document.getElementById('choosingBtn').style.visibility = "visible";
                }
            } else {
                document.getElementById('overlay').style.visibility = "hidden";
                document.getElementById('czarWarning').style.visibility = "hidden";
            }

            if(offered === true && czarID !== Number(localStorage.getItem('playerID'))){
                document.getElementById('overlay').style.visibility = "visible";
                document.getElementById('czarWarning').style.visibility = "hidden";
            }else if(offered === false && czarID !== Number(localStorage.getItem('playerID'))){
                document.getElementById('overlay').style.visibility = "hidden";
                document.getElementById('czarWarning').style.visibility = "hidden";
            }

        }, 500);
        return () => clearInterval(interval);
    })

    //add cards to an offered cards list
    function makeList(id) {

        if(czarID !== Number(localStorage.getItem('playerID'))){
            
            const newSelection = [...list]

            // don't add card if enough cards have been added
            if(list.length === spaces && document.getElementById(id).classList.contains('active') !== true) {
                console.log('No more cards can be added.');
            }
            // select card (add active and add card to offering list)
            else if(document.getElementById(id).classList.contains('active') !== true) {
                document.getElementById(id).classList.add('active');
                newSelection.push(id);
                console.log('added: ' + newSelection)
                 
                // add mark order in corner
                let place;
                for (let i = 0; i < newSelection.length; i++) {
                    if(newSelection[i] === id){
                        place = i;
                    }
                }

                // add OrderNumber to card
                document.getElementById(id).querySelector('#orderNumber').innerHTML = place;
            }
            // deselect card (remove active and remove card from offering list)
            else if(document.getElementById(id).classList.contains('active') === true){
                document.getElementById(id).classList.remove('active');
                
                const index = newSelection.indexOf(id);
                if (index > -1) { // only splice array when item is found
                    newSelection.splice(index, 1); // 2nd parameter means remove one item only
                }
                console.log('removed: ' + newSelection)

                // remove OrderNumber
                document.getElementById(id).querySelector('#orderNumber').innerHTML = null;

                // change OrderNumber to right order
                for (let j = 0; j < newSelection.length; j++) {
                    if(document.getElementById(newSelection[j]).classList.contains('active') === true){
                        document.getElementById(newSelection[j]).querySelector('#orderNumber').innerHTML = j;
                    }
                }
                
            }

            setList(newSelection); 
        }
    }

    // offer card/s
    function chooseCard(){
        if(document.getElementById('choosingBtn').style.visibility === "visible" && list.length === spaces){

            fetch(serviceendpoint + '/games/' + Number(localStorage.getItem('gameID')) + '/cards/' + Number(localStorage.getItem('playerID')),
            {
                method: "PUT",
                body: JSON.stringify({ cards: list }),
                headers: { "Content-Type": "application/json" }
            })
            .then(res => {
                if (res.ok) {
                    console.log("cards have been offered.");
                    document.getElementById('choosingBtn').style.visibility = "hidden";
                    setOffered(true);

                    // don't activate any cards and remove OrderNumbers after offering
                    for (let i = 0; i < answer.length; i++) {
                        document.getElementById(answer[i].id).classList.remove('active');
                        document.getElementById(answer[i].id).querySelector('#orderNumber').innerHTML = null;
                    }
                }
                return res
            })
            .then(response => response.json())
        }
    }


    //get offers for display
    function getOffers() {
        fetch(serviceendpoint + '/games/' + Number(localStorage.getItem('gameID')) + '/offers/' + Number(localStorage.getItem('playerID')))
        .then(res => res.json())
        .then(data => {
            setOffers(data.offers);
        })
    }

    //Choose a winning card/s from offers
    function chooseWinner(id) {

        if(czarID === Number(localStorage.getItem('playerID'))){

            //search for correct offer and set it to a helping array
            fetch(serviceendpoint + '/games/' + Number(localStorage.getItem('gameID')) + '/offers/' + Number(localStorage.getItem('playerID')))
            .then(res => res.json())
            .then(data => {

                for (var i = 0; i < data.offers.length; i++) {

                    // check all offers, except the empty (=last) one
                    if (data.offers[i].length > 0) {

                        for (var j = 0; j < data.offers[i].length; j++) {
                            if (data.offers[i][j].id === id) {

                                // deselect card/s (remove active from all connected cards and clear winnerID)
                                if(winner === true && document.getElementById(id).classList.contains('active') === true){
                                    for (var k = 0; k < data.offers[i].length; k++) {
                                        document.getElementById(data.offers[i][k].id).classList.remove('active');
                                        setWinningCards(undefined);
                                    }
                                    document.getElementById('choosingBtn').style.visibility = "hidden";
                                    setWinner(false)
                                }
                                // select card/s (add active to all connected cards and add winnerID)
                                else if(winner === false){
                                    for (var l = 0; l < data.offers[i].length; l++) {
                                        document.getElementById(data.offers[i][l].id).classList.add('active');
                                        helpArray[l] = data.offers[i][l].id;
                                    }
                                    setWinningCards(helpArray);
                                    document.getElementById('choosingBtn').style.visibility = "visible";
                                    setWinner(true)
                                }
                            }
                        }
                    }
                }

            })
        }
    }

    // submit chosen winning card/s
    function chooseWinningCard(){

        fetch(serviceendpoint + '/games/' + Number(localStorage.getItem('gameID')) + '/offers/' + Number(localStorage.getItem('playerID')),
        {
            method: "PUT",
            body: JSON.stringify({ cards: winningCards }),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json())
    }

    if ({ running }.running === true) {
        if (waitingPlayers === 0 && offers !== undefined) {

            //visible offer cards
            const filtered = offers.filter(offer => {
                if (Object.keys(offer).length !== 0) {
                    return true;
                } return false;
            });

            return (
                <>
                    <div id='offeredCards' className='gameDiv cardsBackground'>

                        {filtered.map((offer) => (

                            <>
                                {offer.map((text) => {
                                    return (
                                        <div id={text.id} className='card white' onClick={() => chooseWinner(text.id)}>
                                            <p key={text.id}> {text.text} </p>
                                            <p id='orderNumber'></p>
                                        </div>);
                                })}

                            </>

                        ))}
                    </div>

                    <div id='choosingBtn'>
                        <button id='winnerBtn' title='Choose Winner' onClick={() => chooseWinningCard()}> {content.choose} </button>
                    </div>

                    <div id='playerCards' className='gameDiv cardsBackground'>
                        {answer.map((text) => (
                            <div className='card white'>
                                <p key={text.id} >{text.text}</p>
                            </div>
                        ))}
                    </div>

                    <div id='overlay'>
                        <p id='czarWarning'>{content.czarWarning}</p>
                    </div>
                    
                </>
            );

        } else {
            return (
                <>
                    <div id='offeredCards' className='gameDiv cardsBackground'>
                        <></>
                    </div>

                    <div id='choosingBtn'>
                        <button id='cardBtn' title='Offer Cards' onClick={() => chooseCard()}> {content.choose} </button>
                    </div>

                    <div id='playerCards' className='gameDiv cardsBackground'>
                        {answer.map((text) => (
                            <div id={text.id}  className='card white' onClick={() => makeList(text.id)}>
                                <p key={text.id} >{text.text}</p>
                                <p id='orderNumber'></p>
                            </div>
                        ))}
                    </div>

                    <div id='overlay'>
                        <p id='czarWarning'>{content.czarWarning}</p>
                    </div>
                </>
            );

        }

    } else {
        return (
            <>
                <div id='offeredCards' className='gameDiv cardsBackground'>
                    <></>
                </div>
                <div id='playerCards' className='gameDiv cardsBackground'>
                    <div className='card white'><p></p></div>
                    <div className='card white'><p></p></div>
                    <div className='card white'><p></p></div>
                    <div className='card white'><p></p></div>
                    <div className='card white'><p></p></div>
                    <div className='card white'><p></p></div>
                    <div className='card white'><p></p></div>
                    <div className='card white'><p></p></div>
                    <div className='card white'><p></p></div>
                    <div className='card white'><p></p></div>
                </div>
            </>
        );
    }

}