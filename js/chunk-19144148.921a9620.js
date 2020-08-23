(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-19144148"],{"1ccc":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"text-center"},[a("loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}},[[a("div",{staticClass:"bazzi-loading"})]],2),a("table",{staticClass:"table mt-4"},[t._m(0),a("tbody",t._l(t.sortOrders,(function(e){return a("tr",{key:e.id,staticClass:"text-overflow font-weight-bold",class:{"text-muted":!e.is_paid}},[a("td",[t._v(t._s(e.user.name))]),a("td",[t._v(t._s(e.user.email))]),a("td",[t._v(t._s(e.user.tel))]),a("td",{staticClass:"text-left pl-5",attrs:{width:"300"}},t._l(e.products,(function(e){return a("p",{key:e.id,staticClass:"m-0"},[t._v(t._s(e.product.title)+" : "+t._s(e.qty)+" "+t._s(e.product.unit))])})),0),a("td",[t._v(t._s(t._f("currency")(e.total)))]),a("td",[e.is_paid?a("span",{staticClass:"text-success"},[t._v("付款成功")]):a("span",[t._v("尚未付款")])]),a("td",[a("button",{staticClass:"btn btn-outline-primary btn-sm mr-1",on:{click:function(a){return t.openModal(e)}}},[t._v("修改")])])])})),0)]),a("Pagination",{attrs:{pagination:t.pagination},on:{getpage:t.getOrders}}),a("div",{staticClass:"modal fade",attrs:{id:"orderModal",tabindex:"-1",role:"dialog","aria-labelledby":"productsModalLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog modal-lg",attrs:{role:"document"}},[a("div",{staticClass:"modal-content border-0"},[t._m(1),a("div",{staticClass:"modal-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-6 text-left"},[a("h3",[t._v("訂購人資料")]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"username"}},[t._v("名稱")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.user.name,expression:"tempOrder.user.name"}],staticClass:"form-control",attrs:{type:"text",id:"username",placeholder:"更改名稱"},domProps:{value:t.tempOrder.user.name},on:{input:function(e){e.target.composing||t.$set(t.tempOrder.user,"name",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"email"}},[t._v("email")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.user.email,expression:"tempOrder.user.email"}],staticClass:"form-control",attrs:{type:"text",id:"email",placeholder:"更改email"},domProps:{value:t.tempOrder.user.email},on:{input:function(e){e.target.composing||t.$set(t.tempOrder.user,"email",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"tel"}},[t._v("電話")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.user.tel,expression:"tempOrder.user.tel"}],staticClass:"form-control",attrs:{type:"text",id:"tel",placeholder:"更改電話"},domProps:{value:t.tempOrder.user.tel},on:{input:function(e){e.target.composing||t.$set(t.tempOrder.user,"tel",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"address"}},[t._v("地址")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.user.address,expression:"tempOrder.user.address"}],staticClass:"form-control",attrs:{type:"text",id:"address",placeholder:"更改地址"},domProps:{value:t.tempOrder.user.address},on:{input:function(e){e.target.composing||t.$set(t.tempOrder.user,"address",e.target.value)}}})])]),a("div",{staticClass:"col-6 text-left"},[a("h3",[t._v("產品資訊")]),a("div",{staticClass:"pre-scrollable"},t._l(t.tempOrder.products,(function(e){return a("div",{key:e.id,staticClass:"form-group"},[a("label",{attrs:{for:"product_qty"}},[t._v(" 商品名稱 : "),a("span",{staticClass:"text-primary"},[t._v(t._s(e.product.title))])]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.qty,expression:"item.qty"}],staticClass:"form-control",attrs:{type:"number",id:"product_qty",placeholder:"請輸入數量"},domProps:{value:e.qty},on:{input:function(a){a.target.composing||t.$set(e,"qty",a.target.value)}}})])})),0),a("div",{staticClass:"form-check text-center mt-5"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.is_paid,expression:"tempOrder.is_paid"}],staticClass:"form-check-input",attrs:{type:"checkbox",id:"is_paid"},domProps:{checked:Array.isArray(t.tempOrder.is_paid)?t._i(t.tempOrder.is_paid,null)>-1:t.tempOrder.is_paid},on:{change:function(e){var a=t.tempOrder.is_paid,s=e.target,r=!!s.checked;if(Array.isArray(a)){var i=null,o=t._i(a,i);s.checked?o<0&&t.$set(t.tempOrder,"is_paid",a.concat([i])):o>-1&&t.$set(t.tempOrder,"is_paid",a.slice(0,o).concat(a.slice(o+1)))}else t.$set(t.tempOrder,"is_paid",r)}}}),t.tempOrder.is_paid?a("label",{staticClass:"text-success form-check-label",attrs:{for:"is_paid"}},[t._v("已付款")]):a("label",{staticClass:"form-check-label",attrs:{for:"is_paid"}},[t._v("未付款")])])])])]),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("取消")]),a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return t.updateOrder(t.tempOrder.id)}}},[t._v("確認")])])])])])],1)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("名稱")]),a("th",[t._v("Email")]),a("th",[t._v("電話")]),a("th",[t._v("訂單內容")]),a("th",[t._v("付款金額")]),a("th",[t._v("是否付款")]),a("th",[t._v("修改訂單")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-header bg-dark text-white"},[a("h5",{staticClass:"modal-title",attrs:{id:"productsModalLabel"}},[a("span",[t._v("編輯訂單")])]),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{staticClass:"text-white",attrs:{"aria-hidden":"true"}},[t._v("×")])])])}],i=a("1157"),o=a.n(i),n=a("d529"),d={data:function(){return{orders:[],tempOrder:{products:[],user:{}},isLoading:!1,pagination:{}}},components:{Pagination:n["a"]},methods:{getOrders:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=this,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("pigeon","/admin/orders?page=").concat(t);e.isLoading=!0,this.$http.get(a).then((function(t){e.orders=t.data.orders,e.isLoading=!1,e.pagination=t.data.pagination}))},openModal:function(t){this.tempOrder=Object.assign({},t),o()("#orderModal").modal("show")},updateOrder:function(t){var e=this,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("pigeon","/admin/order/").concat(t);this.$http.put(a,{data:e.tempOrder}).then((function(t){t.data.success?(o()("#orderModal").modal("hide"),e.getOrders()):(o()("#orderModal").modal("hide"),e.getOrders(),alert("修改失敗"))}))}},computed:{sortOrders:function(){var t=this,e=[];return t.orders.length&&(e=t.orders.sort((function(t,e){var a=t.is_paid,s=e.is_paid;return s-a}))),e}},created:function(){this.getOrders()}},l=d,c=(a("6eb5"),a("2877")),p=Object(c["a"])(l,s,r,!1,null,"4e3d173b",null);e["default"]=p.exports},"6eb5":function(t,e,a){"use strict";var s=a("f40d"),r=a.n(s);r.a},d529:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex justify-content-center"},[a("nav",{attrs:{"aria-label":"Page navigation example"}},[a("ul",{staticClass:"pagination"},[a("li",{staticClass:"page-item",class:{disabled:!t.pagination.has_pre}},[a("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"},on:{click:function(e){return e.preventDefault(),t.getProducts(t.pagination.current_page-1)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])])]),t._l(t.pagination.total_pages,(function(e){return a("li",{key:e,staticClass:"page-item",class:{active:t.pagination.current_page===e}},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.getProducts(e)}}},[t._v(t._s(e))])])})),a("li",{staticClass:"page-item",class:{disabled:!t.pagination.has_next}},[a("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"},on:{click:function(e){return e.preventDefault(),t.getProducts(t.pagination.current_page+1)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])])])],2)])])},r=[],i={props:["pagination"],methods:{getProducts:function(t){this.$emit("getpage",t)}}},o=i,n=a("2877"),d=Object(n["a"])(o,s,r,!1,null,null,null);e["a"]=d.exports},f40d:function(t,e,a){}}]);
//# sourceMappingURL=chunk-19144148.921a9620.js.map