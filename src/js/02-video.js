import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iFrame = document.querySelector('#vimeo-player');
const player = new VimeoPlayer(iFrame);

// function (timeEvent) {
//   localStorage.setItem(
//     'videoplayer-current-time',
//     timeEvent.seconds.toString()
//   );
// }

player.on(
  'timeupdate',
  throttle(timeEvent => {
    localStorage.setItem(
      'videoplayer-current-time',
      timeEvent.seconds.toString()
    );
  }, 1000)
);

player
  .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
