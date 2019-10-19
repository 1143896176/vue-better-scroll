import {get} from './ajax'

const highquality = (p) => get('/top/playlist/highquality', p);
const playlist = (p) => get('/top/playlist', p);


export {highquality, playlist}
