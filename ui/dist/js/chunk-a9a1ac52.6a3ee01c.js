(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a9a1ac52"],{"482c":function(t,n,e){},b601:function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"page-places page-padded text-center",staticStyle:{"padding-bottom":"30vh"}},[e("h1",{staticClass:"nm"},[t._v("Your Places")]),e("br"),t.$store.user.places.length?e("div",[e("hr"),t._l(t.places,(function(n){return[e("div",{key:n.id,staticClass:"place-block",on:{click:function(e){return t.$router.push({name:"manage-place",params:{id:n.id}})}}},[e("h4",[t._v(t._s(n.name))]),e("div",{staticClass:"place-location"},[t._v("\n          "+t._s(n.loc_addr)+",\n          "+t._s(n.loc_city)+"\n        ")]),e("div",{staticClass:"place-rooms"},[t._v("\n          "+t._s(n.rooms.length)+" rooms\n        ")])]),e("hr",{key:n.id+"hr"})]})),e("br"),e("br"),e("button",{staticClass:"btn btn-primary",on:{click:function(n){return t.$router.push({name:"edit-place"})}}},[t._v("\n      Add a new place\n    ")])],2):e("div",[t._m(0),e("br"),e("button",{staticClass:"btn btn-primary",on:{click:function(n){return t.$router.push({name:"edit-place"})}}},[t._v("\n      Start Hosting!\n    ")])])])},s=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("p",[t._v("Begin to host on "),e("b",[t._v("Flores Room")]),t._v(" now!")])}],c={computed:{places:function(){return this.$store.user.places}}},r=c,o=(e("f734"),e("2877")),i=Object(o["a"])(r,a,s,!1,null,null,null);n["default"]=i.exports},f734:function(t,n,e){"use strict";var a=e("482c"),s=e.n(a);s.a}}]);
//# sourceMappingURL=chunk-a9a1ac52.6a3ee01c.js.map