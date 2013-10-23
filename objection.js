var LEFT = 'left';
var RIGHT = 'right';
var leftCharacter = {};
var rightCharacter = {};
var objectionObjects = [];
var characterPics = {
  phoenix: {
    path: "phoenix.gif",
    facing: RIGHT
  },
  miles: {
    path: "miles.gif",
    facing: LEFT
  },
  manfred: {
    path: "manfred.gif",
    facing: LEFT
  },
  franziska: {
    path: "franziska.gif",
    facing: LEFT
  },
  godot: {
    path: "godot.gif",
    facing: LEFT
  },
  mia: {
    path: "mia.gif",
    facing: RIGHT
  },
  calisto: {
    path: "calisto.gif",
    facing: LEFT
  },
  quercus: {
    path: "quercus.gif",
    facing: LEFT
  },
  jacques: {
    path: "jacques.gif",
    facing: LEFT
  },
  klavier: {
    path: "klavier.gif",
    facing: LEFT
  },
  kristoph: {
    path: "kristoph.gif",
    facing: LEFT
  },
  calisto: {
    path: "calisto.gif",
    facing: LEFT
  },
  winston: {
    path: "winston.gif",
    facing: LEFT
  },
  apollo: {
    path: "apollo.gif",
    facing: RIGHT
  }
}

var nextPosition = LEFT;
var nextDiv = 'leftCharacter';

function getRandomInteger(max, previousRandom) {
  var random = Math.floor(Math.random() * Math.abs(max));
  if (previousRandom === random && max > 0) {
    return getRandomInteger(max, previousRandom);
  }
  return random;
}

function replaceImgElement(objectionObject, div) {
  var img = objectionObject.image;
  img.setAttribute('height', '200');
  if (nextPosition === objectionObject.facing) {
    img.style.transform = 'rotateY(180deg)';
  }
  div.replaceChild(img, div.firstChild);
}

var previousRandomCharacterId = null;
function prepareNextObjection() {
  setTimeout(function() {
    var requiredDivId = (nextPosition === LEFT) ? 'leftCharacter' : 'rightCharacter';
    var randomCharacterId = getRandomInteger(objectionObjects.length, previousRandomCharacterId);
    var objectionObject = objectionObjects[randomCharacterId];
    previousRandomCharacterId = randomCharacterId;

    replaceImgElement(objectionObject, document.getElementById(requiredDivId));
    objectionObject.audioElement.play();

    if (nextPosition === LEFT) {
      document.getElementById('leftQuote').textContent = quotes[Math.floor(Math.random() * quotes.length)];
      nextPosition = RIGHT;
      nextDiv = 'rightCharacter';
    } else {
      document.getElementById('rightQuote').textContent = quotes[Math.floor(Math.random() * quotes.length)];
      nextPosition = LEFT;
      nextDiv = 'leftCharacter';
    }
    prepareNextObjection();
  }, Math.random() * 13000 + 2000)
}

function loadPictures() {
  for (var i in characterPics) {
    if (!characterPics.hasOwnProperty(i)) continue;

    var img = new Image();
    img.src = 'pictures/' + characterPics[i].path;
    characterPics[i].image = img;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  audioElementsNodeList = document.getElementsByTagName('audio');
  loadPictures();
  for (var i = 0; i < audioElementsNodeList.length; i++) {
    character = audioElementsNodeList[i].className;
    objectionObjects.push({
      audioElement: audioElementsNodeList[i],
      image: characterPics[character].image,
      facing: characterPics[character].facing
    });
    audioElementsNodeList[i].addEventListener('play', function() {
      document.getElementById('objection').className = 'big';
    });
    audioElementsNodeList[i].addEventListener('pause', function() {
      document.getElementById('objection').className = 'small';
    });
  }

  prepareNextObjection();
});
