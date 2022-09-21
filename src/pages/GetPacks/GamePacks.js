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
                    console.log(data.games[i].id);
                    if (data.games[i].id === Number(gameID)) {

                        gamePackIds = data.games[i].packs;
                        console.log(gamePackIds);
                        
                    }
                    //get all packs again for comparison 
                        fetch(serviceendpoint + '/packs/')
                            .then(response => response.json())
                            .then(data => {

                                allPacks = data.packs;
                                console.log(gamePackIds);
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
        localStorage.setItem("packID", id);
    }

    const goBack = () => {
        localStorage.removeItem("packID", localStorage.getItem("packID"));
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