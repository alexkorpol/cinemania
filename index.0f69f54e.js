function e(e,t,n,a){Object.defineProperty(e,t,{get:n,set:a,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},r={},i=n.parcelRequired7c6;null==i&&((i=function(e){if(e in a)return a[e].exports;if(e in r){var t=r[e];delete r[e];var n={id:e,exports:{}};return a[e]=n,t.call(n.exports,n,n.exports),n.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},n.parcelRequired7c6=i),i.register("kyEFX",(function(t,n){var a,r;e(t.exports,"register",(function(){return a}),(function(e){return a=e})),e(t.exports,"resolve",(function(){return r}),(function(e){return r=e}));var i={};a=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)i[t[n]]=e[t[n]]},r=function(e){var t=i[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),i("kyEFX").register(JSON.parse('{"5ZPII":"index.0f69f54e.js","fH0St":"dark-hero-desktop.ae5d0545.png","27pcF":"light-hero-desktop.d501c5f4.png","fpALp":"catalog.cdab6731.js"}')),i("6MSFZ"),i("bWWMl"),i("iULxv");var o=i("2shzp"),s=i("fPgXx");async function l(){const e=Math.floor(1*Math.random())+1,t=`${s.BASE_URL}/movie/upcoming?api_key=${s.KEY}&page=${e}`,n=await o.default.get(t);return n.data.results[Math.floor(Math.random()*n.data.results.length)]}async function c(){const e=await l(),t=await async function(){const e=`${s.BASE_URL}/genre/movie/list?api_key=${s.KEY}`;return(await o.default.get(e)).data.genres}(),n=e.genre_ids.map((e=>{const n=t.find((t=>t.id===e));return n?n.name:""})).join(", "),a=`\n    <div class="container movie-card ">\n    <h2 class="movie-card-title">upcoming this month</h2>\n<div class="mo">\n      <div class="movie-card__image">\n      <img src="https://image.tmdb.org/t/p/original/${e.backdrop_path}" class="card__picture" alt="${e.title}">\n      </div>\n      <div class="movie-card__content">\n      <h2 class="movie-title">${e.title}</h2>\n      <div class="movie-card__mo">\n      <div>\n      <p class="movie-date">Release date: <span> ${e.release_date} </span></p>\n      <p class="movie-vote">Vote/Votes: <span class="movie-vote__span">${e.vote_average}</span>/<span>${e.vote_count} </span></p>\n      </div>\n      <div>\n      <p class="movie-popularity">Popularity:<span> ${e.popularity} </span></p>\n      <p class="movie-genre">Genre:<span> ${n} </span></p>\n      </div>\n      </div>\n      <p class="movie-about"> ABOUT </p>\n      <span class="movie-about__descr"> ${e.overview}</span>\n      <button type="button" class="button-remind">Remind me</button>\n      </div>\n    </div>\n    </div>\n  `;document.querySelector(".movie-container").innerHTML=a}!async function(){const e=l();c((await e).data)}();o=i("2shzp"),s=i("fPgXx");async function d(e=1){const t=`${s.BASE_URL}/trending/all/day?api_key=${s.KEY}&language=en-US&page=${e}`;return await o.default.get(t).then((e=>e.data)).catch((e=>console.log(e)))}async function p(e){const t=`${s.BASE_URL}/movie/${e}/videos?api_key=${s.KEY}&language=en-US`;return await o.default.get(t).then((e=>e.data.results)).catch((e=>{}))}var u={};u=function e(t,n,a){function r(o,s){if(!n[o]){if(!t[o]){var l=void 0;if(!s&&l)return l(o,!0);if(i)return i(o,!0);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var d=n[o]={exports:{}};t[o][0].call(d.exports,(function(e){return r(t[o][1][e]||e)}),d,d.exports,e,t,n,a)}return n[o].exports}for(var i=void 0,o=0;o<a.length;o++)r(a[o]);return r}({1:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.create=n.visible=void 0;var a=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=document.createElement("div");return n.innerHTML=e.trim(),!0===t?n.children:n.firstChild},r=function(e,t){var n=e.children;return 1===n.length&&n[0].tagName===t},i=function(e){return null!=(e=e||document.querySelector(".basicLightbox"))&&!0===e.ownerDocument.body.contains(e)};n.visible=i,n.create=function(e,t){var n=function(e,t){var n=a('\n\t\t<div class="basicLightbox '.concat(t.className,'">\n\t\t\t<div class="basicLightbox__placeholder" role="dialog"></div>\n\t\t</div>\n\t')),i=n.querySelector(".basicLightbox__placeholder");e.forEach((function(e){return i.appendChild(e)}));var o=r(i,"IMG"),s=r(i,"VIDEO"),l=r(i,"IFRAME");return!0===o&&n.classList.add("basicLightbox--img"),!0===s&&n.classList.add("basicLightbox--video"),!0===l&&n.classList.add("basicLightbox--iframe"),n}(e=function(e){var t="string"==typeof e,n=e instanceof HTMLElement==1;if(!1===t&&!1===n)throw new Error("Content must be a DOM element/node or string");return!0===t?Array.from(a(e,!0)):"TEMPLATE"===e.tagName?[e.content.cloneNode(!0)]:Array.from(e.children)}(e),t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(null==(e=Object.assign({},e)).closable&&(e.closable=!0),null==e.className&&(e.className=""),null==e.onShow&&(e.onShow=function(){}),null==e.onClose&&(e.onClose=function(){}),"boolean"!=typeof e.closable)throw new Error("Property `closable` must be a boolean");if("string"!=typeof e.className)throw new Error("Property `className` must be a string");if("function"!=typeof e.onShow)throw new Error("Property `onShow` must be a function");if("function"!=typeof e.onClose)throw new Error("Property `onClose` must be a function");return e}(t)),o=function(e){return!1!==t.onClose(s)&&function(e,t){return e.classList.remove("basicLightbox--visible"),setTimeout((function(){return!1===i(e)||e.parentElement.removeChild(e),t()}),410),!0}(n,(function(){if("function"==typeof e)return e(s)}))};!0===t.closable&&n.addEventListener("click",(function(e){e.target===n&&o()}));var s={element:function(){return n},visible:function(){return i(n)},show:function(e){return!1!==t.onShow(s)&&function(e,t){return document.body.appendChild(e),setTimeout((function(){requestAnimationFrame((function(){return e.classList.add("basicLightbox--visible"),t()}))}),10),!0}(n,(function(){if("function"==typeof e)return e(s)}))},close:o};return s}},{}]},{},[1])(1);var f={};f=new URL(i("kyEFX").resolve("fH0St"),import.meta.url).toString();var v;v=new URL(i("kyEFX").resolve("27pcF"),import.meta.url).toString();const g='<svg class="star" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_405_766)" stroke-linejoin="round"/>\n<defs>\n<linearGradient id="paint0_linear_405_766" x1="3.375" y1="2.625" x2="13.5" y2="16.5" gradientUnits="userSpaceOnUse">\n<stop stop-color="#F84119"/>\n<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>\n</linearGradient>\n</defs>\n</svg>',h='<svg class="star" width="18" height="18" viewBox="0 0 18 18" fill="rgba(248, 65, 25, 1)" xmlns="http://www.w3.org/2000/svg">\n<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_405_766)" stroke-linejoin="round"/>\n<defs>\n<linearGradient id="paint0_linear_405_766" x1="3.375" y1="2.625" x2="13.5" y2="16.5" gradientUnits="userSpaceOnUse">\n<stop stop-color="#F84119"/>\n<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>\n</linearGradient>\n</defs>\n</svg>',_='<svg class="star" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_148_6991)" stroke-linejoin="round"/>\n<path d="M9 1.6875V12.7969L4.14844 16.3125L6.04688 10.6875L1.125 7.3125H7.17188L9 1.6875Z" fill="url(#paint1_linear_148_6991)"/>\n<defs>\n<linearGradient id="paint0_linear_148_6991" x1="3.04877" y1="2.73251" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">\n<stop stop-color="#F84119"/>\n<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>\n</linearGradient>\n<linearGradient id="paint1_linear_148_6991" x1="2.08688" y1="2.73251" x2="12.1506" y2="9.47748" gradientUnits="userSpaceOnUse">\n<stop stop-color="#F84119"/>\n<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>\n</linearGradient>\n</defs>\n</svg>',m=document.querySelector(".hero");document.querySelector(".switcher").addEventListener("click",(function(){const e=document.querySelector(".black"),n=e.getAttribute("src")===t(f)?t(v):t(f);e.setAttribute("src",n),localStorage.setItem("imageColor",n)})),async function(){try{const{results:e}=await d(1),n=e[Math.floor(Math.random()*e.length)];!function(e){let n="";switch(Math.round(e.vote_average)){case 0:n=`${g.repeat(5)}`;break;case 1:n=`${_}${g.repeat(4)}`;break;case 2:n=`${h}${g.repeat(4)}`;break;case 3:n=`${h}${_}${g.repeat(3)}`;break;case 4:n=`${h.repeat(2)}${g.repeat(3)}`;break;case 5:n=`${h.repeat(2)}${_}${g.repeat(2)}`;break;case 6:n=`${h.repeat(3)}${g.repeat(2)}`;break;case 7:n=`${h.repeat(3)}${_}${g}`;break;case 8:n=`${h.repeat(4)}${g}`;break;case 9:n=`${h.repeat(4)}${_}`;break;case 10:n=`${h.repeat(5)}`;break;default:throw new Error("Invalid rating")}const a=`\n    <div class="hero-wrap">\n      <div class="thumb">\n        <div class="background-image">\n          <img src="https://image.tmdb.org/t/p/original${e.backdrop_path}" alt="Hero image" class="backend" />\n          <img src="${t(f)}" class="black" />\n        </div>\n        <div class="hero-wrap__content">\n          <h1 class="title">${e.title||e.name}</h1>\n          <div class='start-rate__hero'>\n            ${n}\n          </div> \n          <p class="description">${e.overview}</p>\n          <button class="watch-trailer__btn" id="trailer-btn" data-btn="trailer-fail">Watch trailer</button>\n        </div>\n      </div>\n    </div>\n  `;m.innerHTML=a}(n);document.getElementById("trailer-btn").addEventListener("click",(async()=>{try{const e=(await p(n.id)).find((e=>"Official Trailer"===e.name));if(!e)throw new Error("Trailer not found");const t=e.key;u.create(`\n          <iframe class="iframe" src="https://www.youtube.com/embed/${t}" width="560" height="315" frameborder="0"></iframe>\n        `).show((()=>console.log("lightbox now visible")))}catch(e){u.create('\n          <div class="notification-trailer-fail">\n            <p class="notification-trailer-fail-text">OOPS...<br/> We are very sorry!<br /> But we couldn’t find the trailer.</p>\n            <button type="button" class="btn-close"><svg class="btn-close--svg" width=24 height=24>\n            <use href=\'../../img/sprite.svg#icon-x-button\'></use>\n        </svg>\n      </button>\n            <div class="bg-box"></div>\n          </div>\n        ').show((()=>console.log("lightbox now visible")))}}))}catch(e){console.log(e)}}(),i("8FnLx"),i("dpZmf");o=i("2shzp"),s=i("fPgXx");var b=i("6MSFZ");const w='<svg class="star" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_405_766)" stroke-linejoin="round"/>\n<defs>\n<linearGradient id="paint0_linear_405_766" x1="3.375" y1="2.625" x2="13.5" y2="16.5" gradientUnits="userSpaceOnUse">\n<stop stop-color="#F84119"/>\n<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>\n</linearGradient>\n</defs>\n</svg>',y='<svg class="star" width="18" height="18" viewBox="0 0 18 18" fill="rgba(248, 65, 25, 1)" xmlns="http://www.w3.org/2000/svg">\n<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_405_766)" stroke-linejoin="round"/>\n<defs>\n<linearGradient id="paint0_linear_405_766" x1="3.375" y1="2.625" x2="13.5" y2="16.5" gradientUnits="userSpaceOnUse">\n<stop stop-color="#F84119"/>\n<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>\n</linearGradient>\n</defs>\n</svg>',L='<svg class="star" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_148_6991)" stroke-linejoin="round"/>\n<path d="M9 1.6875V12.7969L4.14844 16.3125L6.04688 10.6875L1.125 7.3125H7.17188L9 1.6875Z" fill="url(#paint1_linear_148_6991)"/>\n<defs>\n<linearGradient id="paint0_linear_148_6991" x1="3.04877" y1="2.73251" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">\n<stop stop-color="#F84119"/>\n<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>\n</linearGradient>\n<linearGradient id="paint1_linear_148_6991" x1="2.08688" y1="2.73251" x2="12.1506" y2="9.47748" gradientUnits="userSpaceOnUse">\n<stop stop-color="#F84119"/>\n<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>\n</linearGradient>\n</defs>\n</svg>',$=document.querySelector(".home-weekly__cards"),k=document.querySelector(".modal-weekly"),x=(document.querySelector(".modal-weekly__overlay"),document.querySelector(".modal-weekly__poster")),E=document.querySelector(".close"),S="https://api.themoviedb.org/3/";async function F(e){const t=async function(){return(await o.default.get(`${S}genre/movie/list?api_key=${s.KEY}&language=en-US`)).data.genres}(),n=await t;let a=e.map((({original_title:e,genre_ids:t,release_date:a,poster_path:r,vote_average:i,title:o,id:s})=>{const l=n.filter((e=>{if(-1!==t.indexOf(e.id))return e})).map((e=>e.name)).slice(0,2);t=l;const c=a.slice(0,4);let d="";switch(Math.round(i)){case 0:d=`${w.repeat(5)}`;break;case 1:d=`${L}${w.repeat(4)}`;break;case 2:d=`${y}${w.repeat(4)}`;break;case 3:d=`${y}${L}${w.repeat(3)}`;break;case 4:d=`${y.repeat(2)}${w.repeat(3)}`;break;case 5:d=`${y.repeat(2)}${L}${w.repeat(2)}`;break;case 6:d=`${y.repeat(3)}${w.repeat(2)}`;break;case 7:d=`${y.repeat(3)}${L}${w}`;break;case 8:d=`${y.repeat(4)}${w}`;break;case 9:d=`${y.repeat(4)}${L}`;break;case 10:d=`${y.repeat(5)}`;break;default:throw new Error("Invalid rating")}return`<div class="card-weekly" data-id=${s}>\n          <div class="card-weekly__thumb">\n          <img src="https://image.tmdb.org/t/p/original/${r}" data-id=${s} class="card-weekly__image" alt=${e}>\n          </div>\n          <div class="card-weekly__info">\n            <strong class="card-weekly__title">${o}</strong>\n            <div class="card-weekly__description"><span class="card-weekly__genre">${t} </span><span class="card-weekly__sign"> | </span><span class="card-weekly__release"> ${c}</span>\n            <div class="rating-star">${d}</div>\n            </div>\n            \n          </div>\n          </div>      \n        </div>`})).join("");$.insertAdjacentHTML("beforeend",a)}!async function(){const e=async function(){const e=Math.floor(999*Math.random()+1);let t=(await o.default.get(`${S}/trending/movie/week?api_key=${s.KEY}&page=${e}`)).data.results;const n=Math.floor(16*Math.random()+1),a=n+3;return t.slice(n,a)}();F(await e)}(),$.addEventListener("click",(async e=>{k.classList.remove("is-hidden");const t=e.target.dataset.id,n=await async function(e){return(await o.default.get(`${S}movie/${e}?api_key=${s.KEY}&language=en-US`)).data}(t);(0,b.renderModal)(n),E.addEventListener("click",(()=>{k.classList.add("is-hidden"),x.innerHTML=""}))}));
//# sourceMappingURL=index.0f69f54e.js.map