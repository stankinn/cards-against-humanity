import React from 'react'
import { useNavigate } from 'react-router-dom';

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
                <div id='homeIcon'/>
            </button>
        </div>
    );
}