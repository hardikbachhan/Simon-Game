//jshint:6
//user array
var user = [];
//control/system generated array
var control = [];
//for restricting start game functionality to 1.
var flag = 0;
//for creating sound on every correct answer
var j = 0;
//for checking if a key is pressed.
var isKeyPressed = 0;
//for incresing play time at every check
var t = 0;
//plays audio on clicking a box.
function playAudio(url) {
  var audio = new Audio(url);
  audio.play();
}
//for saving box address
var address = document.getElementsByClassName("clickedbox");
//for clipping a listener on every box
var i;
//applying specific sound to each box on click.
function addClickListener() {
  for (i = 0; i < address.length; i++) {
    address[i].addEventListener("click", function(req) {
      console.log(req.target.attributes.class.nodeValue);
      if (req.target.attributes.class.nodeValue === "green clickedbox") {
        makeBoxSound(0);
        user.push(0);
      } else if (req.target.attributes.class.nodeValue === "red clickedbox") {
        makeBoxSound(1);
        user.push(1);
      } else if (req.target.attributes.class.nodeValue === "yellow clickedbox") {
        makeBoxSound(2);
        user.push(2);
      } else if (req.target.attributes.class.nodeValue === "blue clickedbox") {
        makeBoxSound(3);
        user.push(3);
      }
    });
    address[i].addEventListener("touchstart", function(req) {
      console.log(req.target.attributes.class.nodeValue);
      if (req.target.attributes.class.nodeValue === "green clickedbox") {
        makeBoxSound(0);
        user.push(0);
      } else if (req.target.attributes.class.nodeValue === "red clickedbox") {
        makeBoxSound(1);
        user.push(1);
      } else if (req.target.attributes.class.nodeValue === "yellow clickedbox") {
        makeBoxSound(2);
        user.push(2);
      } else if (req.target.attributes.class.nodeValue === "blue clickedbox") {
        makeBoxSound(3);
        user.push(3);
      }
    });
  }
}

//game logic
function gameLogic() {
  setTimeout(function (){
    if (JSON.stringify(user) === JSON.stringify(control)) {
      flag++;
      document.getElementById("level-title").innerHTML = "Level  " + flag.toString();
      var boxNumber = boxNumberSelector();

      var startValue = 0;
      var howManyTimes = control.length;
      function forEachSound(){
        makeBoxSound(control[startValue]);
        startValue++;
        if(startValue<howManyTimes){
          setTimeout(forEachSound,300);
        }
      }
      forEachSound();
      user.length = 0;
      gameLogic();
      //then proceed with the game.
    } else {
      var element = document.body;
      element.style.backgroundColor = "red";
      setTimeout(function(){
        element.style.backgroundColor = "#010038";
      },100);
      document.getElementById("level-title").innerHTML = "Game Over!!!<br>Press any Button/ Touch anywhere to Reload.";
      document.addEventListener("keydown", function() {
        location.reload();
      });
    }
  },(2000+(1000*flag)));

}

//randoming finding number of a box.
function boxNumberSelector() {
  var x = Math.random();
  var boxNumber = Math.floor(x * 4);
  control.push(boxNumber);
  return boxNumber;
}
//for making box sound.
function makeBoxSound(number) {
  switch (number) {
    case 0: {
      address[0].classList.add("onclick");
      playAudio("sounds/green.mp3");
      setTimeout(function() {
        address[0].classList.remove("onclick");
      }, 50);
      break;
    }
    case 1: {
      address[1].classList.add("onclick");
      playAudio("sounds/red.mp3");
      setTimeout(function() {
        address[1].classList.remove("onclick");
      }, 50);
      break;
    }
    case 2: {
      address[2].classList.add("onclick");
      playAudio("sounds/yellow.mp3");
      setTimeout(function() {
        address[2].classList.remove("onclick");
      }, 50);
      break;
    }
    case 3: {
      address[3].classList.add("onclick");
      playAudio("sounds/blue.mp3");
      setTimeout(function() {
        address[3].classList.remove("onclick");
      }, 50);
      break;
    }
    default: {
      console.log(boxNumber);
    }
  }
}

//logic for starting the game
document.addEventListener("keydown", function() {
  if (flag === 0) {
    var boxNumber = boxNumberSelector();
    makeBoxSound(boxNumber);
    flag++;
    document.getElementById("level-title").innerHTML = "Level  " + flag.toString();
    addClickListener();
    gameLogic();
  }
});
