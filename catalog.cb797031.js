var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},i=e.parcelRequired7c6;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in n){var i=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,i.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequired7c6=i);var a=i("fPgXx");const o="https://api.themoviedb.org/3",r=`${o}/trending/movie/day?api_key=${a.KEY}`,d=`${o}/search/movie?api_key=${a.KEY}&query=`;let s=1;const c=10;let l=0;async function v(e){const t=await fetch(e),n=await t.json();l=n.total_results,function(e){const t=document.querySelector(".movies");t.innerHTML="",e.forEach((e=>{const n=document.createElement("div");var i;n.classList.add("movie"),n.innerHTML=`\n      <div class="movie__cover-inner">\n        <img\n          src="https://image.tmdb.org/t/p/w500${e.poster_path}"\n          class="movie__cover"\n          alt="${e.title}"\n        />\n        <div class="movie__cover--darkened"></div>\n      </div>\n      <div class="movie__info">\n        <div class="movie__title">${e.title}</div>\n        <div class="movie__category">${e.genre_ids}</div>\n        ${e.vote_average&&`\n          <div class="movie__average movie__average--${i=e.vote_average,i>=7?"green":i>5?"orange":"red"}">${e.vote_average}</div>\n        `}\n      </div>\n    `,t.appendChild(n)}))}(n.results),function(){const e=document.querySelector(".pagination"),t=Math.ceil(l/c),n=document.createElement("ul");n.classList.add("pagination__list");const i=4,a=Math.max(1,s-Math.floor(i/2)),o=Math.min(a+i-1,t);for(let e=a;e<=o;e++){const t=document.createElement("li");t.classList.add("pagination__item"),t.innerText=e,e===s&&t.classList.add("pagination__item--active"),t.addEventListener("click",(()=>{s=e;v(`${r}&page=${s}`)})),n.appendChild(t)}e.innerHTML="",e.appendChild(n)}(),s=1}v(r);const _=document.querySelector("form"),u=document.querySelector(".header__search");_.addEventListener("submit",(e=>{e.preventDefault();const t=u.value;if(t){v(`${d}${t}&api_key=${a.KEY}`),u.value=""}}));
//# sourceMappingURL=catalog.cb797031.js.map
