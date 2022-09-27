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
    var helpArray = [];

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
                    setCzarID(czar);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            //offer cards, if enough cards have been selected
            if (list.length === spaces && waitingPlayers > 0) {

                document.getElementById('choosingBtn').style.visibility = "visible";
                console.log("list: " + list);
                // fetch(serviceendpoint + '/games/' + Number(localStorage.getItem('gameID')) + '/cards/' + Number(localStorage.getItem('playerID')),
                //     {
                //         method: "PUT",
                //         body: JSON.stringify({ cards: list }),
                //         headers: { "Content-Type": "application/json" }
                //     })
                //     .then(res => {
                //         if (res.ok) {
                //             console.log("cards have been offered.");

                //         }
                //         return res
                //     })
                //     .then(response => response.json())

            }else{
                document.getElementById('choosingBtn').style.visibility = "hidden";
            }
            //show offers, once all players selected cards
            if (waitingPlayers === 0) {
    
                setList([]);
                getOffers();
            }
            
        //if you are the czar and still waiting for players, display overlay on screen
        if (czarID === Number(localStorage.getItem('playerID')) && waitingPlayers > 0) {
        
            document.getElementById('overlay').style.visibility = "visible";
            document.getElementById('choosingBtn').style.visibility = "hidden";
        } else {
            document.getElementById('overlay').style.visibility = "hidden";
            document.getElementById('choosingBtn').style.visibility = "visible";
        }

        }, 500);
        return () => clearInterval(interval);
    })

    
    // useEffect(() => {

    // },offers)


    //make an offer cards list
    function makeList(id) {

        const newSelection = [...list]
        console.log('before-selec: '+newSelection);
        console.log('before-list: '+list);

        if (list.length === spaces) {
            if(document.getElementById(id).classList.contains('active')){
                document.getElementById(id).classList.remove('active');
            
                const index = newSelection.indexOf(id);
                if (index > -1) { // only splice array when item is found
                    newSelection.splice(index, 1); // 2nd parameter means remove one item only
                }
                
            }else{
                console.log('No more cards can be added.');
            }
        } else {
            document.getElementById(id).classList.add('active');
            const newSelection = [...list]
            newSelection.push(id);
        }
        setList(newSelection);
        console.log('after-selec: ' + newSelection);
        console.log('after-list: ' + list);
    }


    //get offers for display
    function getOffers() {
        fetch(serviceendpoint + '/games/' + Number(localStorage.getItem('gameID')) + '/offers/' + Number(localStorage.getItem('playerID')))
            .then(res => res.json())
            .then(data => {

                setOffers(data.offers);
            })
    }

    //Choose a winning card from offers
    function chooseWinner(id) {

        //search for correct offer and set it to a helping array
        fetch(serviceendpoint + '/games/' + Number(localStorage.getItem('gameID')) + '/offers/' + Number(localStorage.getItem('playerID')))
            .then(res => res.json())
            .then(data => {

                for (var i = 0; i < data.offers.length; i++) {

                    if (data.offers[i].length > 0) {

                        for (var j = 0; j < data.offers[i].length; j++) {
                            if (data.offers[i][j].id === id) {
                                for (var k = 0; k < data.offers[i].length; k++) {
                                    helpArray[k] = data.offers[i][k].id;
                                }

                            }
                        }
                    }
                }
                //use array to set the winning cards
                fetch(serviceendpoint + '/games/' + Number(localStorage.getItem('gameID')) + '/offers/' + Number(localStorage.getItem('playerID')),
                    {
                        method: "PUT",
                        body: JSON.stringify({ cards: helpArray }),
                        headers: { "Content-Type": "application/json" }
                    })
                    .then(res => res.json())

            })
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
                                        <div className='card white' onClick={() => chooseWinner(text.id)}>

                                            <p key={text.id}> {text.text} </p>

                                        </div>);
                                })}

                            </>

                        ))}
                    </div>

                    <div id='overlay'> {content.czarWarning}</div>

                    <div id='choosingBtn'>
                        <button id='winnerBtn'> {content.choose} </button>
                    </div>

                    <div id='playerCards' className='gameDiv cardsBackground'>
                        {answer.map((text) => (
                            <div className='card white'>
                                <p key={text.id} >{text.text}</p>
                            </div>
                        ))}
                    </div>
                    
                </>
            );

        } else {
            return (
                <>
                    <div id='offeredCards' className='gameDiv cardsBackground'>

                        <>
                        </>

                    </div>

                    <div id='overlay'> {content.czarWarning}</div>

                    <div id='choosingBtn'>
                        <button id='cardBtn'> {content.choose} </button>
                    </div>

                    <div id='playerCards' className='gameDiv cardsBackground'>
                        {answer.map((text) => (
                            <div id={text.id} className='card white' onClick={() => makeList(text.id)}>
                                <p key={text.id} >{text.text}</p>
                            </div>
                        ))}
                    </div>


                </>
            );

        }

    } else {
        return (
            <>
                <div id='offeredCards' className='gameDiv cardsBackground'>

                    <>
                    </>

                </div>
                <div id='playerCards' className='gameDiv cardsBackground'>
                    <div className='card white'>
                        <p> </p>
                    </div>
                    <div className='card white'>
                        <p>
                        </p>
                    </div>
                    <div className='card white'>
                        <p>
                        </p>
                    </div>
                    <div className='card white'>
                        <p>
                        </p>
                    </div>
                    <div className='card white'>
                        <p>
                        </p>
                    </div>
                    <div className='card white'>
                        <p>
                        </p>
                    </div>
                    <div className='card white'>
                        <p>
                        </p>
                    </div>
                    <div className='card white'>
                        <p>
                        </p>
                    </div>
                    <div className='card white'>
                        <p>
                        </p>
                    </div>
                    <div className='card white'>
                        <p>
                        </p>
                    </div>
                </div>
            </>
        );
    }

}