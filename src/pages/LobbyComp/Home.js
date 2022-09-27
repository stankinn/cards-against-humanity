import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { serviceendpoint } from '../Imports';
import { lang } from '../../Languages';

import '../../components-styles/Lobby.css'

export default function Home() {

    let navigate = useNavigate();

    function goHome() {

        navigate('/cards-against-humanity');
    }



    return (
        <div id ='home' title='Home' onClick={() => goHome()}>
        <button className='homeBtn'>
            <div id='homeIconRoof'/>
            <div id='homeIcon'>
                <div id='homeIconDoor'/>
            </div>
        </button>

        </div>
    );
}