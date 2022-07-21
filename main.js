(()=>{"use strict";var t={form:".form",formInput:".form__item",closeButton:".popup__close-button",submitButton:".form__button",popupProfile:".popup_content_edit-profile",profileEditButton:".profile__edit-button",profileAvatar:".profile__avatar",profileName:".profile__name",profileAbout:".profile__about",popupAddCard:".popup_content_add-card",addCardButton:".profile__add-button",cardsList:".elements__list",cardTemplate:"#photo-card-template",card:".photo-card",cardTitle:".photo-card__title",cardImage:".photo-card__image",cardLikeButton:".photo-card__like-button",cardLikeActiveClass:"photo-card__like-button_liked",cardLikesCounter:".photo-card__likes-counter",cardDeleteButton:".photo-card__delete-button",popupImage:".popup_content_zoomed-card-image",zoomedImg:".popup__zoomed-image",zoomedImgCaption:".popup__zoomed-image-caption",openedPopupClass:"popup_opened",confirmationPopup:".popup_content_confirmation",popupAvatar:".popup_content_edit-avatar",avatarEditButton:".profile__avatar-wrapper"};function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var n=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._formElement=e,this._inputSelector=n.inputSelector,this._errorSelector=n.errorSelector,this._submitButtonSelector=n.submitButtonSelector,this._buttonDisabledClass=n.submitButtonDisabledClass,this._inputErrorClass=n.inputErrorClass,this._errorClass=n.errorClass}var n,r;return n=t,(r=[{key:"_hasInvalidInputs",value:function(){return this._fieldsList.map((function(t){return t.inputElement})).some((function(t){return!t.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInputs()?(this._buttonElement.setAttribute("disabled",""),this._buttonElement.classList.add(this._buttonDisabledClass)):(this._buttonElement.removeAttribute("disabled"),this._buttonElement.classList.remove(this._buttonDisabledClass))}},{key:"_showInputError",value:function(t,e){t.classList.add(this._inputErrorClass),e.textContent=t.validationMessage,e.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(t,e){t.classList.remove(this._inputErrorClass),e.textContent="",e.classList.remove(this._errorClass)}},{key:"_checkInputValidity",value:function(t,e){t.validity.valid?this._hideInputError(t,e):this._showInputError(t,e)}},{key:"_setEventListeners",value:function(){var t=this;this._fieldsList=[],this._formElement.querySelectorAll(this._inputSelector).forEach((function(e){var n=e.parentNode.querySelector(t._errorSelector),r={inputElement:e,errorElement:n};t._fieldsList.push(r),e.addEventListener("input",(function(){t._checkInputValidity(e,n),t._toggleButtonState()}))})),this._buttonElement=this._formElement.querySelector(this._submitButtonSelector),this._toggleButtonState()}},{key:"enableValidation",value:function(){this._setEventListeners()}},{key:"resetValidation",value:function(){var t=this;this._toggleButtonState(),this._fieldsList.forEach((function(e){t._hideInputError(e.inputElement,e.errorElement)}))}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var o=function(){function t(e,n){var r=n.config,o=n.clickOnImgHandler,i=n.clickOnRemoveButtonHandler,a=n.setLike,u=n.removeLike,c=n.currentUserId;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._cardData=e,this._isOwnCard=e.owner._id===c,this._currentUserId=c,this._config=r,this._handleClickOnImg=o,this._handleClickOnRemoveButton=i,this._setLike=a,this._removeLike=u}var e,n;return e=t,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._config.cardTemplate).content.querySelector(this._config.card).cloneNode(!0)}},{key:"getElement",value:function(){return this._element}},{key:"getId",value:function(){return this._cardData._id}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._elementTitle=this._element.querySelector(this._config.cardTitle),this._elementImg=this._element.querySelector(this._config.cardImage),this._elementlikeButton=this._element.querySelector(this._config.cardLikeButton),this._elementLikesCounter=this._element.querySelector(this._config.cardLikesCounter),this._elementRemoveButton=this._element.querySelector(this._config.cardDeleteButton),this._isOwnCard||(this._elementRemoveButton.remove(),this._elementRemoveButton=null),this._setEventListeners(),this._elementTitle.textContent=this._cardData.name,this._elementImg.src=this._cardData.link,this._elementImg.alt=this._cardData.name,this._updateLikes(),this._element}},{key:"_setEventListeners",value:function(){var t=this;this._elementImg.addEventListener("click",(function(){t._handleClickOnImg(t._cardData.name,t._cardData.link)})),this._elementlikeButton.addEventListener("click",(function(){t._handleClickOnLike()})),this._isOwnCard&&this._elementRemoveButton.addEventListener("click",(function(){t._handleClickOnRemoveButton(t)}))}},{key:"_updateLikes",value:function(){this._elementLikesCounter.textContent=this._cardData.likes.length,this._checkLikeStatus()?this._elementlikeButton.classList.add(this._config.cardLikeActiveClass):this._elementlikeButton.classList.remove(this._config.cardLikeActiveClass)}},{key:"_checkLikeStatus",value:function(){var t=this;return this._cardData.likes.map((function(t){return t._id})).some((function(e){return e===t._currentUserId}))}},{key:"_handleClickOnLike",value:function(){var t=this;(this._checkLikeStatus()?this._removeLike:this._setLike)(this._cardData._id).then((function(e){t._cardData=e,t._updateLikes()})).catch((function(t){return console.log("Ошибка при установке лайка: ".concat(t))}))}},{key:"removeCard",value:function(){this._element.remove(),this._element=null}}])&&r(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var a=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popupElement=document.querySelector(e),this._closeButton=this._popupElement.querySelector(n.closeButton),this._openedClass=n.openedPopupClass,this._handleEscClose=this._handleEscClose.bind(this)}var e,n;return e=t,(n=[{key:"open",value:function(){this._popupElement.classList.add(this._openedClass),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popupElement.classList.remove(this._openedClass),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"setEventListeners",value:function(){var t=this;this._popupElement.addEventListener("mousedown",(function(e){return t._handleCliskClose(e)}))}},{key:"_handleCliskClose",value:function(t){t.target!==this._popupElement&&t.target!==this._closeButton||this.close()}}])&&i(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(){return s="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=l(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},s.apply(this,arguments)}function l(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=h(t)););return t}function f(t,e){return f=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},f(t,e)}function p(t,e){if(e&&("object"===u(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function h(t){return h=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},h(t)}var d=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&f(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=h(r);if(o){var n=h(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return p(this,t)});function a(t,e){var n,r=e.config;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,t,r))._image=n._popupElement.querySelector(r.zoomedImg),n._caption=n._popupElement.querySelector(r.zoomedImgCaption),n}return e=a,(n=[{key:"open",value:function(t,e){this._image.alt=t,this._image.src=e,this._caption.textContent=t,s(h(a.prototype),"open",this).call(this)}}])&&c(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(a);function _(t){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_(t)}function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function y(){return y="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=v(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},y.apply(this,arguments)}function v(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=k(t)););return t}function b(t,e){return b=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},b(t,e)}function g(t,e){if(e&&("object"===_(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function k(t){return k=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},k(t)}var E=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&b(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=k(r);if(o){var n=k(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return g(this,t)});function a(t,e){var n,r=e.config,o=e.submitHandler;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,t,r))._handleSubmit=o,n._form=n._popupElement.querySelector(r.form),n._submitButton=n._form.querySelector(r.submitButton),n._inputList=n._form.querySelectorAll(r.formInput),n}return e=a,(n=[{key:"_getInputValues",value:function(){var t={};return this._inputList.forEach((function(e){return t[e.name]=e.value})),t}},{key:"setInputValues",value:function(t){this._inputList.forEach((function(e){e.value=t[e.name]}))}},{key:"_submit",value:function(t){var e=this;t.preventDefault(),this._submitButton.textContent="Сохранение...",this._submitButton.setAttribute("disabled",""),this._handleSubmit(this._getInputValues()).then((function(){e._submitButton.textContent="Сохранено!"})).catch((function(t){console.log("Ошибка выполнения запроса к серверу - ".concat(t)),e._submitButton.textContent="Упс( Ошибка сервера"})).finally((function(){setTimeout(e.close.bind(e),1e3)}))}},{key:"setEventListeners",value:function(){var t=this;y(k(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(e){t._submit(e)}))}},{key:"close",value:function(){var t=this;y(k(a.prototype),"close",this).call(this),setTimeout((function(){t._submitButton.textContent="Сохранить",t._submitButton.removeAttribute("disabled")}),1e3)}}])&&m(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(a);function w(t){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},w(t)}function C(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function O(){return O="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=L(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},O.apply(this,arguments)}function L(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=I(t)););return t}function S(t,e){return S=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},S(t,e)}function B(t,e){if(e&&("object"===w(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function I(t){return I=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},I(t)}var j=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&S(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=I(r);if(o){var n=I(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return B(this,t)});function a(t,e){var n,r=e.config,o=e.submitHandler;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,t,r))._form=n._popupElement.querySelector(r.form),n._handleSubmit=o,n._submitButton=n._form.querySelector(r.submitButton),n}return e=a,(n=[{key:"setData",value:function(t){this._data=t}},{key:"_submit",value:function(t){var e=this;t.preventDefault(),this._submitButton.textContent="Выполнение...",this._submitButton.setAttribute("disabled",""),this._handleSubmit(this._data).then((function(){e._submitButton.textContent="Выполнено!"})).catch((function(t){console.log("Ошибка выполнения запроса к серверу - ".concat(t)),e._submitButton.textContent="Упс( Ошибка сервера"})).finally((function(){setTimeout(e.close.bind(e),1e3)}))}},{key:"setEventListeners",value:function(){var t=this;O(I(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(e){t._submit(e)}))}},{key:"close",value:function(){var t=this;O(I(a.prototype),"close",this).call(this),setTimeout((function(){t._submitButton.textContent="Да",t._submitButton.removeAttribute("disabled")}),1e3)}}])&&C(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(a);function P(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var R=function(){function t(e,n){var r=n.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._renderer=r,this._container=document.querySelector(e)}var e,n;return e=t,(n=[{key:"renderItems",value:function(t){var e=this;t.reverse().forEach((function(t){return e._renderer(t)}))}},{key:"addItem",value:function(t){this._container.prepend(t)}}])&&P(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function D(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var T=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._nameField=document.querySelector(e.profileName),this._aboutField=document.querySelector(e.profileAbout),this._avatarElement=document.querySelector(e.profileAvatar),this._user=n}var e,n;return e=t,(n=[{key:"getUserInfo",value:function(){return this._user}},{key:"getUserId",value:function(){return this._user._id}},{key:"setUserInfo",value:function(t){var e=t.name,n=t.about;this._user.name=e,this._user.about=n,this._nameField.textContent=e,this._aboutField.textContent=n}},{key:"setAvatar",value:function(t){var e=t.avatar;this._avatarElement.src=e}}])&&D(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function A(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function q(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var U,x=new(function(){function t(e){var n=e.baseUrl,r=e.headers;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._baseUrl=n,this._headers=r}var e,n;return e=t,(n=[{key:"_handleResponse",value:function(t){return t.ok?t.json():Promise.reject("код ".concat(t.status))}},{key:"_getData",value:function(t){var e=this;return fetch("".concat(this._baseUrl).concat(t),{headers:{authorization:this._headers.authorization}}).then((function(t){return e._handleResponse(t)}))}},{key:"getUserInfo",value:function(){return this._getData("/users/me")}},{key:"getInitialCards",value:function(){return this._getData("/cards")}},{key:"_changeData",value:function(t,e){var n=this;return fetch("".concat(this._baseUrl).concat(e),{method:"PATCH",headers:this._headers,body:JSON.stringify(t)}).then((function(t){return n._handleResponse(t)}))}},{key:"changeUserInfo",value:function(t){return this._changeData(t,"/users/me")}},{key:"changeAvatar",value:function(t){return this._changeData(t,"/users/me/avatar")}},{key:"addCard",value:function(t){var e=this;return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify(t)}).then((function(t){return e._handleResponse(t)}))}},{key:"_handleLike",value:function(t,e){var n=this;return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:t,headers:{authorization:this._headers.authorization}}).then((function(t){return n._handleResponse(t)}))}},{key:"setLike",value:function(t){return this._handleLike("PUT",t)}},{key:"removeLike",value:function(t){return this._handleLike("DELETE",t)}},{key:"deleteCard",value:function(t){var e=this;return fetch("".concat(this._baseUrl,"/cards/").concat(t),{method:"DELETE",headers:{authorization:this._headers.authorization}}).then((function(t){return e._handleResponse(t)}))}}])&&A(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}())({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-47",headers:{authorization:"c057a3e7-5ee0-421c-b032-822b62f6abd9","Content-Type":"application/json"}}),z={};U={formSelector:".form",inputSelector:".form__item",submitButtonSelector:".form__button",submitButtonDisabledClass:"form__button_disabled",inputErrorClass:"form__item_type_error",errorSelector:".form__error",errorClass:"form__error_visible"},document.querySelectorAll(U.formSelector).forEach((function(t){var e=new n(t,U),r=t.getAttribute("name");z[r]=e,e.enableValidation()}));var V=new E(t.popupProfile,{config:t,submitHandler:function(t){return x.changeUserInfo(t).then((function(t){var e=t.name,n=t.about;W.setUserInfo({name:e,about:n})})).catch((function(t){return console.log("Невозможно обновить профиль: ".concat(t))}))}});V.setEventListeners(),document.querySelector(t.profileEditButton).addEventListener("click",(function(){z["edit-profile"].resetValidation(),V.setInputValues(W.getUserInfo()),V.open()}));var H=new E(t.popupAvatar,{config:t,submitHandler:function(t){return x.changeAvatar(t).then((function(t){W.setAvatar(t)})).catch((function(t){return console.log("Невозможно обновить аватар: ".concat(t))}))}});H.setEventListeners(),document.querySelector(t.avatarEditButton).addEventListener("click",(function(){z["edit-avatar"].resetValidation(),H.open()}));var N=new j(t.confirmationPopup,{config:t,submitHandler:function(t){return x.deleteCard(t.getId()).then((function(){t.removeCard()}))}});N.setEventListeners();var F=new d(t.popupImage,{config:t});F.setEventListeners(),document.querySelector(t.addCardButton).addEventListener("click",(function(){z["add-card"].resetValidation(),Q.open()}));var J=function(t,e){F.open(t,e)},M=function(t){N.open(),N.setData(t)},$=function(t){return x.setLike(t)},G=function(t){return x.removeLike(t)},K=function(e){return X.addItem(function(e){return new o(e,{config:t,clickOnImgHandler:J,clickOnRemoveButtonHandler:M,setLike:$,removeLike:G,currentUserId:W.getUserId()}).generateCard()}(e))},Q=new E(t.popupAddCard,{config:t,submitHandler:function(t){return x.addCard(t).then((function(t){K(t)}))}});Q.setEventListeners();var W,X=new R(t.cardsList,{renderer:K}),Y=document.querySelector(".loading-screen");Promise.all([x.getUserInfo(),x.getInitialCards()]).then((function(e){var n,r,o=(r=2,function(t){if(Array.isArray(t))return t}(n=e)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],a=!0,u=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);a=!0);}catch(t){u=!0,o=t}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}}(n,r)||function(t,e){if(t){if("string"==typeof t)return q(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?q(t,e):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=o[0],a=o[1];(W=new T(t,i)).setUserInfo(i),W.setAvatar(i),X.renderItems(a),Y.classList.add("loading-screen_disabled")})).catch((function(t){console.log("Ошибка запроса к серверу: ".concat(t)),Y.textContent="Не удается подключиться к серверу, попробуйте перезагрузить страницу или зайти позже"}))})();