(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-24826294"],{"3f63":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-manage-place mx-2"},[t.place?a("div",[a("h1",{on:{click:function(e){return t.$router.push({name:"manage-place"})}}},[t._v(t._s(t.place.name))]),"manage-place"!=t.$route.name?a("router-view",{attrs:{place:t.place}}):a("div",{staticClass:"mt-3"},[a("div",{staticClass:"lh-2"},[t._v("\n        You can click\n        "),a("router-link",{attrs:{to:{name:"edit-place",params:{id:t.place.id}}}},[t._v("here")]),t._v("\n        to edit the information, and\n        "),a("router-link",{attrs:{to:{name:"manage-rooms",params:{id:t.place.id}}}},[t._v("here")]),t._v("\n        to manage your rooms.\n      ")],1),a("div",{staticClass:"my-3"},[t.place.is_active?a("div",[t._v("\n          This place is active!\n          "),a("a",{attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.toggleActive(e)}}},[t._v("Click here to suspend.")])]):a("div",{staticClass:"text-danger"},[t._v("\n          This place is not active now.\n          "),a("a",{attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.toggleActive(e)}}},[t._v("Click here to activate!")])])]),t.place.is_verified?t._e():a("div",{staticClass:"my-3 text-danger"},[t._v("\n        This place has not been verified. Please contact us to verify this place.\n      ")]),a("div",{staticClass:"mt-4"},[a("h3",[t._v("Bookings")]),t._v("\n        You have "+t._s(t.place.bookings.length)+" bookings so far.\n      ")])])],1):t._e()])},i=[],c=(a("7f7f"),{data:function(){return{place:null}},created:function(){console.log("created",this.$route.name)},methods:{loadPlace:function(){var t=this,e=this.$route.params.id,a={with_bookings:!0,safe_write:!0};this.place=null,this.$http.get("places/".concat(e),{params:a}).then((function(e){t.place=e.data}))},toggleActive:function(){var t=this;this.$http.post("places/".concat(this.place.id,"/toggle-active")).then((function(e){t.place.is_active=e.data.is_active,t.place.user_id==t.$store.user.id&&t.$store.refreshUser()}))}},watch:{"$route.params.id":{immediate:!0,handler:function(t,e){t!=e&&this.loadPlace()}}}}),s=c,o=(a("566c"),a("2877")),r=Object(o["a"])(s,n,i,!1,null,null,null);e["default"]=r.exports},"566c":function(t,e,a){"use strict";var n=a("7f5b"),i=a.n(n);i.a},"7f5b":function(t,e,a){},"7f7f":function(t,e,a){var n=a("86cc").f,i=Function.prototype,c=/^\s*function ([^ (]*)/,s="name";s in i||a("9e1e")&&n(i,s,{configurable:!0,get:function(){try{return(""+this).match(c)[1]}catch(t){return""}}})}}]);
//# sourceMappingURL=chunk-24826294.f856c047.js.map