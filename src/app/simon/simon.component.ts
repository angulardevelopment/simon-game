import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-simon',
  templateUrl: './simon.component.html',
  styleUrls: ['./simon.component.css']
})
export class SimonComponent implements OnInit {


  constructor() { }


  ngOnInit() {
    // var sounds = [
    //   new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    //   new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    //   new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    //   new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
    // ];

    // function playSound(id) {
    //   sounds[id].play();
    // }

    // var inputEnabled = false;
    // var stepList = [];
    // var currentStep = 0;
    // var timeout;
    // var strict = false;
    // var fields = Array.from(document.querySelectorAll('.field'));
    // var info = document.querySelector('#info');
    // var startButton = <HTMLSpanElement>document.querySelector('#start');
    // var resetButton = document.querySelector('#reset');
    // var strictButton = <HTMLSpanElement>document.querySelector('#strict');

    // for(var i=0; i<fields.length; i++) {
    //   const val = i;
    //   fields[i].onclick = function() {
    //     if(!inputEnabled) return;

    //     playSound(val);
    //     if(val === stepList[currentStep]) {
    //       if(currentStep+1 === stepList.length) {
    //           inputEnabled = false;
    //           if(stepList.length < 20) {
    //             generateLastStep();
    //             info.innerHTML = "Well done!"
    //             timeout = setTimeout(showSteps, 2000);
    //             currentStep = 0;
    //           }
    //           else {
    //             info.innerHTML = "Congratulations! You won!";
    //             timeout = setTimeout(reset, 2000);
    //           }
    //       }
    //       else {
    //         currentStep++;
    //       }
    //     }
    //     else {
    //       info.innerHTML = "mistake!";
    //       inputEnabled = false;
    //       setTimeout(function() {
    //         if(strict) {
    //           reset();
    //         }
    //         else {
    //           currentStep = 0;
    //           inputEnabled = false;
    //           info.innerHTML = "Watch the sequence!";
    //           timeout = setTimeout(showSteps, 2000);
    //         }
    //       }, 2000);

    //     }
    //   }
    // }

    // startButton.onclick = function() {
    //   this.disabled = true;
    //   start();
    // }

    // resetButton.onclick = reset;

    // function reset() {
    //   startButton.disabled = false;
    //   stepList = [];
    //   currentStep = 0;
    //   inputEnabled = false;
    //   clearTimeout(timeout);
    //   info.innerHTML = "Welcome to Simon Game!";
    // }

    // strictButton.onclick = function() {
    //   if(strict) {
    //     this.innerHTML = "strict mode disabled";
    //     this.className = this.className.replace(' red', '');
    //   }
    //   else {
    //     this.innerHTML = "strict mode enabled";
    //     this.className += ' red';
    //   }

    //   strict = !strict;
    // }

    // function start() {
    //   generateLastStep();
    //   info.innerHTML = 'Watch the sequence!';
    //   timeout = setTimeout(showSteps, 2000);
    // }


    // function generateLastStep() {
    //   stepList.push(rand(0, 3));
    // }

    // function showSteps() {
    //   if(currentStep > stepList.length-1) {
    //     currentStep = 0;
    //     info.innerHTML = stepList.length+' steps';
    //     inputEnabled = true;
    //     return;
    //   }

    //   var id = stepList[currentStep];

    //   playSound(id);
    //   fields[id].className += ' active';

    //   setTimeout(function() {

    //     fields[id].className = fields[id].className.replace(' active', '');

    //     currentStep++;

    //     timeout = setTimeout(showSteps, 0.3*1000); // give time for transition to finish

    //   }, 0.6*1000);

    //   info.innerHTML = "Watch the sequence!";
    // }


    // function rand(min, max) {
    //   return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

    var pads = document.getElementsByClassName('pad'),
      display = document.getElementById('display'),
      pattern = [],
      hold = [],
      level, speed;

    function playerMouseDown(e) {
      this.className += ' active';
    }

    function playerMouseUp(e) {
      simonMouseUp.apply(this);
      playerClick.apply(this);
    }

    function simonMouseUp() {
      this.className = this.className.replace(/ active/, '');
    }

    function playerHoverOver(e) {
      this.className += ' hover';
    }

    function playerHoverOut(e) {
      this.className = this.className.replace(/ hover/, '');
    }

    function playerClick() {
      if (pads[hold.shift()] != this) {
        gameOver();
        return;
      }
      playerSays();
    }

    function clearContents(element) {
      while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
      }
    }

    function updateDisplay(text) {
      clearContents(display);
      display.appendChild(document.createTextNode(text));
    }

    function registerHandlers() {
      Array.prototype.forEach.call(pads, function (pad) {
        pad.style.cursor = 'pointer';
        pad.addEventListener('mouseover', playerHoverOver, false);
        pad.addEventListener('mouseout', playerHoverOut, false);
        pad.addEventListener('mousedown', playerMouseDown);
        pad.addEventListener('mouseup', playerMouseUp);
      });
    }

    function removeHandlers() {
      Array.prototype.forEach.call(pads, function (pad) {
        pad.style.cursor = 'default';
        pad.removeEventListener('mouseover', playerHoverOver);
        pad.removeEventListener('mouseout', playerHoverOut);
        pad.removeEventListener('mousedown', playerMouseDown);
        pad.removeEventListener('mouseup', playerMouseUp);
      });
    }

    function gameOver() {
      updateDisplay('You Lose!');
      setTimeout(function () {
        init();
      }, 2000);
    }

    function beginLevel() {
      removeHandlers();
      level++;
      speed -= level * 5;
      updateDisplay('Level ' + level);
      setTimeout(function () {
        updateDisplay('Ready?');
      }, speed);
      setTimeout(function () {
        updateDisplay('Begin!');
      }, speed * 2);
      setTimeout(function () {
        generatePattern();
        updateDisplay('SIMON SAYS');
        simonSays();
      }, speed * 3);
    }

    function generatePattern() {
      var p = [];
      for (var i = 0, l = (3 + level); i < l; i++) {
        p.push(Math.floor(Math.random() * 3));
      }
      pattern = p.slice(0), hold = p.slice(0);
    }

    function simonSays() {
      var current = pads[pattern.shift()];
      playerMouseDown.apply(current);
      setTimeout(function () {
        simonMouseUp.apply(current);
        if (pattern.length > 0) {
          setTimeout(simonSays, speed);
        } else {
          updateDisplay('Go!');
          setTimeout(function () {
            registerHandlers();
            playerSays();
          }, 2000);
        }
      }, 300);
    }

    function playerSays() {
      if (hold.length == 0) {
        updateDisplay('You Win!');
        setTimeout(function () {
          beginLevel();
        }, 2000);
      } else {
        updateDisplay('turns ' + hold.length);
      }
    }

    function startHandler() {
      this.style.cursor = 'default';
      beginLevel();
      this.removeEventListener('click', startHandler);
    }

    function init() {
      level = 0;
      speed = 2005;
      updateDisplay('START');
      display.style.cursor = 'pointer';
      display.addEventListener('click', startHandler);
    }

    init();

  }

}
