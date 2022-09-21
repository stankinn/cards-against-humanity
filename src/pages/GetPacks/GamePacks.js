import React from 'react';
import { useState, useEffect } from 'react';
import { serviceendpoint } from '../Imports';
import { lang } from '../../Languages';
import { Link, useNavigate } from 'react-router-dom';
import '../../components-styles/Packs.css';

export default function GetCurPacks(props) {

    let navigate = useNavigate();

    let content = lang;
    props.language === "German"
        ? (content = content.German)
        : (content = content.English);

    let [curPacks, setCurPacks] = useState([]);
    let gameID = localStorage.getItem("gameID");

    //helper variables
    let gamePackIds;
    let allPacks;

    useEffect(() => {

        //find your game and save the used pack ids
        fetch(serviceendpoint + '/games/')
            .then(response => response.json())
            .then(data => {
                for (var i = 0; i < data.games.length; i++) {
                    if (data.games[i].id === Number(gameID)) {

                        gamePackIds = data.games[i].packs;

                        
                    }
                    //get all packs again for comparison 
                        fetch(serviceendpoint + '/packs/')
                            .then(response => response.json())
                            .then(data => {

                                allPacks = data.packs;

                                //filter matching packs and set as state
                                setCurPacks(allPacks.filter(pack => gamePackIds.includes(pack.id)));

                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }, [])


    const setID = (id) => {
        localStorage.setItem("curPackID", id);
    }

    const goBack = () => {
        localStorage.removeItem("curPackID", localStorage.getItem("curPackID"));
        navigate(-1);
    }


    return (
        <>
            <div className='border'>
                {curPacks.map((pack) => {

                    return (

                        <Link to={`${pack.id}`} onClick={() => setID(pack.id)}>
                            <div className='packs packsall'>

                                <p key={pack.id}>{pack.name} ({content.black} {pack.blackCardCount} / {content.white} {pack.whiteCardCount}) </p>

                            </div>
                        </Link>
                    );
                })}
            </div>
            <button className='smallArrow' onClick={() => goBack()} />
        </>

    );

}