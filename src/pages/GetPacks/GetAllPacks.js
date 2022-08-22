import React from 'react';
import { useState, useEffect } from 'react';
import { serviceendpoint } from '../Imports';

export default function GetAllPacks() {

    let [packs, setPack] = useState([]);
    let [packInfo, setPackInfo] = useState([]);

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

    function getPackInfo(id) {

        fetch(serviceendpoint + '/packs/' + id)
            .then(response => response.json())
            .then(data => {
                setPackInfo(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }
    return (
        <>
            <div className='Packs'>
                {packs.map((pack) => {
                    return (
                        <div className='card white' onClick={() => getPackInfo(pack.id)}>

                            <p key={pack.id}> {pack.name} (B: {pack.blackCardCount} / W: {pack.whiteCardCount}) </p>

                        </div>);
                })}

            </div>
        </>
    );

}