var a = 2

void function () {
  a = 1;
  var a
}()

console.log(a)