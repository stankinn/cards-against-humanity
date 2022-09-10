import React from 'react';
import { useState, useEffect } from 'react';
import { serviceendpoint } from '../Imports';
import { lang } from '../../Languages';
import { Link, useNavigate } from 'react-router-dom';
import '../../components-styles/Packs.css';

export default function GetAllPacks(props) {
    
    let navigate = useNavigate();
    let [clickedPack, setClicked] = useState([]);

    let content = lang;
    props.language === "German"
        ? (content = content.German)
        : (content = content.English);

    let [packs, setPack] = useState([]);

    useEffect(() => {

        fetch(serviceendpoint + '/packs/')
            .then(response => response.json())
            .then(data => {
                setPack(data.packs);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    const getID = (id) => {
        fetch(serviceendpoint + '/packs/' + id)
            .then(response => response.json())
            .then(data => {
                props.setPackID(data.id);
                localStorage.setItem("packID", data.id);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    
    return (
        <>
            <div className='border'>
                {packs.map((pack) => {

                    return (


                        <Link to={`${pack.id}`} onClick={() => setClicked(pack.id)}>
                            <div className='packs packsall'>

                                <p key={pack.id}>{pack.name} (B: {pack.blackCardCount} / W: {pack.whiteCardCount}) </p>

                            </div>
                        </Link>
                    );
                })}
            </div>
            <button className='smallArrow' onClick={() => navigate(-1)}/>
        </>

    );

}