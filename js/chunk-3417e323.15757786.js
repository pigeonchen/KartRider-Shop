(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3417e323"],{"01ac":function(t,a,i){"use strict";var s=i("df88"),e=i.n(s);e.a},"0fa5":function(t,a,i){"use strict";i.r(a);var s=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",[i("NavBar"),i("main",[i("Alert"),i("div",{staticClass:"container",staticStyle:{"min-height":"81vh"}},[t._m(0),i("nav",{attrs:{"aria-label":"breadcrumb"}},[i("ol",{staticClass:"breadcrumb"},[i("li",{staticClass:"breadcrumb-item",attrs:{"aria-current":"page"}},[i("router-link",{attrs:{to:"/"}},[t._v("首頁")])],1),i("li",{staticClass:"breadcrumb-item",attrs:{"aria-current":"page"}},[t._v("商城")])])]),i("div",{staticClass:"row"},[i("div",{staticClass:"col-lg-3 col-sm-12"},[i("div",{staticClass:"sticky-top pt-4"},[i("ul",{staticClass:"list-group product-sidebar mb-3 text-center"},[i("li",{staticClass:"list-group-item product-sidebar-items",class:{active:""===t.category},on:{click:function(a){t.goToCategory(""),t.category="",t.getPageProducts(t.category)}}},[t._v("所有商品")]),t._l(t.categories,(function(a,s){return i("li",{key:s,staticClass:"list-group-item product-sidebar-items",class:{active:t.category===a},on:{click:function(i){t.goToCategory(a),t.category=a,t.getCategoryProducts(a)}}},[t._v(t._s(a))])}))],2)])]),i("div",{staticClass:"col-lg-9 col-sm-12"},[i("loading",{attrs:{active:t.isLoading},on:{"update:active":function(a){t.isLoading=a}}},[[i("div",{staticClass:"bazzi-loading"})]],2),i("div",{staticClass:"row"},t._l(t.filterData,(function(a){return i("div",{key:a.id,staticClass:"col-lg-4 mb-4"},[i("div",{staticClass:"card shadow-sm h-100"},[i("a",{staticClass:"myfavorite"},[t.isfavored(a)?i("i",{staticClass:"fas fa-heart",on:{click:function(i){return i.preventDefault(),t.changeFavorite(a)}}}):i("i",{staticClass:"far fa-heart",on:{click:function(i){return i.preventDefault(),t.changeFavorite(a)}}})]),i("img",{staticClass:"card-img-top p-2 bg-dark",attrs:{src:""+a.imageUrl,alt:""+a.title}}),i("div",{staticClass:"card-body"},[i("span",{staticClass:"badge badge-secondary float-right ml-2"},[t._v(t._s(a.category))]),i("h5",{staticClass:"card-title"},[t._v(t._s(a.title))]),i("div",{staticClass:"d-flex justify-content-between"},[i("div",{staticClass:"d-flex flex-column"},[a.price===a.origin_price?i("p",[t._v("售價"+t._s(a.origin_price)+"元")]):t._e(),a.price!==a.origin_price?i("del",{staticClass:"mr-1"},[t._v("原價"+t._s(a.origin_price)+"元")]):t._e(),a.price!==a.origin_price?i("p",{staticClass:"m-0 text-danger"},[t._v("售價"+t._s(a.price)+" 元")]):t._e()]),i("div",{staticClass:"d-flex align-items-end"},[i("span",{staticClass:"btn btn-sm btn-primary mr-2",on:{click:function(i){return t.getProduct(a.id)}}},[i("i",{staticClass:"fas fa-info-circle"})]),i("span",{staticClass:"btn btn-sm btn-warning",on:{click:function(i){return t.addCart(a.id,1)}}},[i("i",{staticClass:"fas fa-shopping-cart"})])])])])])])})),0),""===t.category?i("Pagination",{attrs:{pagination:t.pagination},on:{getpage:t.getPageProducts}}):t._e()],1)])])],1),i("Footer")],1)},e=[function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"row mb-3"},[i("div",{staticClass:"col-12"},[i("div",{staticClass:"background"},[i("div",{staticClass:"text mx-2"},[i("h1",{staticClass:"text-white text-center p-3"},[t._v("輸入優惠碼打 9 折")])])])])])}],r=i("5d6b"),n=i("3650"),c=i("d529"),o=i("f688"),l={name:"Shop",components:{NavBar:r["a"],Footer:n["a"],Pagination:c["a"],Alert:o["a"]},data:function(){return{category:this.$store.state.productsModule.category||""}},methods:{getPageProducts:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,a=arguments.length>1?arguments[1]:void 0;this.$store.dispatch("getPageProducts",{page:t,category:a})},getCategoryProducts:function(t){this.$store.dispatch("getCategoryProducts",t)},getProduct:function(t){var a=this;a.$router.push("/product/".concat(t))},goToCategory:function(t){this.$store.dispatch("goToCategory",t)},addCart:function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.$store.dispatch("addCart",{id:t,qty:a})},getCart:function(){this.$store.dispatch("getCart")},getFavorites:function(){this.$store.dispatch("getFavorites")},changeFavorite:function(t){this.$store.dispatch("changeFavorite",t)},isfavored:function(t){var a=this.$store.state.favorites.filter((function(a){return a.id===t.id}));return a.length>0}},computed:{isLoading:function(){return this.$store.state.isLoading},filterData:function(){var t=this;return""!==t.category?t.$store.state.productsModule.products.filter((function(a){return a.category===t.category})):this.$store.state.productsModule.products},categories:function(){return this.$store.state.productsModule.categories},pagination:function(){return this.$store.state.productsModule.pagination},carts:function(){return this.$store.state.carts},favorites:function(){return this.$store.state.favorites}},created:function(){var t=this;t.getPageProducts(),t.getCart(),t.getFavorites()}},u=l,d=(i("01ac"),i("2877")),g=Object(d["a"])(u,s,e,!1,null,"36758434",null);a["default"]=g.exports},d529:function(t,a,i){"use strict";var s=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"d-flex justify-content-center"},[i("nav",{attrs:{"aria-label":"Page navigation example"}},[i("ul",{staticClass:"pagination"},[i("li",{staticClass:"page-item",class:{disabled:!t.pagination.has_pre}},[i("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"},on:{click:function(a){return a.preventDefault(),t.getProducts(t.pagination.current_page-1)}}},[i("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])])]),t._l(t.pagination.total_pages,(function(a){return i("li",{key:a,staticClass:"page-item",class:{active:t.pagination.current_page===a}},[i("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(i){return i.preventDefault(),t.getProducts(a)}}},[t._v(t._s(a))])])})),i("li",{staticClass:"page-item",class:{disabled:!t.pagination.has_next}},[i("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"},on:{click:function(a){return a.preventDefault(),t.getProducts(t.pagination.current_page+1)}}},[i("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])])])],2)])])},e=[],r={props:["pagination"],methods:{getProducts:function(t){this.$emit("getpage",t)}}},n=r,c=i("2877"),o=Object(c["a"])(n,s,e,!1,null,null,null);a["a"]=o.exports},df88:function(t,a,i){}}]);
//# sourceMappingURL=chunk-3417e323.15757786.js.map