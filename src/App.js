import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './Menu';
import {PlayerCreation ,Game, GameLobby, ErrorPage} from './pages';


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
      <Menu language={language} handleSetLanguage={language =>{
        setLanguage(language);
        storeLanguage(language);
      }}/>
      <Routes>
        <Route path='/cards-against-humanity' element={<PlayerCreation language={language}/>}/>
        <Route path='/gameLobby' element={<GameLobby language={language}/>}/>
        <Route path='/game' element={<Game language={language}/>}/>
        <Route path='*' element={<ErrorPage language={language}/>}/>
      </Routes>
    </Router>
  )
}