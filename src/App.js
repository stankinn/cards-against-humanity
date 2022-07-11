import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './Menu';
import {PlayerCreation ,Game, GameLobby, ErrorPage} from './pages';


export default function App(){

    sessionStorage.clear();

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
        <Route path='/' element={<PlayerCreation/>}/>
        <Route path='/gameLobby' element={<GameLobby/>}/>
        <Route path='/game' element={<Game/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </Router>
  )
}