!function(){function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},a={},i=n.parcelRequired7c6;null==i&&((i=function(e){if(e in r)return r[e].exports;if(e in a){var t=a[e];delete a[e];var n={id:e,exports:{}};return r[e]=n,t.call(n.exports,n,n.exports),n.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){a[e]=t},n.parcelRequired7c6=i),i.register("iE7OH",(function(t,n){var r,a;e(t.exports,"register",(function(){return r}),(function(e){return r=e})),e(t.exports,"resolve",(function(){return a}),(function(e){return a=e}));var i={};r=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)i[t[n]]=e[t[n]]},a=function(e){var t=i[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),i.register("aNJCr",(function(t,n){var r;e(t.exports,"getBundleURL",(function(){return r}),(function(e){return r=e}));var a={};function i(e){return(""+e).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}r=function(e){var t=a[e];return t||(t=function(){try{throw new Error}catch(t){var e=(""+t.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);if(e)return i(e[2])}return"/"}(),a[e]=t),t}})),i("iE7OH").register(JSON.parse('{"EVgbq":"index.9072b07c.js","8XWSl":"light-hero-desktop.d501c5f4.png","3MyBZ":"dark-hero-desktop.ae5d0545.png","7daAC":"catalog.485db8f6.js"}')),i("jW6gh"),i("kLFG7"),i("f4zPK");var o=i("hM3Qt"),s=i("cHsZg");const c=document.querySelector(".container__upcoming");function l(e){const t=e.target.dataset.movieid;(0,s.addMovieToLibrary)(t)}async function u(e){const t=await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${o.KEY}&language=en-US`),n=await t.json();return e.map((e=>n.genres.find((t=>t.id===e)).name)).join(", ")}!async function(){try{const e=(await fetch(`${o.UPCOMING_URL}?api_key=${o.KEY}&language=en-US&page=1`).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()}))).results;if(e.length>=1){const t=e[Math.floor(Math.random()*e.length)],n=await u(t.genre_ids),r=await async function({id:e,poster_path:t,backdrop_path:n,title:r,overview:a,popularity:i,vote_average:o,vote_count:s,release_date:c,genre_ids:l}){const d=await u(l);return`\n    \n <div class="upcoming__card">\n <div class="upcoming__thumb">\n      \n      <picture class='upcoming__poster'>\n      <source srcset="https://image.tmdb.org/t/p/original/${n}" media="(min-width: 1200px)" class='upcoming__poster-desktop' />\n      <source srcset="https://image.tmdb.org/t/p/original/${n}" media="(min-width: 768px)" class='upcoming__poster-tablet' />\n      <source srcset="https://image.tmdb.org/t/p/original/${t}" media="(min-width: 320px)" />\n      <img src="https://image.tmdb.org/t/p/original/${t}" alt="Movie Poster" style='width: 805px'/>\n    </picture>\n      </div>\n      </div>\n\n<div class="upcoming__info">\n            <h2 class="upcoming__info--title">${r}</h2>\n            <div class="upcoming__movie">\n                <div class="upcoming__info--left">\n                    <div class="upcoming__info--release">\n                        <p class="upcoming__text"> <span class ="upcoming__light--black">Release date</span> <span class="upcoming__info--release--date">${c}</span></p>\n                    </div>\n                    <div class="upcoming__info--vote">\n                        <p class="upcoming__text"><span class ="upcoming__light--black">Vote/Votes</span>\n                        <div class="upcoming__info--votes"><span class="upcoming__info--white">${o}</span> <span\n                                class="slash">/</span>\n                            <span class="upcoming__info--white">\n                               ${s}</span>\n                        </div>\n                        </p>\n                    </div>\n                </div>\n                <div class="upcoming__info--right">\n                    <div class="upcoming__info--pop">\n                        <p class="upcoming__text"> <span class ="upcoming__light--black">Popularity</span> <span class="upcoming__info--pop--range">${i}</span> </p>\n                    </div>\n                    <div class="upcoming__info--genre">\n                        <p class="upcoming__text"><span class ="upcoming__light--black">Genre</span> <span class="upcoming__info--genre--kind">${d}</span> </p>\n                    </div>\n                </div>\n            </div>\n            <h2 class="upcoming__info--about">ABOUT</h2>\n\n            <p class="upcoming__info--description">${a}</p>\n            <button class="upcoming__remindme--btn" data-movieid=${e}  type="button">Add to Library</button>\n        </div>\n\n   \n     `}({...t,genreNames:n});c.insertAdjacentHTML("beforeend",r),document.querySelector(".upcoming__remindme--btn").addEventListener("click",l)}}catch(e){console.log(e)}}();var d=i("b7ONl"),p={};p=function e(t,n,r){function a(o,s){if(!n[o]){if(!t[o]){var c=void 0;if(!s&&c)return c(o,!0);if(i)return i(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[o]={exports:{}};t[o][0].call(u.exports,(function(e){return a(t[o][1][e]||e)}),u,u.exports,e,t,n,r)}return n[o].exports}for(var i=void 0,o=0;o<r.length;o++)a(r[o]);return a}({1:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.create=n.visible=void 0;var r=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=document.createElement("div");return n.innerHTML=e.trim(),!0===t?n.children:n.firstChild},a=function(e,t){var n=e.children;return 1===n.length&&n[0].tagName===t},i=function(e){return null!=(e=e||document.querySelector(".basicLightbox"))&&!0===e.ownerDocument.body.contains(e)};n.visible=i,n.create=function(e,t){var n=function(e,t){var n=r('\n\t\t<div class="basicLightbox '.concat(t.className,'">\n\t\t\t<div class="basicLightbox__placeholder" role="dialog"></div>\n\t\t</div>\n\t')),i=n.querySelector(".basicLightbox__placeholder");e.forEach((function(e){return i.appendChild(e)}));var o=a(i,"IMG"),s=a(i,"VIDEO"),c=a(i,"IFRAME");return!0===o&&n.classList.add("basicLightbox--img"),!0===s&&n.classList.add("basicLightbox--video"),!0===c&&n.classList.add("basicLightbox--iframe"),n}(e=function(e){var t="string"==typeof e,n=e instanceof HTMLElement==1;if(!1===t&&!1===n)throw new Error("Content must be a DOM element/node or string");return!0===t?Array.from(r(e,!0)):"TEMPLATE"===e.tagName?[e.content.cloneNode(!0)]:Array.from(e.children)}(e),t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(null==(e=Object.assign({},e)).closable&&(e.closable=!0),null==e.className&&(e.className=""),null==e.onShow&&(e.onShow=function(){}),null==e.onClose&&(e.onClose=function(){}),"boolean"!=typeof e.closable)throw new Error("Property `closable` must be a boolean");if("string"!=typeof e.className)throw new Error("Property `className` must be a string");if("function"!=typeof e.onShow)throw new Error("Property `onShow` must be a function");if("function"!=typeof e.onClose)throw new Error("Property `onClose` must be a function");return e}(t)),o=function(e){return!1!==t.onClose(s)&&function(e,t){return e.classList.remove("basicLightbox--visible"),setTimeout((function(){return!1===i(e)||e.parentElement.removeChild(e),t()}),410),!0}(n,(function(){if("function"==typeof e)return e(s)}))};!0===t.closable&&n.addEventListener("click",(function(e){e.target===n&&o()}));var s={element:function(){return n},visible:function(){return i(n)},show:function(e){return!1!==t.onShow(s)&&function(e,t){return document.body.appendChild(e),setTimeout((function(){requestAnimationFrame((function(){return e.classList.add("basicLightbox--visible"),t()}))}),10),!0}(n,(function(){if("function"==typeof e)return e(s)}))},close:o};return s}},{}]},{},[1])(1);var f=i("7F964"),g={};g=i("aNJCr").getBundleURL("EVgbq")+i("iE7OH").resolve("3MyBZ");var m;m=i("aNJCr").getBundleURL("EVgbq")+i("iE7OH").resolve("8XWSl");const h=document.querySelector(".hero");document.querySelector(".switcher").addEventListener("click",(function(){const e=document.querySelector(".black"),n=e.getAttribute("src")===t(g)?t(m):t(g);e.setAttribute("src",n),localStorage.setItem("imageColor",n)})),async function(){try{const{results:e}=await(0,d.getDayTrending)(1),n=e[Math.floor(Math.random()*e.length)];!function(e){let n="";switch(Math.round(e.vote_average)){case 0:n=`${f.emptyStar.repeat(5)}`;break;case 1:n=`${f.halfStar}${f.emptyStar.repeat(4)}`;break;case 2:n=`${f.fullStar}${f.emptyStar.repeat(4)}`;break;case 3:n=`${f.fullStar}${f.halfStar}${f.emptyStar.repeat(3)}`;break;case 4:n=`${f.fullStar.repeat(2)}${f.emptyStar.repeat(3)}`;break;case 5:n=`${f.fullStar.repeat(2)}${f.halfStar}${f.emptyStar.repeat(2)}`;break;case 6:n=`${f.fullStar.repeat(3)}${f.emptyStar.repeat(2)}`;break;case 7:n=`${f.fullStar.repeat(3)}${f.halfStar}${f.emptyStar}`;break;case 8:n=`${f.fullStar.repeat(4)}${f.emptyStar}`;break;case 9:n=`${f.fullStar.repeat(4)}${f.halfStar}`;break;case 10:n=`${f.fullStar.repeat(5)}`;break;default:throw new Error("Invalid rating")}const r=`\n    <div class="hero-wrap">\n      <div class="thumb">\n        <div class="background-image">\n          <img src="https://image.tmdb.org/t/p/original${e.backdrop_path}" alt="Hero image" class="backend" />\n          <img src="${t(g)}" class="black" />\n        </div>\n        <div class="hero-wrap__content">\n          <h1 class="title">${e.title||e.name}</h1>\n          <div class='start-rate__hero'>\n            ${n}\n          </div> \n          <p class="description">${e.overview}</p>\n          <button class="watch-trailer__btn" id="trailer-btn" data-btn="trailer-fail">Watch trailer</button>\n        </div>\n      </div>\n    </div>\n  `;h.innerHTML=r}(n);document.getElementById("trailer-btn").addEventListener("click",(async()=>{try{const e=(await(0,d.getVideos)(n.id)).find((e=>"Official Trailer"===e.name));if(!e)throw new Error("Trailer not found");const t=e.key;p.create(`\n          <iframe class="iframe" src="https://www.youtube.com/embed/${t}" width="560" height="315" frameborder="0"></iframe>\n        `).show((()=>console.log("lightbox now visible")))}catch(e){p.create('\n          <div class="notification-trailer-fail">\n            <p class="notification-trailer-fail-text">OOPS...<br/> We are very sorry!<br /> But we couldn’t find the trailer.</p>\n            <button type="button" class="btn-close"><svg class="btn-close--svg" width=24 height=24>\n            <use href=\'../../img/sprite.svg#icon-x-button\'></use>\n        </svg>\n      </button>\n            <div class="bg-box"></div>\n          </div>\n        ').show((()=>console.log("lightbox now visible")))}}))}catch(e){console.log(e)}}(),i("cs7FV"),i("8vL8o");var v=i("dIxxU");o=i("hM3Qt"),f=i("7F964");const b=document.querySelector(".gallery-weekly__list");async function _(){return{genres:await async function(){const{data:e}=await v.default.get(`${o.BASE_URL}/genre/movie/list?api_key=${o.KEY}`);return e}().then((({genres:e})=>e))}}function y(e){_().then((({genres:t})=>{if(e){e.forEach((e=>{const{genre_ids:n,release_date:r}=e;t.forEach((({name:t,id:a})=>{n.includes(a)&&(n.length>2&&n.splice(2,n.length-1),n.splice(n.indexOf(a),1,t)),e.genre_names=n.join(", "),e.release_date&&(e.release_date=r.slice(0,4))}))}));const n=function(e){return e.slice(0,3).map((({original_title:e,release_date:t,genre_ids:n,poster_path:r,vote_average:a,id:i})=>{let s="";r&&(s=`${o.IMG_BASE_URL}${o.IMG_W400}${r}`);let c="";switch(Math.round(a)){case 0:c=`${f.emptyStar.repeat(5)}`;break;case 1:c=`${f.halfStar}${f.emptyStar.repeat(4)}`;break;case 2:c=`${f.fullStar}${f.emptyStar.repeat(4)}`;break;case 3:c=`${f.fullStar}${f.halfStar}${f.emptyStar.repeat(3)}`;break;case 4:c=`${f.fullStar.repeat(2)}${f.emptyStar.repeat(3)}`;break;case 5:c=`${f.fullStar.repeat(2)}${f.halfStar}${f.emptyStar.repeat(2)}`;break;case 6:c=`${f.fullStar.repeat(3)}${f.emptyStar.repeat(2)}`;break;case 7:c=`${f.fullStar.repeat(3)}${f.halfStar}${f.emptyStar}`;break;case 8:c=`${f.fullStar.repeat(4)}${f.emptyStar}`;break;case 9:c=`${f.fullStar.repeat(4)}${f.halfStar}`;break;case 10:c=`${f.fullStar.repeat(5)}`;break;default:throw new Error("Invalid rating")}return` <li class='gallery-weekly__list-elem hover-cursor' data-id='${i}'>           \n        <img class='gallery-weekly__image' src="${s}" alt="${e}" loading="lazy" data-id='${i}'>\n       <div class='gallery-weekly__all-info'> \n        <div class="gallery-weekly__info">\n            <h3 class= 'gallery-weekly__title'>${e}</h3>\n            <div class='cards-list_second_line'>\n              <div class='cards-list__text'>\n                <p>${n} | ${t}</p>\n              </div>\n            </div>\n        </div>\n        <div class='star-rate'>\n                ${c}\n        </div>\n      </div>\n    </li>`})).join("")}(e);b&&(b.innerHTML=n)}}))}v.default.get("https://api.themoviedb.org/3/trending/movie/week?api_key=249f222afb1002186f4d88b2b5418b55").then((e=>e.data)).then((({results:e})=>y(e)))}();
//# sourceMappingURL=index.9072b07c.js.map