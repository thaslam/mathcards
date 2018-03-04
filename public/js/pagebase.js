
function PageBase(mathEngine) {
  this.mathEngine = mathEngine;
  this.operator = "";
  this.operand1 = 0;
  this.operand2 = 0;
  this.attempts = 0;
  this.pending = false;
  this.score = 0;
  this.timer = 90;
  this.timerNext = 10;
  this.interval = null;
  this.internalNext = 3;
  this.correctImage = "/img/happy.png";
  this.wrongImage = "/img/sad.png";
  this.operatorElement = document.getElementById("operator");
  this.answerElement = document.getElementById("input_answer");
  this.scoreElement = document.getElementById("score");
  this.resultElement = document.getElementById("result");
  this.resultImageElement = document.getElementById("image_result");
  this.operand1Element = document.getElementById("operand_1");
  this.operand2Element = document.getElementById("operand_2");
  this.timerElement = document.getElementById("timer");
  this.timerNextElement = document.getElementById("time_next");
  this.cardElement = document.getElementById("card");
  this.againElement = document.getElementById("again");
  return;
}
PageBase.prototype.load = function() {
  this.operatorElement.innerText = this.operator;
  this.timerElement.innerText = "Timer: " + this.timer;
  this.answerElement.onkeyup = function(e) {
    if (this.pending || this.timer <= 0) return false;
    if (e.keyCode == 13) {
      this.checkAnswer();
    }
  }.bind(this);
  this.generateProblem();
  this.interval = setInterval(this._tick.bind(this), 1000);
};
PageBase.prototype.generateOperands = function() {
  var op1 = this.mathEngine.generateOperand(100);
  var op2 = this.mathEngine.generateOperand(100);
  return {op1: op1, op2: op2};
};
PageBase.prototype.generateProblem = function() {
  this.pending = false;
  this.timerNext = 3;
  this.answerElement.value = "";
  this.resultElement.classList.add("hide");
  var operands = this.generateOperands();
  this.operand1 = operands.op1;
  this.operand2 = operands.op2;
  this.operand1Element.innerText = this.operand1;
  this.operand2Element.innerText = this.operand2;
  return;
};
PageBase.prototype.isCorrect = function(op1, op2, answer) {
  return this.mathEngine.checkSum(op1, op2, answer);
};
PageBase.prototype.checkAnswer = function() {
  this.pending = true;
  var answer = this.answerElement.value;
  var correct = this.isCorrect(this.operand1, this.operand2, answer);

  if (this.timer > 6) {
    this.intervalNext = setInterval(this._tickNext.bind(this), 1000);
  } else {
    this.generateProblem();
  }
  if (correct) {
    this.resultImageElement.src = this.correctImage;
    this.score += this.mathEngine.getScore(this.operand1, this.operand2, answer, this.attempts);
    this.scoreElement.innerText = this.score;
  } else {
    this.resultImageElement.src = this.wrongImage;
  }
  this.resultElement.classList.remove("hide");
  this.timerNextElement.innerText = "Next.. " + this.timerNext;
  return;
};
PageBase.prototype._tick = function() {
  this.timer -= 1;
  var timer = document.getElementById("timer");
  timer.innerText = "Timer: " + this.timer;
  if (this.timer <= 30) {
    timer.style.color = "#CB4335";
  }
  if (this.timer <= 0) {
    clearInterval(this.interval);
    this.pending = true;
    this.cardElement.classList.add("faint");
    this.resultElement.classList.add("hide");
    this.scoreElement.classList.add("score_done");
    this.scoreElement.classList.add("animated");
    this.scoreElement.classList.add("zoomIn");
    this.againElement.classList.remove("hide");
  }
  return;
};
PageBase.prototype._tickNext = function() {
  this.timerNext -= 1;
  this.timerNextElement.innerText = "Next.. " + this.timerNext;
  if (this.timerNext <= 0) {
    clearInterval(this.intervalNext);
    this.generateProblem();
  }
  return;
};
PageBase.prototype._setAnswerPosition = function(id, pos) {
  var input = document.getElementById(id);
  if(input != null) {
    if(input.createTextRange) {
      var range = input.createTextRange();
      range.move('character', pos);
      range.select();
    }
    else {
      if(input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(pos, pos);
      }
      else {
        input.focus();
      }
    }
  }
  return;
};