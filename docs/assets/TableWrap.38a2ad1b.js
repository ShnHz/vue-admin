import{_ as r}from"./index.578b51f7.js";import{q as i,o as s,a as d,e,y as o,n,x as _,u as c,F as p}from"./vue.9c3538fc.js";const u={props:{type:{type:String,default:"0"},boxShadow:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},loadingTip:{type:String,default:""}},data(){return{}}},f={class:"content-wrap"},b={class:"table-wrap__header"},y={class:"table-wrap__body"},w={class:"table-wrap__footer"},h={class:"table-wrap__footer"};function v(t,g,a,m,x,S){const l=i("a-spin");return s(),d("div",{class:n(["table-wrap",`table-wrap__type${a.type}`])},[e("div",f,[e("div",b,[o(t.$slots,"header",{},void 0,!0)]),a.type==1?(s(),d("div",{key:0,class:n(["table-wrap__content",{"is-box-shadow":a.boxShadow}])},[e("div",y,[e("section",null,[_(l,{loading:a.loading,tip:a.loadingTip,dot:""},{default:c(()=>[o(t.$slots,"body",{},void 0,!0)]),_:3},8,["loading","tip"])])]),e("div",w,[o(t.$slots,"footer",{},void 0,!0)])],2)):(s(),d(p,{key:1},[e("div",{class:n(["table-wrap__body",{"is-box-shadow":a.boxShadow}])},[e("section",null,[o(t.$slots,"body",{},void 0,!0)])],2),e("div",h,[o(t.$slots,"footer",{},void 0,!0)])],64))])],2)}var k=r(u,[["render",v],["__scopeId","data-v-0f80f1b2"]]);export{k as T};