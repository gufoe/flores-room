(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45e1ebaa"],{"68f6":function(e,t,s){},"6cb3":function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("h3",[e._v(e._s(e.form.id?"Edit":"Create")+" Room")]),s("form",{on:{submit:function(t){return t.preventDefault(),t.stopPropagation(),e.save()}}},[s("fieldset",{staticClass:"form-group"},[s("legend",{staticClass:"legend"},[e._v("Basic Info")]),s("div",{staticClass:"my-form-row"},[e._v("\n        Name\n        "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.form.name,expression:"form.name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:e.form.name},on:{input:function(t){t.target.composing||e.$set(e.form,"name",t.target.value)}}})]),s("div",{staticClass:"my-form-row"},[e._v("\n        Type\n        "),s("select",{directives:[{name:"model",rawName:"v-model",value:e.form.is_dorm,expression:"form.is_dorm"}],staticClass:"form-control",on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(e.form,"is_dorm",t.target.multiple?s:s[0])}}},[s("option",{domProps:{value:!1}},[e._v(e._s(e.$t("room_type.private")))]),s("option",{domProps:{value:!0}},[e._v(e._s(e.$t("room_type.dorm")))])])]),s("div",{staticClass:"my-form-row"},[s("label",{staticClass:"ml-5"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.form.is_active,expression:"form.is_active"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.form.is_active)?e._i(e.form.is_active,null)>-1:e.form.is_active},on:{change:function(t){var s=e.form.is_active,r=t.target,i=!!r.checked;if(Array.isArray(s)){var a=null,o=e._i(s,a);r.checked?o<0&&e.$set(e.form,"is_active",s.concat([a])):o>-1&&e.$set(e.form,"is_active",s.slice(0,o).concat(s.slice(o+1)))}else e.$set(e.form,"is_active",i)}}}),e._v("\n          This room is active\n        ")])]),s("transition",{attrs:{name:"fade"}},[e.form.is_dorm?s("div",{staticClass:"my-form-row"},[s("label",{staticClass:"ml-5"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.form.is_female_only,expression:"form.is_female_only"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.form.is_female_only)?e._i(e.form.is_female_only,null)>-1:e.form.is_female_only},on:{change:function(t){var s=e.form.is_female_only,r=t.target,i=!!r.checked;if(Array.isArray(s)){var a=null,o=e._i(s,a);r.checked?o<0&&e.$set(e.form,"is_female_only",s.concat([a])):o>-1&&e.$set(e.form,"is_female_only",s.slice(0,o).concat(s.slice(o+1)))}else e.$set(e.form,"is_female_only",i)}}}),e._v("\n            Exclusive for females\n          ")])]):e._e()])],1),s("fieldset",{staticClass:"form-group"},[s("legend",{staticClass:"legend"},[e._v("Features")]),e._l(e.$store.room_perks,(function(t){return s("div",{key:t,staticClass:"my-form-row"},[s("label",[s("input",{attrs:{type:"checkbox"},domProps:{checked:e.form.perks.includes(t)},on:{change:function(s){e.form.perks.includes(t)?e.form.perks.splice(e.form.perks.indexOf(t),1):e.form.perks.push(t)}}}),e._v("\n          "+e._s(e.$t("room_perk."+t))+"\n        ")])])}))],2),e.form.is_dorm?e._e():s("fieldset",{staticClass:"form-group"},[s("legend",{staticClass:"legend"},[e._v("Price")]),s("div",{staticClass:"row no-gutters mb-3 align-center"},[s("div",{staticClass:"col-5 text-right"},[e._v("Price per night:")]),s("div",{staticClass:"col"},[s("price-input",{model:{value:e.form.price,callback:function(t){e.$set(e.form,"price",t)},expression:"form.price"}})],1)])]),s("fieldset",{staticClass:"form-group"},[s("legend",{staticClass:"legend"},[e._v("Beds")]),s("div",{staticClass:"row text-center gutters-1"},[s("div",{staticClass:"col-6"},[e._v("\n          Bed\n        ")]),s("div",{staticClass:"col-6"},[e._v("\n          Bunk bed\n        ")]),e._l(e.$store.bed_types,(function(t){return s("div",{key:t,staticClass:"col-3 lh-2 text-center",staticStyle:{"justify-content":"bottom"}},[s("div",{staticStyle:{"line-height":"1.2"}},[e._v("\n            "+e._s(e.$t(("bed_type."+t).replace("-bunk","")))+"\n          ")]),s("div",{staticClass:"input-group mt-1"},[s("div",{staticClass:"input-group-prepend"},[s("span",{staticClass:"input-group-text px-1 py-0"},[s("i",{class:"bed "+t,staticStyle:{"font-size":"1.8rem"}})])]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.form.shape[t],expression:"form.shape[type]"}],staticClass:"form-control text-center",staticStyle:{width:"1rem",margin:"0 auto"},attrs:{type:"number",step:"1",min:"0"},domProps:{value:e.form.shape[t]},on:{input:function(s){s.target.composing||e.$set(e.form.shape,t,s.target.value)}}})])])}))],2),s("div",{staticClass:"text-center mt-2"},[e._v("\n        Total places: "+e._s(e.form_places)+"\n      ")])]),e.form.is_dorm?s("fieldset",{staticClass:"form-group"},[s("legend",{staticClass:"legend"},[e._v("Prices")]),s("div",{staticClass:"row"},e._l([1,2],(function(t){return s("div",{key:t,staticClass:"col text-center lh-2"},[e._v("\n          "+e._s(e.$t("bed_price."+t))+"\n          "),s("br"),s("price-input",{model:{value:e.form["b"+t+"_price"],callback:function(s){e.$set(e.form,"b"+t+"_price",s)},expression:"form[`b${s}_price`]"}})],1)})),0)]):e._e(),s("div",{staticClass:"text-center my-3"},[s("button",{staticClass:"btn btn-danger",attrs:{disabled:e.is_saving,type:"button"},on:{click:function(t){return t.preventDefault(),e.$router.back()}}},[e._v("Back")]),e._v("\n       \n      "),s("button",{staticClass:"btn btn-primary",attrs:{disabled:e.is_saving,type:"submit"}},[e._v("Save")])])])])},i=[],a=(s("7514"),s("a481"),{props:{place:{type:Object,required:!0}},data:function(){return{form:null,is_saving:!1,original:null}},computed:{form_places:function(){return 1*(this.form.shape.single||0)+2*(this.form.shape.double||0)+2*(this.form.shape["single-bunk"]||0)+4*(this.form.shape["double-bunk"]||0)}},methods:{save:function(){var e=this;this.is_saving=!0,console.log("saving"),this.$http.post("rooms",this.form).then((function(t){e.place.user_id==e.$store.user.id&&e.$store.refreshUser(),e.original?Object.assign(e.original,t.data):e.place.rooms.push(t.data),e.$router.replace({name:"manage-rooms",params:{id:e.$route.params.id}})})).finally((function(){e.is_saving=!1}))}},watch:{"$route.params.room_id":{immediate:!0,handler:function(e){console.log("room_id changed");var t=null;if(e){if(t=this.place.rooms.find((function(t){return t.id==e})),!t)return this.$router.back();this.original=t}this.form=this.$utils.clone(t)||{place_id:this.place.id,shape:{},perks:[]}}}}}),o=a,n=(s("9d9a"),s("2877")),l=Object(n["a"])(o,r,i,!1,null,null,null);t["default"]=l.exports},"9d9a":function(e,t,s){"use strict";var r=s("68f6"),i=s.n(r);i.a}}]);
//# sourceMappingURL=chunk-45e1ebaa.e118dc11.js.map