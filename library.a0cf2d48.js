var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},i=e.parcelRequired76b;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in t){var i=t[e];delete t[e];var r={id:e,exports:{}};return n[e]=r,i.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,n){t[e]=n},e.parcelRequired76b=i);var r=i("fA1qS"),a=i("krGWQ"),s=i("g3JmK"),o=i("7TcCz"),c=i("hvBA4"),l=i("domc1"),d=i("04jNI");const f=new(0,s.MoviesApiServise),u=(new(0,o.ModalServise),new(0,c.LocalStorageService)),p=new(0,l.DataService),v=u.load(u.queueKey),h=u.load(u.watchedKey);function b(e){!function(e){const n=(0,r.createMarkupLibraryList)(e);a.refs.libraryList.innerHTML=n}(e.map((({data:e})=>p.getDataSelectedMovie(e))))}function y(e){console.error(e.message),console.log("Oops, something went wrong library page")}a.refs.btnQueue.addEventListener("click",(function(){a.refs.btnQueue.classList.add("is-active"),a.refs.btnWatched.classList.remove("is-active"),(0,d.spinnerPlay)(),f.fetchQueueMovies(v).then(b).catch(y).finally((()=>{(0,d.spinnerStop)()}))})),a.refs.btnWatched.addEventListener("click",(function(){a.refs.btnWatched.classList.add("is-active"),a.refs.btnQueue.classList.remove("is-active"),(0,d.spinnerPlay)(),f.fetchQueueMovies(h).then(b).catch(y).finally((()=>{(0,d.spinnerStop)()}))})),(0,d.spinnerPlay)(),f.fetchQueueMovies(v).then(b).catch(y).finally((()=>{(0,d.spinnerStop)()}));
//# sourceMappingURL=library.a0cf2d48.js.map
