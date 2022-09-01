import React from 'react';
import { useState, useEffect } from 'react';
import { serviceendpoint } from '../Imports';

export default function GetPackInfo() {

    let [packWhiteCards, setWhiteCards] = useState([]);
    let [packBlackCards, setBlackCards] = useState([]);
    let [packTitle, setTitle] = useState();

    let packID= localStorage.getItem("packID");


    useEffect(() => {
        const interval = setInterval(() => {
            console.log("ID: " + packID);
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

    return (
        <>
            <h2>{packTitle}</h2>

            <>
                <h3 style={{color: "white"}}> White: </h3>
                {packWhiteCards.map((white) => {
                    return (
                        <>

                            <h4 key={white.id} style={{color: "white"}}>
                                {white.text}
                            </h4>

                        </>
                    );
                })}
            </>
            <>
                <h3 style={{color: "black"}}> Black: </h3>
                {packBlackCards.map((black) => {
                    return (<>


                        <h4 key={black.id} style={{color: "black"}}>
                            {black.text}
                        </h4>

                    </>
                    );
                })}
            </>
        </>

    );

}