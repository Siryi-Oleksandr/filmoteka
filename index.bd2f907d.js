function e(){try{"dark"===localStorage.getItem("theme")?(document.querySelector("html").classList.add("dark"),document.querySelector(".themetoggle span").textContent="dark_mode"):(document.querySelector("html").classList.remove("dark"),document.querySelector(".themetoggle span").textContent="wb_sunny")}catch(e){}}document.querySelector(".themetoggle").addEventListener("click",(t=>{t.preventDefault(),"dark"===localStorage.getItem("theme")?localStorage.removeItem("theme"):localStorage.setItem("theme","dark"),e()})),e();
//# sourceMappingURL=index.bd2f907d.js.map
