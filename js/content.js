(function () {
  function setText(sel, value) {
    document.querySelectorAll(sel).forEach(function (el) {
      if (value !== undefined && value !== null && String(value).trim() !== "") {
        el.textContent = value;
      }
    });
  }

  function setHref(sel, value) {
    document.querySelectorAll(sel).forEach(function (el) {
      if (value) el.setAttribute("href", value);
    });
  }

  function setSrc(sel, value) {
    document.querySelectorAll(sel).forEach(function (el) {
      if (value) el.setAttribute("src", value);
    });
  }

  fetch("/data/site.json", { cache: "no-store" })
    .then(function (r) { return r.json(); })
    .then(function (d) {
      setText("[data-booking-score]", d.booking_score);
      setText("[data-airbnb-score]", d.airbnb_score);
      setHref("[data-booking-link]", d.booking_url);
      setHref("[data-airbnb-link]", d.airbnb_url);
      if (d.whatsapp) setHref("[data-whatsapp]", "https://wa.me/" + d.whatsapp);
      setText("[data-email]", d.email);

      if (d.hero_image) {
        document.querySelectorAll(".hero").forEach(function (el) {
          el.style.backgroundImage =
            "linear-gradient(105deg, rgba(20,20,20,0.72) 0%, rgba(20,20,20,0.35) 55%, rgba(20,20,20,0.2) 100%), url('" + d.hero_image + "')";
        });
      }

      if (d.apt_2bed && d.apt_2bed.image) setSrc("[data-apt-2bed-img]", d.apt_2bed.image);
      if (d.apt_deluxe && d.apt_deluxe.image) setSrc("[data-apt-deluxe-img]", d.apt_deluxe.image);
      if (d.apt_2bed && d.apt_2bed.price) setText("[data-apt-2bed-price]", d.apt_2bed.price);
      if (d.apt_deluxe && d.apt_deluxe.price) setText("[data-apt-deluxe-price]", d.apt_deluxe.price);
    })
    .catch(function () {});
})();
