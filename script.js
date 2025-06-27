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
  const clicksound = createsoundbite("https://a.tumblr.com/tumblr_ojrmy55yUN1w2e2oyo1.mp3");

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
});




//   SPLASH PAGE ANIMATIONS
