// eslint-disable-next-line no-undef
AOS.init({
  once: true,
  duration: 1000,
});

$("#slider-laboratory").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
});

// First, check if the required DOM elements exist to prevent 'undefined' errors that break slick.
const $sliderPopularProducts = $("#slider-popular-products");
const $prevArrow = $(".block-popular-products-top-block-slide-icon.prev");
const $nextArrow = $(".block-popular-products-top-block-slide-icon.next");

$sliderPopularProducts.slick({
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 4,
  slidesToScroll: 3,
  centerMode: true,
  centerPadding: "60px",
  prevArrow: $prevArrow,
  nextArrow: $nextArrow,
  responsive: [
    {
      breakpoint: 1460,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerPadding: "40px",
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: "32px",
        dots: true,
      },
    },
  ],
});

const blockNewsSliderButton = $(".block-news-slider-button");

const blockNewsContent = $(".block-news-content-main");

blockNewsContent.hide();

const fondACtiveIndex = blockNewsSliderButton.filter(".active").data("tab");

const blockNewsContentActive = $(`[data-tabContent="${fondACtiveIndex}"]`);

blockNewsContentActive.show();

blockNewsSliderButton.on("click", function () {
  const fondACtiveIndexNew = $(this).data("tab");

  blockNewsSliderButton.removeClass("active");
  $(this).addClass("active");

  blockNewsContent.hide();
  const blockNewsContentActiveNew = $(
    `[data-tabContent="${fondACtiveIndexNew}"]`
  );

  blockNewsContentActiveNew.show();

  resizeBlockNewsContentDescription(blockNewsContentActiveNew);
});

const blockNewsContentDescription = $(".block-news-content-description");

$(window).on("resize", function () {
  resizeBlockNewsContentDescription(blockNewsContentActive);
});

function resizeBlockNewsContentDescription(element) {
  if (window.innerWidth > 768) {
    blockNewsContentDescription.height(element.height());
  } else {
    blockNewsContentDescription.height("auto");
  }
}

// Mobile menu list box
const mobileMenuListBox = $(".mobile-menu-content-list-box");

mobileMenuListBox.on("click", function () {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    return;
  }
  mobileMenuListBox.removeClass("active");
  $(this).addClass("active");
});
// Mobile menu list box

// Mobile menu
const mobileMenu = $(".mobile-menu");
const headerMobileMenu = $(".header-mobile-menu");
const mobileMenuClose = $(".mobile-menu-content .fa-xmark");

headerMobileMenu.on("click", function () {
  mobileMenu.addClass("active");
  $(document.body).css("overflow", "hidden");
});

mobileMenuClose.on("click", function () {
  mobileMenu.removeClass("active");
  $(document.body).css("overflow", "auto");
});
