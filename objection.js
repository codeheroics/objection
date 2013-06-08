var LEFT = 'left';
var RIGHT = 'right';
var leftCharacter = {};
var rightCharacter = {};
var objectionObjects = [];
var characterPics = {
  phoenix: {
    picture: "phoenix.gif",
    facing: RIGHT
  },
  miles: {
    picture: "miles.gif",
    facing: LEFT
  },
  manfred: {
    picture: "manfred.gif",
    facing: LEFT
  },
  franziska: {
    picture: "franziska.gif",
    facing: LEFT
  },
  godot: {
    picture: "godot.gif",
    facing: LEFT
  },
  mia: {
    picture: "mia.gif",
    facing: RIGHT
  },
  calisto: {
    picture: "calisto.gif",
    facing: LEFT
  },
  quercus: {
    picture: "quercus.gif",
    facing: LEFT
  },
  jacques: {
    picture: "jacques.gif",
    facing: LEFT
  },
  klavier: {
    picture: "klavier.gif",
    facing: LEFT
  },
  kristoph: {
    picture: "kristoph.gif",
    facing: LEFT
  },
  calisto: {
    picture: "calisto.gif",
    facing: LEFT
  },
  winston: {
    picture: "winston.gif",
    facing: LEFT
  },
  apollo: {
    picture: "apollo.gif",
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
  var img=document.createElement('img');
  img.setAttribute('src', 'pictures/' + objectionObject.picture);
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

document.addEventListener("DOMContentLoaded", function() {
  audioElementsNodeList = document.getElementsByTagName('audio');
  for (var i = 0; i < audioElementsNodeList.length; i++) {
    character = audioElementsNodeList[i].className;
    objectionObjects.push({
      audioElement: audioElementsNodeList[i],
      picture: characterPics[character].picture,
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
