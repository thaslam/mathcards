function MultiplicationPage(mathEngine) {
  PageBase.call(this, mathEngine);
  this.operator = "x";
}
MultiplicationPage.prototype = Object.create(PageBase.prototype);
MultiplicationPage.prototype.constructor = MultiplicationPage;

(function(page){
  if (window) {
    window.onload = function() {
      console.log("Window Loaded.");
      page.load();
    }.bind(page);
  }
})(new MultiplicationPage(new MathEngine()));

// override for multiply specific logic
MultiplicationPage.prototype.generateOperands = function() {
  if (!this.mathEngine) return {};
  var op1 = this.mathEngine.generateOperand(12);
  var op2 = this.mathEngine.generateOperand(op1);
  return {op1: op1, op2: op2};
}
MultiplicationPage.prototype.isCorrect = function(op1, op2, answer) {
  if (!this.mathEngine) return false;
  return this.mathEngine.checkProduct(op1, op2, answer);
}