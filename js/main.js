(function ($) {
  "use strict";

  let device_width = window.innerWidth;
  var isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(
      navigator.userAgent
    )
      ? true
      : false;
  gsap.registerPlugin(ScrollTrigger);

  var itget = {
    init() {
      // this.smoothScroll();
      this.stickyHeader();
      this.mobileMenu();
      this.counters();
      this.magnificPopup();
      this.sliders();
      this.searchPopup();
      this.customMouse();
      this.preloader();
      this.scrollButton();
      this.marquee();
      this.progressbar();
      this.imgToSvg();
      this.serviceItem();
    },
    serviceItem() {
      $(".service-5-items li").each(function () {
        const service = $(this);
        service.on("click", function () {
          $(".service-5-items li").removeClass("active");
          service.addClass("active");
          const serviceContent = service.attr("data-service");
          $(".service-5-content").removeClass("active");
          $(`#${serviceContent}`).addClass("active");
        });
      });
    },
    smoothScroll() {
      // Smooth scroll function with offset
      function smoothScroll(target, duration, offset = 200) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return; // Exit if target doesn't exist

        const targetPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition - offset; // Adjust for offset
        let startTime = null;

        function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = ease(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Easing function (easeInOutQuad)
        function ease(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return (c / 2) * t * t + b;
          t--;
          return (-c / 2) * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
      }

      // Add smooth scroll to all anchor links
      document
        .querySelectorAll('a[href^="#"]:not([role="tab"])')
        .forEach((anchor) => {
          anchor.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent default jump behavior
            const target = this.getAttribute("href");
            smoothScroll(target, 1000, 200); // 1000ms duration, 200px offset
          });
        });
    },
    stickyHeader() {
      var header = $(".fixed-header");
      if (header.length) {
        $(window).on("scroll", function () {
          var scroll = $(window).scrollTop();
          if (scroll < 100) {
            header.removeClass("sticky");
          } else {
            header.addClass("sticky");
          }
        });
      }
    },
    mobileMenu() {
      if ($("#navbarNav").length && $("#mobile-nav").length) {
        let mobileNavContainer = $("#mobile-nav");
        mobileNavContainer.html($("#navbarNav").clone());
        let arrow = $("#mobile-nav .dropdown-nav > a");

        arrow.each(function () {
          let self = $(this);
          let arrowBtn = document.createElement("BUTTON");
          arrowBtn.classList.add("dropdown-toggle-btn");
          arrowBtn.innerHTML = "<i class='fa-light fa-angle-down'></i>";

          self.append(function () {
            return arrowBtn;
          });

          self.on("click", function (e) {
            e.preventDefault();
            let self = $(this);
            self.toggleClass("dropdown-opened");
            self.parent().toggleClass("expanded");
            self
              .parent()
              .parent()
              .addClass("dropdown-opened")
              .siblings()
              .removeClass("dropdown-opened");
            self.parent().children(".submenu").slideToggle();
          });
        });
      }

      var menu = $(".toggle-sidebar");
      menu.on("click", function (e) {
        e.preventDefault();
        $(".mobile-menu").toggleClass("visible");
      });
      $(".menu-backdrop").on("click", function () {
        $(".mobile-menu").toggleClass("visible");
      });
    },
    counters() {
      if ($(".count").length) {
        $(".count").countUp();
      }
    },
    magnificPopup() {
      $(".portfolio2-items").each(function () {
        $(this).magnificPopup({
          delegate: "a",
          type: "image",
          gallery: {
            enabled: true,
          },
        });
      });

      $(".video-play a").each(function () {
        $(this).magnificPopup({
          type: "iframe",
          mainClass: "mfp-fade",
          preloader: false,
          fixedContentPos: true,
        });
      });
    },
    sliders() {
      if ($(".brand-slider").length) {
        new Swiper(".brand-slider", {
          slidesPerView: 2,
          spaceBetween: 0,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          loop: true,
          breakpoints: {
            450: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
            992: {
              slidesPerView: 5,
              spaceBetween: 0,
            },
            1150: {
              slidesPerView: 7,
              spaceBetween: 0,
            },
          },
        });
      }

      if ($(".testimonial-5-slider").length) {
        new Swiper(".testimonial-5-slider", {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          centeredSlides: true,
          grabCursor: true,
          mousewheel: {
            invert: false,
          },
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          breakpoints: {
            992: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1800: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          },
        });
      }
      if ($(".testimonial-slider").length) {
        new Swiper(".testimonial-slider", {
          loop: true,
          slidesPerView: 1,
          spaceBetween: 0,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          pagination: {
            el: ".testimonial-images",
            clickable: true,
            renderBullet: function (index, className) {
              return (
                '<img class="' +
                className +
                '" src="img/testimonial-' +
                (index + 1) +
                '.png" alt="" />'
              );
            },
          },
          scrollbar: {
            el: ".testimonial-pagination",
          },
          navigation: {
            nextEl: ".testimonial-next",
            prevEl: ".testimonial-prev",
          },
        });
      }
    },
    searchPopup() {
      $(".search-btn").on(
        "click",
        (e) => (e.preventDefault(), $(".search-popup").addClass("visible"))
      );
      $(".search-popup-overlay, .close-search").on(
        "click",
        (e) => (e.preventDefault(), $(".search-popup").removeClass("visible"))
      );
    },
    customMouse() {
      var mouse = { x: 0, y: 0 }; // Cursor position
      var pos = { x: 0, y: 0 }; // Cursor position
      var ratio = 0.15; // delay follow cursor
      var active = false;
      var ball = $("#ball");

      /** default */
      const defaultValue = {
        duration: 0.3,
        opacity: 0.5,
        width: "30px",
        height: "30px",
        backgroundColor: "transparent",
        border: "2px solid #555",
      };
      const hoverBall = {
        duration: 0.3,
        css: {
          borderWidth: 0,
          opacity: "1!important",
          width: "100px!important",
          height: "100px!important",
          backgroundColor: "#2c7365",
        },
      };
      gsap.set(ball, {
        // scale from middle and style ball
        xPercent: -50,
        yPercent: -50,
      });
      document.addEventListener("mousemove", mouseMove);
      function mouseMove(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
      gsap.ticker.add(updatePosition);
      function updatePosition() {
        if (!active) {
          pos.x += (mouse.x - pos.x) * ratio;
          pos.y += (mouse.y - pos.y) * ratio;

          gsap.set(ball, { x: pos.x, y: pos.y });
        }
      }
      // link
      $("a,.c-pointer,button,.progress")
        .not(".project_slider a") // omit from selection.
        .on("mouseenter", function () {
          gsap.to(ball, {
            duration: 0.3,
            borderWidth: 0,
            opacity: 0.5,
            backgroundColor: "#CCC",
            width: "80px",
            height: "80px",
          });
        })
        .on("mouseleave", function () {
          gsap.to(ball, defaultValue);
        });

      // Data cursor
      if ($("[data-cursor]")) {
        $("[data-cursor]").each(function () {
          $(this)
            .on("mouseenter", function () {
              ball.append('<div class="ball-view"></div>');
              $(".ball-view").append($(this).attr("data-cursor"));
              gsap.to(ball, hoverBall);
            })
            .on("mouseleave", function () {
              ball.find(".ball-view").remove();
              gsap.to(ball, defaultValue);
            });
        });
      }
    },
    preloader() {
      window.onload = () => {
        const svg = document.getElementById("svg");
        const tl = gsap.timeline();
        const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
        const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

        tl.to(".preloader-text", {
          delay: 0.5,
          y: -100,
          opacity: 0,
        });

        tl.to(svg, {
          duration: 0.1,
          // attr: { d: curve },
          ease: "power2.easeIn",
        }).to(svg, {
          duration: 0.5,
          attr: { d: flat },
          ease: "power2.easeOut",
        });

        tl.to(".preloader", {
          y: -1500,
        });
        tl.to(".preloader", {
          zIndex: -1,
          display: "none",
        });
      };
    },
    scrollButton() {
      $(".tf__scroll_btn").on("click", function () {
        $("html, body").animate(
          {
            scrollTop: 0,
          },
          300
        );
      });

      $(window).on("scroll", function () {
        var scrolling = $(window).scrollTop();

        if (scrolling > 500) {
          $(".tf__scroll_btn").fadeIn();
        } else {
          $(".tf__scroll_btn").fadeOut();
        }
      });
    },

    marquee() {
      $(".marquee_animi").each(function () {
        var dir = $(this).data("marquee-dir");
        $(this).marquee({
          speed: 70,
          gap: 85,
          delayBeforeStart: 0,
          direction: dir || "left",
          duplicated: true,
          pauseOnHover: true,
          startVisible: true,
        });
      });
    },
    progressbar() {
      $(".progress_chart").each(function () {
        var progressBarOptions = {
          startAngle: -1.55,
          size: 128,
          fill: {
            color: "#6CC47F",
          },
        };
        let value = $(this).data("value") / 100;
        $(this)
          .circleProgress(progressBarOptions)
          .on(
            "circle-animation-progress",
            function (event, progress, stepValue) {
              $(this)
                .find("strong")
                .text(String(Math.round(stepValue * 100)) + "%");
            }
          );
        $(this).circleProgress({
          value,
          lineCap: "round",
          emptyFill: "#6CC47F42",
          thickness: 4,
          fill: {
            color: "#6CC47F",
          },
        });
      });
    },
    imgToSvg() {
      document.querySelectorAll("img.svg-icon").forEach((el) => {
        const imgID = el.getAttribute("id");
        const imgClass = el.getAttribute("class");
        const imgURL = el.getAttribute("src");
        fetch(imgURL)
          .then((data) => data.text())
          .then((response) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response, "text/html");
            let svg = xmlDoc.querySelector("svg");
            if (typeof imgID !== "undefined") {
              svg.setAttribute("id", imgID);
            }

            if (typeof imgClass !== "undefined") {
              svg.setAttribute("class", imgClass + " replaced-svg");
            }

            svg.removeAttribute("xmlns:a");
            if (el.parentNode) {
              el.parentNode.replaceChild(svg, el);
            }
          });
      });
    },
  };

  $(document).ready(function () {
    itget.init();
  });
})(jQuery);
