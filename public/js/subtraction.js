function SubtractionPage(mathEngine) {
  PageBase.call(this, mathEngine);
  this.operator = "-";
}
SubtractionPage.prototype = Object.create(PageBase.prototype);
SubtractionPage.prototype.constructor = SubtractionPage;

(function(page){
  if (window) {
    window.onload = function() {
      console.log("Window Loaded.");
      page.load();
    }.bind(page);
  }
})(new SubtractionPage(new MathEngine()));

// override for substraction specific logic
SubtractionPage.prototype.generateOperands = function() {
  if (!this.mathEngine) return {};
  var op1 = this.mathEngine.generateOperand(50);
  var op2 = this.mathEngine.generateOperand(op1);
  return {op1: op1, op2: op2};
}
SubtractionPage.prototype.isCorrect = function(op1, op2, answer) {
  if (!this.mathEngine) return false;
  return this.mathEngine.checkDifference(op1, op2, answer);
}