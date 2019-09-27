import Vue from 'vue'

var squares = []
var fix_height = (el, value) => {
  el.style.height = el.clientWidth * (value || 1) + 'px'
}
window.addEventListener('resize', () => {
  squares.forEach(([el, binding]) => fix_height(el, binding.value))
})

Vue.directive('square', {
  inserted (el, binding) {
    squares.push([el, binding])
    fix_height(el, binding.value)
  },
  unbind (el) {
    var i = squares.findIndex(x => x[0] === el)
    squares.splice(i, 1)
  },
})
