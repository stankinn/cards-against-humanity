import React from 'react'
import './Popups.css'
import './Animations.css'

function PopupSmall(props) {
  return (props.trigger) ?(
    <div className='popupBack' onClick={() => props.setTrigger(false)}>
        <div className='popupWindow small lost'>
            {props.children}
        </div>
    </div>
  ) : '';
}

export default PopupSmall