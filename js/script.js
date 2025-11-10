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

$("#slider-laboratory").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
});

$("#slider-popular-products").slick({
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 4,
  slidesToScroll: 2,
  prevArrow: $(".block-popular-products-top-block-slide-icon.prev"),
  nextArrow: $(".block-popular-products-top-block-slide-icon.next"),
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});
