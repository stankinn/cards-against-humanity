import React from 'react'
import './Popups.css'

function Popup(props) {
  return (props.trigger) ?(
    <div className='popupBack'>
        <div className='popupWindow'>
          <div id='btnClose' onClick={() => props.setTrigger(false)}>
            <div id='xBar1'/>
            <div id='xBar2'/>
          </div>
            {props.children}
        </div>
    </div>
  ) : '';
}

export default Popup