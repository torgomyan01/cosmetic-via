// eslint-disable-next-line no-undef
AOS.init({
  once: true,
  duration: 1000,
});

const blockNewsContentMain = $(".block-news-content-main");
const blockNewsContentDescription = $(".block-news-content-description");

$(window).on("resize", function () {
  blockNewsContentDescription.height(blockNewsContentMain.height());
});

$(".slider-laboratory").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: ".slider-laboratory-nav",
});
