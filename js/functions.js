function createSelectElements(){
  var selectBoxes = Array.prototype.slice.call(document.querySelectorAll('.select__item'));
  selectBoxes.map(function(el) {
    var selectBoxWidth = el.offsetWidth;
    let selectInstance = new Select({
      el: el,
      className: 'select-theme-default'
    });
    setSize(selectBoxWidth);
  });
}

function setSize(selectBoxWidth){
  var dropDownBoxes = Array.prototype.slice.call(document.querySelectorAll('.select.select-theme-default'));
  dropDownBoxes.map(function(el) {
    el.style.width = selectBoxWidth + 'px';
  });
}

document.addEventListener("DOMContentLoaded", function(event) {
  createSelectElements();
});
