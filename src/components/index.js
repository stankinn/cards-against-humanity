import { default as GameURL } from './URL/GameURL';
import { default as PlayerURL } from './URL/PlayerURL';


export {default as Start} from './Start';
export {default as Game} from './Game';
export {default as Menu} from './Menu';
export {default as Popup} from './Popup';
export {default as PopupAnimation} from './PopupAnimation';
export {default as isGameRunning} from './checkRunning';


export const serviceendpoint = "https://gruppe7.toni-barth.com";
export let gameURL = GameURL();
export let playerURL = PlayerURL();