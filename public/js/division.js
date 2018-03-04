function DivisionPage(mathEngine) {
  PageBase.call(this, mathEngine);
  this.operator = "÷";
}
DivisionPage.prototype = Object.create(PageBase.prototype);
DivisionPage.prototype.constructor = DivisionPage;

(function(page){
  if (window) {
    window.onload = function() {
      console.log("Window Loaded.");
      page.load();
    }.bind(page);
  }
})(new DivisionPage(new MathEngine()));

// override for visiion specific logic
DivisionPage.prototype.generateOperands = function() {
  if (!this.mathEngine) return {};
  var op1 = this.mathEngine.generateOperand(20);
  var op2 = this._pickDivisor(op1);
  return {op1: op1, op2: op2};
}
DivisionPage.prototype.isCorrect = function(op1, op2, answer) {
  if (!this.mathEngine) return false;
  return this.mathEngine.checkQuotient(op1, op2, answer);
}
DivisionPage.prototype._pickDivisor = function(num) {
  var stopPoint = this.mathEngine.generateOperand(num);
  var lastDivisor = 1;
  for (var i = 1; i < num; i++) {
    if (num % i === 0 ) {
      lastDivisor = i;
      if (i >= stopPoint) return i;
    }
  }
  return lastDivisor;
}