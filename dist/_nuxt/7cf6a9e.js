(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{689:function(e,t,r){var content=r(731);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(15).default)("d3761a8c",content,!0,{sourceMap:!1})},730:function(e,t,r){"use strict";r(689)},731:function(e,t,r){var n=r(14)(!1);n.push([e.i,".page-titles{padding-bottom:20px;background:#fff;margin:-15px -30px 0;padding:15px;box-shadow:1px 0 5px rgb(0 0 0/10%)}.custom-breadcrumbs{margin:-15px 0 0 -22px!important}.v-breadcrumbs__divider{padding:0 5px!important}.pseudoheader{border-bottom:1px solid #dee2e6;font-weight:300}.pseudoheader .v-tabs-slider-wrapper{height:1px}.pseudoheader .v-tab--active{background-color:#eef5f9;border-color:#dee2e6 #dee2e6 #eef5f9}.strong{font-weight:700}.w-100{width:100%}.placeholder{background:#fff59d;padding:2px 5px;border-radius:2px}.request{text-align:justify}.request>table:first-of-type{display:table;margin-left:auto;text-align:right}.request>table:first-of-type span:nth-of-type(2){margin-bottom:1.2rem;display:inline-block}.request>table:nth-of-type(2) tr>td:nth-of-type(2){text-align:right}.request>table:nth-of-type(2){margin-top:2rem;width:100%}.request .title{margin:2rem 0;text-align:center}.request ol{margin:2rem 0 2rem 2rem}",""]),e.exports=n},743:function(e,t,r){"use strict";r.r(t);var template,n=r(21),o=r(27),l=(r(37),r(77),r(23),r(52),r(53),r(376),r(31),r(69),r(51),r(33),r(8),r(375),r(70),r(208),r(151),r(78),r(211)),c=r.n(l);self.addEventListener("install",(function(e){return console.log("ServiceWorker installed")}));var d={mounted:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r,n,o,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.currentId=e.$route.query.edit?e.$route.query.edit:"",!e.currentId){t.next=6;break}return t.next=4,e.$db.findOneAsync({_id:e.currentId});case 4:if(r=t.sent)for(e.editmode=!0,e.$set(e,"data",r),e.$set(e,"oldData",r),n=0,o=["name","sex","email","address","phone"];n<o.length;n++)e[l=o[n]]=r[l];case 6:return t.next=8,e.$loadFile("./documents/request-template.docx");case 8:template=t.sent,e.makePreview();case 10:case"end":return t.stop()}}),t)})))()},data:function(){return{tab:null,showDatasetButton:!1,html:"",editmode:!1,dialog:!1,dateMenu:!1,currentId:"",currentData:{},oldData:{},data:{status:"",requestDate:new Date,requestDateUk:(new Date).toLocaleDateString("uk"),requestAnswerDate:"",extendedRequestAnswerDate:"",sex:"male",requestOrganization:"",law:"",dataset:[{title:""}]}}},computed:{name:c()("name"),sex:c()("sex"),address:c()("address"),email:c()("email"),phone:c()("phone"),googleCalendar:function(){var e="https://www.google.com/calendar/render?action=TEMPLATE&";if(!this.data.requestAnswerDate)return e;var t=location.href.replace(/\/[^\/]*$/g,""),r=new URLSearchParams;r.append("text","Запит на інформацію");var details="Вийшов термін отримання відповіді на запит. ";return details+="Перевірте, чи надійшов Вам лист від розпорядника ".concat(this.data.requestOrganization,"?"),details+="<br/><br/>",details+='<ul><li><a href="'.concat(t,'">Перевірити поточний стан запита</a></li>'),details+='<li><a href="'.concat(t,"/complaint?edit=").concat(this.currentId,'">Підготувати скаргу Уповноваженому</a></li>'),details+='<li><a href="'.concat(t,"/claim?edit=").concat(this.currentId,'">Підготувати позов</a></li></ul>'),r.append("details",details),r.append("dates",new Date(this.data.requestAnswerDate).toISOString().replace(/[:-]|\.\d+(?=Z)/g,"")+"/undefined"),e+r},breadcrumbs:function(){return[{text:"Мої запити",disabled:!1,href:"/"},{text:"".concat(this.editmode?"Редагувати":"Створити"," запит"),disabled:!0,href:"/request"}]}},methods:{toggleSex:function(){this.sex="male"===this.sex?"female":"male"},next:function(e){var t=document.querySelectorAll("#input input"),r=e.target,n=Array.from(t).indexOf(r);if(-1===n)return!1;t[n+1].focus()},addDataset:function(){this.data.dataset.push({title:""})},addDatasetAndSelect:function(e){var t=this;t.addDataset(),setTimeout((function(){t.next(e)}),0)},prepareData:function(){var data=JSON.parse(JSON.stringify(this.data));data.name=this.name,data.sex=this.sex,data.email=this.email,data.address=this.address,data.phone=this.phone,data.ifPhone="string"==typeof data.phone&&""!==data.phone,data.ifLaw="string"==typeof data.law&&""!==data.law,data.dataset=data.dataset.filter((function(e){return""!==e.title})),data.requestDateUk=(new Date).toLocaleDateString("uk");for(var e=0,t=Object.entries(data);e<t.length;e++){var r=Object(n.a)(t[e],2),o=r[0],l=r[1];(void 0===l||"string"==typeof l&&""===l.trim())&&(data[o]=l||"[НЕ ВИЗНАЧЕНО]")}return data},deleteItem:function(e){this.data.dataset.splice(e,1),this.makePreview()},makePreview:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var data,r,html;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return data=e.prepareData(),t.next=3,e.$createDocx(template,data,"arraybuffer");case 3:return r=t.sent,t.next=6,e.$convertToHtml({arrayBuffer:r},{styleMap:["p.custom => span.placeholder","p[style-name='custom Char'] => span.placeholder","p[style-name='custom'] => span.placeholder","r[style-name='custom Char'] => span.placeholder","r[style-name='custom'] => span.placeholder","r[style-name='Title'] => p.title","p[style-name='Title'] => p.title"]});case 6:html=t.sent,e.html=html.value;case 8:case"end":return t.stop()}}),t)})))()},downloadDoc:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$createDocx(template,e.currentData);case 2:if(r=t.sent,e.dialog=!1,e.$saveAs(r,"Запит від "+e.currentData.name+" ("+e.currentData.requestDate+").docx"),!e.currentId){t.next=10;break}return t.next=8,e.$db.update({_id:e.currentId},e.data);case 8:t.next=14;break;case 10:return t.next=12,e.$db.insertAsync(e.data);case 12:n=t.sent,e.currentId=n._id;case 14:case"end":return t.stop()}}),t)})))()},removeDoc:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(editmode){t.next=6;break}return t.next=3,e.$db.remove({_id:e.currentId});case 3:e.currentId="",t.next=8;break;case 6:return t.next=8,e.$db.update({_id:e.currentId},e.oldData);case 8:if(!e.currentId){t.next=13;break}return t.next=11,e.$db.update({_id:e.currentId},data);case 11:t.next=17;break;case 13:return t.next=15,e.$db.insertAsync(data);case 15:r=t.sent,e.currentId=r._id;case 17:e.$set(e,"currentData",{});case 18:case"end":return t.stop()}}),t)})))()},saveDoc:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var data,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.data.requestAnswerDate=e.$calculateWorkingDate(6).toISOString().substr(0,10),e.data.status="Надіслано запит",e.data.requestDateUk=new Date(e.data.requestDate).toLocaleDateString("uk"),e.dialog=!0,data=e.prepareData(),!e.currentId){t.next=10;break}return t.next=8,e.$db.update({_id:e.currentId},data);case 8:t.next=14;break;case 10:return t.next=12,e.$db.insertAsync(data);case 12:r=t.sent,e.currentId=r._id;case 14:e.$set(e,"currentData",data);case 15:case"end":return t.stop()}}),t)})))()}},watch:{"data.dataset":{deep:!0,handler:function(e){this.showDatasetButton=""!==e[e.length-1].title}},name:function(e){this.sex=e.trim().match(/[оєіїи]вна$|[Кк]изи/g)?"female":"male"}}},v=(r(730),r(112)),m=r(150),f=r.n(m),x=r(745),h=r(273),k=r(242),y=r(98),w=r(737),_=r(740),D=r(639),C=r(625),$=r(129),I=r(241),O=r(657),S=r(738),V=r(643),A=r(739),T=r(747),P=r(746),R=r(735),M=r(727),j=r(656),component=Object(v.a)(d,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-row",{staticClass:"page-titles"},[r("v-col",{staticClass:"mb-0 mt-0 pt-0 pb-0 ml-3 blue-grey--text text--lighten-2",attrs:{cols:"12"}},[r("div",{staticClass:"text-themecolor mb-0 mt-0 text-h5 blue--text"},[e._v(e._s(e.editmode?"Редагувати":"Створити")+" запит на доступ до публічної інформації")]),e._v(" "),r("v-breadcrumbs",{staticClass:"custom-breadcrumbs pb-0",attrs:{items:e.breadcrumbs,color:"blue"},scopedSlots:e._u([{key:"divider",fn:function(){return[r("v-icon",{attrs:{color:"blue-grey lighten-3"}},[e._v("mdi-chevron-right")])]},proxy:!0}])})],1)],1),e._v(" "),r("v-row",{staticClass:"ml-0 mr-0"},[r("v-col",{attrs:{cols:"12",lg:"4"}},[r("v-card",[r("v-tabs",{staticClass:"pseudoheader",model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[r("v-tabs-slider"),e._v(" "),r("v-tab",{attrs:{href:"#tab-1"}},[e._v("\n            Дані запиту\n          ")])],1),e._v(" "),r("v-tabs-items",{attrs:{id:"input"},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[r("v-tab-item",{key:"1",attrs:{value:"tab-1"}},[r("v-card",{attrs:{flat:""}},[r("v-card-text",{staticClass:"pt-6 pb-6 pr-6"},[r("div",{staticClass:"subtitle-1 ml-8 mb-4"},[e._v("Інформація про запитувача даних")]),e._v(" "),r("v-text-field",{attrs:{"prepend-icon":"male"===e.sex?"mdi-face-man":"mdi-face-woman",label:"Прізвище, ім'я та по батькові",hint:"Дані подавача запиту"},on:{blur:e.makePreview,keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.next.apply(null,arguments)},"click:prepend":e.toggleSex},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),r("v-text-field",{attrs:{"prepend-icon":"mdi-email",label:"Електронна адреса",hint:"Ваша електронна адреса для відповіді"},on:{blur:e.makePreview,keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.next.apply(null,arguments)}},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),e._v(" "),r("v-text-field",{attrs:{"prepend-icon":"mdi-phone",label:"Номер телефону",hint:"Ваш номер телефону"},on:{blur:e.makePreview,keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.next.apply(null,arguments)}},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}}),e._v(" "),r("div",{staticClass:"subtitle-1 mt-4 ml-8 mb-4 strong"},[e._v("Інформація про набори даних")]),e._v(" "),r("v-text-field",{attrs:{"prepend-icon":"mdi-domain",label:"Розпорядник даних",hint:"Назва розпорядника даних, до якого подається запит"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.next.apply(null,arguments)},blur:e.makePreview},model:{value:e.data.requestOrganization,callback:function(t){e.$set(e.data,"requestOrganization",t)},expression:"data.requestOrganization"}}),e._v(" "),r("v-text-field",{attrs:{"prepend-icon":"mdi-book",label:"Закон України",hint:"Назва закону, за яким розпорядник має публікувати дані"},on:{blur:e.makePreview,keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.next.apply(null,arguments)}},model:{value:e.data.law,callback:function(t){e.$set(e.data,"law",t)},expression:"data.law"}}),e._v(" "),r("v-fade-transition",{attrs:{group:""}},e._l(e.data.dataset,(function(t,n){return r("v-text-field",{key:"data-"+n,attrs:{"append-icon":e.data.dataset.length>1?"mdi-delete":"","prepend-icon":"mdi-database",label:"Набір даних",hint:"Назва набору даних"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.addDatasetAndSelect.apply(null,arguments)},blur:e.makePreview,"click:append":function(t){return e.deleteItem(n)}},model:{value:t.title,callback:function(r){e.$set(t,"title",r)},expression:"item.title"}})})),1),e._v(" "),r("v-btn",{directives:[{name:"show",rawName:"v-show",value:e.showDatasetButton,expression:"showDatasetButton"}],staticClass:"mt-4",attrs:{text:"",transition:"fade-transition",block:""},on:{click:e.addDataset}},[r("v-icon",{attrs:{left:""}},[e._v("mdi-plus")]),e._v(" Додати набір\n                ")],1),e._v(" "),r("v-btn",{staticClass:"mt-4",attrs:{color:"success",transition:"fade-transition",block:""},on:{click:e.saveDoc}},[r("v-icon",{attrs:{left:""}},[e._v("mdi-content-save")]),e._v(" Зберегти запит\n                ")],1)],1)],1)],1)],1)],1)],1),e._v(" "),r("v-col",{attrs:{cols:"12",lg:"8"}},[r("v-card",[r("v-tabs",{staticClass:"pseudoheader",model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[r("v-tabs-slider"),e._v(" "),r("v-tab",{attrs:{href:"#tab-1"}},[e._v("\n            Попередній перегляд\n          ")])],1),e._v(" "),r("v-tabs-items",{model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[r("v-tab-item",{key:"1",attrs:{value:"tab-1"}},[r("v-card",{ref:"preview",attrs:{flat:""}},[r("v-card-text",[r("div",{staticClass:"document-preview request",domProps:{innerHTML:e._s(e.html)}})])],1)],1)],1)],1)],1)],1),e._v(" "),r("v-dialog",{attrs:{width:"500"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[r("v-card",[r("v-card-title",{staticClass:"blue white--text text-h5",attrs:{color:"blue",dark:""}},[e._v("\n        Надсилання запиту\n      ")]),e._v(" "),r("v-card-text",{staticClass:"text-center"},[r("p",{staticClass:"mt-8"},[e._v("Вам необхідно надіслати цей запит на електронну пошту розпорядника даних. Згідно "),r("strong",[e._v("частини 1 статті 20")]),e._v(" Закону України «Про доступ до публічної інформації» розпорядник інформації має надати відповідь на запит на інформацію "),r("strong",[e._v("не пізніше п'яти робочих днів з дня отримання запиту")]),e._v(".")]),e._v(" "),r("p",[e._v("Якщо Ви не надсилаєте запит сьогодні або очікуєте відповідь у іншу дату, змініть значення нижче.")]),e._v(" "),r("v-row",{attrs:{justify:"space-around"}},[r("v-menu",{attrs:{"close-on-content-click":!1,"max-width":"290"},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on,o=t.attrs;return[r("v-text-field",e._g(e._b({staticClass:"mt-4 mb-4",staticStyle:{"max-width":"220px"},attrs:{value:new Date(e.data.requestAnswerDate).toLocaleDateString("uk"),clearable:"",label:"Очікувана дата відповіді",readonly:""},on:{"click:clear":function(t){e.date=null}}},"v-text-field",o,!1),n))]}}]),model:{value:e.dateMenu,callback:function(t){e.dateMenu=t},expression:"dateMenu"}},[e._v(" "),r("v-date-picker",{attrs:{"first-day-of-week":1,locale:"uk-ua"},on:{change:function(t){e.dateMenu=!1}},model:{value:e.data.requestAnswerDate,callback:function(t){e.$set(e.data,"requestAnswerDate",t)},expression:"data.requestAnswerDate"}})],1)],1),e._v(" "),r("v-btn",{attrs:{color:"red darken-2",text:"",href:e.googleCalendar,target:"_blank"}},[r("v-icon",{attrs:{left:""}},[e._v("mdi-calendar")]),e._v(" Додати в Google Calendar")],1)],1),e._v(" "),r("v-divider"),e._v(" "),r("v-card-actions",[r("v-spacer"),e._v(" "),r("v-btn",{attrs:{color:"grey",text:""},on:{click:function(t){e.dialog=!1}}},[e._v("Скасувати")]),e._v(" "),r("v-btn",{attrs:{color:"primary",text:""},on:{click:e.downloadDoc}},[e._v("Зберегти та надіслати")])],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;f()(component,{VBreadcrumbs:x.a,VBtn:h.a,VCard:k.a,VCardActions:y.a,VCardText:y.c,VCardTitle:y.d,VCol:w.a,VDatePicker:_.a,VDialog:D.a,VDivider:C.a,VFadeTransition:$.c,VIcon:I.a,VMenu:O.a,VRow:S.a,VSpacer:V.a,VTab:A.a,VTabItem:T.a,VTabs:P.a,VTabsItems:R.a,VTabsSlider:M.a,VTextField:j.a})}}]);