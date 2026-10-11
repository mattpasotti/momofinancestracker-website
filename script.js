(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        const nav = document.querySelector(".nav");
        const toggle = document.querySelector(".menu-toggle");

        showFoundingOffer();

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

    // Founding members: shown only while the offer is open and slots remain. Any failure
    // leaves the banner hidden, so the page never claims an offer that is not there.
    function showFoundingOffer() {
        const banner = document.getElementById("founding-banner");
        if (!banner || !window.fetch) return;
        fetch("https://xplwokqueyymompkttmb.supabase.co/functions/v1/founding-members-count")
            .then(function (res) { return res.ok ? res.json() : null; })
            .then(function (offer) {
                if (!offer || !offer.open || !(offer.remaining > 0)) return;
                const template = offer.remaining === 1 ? banner.dataset.one : banner.dataset.other;
                banner.querySelector(".founding-remaining").textContent =
                    template.replace("{n}", String(offer.remaining));
                banner.hidden = false;
            })
            .catch(function () { /* stay hidden */ });
    }
})();
