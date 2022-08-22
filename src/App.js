import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Menu from './Menu';
import {PlayerCreation ,Game, GameLobby, ErrorPage, CardPacks} from './pages';


export default function App(){

    function storeLanguage(language) {
      localStorage.setItem("language", language);
    }

    let languageStored = localStorage.getItem("language");
    let [language, setLanguage] = useState(
      languageStored ? languageStored : "English"
    );


  return(     

    
    <Router>

    <button className='addBtn'><Link to= './packInfo'> Packs </Link></button>
      <Routes>
        <Route path='/cards-against-humanity' element={<PlayerCreation language={language}/>}/>
        <Route path='/gameLobby' element={<GameLobby language={language}/>}/>
        <Route path='/game' element={<Game language={language}/>}/>
        <Route path='/packInfo' element={<CardPacks/>}/>
        <Route path='*' element={<ErrorPage language={language}/>}/>
      </Routes>
      <Menu language={language} handleSetLanguage={language =>{
        setLanguage(language);
        storeLanguage(language);
      }}/>
    </Router>
  
  )
}