(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        const nav = document.querySelector(".nav");
        const toggle = document.querySelector(".menu-toggle");

        if (toggle && nav) {
            toggle.addEventListener("click", function () {
                const open = nav.classList.toggle("open");
                toggle.setAttribute("aria-expanded", open ? "true" : "false");
            });

            nav.querySelectorAll("a").forEach(function (link) {
                link.addEventListener("click", function () {
                    nav.classList.remove("open");
                    toggle.setAttribute("aria-expanded", "false");
                });
            });
        }
    });
})();
