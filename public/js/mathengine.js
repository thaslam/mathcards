function MathEngine() {
  this.generateOperand = function(max) {
    return Math.round(Math.random() * Math.floor(max));
  };
  this.getScore = function(operand1, operand2, answer, attempts) {
    var score = 0;
    // increase sore if complicated operands
    if (((operand1 % 5) + (operand2 % 5)) != 0) {
      if (operand1 > 10) score += 5;
      if (operand2 > 10) score += 5;
    }
    // increase sore if complicated answer
    if (answer > 100) score += 5;
    // adjust score based on attempts
    if (attempts > 4) attempts = 4;
    score += 5 - attempts;

    return score;
  };
  this.checkSum = function(operand1, operand2, answer) {
    return ((operand1 + operand2) == answer);
  };
  this.checkDifference = function(operand1, operand2, answer) {
    return ((operand1 - operand2) == answer);
  };
  this.checkProduct = function(operand1, operand2, answer) {
    return ((operand1 * operand2) == answer);
  };
  this.checkQuotient = function(operand1, operand2, answer) {
    return ((operand1 / operand2) == answer);
  };
}