const {
  active,
  none,
  all,
  one,
  show
} = {
  active: 'active',
  none: 'd-none',
  one: 'one',
  all: 'all',
  show: 'show'
}

AOS.init({
  once: true,
  duration: 1000
});


const blockNewsContentMain = $('.block-news-content-main');
const blockNewsContentDescription = $('.block-news-content-description');

$(window).on('resize', function () {

  blockNewsContentDescription.height(blockNewsContentMain.height());

});