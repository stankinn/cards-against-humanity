import React from 'react'
import '../components-styles/Popups.css'

function Popup(props) {
  
  return (props.trigger) ?(
    <div className='popupBack'>
        <div className='popupWindow'>
          <div id='btnClose' onClick={() => props.setTrigger(false)}>
            <div id='xBar1'/>
            <div id='xBar2'/>
          </div>
          <div id='curPage'>{props.contPage}/4</div>
          <div id='popupGrid'>
            <div id='popupContent'>
              <h2 className='popupTitle helpHeader1'>{props.header1}</h2>
              <p className='popupText helpText1'>{props.text1}</p>
              <img className='helpImg helpImage1' alt='Change_Lang' src={props.image1}/>
              
              <h2 className='popupTitle helpHeader2'>{props.header2}</h2>
              <p className='popupText helpText2'>{props.text2}</p>
              <img className='helpImg helpImage2' alt='Change_Lang' src={props.image2}/>
            </div>
            <div className='popupArrow arrowL' onClick={()=> props.setPage(props.contPage-1)}/>
            <div className='popupArrow arrowR' onClick={()=> props.setPage(props.contPage+1)}/>
          </div>
        </div>
    </div>
  ) : '';
}

export default Popup