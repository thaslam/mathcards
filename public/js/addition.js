function AdditionPage(mathEngine) {
  PageBase.call(this, mathEngine);
  this.operator = "+";
}
AdditionPage.prototype = Object.create(PageBase.prototype);
AdditionPage.prototype.constructor = AdditionPage;

(function(page){
  if (window) {
    window.onload = function() {
      console.log("Window Loaded.");
      page.load();
    }.bind(page);
  }
})(new AdditionPage(new MathEngine()));

// override for addition specific logic
AdditionPage.prototype.generateOperands = function() {
  if (!this.mathEngine) return {};
  var op1 = this.mathEngine.generateOperand(50);
  var op2 = this.mathEngine.generateOperand(op1);
  return {op1: op1, op2: op2};
}
AdditionPage.prototype.isCorrect = function(op1, op2, answer) {
  if (!this.mathEngine) return false;
  return this.mathEngine.checkSum(op1, op2, answer);
}