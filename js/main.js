(function ($) {
  "use strict";

  //Blog show feature image
  showFirstBlogPostFeatureImge();
  showBlogPostFeatureImage();

  //Image slider
  imageSliderSettings();

  //Text slider
  textSliderSettings();

  //Placeholder show/hide
  placeholderShowHide();

  //Skills fill
  skillsFill();

  //Send Mail Action
  $('.contact-form [type="submit"]').on("click", function () {
    SendMail();
  });

  //Fit Video
  $(".site-wrapper").fitVids();

  $("#toggle").on("click", multiClickFunctionStop);

  $(window).on("load", function () {
    //Set Isotope
    isotopeSetUp();

    // Animate the elemnt if is allready visible on load
    animateElement();

    //Set menu
    setMenu();

    $(".doc-loader").fadeOut(300);
  });

  $(window).on("scroll", function () {
    animateElement();
  });

  //------------------------------------------------------------------------
  //Helper Methods -->
  //------------------------------------------------------------------------

  function animateElement(e) {
    $(".animate").each(function (i) {
      if (!$(this).hasClass("show-it")) {
        var top_of_object = $(this).offset().top;
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        if (bottom_of_window - 70 > top_of_object) {
          $(this).addClass("show-it");
        }
      }
    });
  }

  function multiClickFunctionStop(e) {
    $("#toggle").off("click");
    $("#toggle, .toggle-holder, body").toggleClass("on");
    if ($("#toggle").hasClass("on")) {
      $(".menu-holder").addClass("show");
      $("#toggle").on("click", multiClickFunctionStop);
    } else {
      $(".menu-holder").removeClass("show");
      $("#toggle").on("click", multiClickFunctionStop);
    }
  }

  function showFirstBlogPostFeatureImge() {
    $(".blog-item-holder .entry-holder").first().addClass("active-post");
  }

  function showBlogPostFeatureImage() {
    $(".blog-item-holder .entry-holder").on("mouseenter", function () {
      $(".blog-item-holder .entry-holder").removeClass("active-post");
      $(this).addClass("active-post");
    });
  }

  function is_touch_device() {
    return !!("ontouchstart" in window);
  }

  function isotopeSetUp() {
    $(".grid").isotope({
      itemSelector: ".grid-item",
      masonry: {
        columnWidth: ".grid-sizer",
      },
    });
    $(".grid").isotope("layout");
  }

  function imageSliderSettings() {
    $(".image-slider-wrapper").each(function () {
      var id = $(this).attr("id");
      var auto_value = window[id + "_auto"];
      var speed_value = window[id + "_speed"];
      var items_value = window[id + "_items"];
      var gap = window[id + "_gap"];
      auto_value = auto_value === "true" ? true : false;
      if (auto_value === true) {
        var mySwiper = new Swiper("#" + id, {
          autoplay: {
            delay: speed_value,
          },
          scrollbar: {
            el: ".swiper-scrollbar-" + id,
            hide: false,
            draggable: true,
            dragSize: "18px",
          },
          slidesPerView: items_value,
          spaceBetween: parseInt(gap),
          resistance: true,
          resistanceRatio: 0.5,
          breakpoints: {
            1024: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
          },
          pagination: {
            el: ".swiper-pagination-" + id,
            clickable: true,
          },
        });
        $("#" + id).hover(
          function () {
            mySwiper.autoplay.stop();
          },
          function () {
            mySwiper.autoplay.start();
          }
        );
      } else {
        var mySwiper = new Swiper("#" + id, {
          scrollbar: {
            el: ".swiper-scrollbar-" + id,
            hide: false,
            draggable: true,
            dragSize: "18px",
          },
          slidesPerView: items_value,
          spaceBetween: parseInt(gap),
          resistance: true,
          resistanceRatio: 0.5,
          breakpoints: {
            1024: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
          },
          pagination: {
            el: ".swiper-pagination-" + id,
            clickable: true,
          },
        });
      }
    });
  }

  function textSliderSettings() {
    $(".text-slider-wrapper").each(function () {
      var id = $(this).attr("id");
      var auto_value = window[id + "_auto"];
      var speed_value = window[id + "_speed"];
      if (auto_value === true) {
        var mySwiper = new Swiper("#" + id, {
          autoplay: {
            delay: speed_value,
          },
          slidesPerView: "1",
          resistance: true,
          resistanceRatio: 0.5,
          pagination: {
            el: ".swiper-pagination-" + id,
            clickable: true,
          },
        });
        $("#" + id).hover(
          function () {
            mySwiper.autoplay.stop();
          },
          function () {
            mySwiper.autoplay.start();
          }
        );
      } else {
        var mySwiper = new Swiper("#" + id, {
          slidesPerView: "1",
          resistance: true,
          resistanceRatio: 0.5,
          pagination: {
            el: ".swiper-pagination-" + id,
            clickable: true,
          },
        });
      }
    });
  }

  function setMenu() {
    $(".main-menu").smartmenus({
      subMenusSubOffsetX: 1,
      subMenusSubOffsetY: -8,
      markCurrentItem: true,
    });
    var $mainMenu = $(".main-menu")
      .on("click", "span.sub-arrow", function (e) {
        var obj = $mainMenu.data("smartmenus");
        if (obj.isCollapsible()) {
          var $item = $(this).parent(),
            $sub = $item.parent().dataSM("sub");
          $sub.dataSM("arrowClicked", true);
        }
      })
      .bind({
        "beforeshow.smapi": function (e, menu) {
          var obj = $mainMenu.data("smartmenus");
          if (obj.isCollapsible()) {
            var $menu = $(menu);
            if (!$menu.dataSM("arrowClicked")) {
              return false;
            }
            $menu.removeDataSM("arrowClicked");
          }
        },
      });
  }

  function placeholderShowHide() {
    $("input, textarea").on("focus", function () {
      $(this).data("placeholder", $(this).attr("placeholder"));
      $(this).attr("placeholder", "");
    });
    $("input, textarea").on("blur", function () {
      $(this).attr("placeholder", $(this).data("placeholder"));
    });
  }

  function skillsFill() {
    $(".progress_bar_field_perecent").each(function (i) {
      $(this).width(jQuery(this).data("fill"));
    });
  }
})(jQuery);
