import React from 'react';
import { useState, useEffect } from 'react';
import { serviceendpoint } from '../Imports';
import { useNavigate } from 'react-router-dom';
import '../../components-styles/Packs.css'

export default function GetPackInfo() {

    let [packWhiteCards, setWhiteCards] = useState([]);
    let [packBlackCards, setBlackCards] = useState([]);
    let [packTitle, setTitle] = useState();

    let packID= localStorage.getItem("packID");

    let navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            
            fetch(serviceendpoint + '/packs/' + packID)
            .then(response => response.json())
            .then(data => {
                setWhiteCards(data.white);
                setBlackCards(data.black);
                setTitle(data.name);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        }, 500);
        return () => clearInterval(interval);
    }, [])

    const goBack = () =>{
        localStorage.removeItem("packID", packID);    
        navigate(-1);
    }

    return (
        <>
            <h2 id='packTitle'>{packTitle}</h2>

            <div className='border detail'>
                {packWhiteCards.map((white) => {
                    return (
                        <div className='packs white'>

                            <p key={white.id}>{white.text}</p>

                        </div>
                    );
                })}
                {packBlackCards.map((black) => {
                    return (
                    <div className='packs black'>

                        <p key={black.id}>{black.text}</p>

                    </div>
                    );
                })}
            </div>
            
            <button className='smallArrow' onClick={() => goBack()}/>
        </>

    );

}