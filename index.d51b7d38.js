var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired76b;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequired76b=o);var r=o("fA1qS"),i=o("krGWQ"),a=o("g3JmK"),c=/^\s+|\s+$/g,s=/^[-+]0x[0-9a-f]+$/i,f=/^0b[01]+$/i,l=/^0o[0-7]+$/i,u=parseInt,d="object"==typeof e&&e&&e.Object===Object&&e,v="object"==typeof self&&self&&self.Object===Object&&self,p=d||v||Function("return this")(),g=Object.prototype.toString,b=Math.max,y=Math.min,m=function(){return p.Date.now()};function M(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function h(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==g.call(e)}(e))return NaN;if(M(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=M(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(c,"");var n=f.test(e);return n||l.test(e)?u(e.slice(2),n?2:8):s.test(e)?NaN:+e}var w=o("7TcCz"),j=o("hvBA4"),O=o("domc1");const S=new(0,a.MoviesApiServise),L=new(0,w.ModalServise),T=new(0,j.LocalStorageService),x=new(0,O.DataService);function D(e){!function(e){const t=(0,r.createMarkupSelectedMovie)(e);i.refs.modalContainer.innerHTML=t}(x.getDataSelectedMovie(e)),L.openModal()}function N(e){console.error(e.message),console.log("Oops, something went wrong main page")}i.refs.moviesList.addEventListener("click",(function(e){if(!e.target.closest(".js-target"))return;const t=e.target.closest(".js-target").dataset.id;S.fetchSelectedMovie(t).then(D).catch(N).finally((()=>{}))})),i.refs.modalContainer.addEventListener("click",(function(e){const t="add-to-queue"===e.target.name,n="add-to-watched"===e.target.name;if(t){const e=S.selectedMovieId;T.save(T.queueKey,e)}if(n){const e=S.selectedMovieId;T.save(T.watchedKey,e)}})),S.fetchTrendMovies().then((function(e){const{results:t}=e[0],{genres:n}=e[1];!function(e){const t=(0,r.createMarkupFilmsList)(e);i.refs.moviesList.innerHTML=t}(x.getDataTrendMovies(t,n))})).catch(N).finally((()=>{}));
//# sourceMappingURL=index.d51b7d38.js.map
