// SPLASH SCREEN

window.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash-screen');
  const mainSite = document.getElementById('main-site');
  const enterBtn = document.getElementById('enter-btn');

  const hasVisited = sessionStorage.getItem('hasVisited');

  // Paste createsoundbite function here
  var html5_audiotypes = {
    "mp3": "audio/mpeg",
    "mp4": "audio/mp4",
    "ogg": "audio/ogg",
    "wav": "audio/wav"
  };

  function createsoundbite(sound) {
    var html5audio = document.createElement('audio');
    if (html5audio.canPlayType) {
      for (var i = 0; i < arguments.length; i++) {
        var sourceel = document.createElement('source');
        sourceel.setAttribute('src', arguments[i]);
        if (arguments[i].match(/\.(\w+)$/i))
          sourceel.setAttribute('type', html5_audiotypes[RegExp.$1]);
        html5audio.appendChild(sourceel);
      }
      html5audio.load();
      html5audio.playclip = function () {
        html5audio.pause();
        html5audio.currentTime = 0;
        html5audio.play();
      };
      return html5audio;
    } else {
      return {
        playclip: function () {
          throw new Error("Your browser doesn't support HTML5 audio unfortunately");
        }
      };
    }
  }

  // Initialize sounds
  const mouseoversound = createsoundbite("https://a.tumblr.com/tumblr_ojrn7aGBii1w2e2oyo1.mp3");
  const clicksound = createsoundbite('audio/magicenter.mp3');

  // Other sound effects you want to use freely
  const cuteshine = createsoundbite("audio/cuteshine.mp3");
  const magicshine = createsoundbite("audio/magicshine.mp3");
  const notif = createsoundbite("audio/notif.mp3");
  const smallwink = createsoundbite("audio/smallwink.mp3");
  const twinkle = createsoundbite("audio/twinkle.mp3");

  if (hasVisited) {
    splash.style.display = 'none';
    mainSite.style.display = 'block';
  }

  if (enterBtn) {
    enterBtn.addEventListener('mouseenter', () => {
      mouseoversound.playclip();
    });

    enterBtn.addEventListener('click', () => {
      clicksound.playclip();

      splash.classList.add('fade-out');

      splash.addEventListener('animationend', () => {
        splash.style.display = 'none';
        mainSite.style.display = 'block';
        sessionStorage.setItem('hasVisited', 'true');
      }, { once: true });
    });
  } else {
    console.warn("Enter button not found!");
  }

  // Apply sound effects to any element with class "sound-link"
document.querySelectorAll('.sound-link').forEach(el => {
  el.addEventListener('mouseenter', () => {
    mouseoversound.playclip();
  });

  el.addEventListener('click', () => {
    clicksound.playclip();
  });
});

document.querySelectorAll('.AA').forEach(link => {
  link.addEventListener('mouseenter', () => {
    smallwink.playclip();
  });
});
});




// MUSIC 
const playlist = [
    'audio/song1.mp3',
    'audio/song2.mp3',
    'audio/song3.mp3',
    'audio/song4.mp3',
    'audio/song5.mp3'
  ];

  let currentTrack = 0;
  let isPlaying = false;

  const music = document.getElementById('bg-music');
  const toggleBtn = document.getElementById('music-toggle');

  // Set default volume lower (0.2 = 20%)
  music.volume = 0.2;

  // Load and play the current track
  function playTrack(index) {
    music.src = playlist[index];
    music.play();
  }

  // Loop through the playlist
  music.addEventListener('ended', () => {
    currentTrack++;
    if (currentTrack >= playlist.length) {
      currentTrack = 0; // loop back to first
    }
    playTrack(currentTrack);
  });

  // Toggle play/pause with button
  toggleBtn.addEventListener('click', () => {
    if (isPlaying) {
      music.pause();
      toggleBtn.classList.remove("playing");
    } else {
      playTrack(currentTrack);
      toggleBtn.classList.add("playing");
    }
    isPlaying = !isPlaying;
  });

  // Optional: Autoplay on splash "Enter" button
  const enterBtn = document.getElementById("enter-btn");
  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      playTrack(currentTrack);
      isPlaying = true;
      toggleBtn.classList.add("playing");
    });
  }



// HOVER GIFS
document.querySelectorAll('.hover-gif').forEach(img => {
    const stillSrc = img.dataset.still;
    const animSrc = img.dataset.anim;

    img.addEventListener('mouseenter', () => {
      img.src = animSrc;
    });

    img.addEventListener('mouseleave', () => {
      img.src = stillSrc;
    });
  });
