import React, {useState, useEffect}  from 'react';
import { serviceendpoint} from '../Imports';

export default function PlayerPoints(){

    let [finalList, setFinalList] = useState([]);
    let [playerList, setplayerList] = useState([]);

    var arr = [];
    var arrPlayer = [];

    useEffect(() =>{
        const interval = setInterval(() => {
            showPlayer();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    function showPlayer() {
 
        fetch(serviceendpoint + '/games/')
        .then(res => res.json())
        .then(data => {
            if (data.games.length !== 0) {
                for (var i = 0; i < data.games.length; i++) {
                    if (data.games[i].id === Number(sessionStorage.getItem('gameID'))) {
                        if(data.games[i].running){
                            for(var j=0; j < data.games[i].players.length; j++){
                                setplayerList(data.games[i].players[j])
                            }
                        }
                    }
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')))
        .then(res => res.json())
        .then(data => {
            if(data.points){
                if(playerList.length === data.points.length){
                    for(var i = 0; i < playerList.length; i++){
                        setFinalList({'name': playerList[i].name, 'id': playerList[i].id,'points': data.points[i]})
                    }
                    // setFinalList(arr)
                    console.log(JSON.stringify(finalList))
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
        return (
            <div className='playerPoints'>
                {finalList.map(({ name, id, points }) => (
                    <p key={id}>{name}.....{points}</p>
                ))}
            </div>
        );
    }
