(()=>{"use strict";var t=document.querySelector("#card-template").content,e=document.forms.newplace;function n(e,n,r,o,c){var a=t.querySelector(".places__item").cloneNode(!0),u=a.querySelector(".card__delete-button"),i=a.querySelector(".card__like-button"),l=a.querySelector(".card__image"),s=a.querySelector(".card__title"),d=a.querySelector(".card__like-counter");return l.src=e.link,l.alt=e.name,s.textContent=e.name,d.textContent=e.likes.length,e.owner._id!==c?u.style.display="none":u.addEventListener("click",(function(t){return n(t,e)})),e.likes.some((function(t){return t._id===c}))&&i.classList.add("card__like-button_is-active"),l.addEventListener("click",(function(){return o(e.link,e.name)})),i.addEventListener("click",(function(t){return r(t,e,c,d)})),a}function r(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",c),t.addEventListener("click",a)}function o(t){t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c),t.removeEventListener("click",a)}function c(t){"Escape"===t.key&&o(document.querySelector(".popup.popup_is-opened"))}function a(t){t.currentTarget===t.target&&o(t.target)}var u=function(t,e,n){var r=t.querySelector(".".concat(e.id,"-error"));e.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""};function i(t,e,n){!function(t){return t.some((function(t){return!t.validity.valid}))}(t)?d(e,n):s(e,n)}var l=function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);n.forEach((function(n){u(t,n,e)})),s(r,e)},s=function(t,e){t.classList.add(e.inactiveButtonClass),t.disabled=!0},d=function(t,e){t.classList.remove(e.inactiveButtonClass),t.disabled=!1},f={baseUrl:"https://nomoreparties.co/v1/wff-cohort-23",headers:{authorization:"a566fd8f-36df-4fe6-b8fd-4a4e5de77834","Content-Type":"application/json"}};function p(t){return t.ok?t.json():Promise.reject("ошибка ".concat(t.status))}function m(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}document.getElementById("card-template").content;var v=document.querySelector(".places__list"),y=document.querySelector(".popup_type_edit"),_=document.querySelector(".profile__title"),h=document.querySelector(".profile__description"),b=document.querySelector(".profile__image"),S=document.querySelector(".popup_type_new-card"),g=document.forms.editprofile,k=g.name,C=g.description,E=document.querySelector(".popup_type_image"),q=E.querySelector(".popup__image"),L=E.querySelector(".popup__caption"),x=document.querySelector(".profile__edit-button"),A=document.querySelector(".profile__add-button"),U=document.querySelectorAll(".popup__close"),w=(document.querySelectorAll(".popup"),e.placename),P=e.link,T={},j=document.querySelector(".popup_type_avatar"),B=j.querySelector(".popup__button"),O={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function D(t,e){q.src=t,q.alt=e,L.textContent=e,r(E)}function I(t,e){var n;(n=e._id,fetch("".concat(f.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:f.headers}).then(p).catch((function(t){console.log(t)}))).then((function(){!function(t){t.stopPropagation(),t.target.closest(".places__item").remove()}(t)})).catch((function(t){return console.log(t)}))}function M(t,e,n,r){var o;(e.likes.some((function(t){return t._id===n}))?(o=e._id,fetch("".concat(f.baseUrl,"/cards/likes/").concat(o),{method:"DELETE",headers:f.headers}).then((function(t){return p(t)}))):function(t){return fetch("".concat(f.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:f.headers}).then((function(t){return p(t)}))}(e._id)).then((function(n){e.likes=n.likes,r.textContent=n.likes.length,function(t){t.target.classList.contains("card__like-button")&&(t.stopPropagation(),t.target.classList.toggle("card__like-button_is-active"))}(t)})).catch((function(t){return console.log(t)}))}Promise.all([fetch("".concat(f.baseUrl,"/users/me"),{headers:f.headers}).then(p).catch((function(t){console.log(t)})),fetch("".concat(f.baseUrl,"/cards"),{headers:f.headers}).then(p).catch((function(t){console.log(t)}))]).then((function(t){var e,r,o,c,a=(c=2,function(t){if(Array.isArray(t))return t}(o=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==e);i=!0);}catch(t){l=!0,o=t}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(o,c)||function(t,e){if(t){if("string"==typeof t)return m(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(t,e):void 0}}(o,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=a[0],i=a[1];e=u,T.id=e._id,T.title=e.name,T.about=e.about,T.avatar=e.avatar,_.textContent=T.title,h.textContent=T.about,b.setAttribute("style","background-image: url(".concat(T.avatar,")")),r=i,Array.from(r).forEach((function(t){var e=n(t,I,M,D,T.id);v.append(e)}))})),U.forEach((function(t){t.addEventListener("click",(function(){o(t.closest(".popup"))}))})),x.addEventListener("click",(function(){g.name.value=_.textContent,g.description.value=h.textContent,l(g,O),r(y)})),A.addEventListener("click",(function(){l(e,O),e.reset(),r(S)})),g.addEventListener("submit",(function(t){t.preventDefault();var e,n,r,c=C.value,a=k.value,u=document.querySelector(".popup__button");u.textContent="Сохранение...",(e={name:a,about:c},n=e.name,r=e.about,fetch("".concat(f.baseUrl,"/users/me"),{method:"PATCH",headers:f.headers,body:JSON.stringify({name:n,about:r})}).then(p).catch((function(t){console.log(t)}))).then((function(t){_.textContent=t.name,h.textContent=t.about,o(y)})).catch((function(t){return console.log(t)})).finally((function(){return u.textContent="Сохранить"}))})),e.addEventListener("submit",(function(t){t.preventDefault();var r,c=w.value,a=P.value,u=e.button,i={name:c,link:a};u.textContent="Сохранение...",(r=i,fetch("".concat(f.baseUrl,"/cards"),{method:"POST",headers:f.headers,body:JSON.stringify(r,undefined)}).then(p).catch((function(t){console.log(t)}))).then((function(t){var r=n(t,I,M,D,T.id);v.prepend(r),o(S),e.reset(),l(document.forms.avatar,O)})).catch((function(t){return console.log(t)})).finally((function(){return u.textContent="Сохранить"}))})),b.addEventListener("click",(function(){return r(j)})),B.addEventListener("click",(function(t){return function(t){t.preventDefault();var e,n=document.forms.avatar.name.value,r=document.forms.avatar.button;r.textContent="Сохранение...",(e={avatar:n},fetch("".concat(f.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:f.headers,body:JSON.stringify(e)}).then(p).catch((function(t){console.log(t)}))).then((function(t){b.setAttribute("style","background-image: url(".concat(t.avatar,")")),o(avatarPopup),document.forms.avatar.reset(),l(document.forms.avatar,O)})).catch((function(t){return console.log(t)})).finally((function(){return r.textContent="Сохранить"}))}(t)})),function(t){Array.from(document.querySelectorAll(t.formSelector)).forEach((function(e){e.addEventListener("submit",(function(t){t.preventDefault()})),function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);i(n,r,e),n.forEach((function(o){o.addEventListener("input",(function(){!function(t,e,n){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?u(t,e,n):function(t,e,n){var r=t.querySelector(".".concat(e.id,"-error"));e.classList.add(n.inputErrorClass),r.textContent=e.validationMessage,r.classList.add(n.errorClass)}(t,e,n)}(t,o,e),i(n,r,e)}))}))}(e,t)}))}(O)})();