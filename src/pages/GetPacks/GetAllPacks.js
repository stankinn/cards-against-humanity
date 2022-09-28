import React from 'react';
import { useState, useEffect } from 'react';
import { serviceendpoint } from '../Imports';
import { lang } from '../../Languages';
import { Link, useNavigate } from 'react-router-dom';
import '../../components-styles/Packs.css';

export default function GetAllPacks(props) {
    
    let [packs, setPack] = useState([]);
    let navigate = useNavigate();

    let content = lang;
    props.language === "German"
        ? (content = content.German)
        : (content = content.English);

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

    const setID = (id) => {
        localStorage.setItem("packID", id);    
    }

    const goBack = () =>{
        localStorage.removeItem("packID", localStorage.getItem("packID"));    
        navigate(-1);
    }

    
    return (
        <>
            <div className='border'>
                {packs.map((pack) => {

                    return (

                        <Link to={`${pack.id}`} onClick={() => setID(pack.id)}>
                            <div className='packs packsall'>

                                <p key={pack.id}>{pack.name} ({content.black} {pack.blackCardCount} / {content.white} {pack.whiteCardCount}) </p>

                            </div>
                        </Link>
                    );
                })}
            </div>
            <button className='smallArrow' onClick={() => goBack()}/>
        </>

    );

}