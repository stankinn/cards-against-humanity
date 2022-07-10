import React from 'react';
import { serviceendpoint} from './Imports';
import {useState, useEffect} from 'react';

export default function PlayerPoints(){

    let [finalList, setFinalList] = useState([]);

    let [playerList, setplayerList] = useState([]);

    var arr = [];
    var arrName = [];

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if(sessionStorage.getItem('gameID')){
    //             fetch(serviceendpoint + '/games/')
    //             .then(res => res.json())
    //             .then(data => {
    //                 if (data.games.length !== 0) {
    //                     for (var i = 0; i < data.games.length; i++) {
    //                         if(data.games[i].running === true){
    //                             showPlayer()
    //                         }
    //                     }
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.error('Error:', error);
    //             });
    //         }

    //     }, 1000);
    //     return () => clearInterval(interval);
    //   }, []);

      useEffect(() =>{
        showPlayer();
      })

    function showPlayer() {

        fetch(serviceendpoint + '/games/')
        .then(res => res.json())
        .then(data => {
            if (data.games.length !== 0) {
                for (var i = 0; i < data.games.length; i++) {
                    if (data.games[i].id === Number(sessionStorage.getItem('gameID'))) {
                        for(var j=0; j < data.games[i].players.length; j++){
                            setplayerList(data.games[i].players[j].name);
                        }
                    }
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        if(Number(sessionStorage.getItem('gameID'))){
            fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')))
            .then(res => res.json())
            .then(data => {
                console.log('Points: ' + data.points)
                if(data.points){
                    if(playerList.length === data.points.length){
                        console.log('Its the same Length!')
                        for(var i = 0; i < playerList.length; i++){
                            arr = arr.concat({name: playerList[i],points: data.points[i]})
                            console.log('ArrayNamen: ' + arr);
                        }
                        setFinalList(arr)
                        console.log('My finaleList: ' + finalList);
                    }

                }
            })

            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }

        return (
            <>
            <ol>
                <li>Player1</li>
                <li>Player2</li>
                <li>Player3</li>
            </ol>
            <ol>
                <li>Punkte1</li>
                <li>Punkte2</li>
                <li>Punkte3</li>
            </ol>
            {/* {playerList.map(({ name, id }) => (
                <p key={id}>{name}.....</p>
            ))} */}

            {/* {points.map((points) => (
            <p>{points}</p>
            ))} */}

            </>
        );
    }
