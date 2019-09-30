(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0dd7af"],{8221:function(t,s,n){"use strict";n.r(s);var i=function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"my-3 mx-2"},[t.booking?n("booking",{attrs:{booking:t.booking}}):n("div",{staticClass:"block-info"},[t._m(0),t.bookings?t.bookings.length?t._e():n("div",{staticClass:"block-content"},[t._v("\n      You have no bookings yet\n    ")]):n("div",{staticClass:"block-content"},[t._v("\n      Loading...\n    ")]),t._l(t.bookings,(function(s){return n("div",{key:s.id,staticClass:"block-content"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col"},[n("h5",{staticClass:"nm text-info"},[t._v(t._s(s.place.name))]),n("div",{staticClass:"small"},[t._v("\n            "+t._s(s.place.loc_city)+"\n            -\n            "),n("price",{attrs:{price:s.price,extended:!0}}),t._v("\n            -\n            "),s.is_canceled?n("span",{staticClass:"text-danger"},[t._v("canceled")]):n("span",{staticClass:"text-info"},[t._v("active")])],1),n("div",{staticClass:"small"},[t._v("\n            "+t._s(s.nights)+" night:\n            "+t._s(t.$d(t.$utc(s.check_in),"date"))+"\n            -\n            "+t._s(t.$d(t.$utc(s.check_out),"date"))+"\n          ")])]),n("button",{staticClass:"btn btn-info mx-2 px-3",staticStyle:{"font-weight":"bold","border-width":"2px"},on:{click:function(n){return t.$router.push({name:"booking",params:{id:s.id}})}}},[t._v("\n          View\n        ")])])])}))],2)],1)},a=[function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"block-title"},[n("h3",{staticClass:"nm"},[t._v("Your Bookings")])])}],o=(n("a481"),n("7514"),function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"block-info"},[t._m(0),n("div",{staticClass:"block-content"},[n("div",{staticClass:"my-3"},[n("h4",{staticClass:"text-info"},[t._v(t._s(t.booking.place.name))])]),n("div",{staticClass:"mb-3"},[n("div",[n("span",{staticClass:"bold mr-2"},[t._v("Booking code:")]),n("span",{staticClass:"select"},[t._v(t._s(t.booking.code))])]),n("div",[n("span",{staticClass:"bold mr-2"},[t._v("Total price:")]),n("price",{attrs:{price:t.booking.price,extended:!0}})],1),n("div",[n("span",{staticClass:"bold mr-2"},[t._v("Status:")]),t.booking.is_refunded?n("span",{staticClass:"text-danger"},[t._v("refunded")]):n("span",{staticClass:"text-info"},[t._v("paid")])])]),n("div",{staticClass:"mb-3"},[n("span",{staticClass:"bold mr-2"},[t._v("Total nights:")]),t._v("\n      "+t._s(t.booking.nights)+"\n      "),n("br"),n("span",{staticClass:"bold mr-2"},[t._v("Check in:")]),t._v("\n      "+t._s(t.$d(t.$utc(t.booking.check_in),"date"))+"\n      "),n("br"),n("span",{staticClass:"bold mr-2"},[t._v("Check out:")]),t._v("\n      "+t._s(t.$d(t.$utc(t.booking.check_out),"date"))+"\n    ")]),n("div",{staticClass:"mb-3"},[n("div",[n("span",{staticClass:"bold mr-2"},[t._v("Location:")]),n("span",{staticClass:"select"},[t._v(t._s(t.booking.place.loc_city))])]),n("div",[n("span",{staticClass:"bold mr-2"},[t._v("Address:")]),n("span",{staticClass:"select"},[t._v(t._s(t.booking.place.loc_addr))])])]),n("div",{staticClass:"mb-3"},[t.show_map?n("button",{staticClass:"btn btn-info",on:{click:function(s){t.show_map=!1}}},[t._v("\n        Hide map\n      ")]):n("button",{staticClass:"btn btn-outline-info",on:{click:function(s){t.show_map=!0}}},[t._v("\n        Show map\n      ")]),t._v("\n       \n      "),n("button",{staticClass:"btn btn-outline-info",on:{click:function(s){return t.$router.push({name:"bookings"})}}},[t._v("\n        Your bookings\n      ")])]),t.show_map?n("location",{staticStyle:{height:"60vh"},attrs:{readonly:!0,lat:t.booking.place.loc_lat,lon:t.booking.place.loc_lon}}):t._e()],1)])}),c=[function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"block-title"},[n("h3",{staticClass:"nm"},[t._v("\n      Booking details\n    ")])])}],e=n("d012"),l={components:{location:e["a"]},props:{booking:{type:Object,required:!0}},data:function(){return{show_map:!1}}},r=l,d=n("2877"),_=Object(d["a"])(r,o,c,!1,null,null,null),b=_.exports,u={components:{booking:b},data:function(){return{bookings:null}},computed:{booking:function(){var t=this.$route.params.id;if(!t||!this.bookings)return null;var s=this.bookings.find((function(s){return s.id==t}));return s||(this.$router.replace({name:"bookings"}),null)}},created:function(){this.refreshUsers()},methods:{refreshUsers:function(){var t=this,s={};this.$http.get("user/bookings",{params:s}).then((function(s){t.bookings=s.data}))}}},v=u,p=Object(d["a"])(v,i,a,!1,null,null,null);s["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d0dd7af.4c311358.js.map