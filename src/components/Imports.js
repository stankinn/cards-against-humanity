import { default as GameURL } from './URL/GameURL';
import { default as PlayerURL } from './URL/PlayerURL';

export const serviceendpoint = "https://gruppe7.toni-barth.com";
export let gameURL = GameURL();
export let playerURL = PlayerURL();

export const playerID = localStorage.getItem('playerID');
export const playerName = localStorage.getItem('playerName');