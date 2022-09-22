import React, {useState, useEffect}  from 'react';
import { serviceendpoint} from '../Imports';
import {lang} from '../../Languages';

export default function PlayerPoints(props){

    let [packList, setPacks] = useState([]);
    var arr = [];

    let content = lang;
    props.language === "German"
        ? (content = content.German)
        : (content = content.English);

    useEffect(() =>{
        updatePacks();
    }, []);

    function updatePacks(){
        fetch(serviceendpoint + '/games/')
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.games.length; i++){
                if (data.games[i].id === Number(localStorage.getItem('gameID'))) {
                    updatePackList(data.games[i].packs)
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
    function updatePackList(curPacks){

            fetch(serviceendpoint + '/packs/')
            .then(response => response.json())
            .then(data => {
                for(var i = 0; i < data.packs.length; i++){
                    for(var j = 0; j < curPacks.length; j++){
                        if(data.packs[i].id === curPacks[j]){
                            arr[j]={'name': data.packs[i].name, 'id': data.packs[i].id};
                        }
                    }
                }
                setPacks(arr)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }



        return (
        <div id='ingamePacks' className='ingameList'>
            {packList.map((pack) =>(
                <p key={pack.id}>{pack.name}</p>
            ))}
        </div>
        );
    }
