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

$sliderPopularProducts.removeClass("default");

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

$(".desktop-menu-content-ads").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
});

// Desktop menu functionality
const desktopMenu = $(".desktop-menu");
const desktopMenuItems = $(".header .bg-header .header-menu li");

function openDesktopMenu(menuId, menuItem) {
  // Close all menus first
  desktopMenu.removeClass("active");
  desktopMenuItems.removeClass("active");

  // Open the selected menu
  $(`#${menuId}`).addClass("active");
  menuItem.addClass("active");

  // Prevent body scroll
  $(document.body).css("overflow", "hidden");
}

function closeDesktopMenu() {
  // Close all menus
  desktopMenu.removeClass("active");
  desktopMenuItems.removeClass("active");

  $("#catalog-menu-icon").removeClass("d-none");
  $("#close-catalog-menu-icon").addClass("d-none");

  // Restore body scroll
  $(document.body).css("overflow", "auto");
}

// Handle menu item clicks
desktopMenuItems.on("click", function (e) {
  e.stopPropagation();
  const menuId = $(this).data("menu");

  if (menuId === "manufacturers") {
    $("#catalog-menu-icon").addClass("d-none");
    $("#close-catalog-menu-icon").removeClass("d-none");
  } else {
    $("#catalog-menu-icon").removeClass("d-none");
    $("#close-catalog-menu-icon").addClass("d-none");
  }

  if (menuId) {
    const $menuItem = $(this);
    const isCurrentlyActive = $menuItem.hasClass("active");

    if (isCurrentlyActive) {
      // If menu is already open, close it
      closeDesktopMenu();
    } else {
      // Open the selected menu
      openDesktopMenu(menuId, $menuItem);
    }
  }
});

// Close menu when clicking on the background/overlay
desktopMenu.on("click", function (e) {
  // Close if clicking directly on the menu container (background) or its ::before pseudo-element
  // The ::before has pointer-events: none, so clicks pass through to the menu container
  if (
    $(e.target).is(desktopMenu) ||
    !$(e.target).closest(".desktop-menu-content").length
  ) {
    closeDesktopMenu();
  }
});

// Prevent menu from closing when clicking inside menu content
desktopMenu.find(".desktop-menu-content").on("click", function (e) {
  e.stopPropagation();
});

// Close menu on Escape key
$(document).on("keydown", function (e) {
  if (e.key === "Escape" && desktopMenu.hasClass("active")) {
    closeDesktopMenu();
  }
});

// Dynamic Modal functionality - supports multiple modals on the same page
const ModalManager = {
  // Open a modal by its ID
  open: function (modalId) {
    const modal = $(`#${modalId}`);
    if (modal.length) {
      modal.addClass("active");
      $(document.body).css("overflow", "hidden");
    }
  },

  // Close a modal by its ID
  close: function (modalId) {
    const modal = $(`#${modalId}`);
    if (modal.length) {
      modal.removeClass("active");
      $(document.body).css("overflow", "auto");
    }
  },

  // Close all active modals
  closeAll: function () {
    $(".modal-overlay.active").each(function () {
      $(this).removeClass("active");
    });
    $(document.body).css("overflow", "auto");
  },

  // Initialize modal functionality
  init: function () {
    // Handle buttons with data-modal attribute (open modal)
    $(document).on("click", "[data-modal]", function (e) {
      e.preventDefault();
      const modalId = $(this).data("modal");
      ModalManager.open(modalId);
    });

    // Handle buttons with data-close-modal attribute (close specific modal)
    $(document).on("click", "[data-close-modal]", function (e) {
      e.preventDefault();
      const modalId = $(this).data("close-modal");
      ModalManager.close(modalId);
    });

    // Handle buttons inside modal content that should close the modal
    $(document).on("click", ".modal-content [data-modal-close]", function (e) {
      e.preventDefault();
      const modal = $(this).closest(".modal-overlay");
      if (modal.length) {
        ModalManager.close(modal.attr("id"));
      }
    });

    // Close modal when clicking on overlay
    $(document).on("click", ".modal-overlay", function (e) {
      if ($(e.target).is($(this))) {
        const modalId = $(this).attr("id");
        ModalManager.close(modalId);
      }
    });

    // Prevent modal from closing when clicking inside modal content
    $(document).on("click", ".modal-content", function (e) {
      e.stopPropagation();
    });

    // Close modal on Escape key (closes the topmost active modal)
    $(document).on("keydown", function (e) {
      if (e.key === "Escape") {
        const activeModals = $(".modal-overlay.active");
        if (activeModals.length > 0) {
          // Close the last opened modal (topmost in DOM)
          const lastModal = activeModals.last();
          ModalManager.close(lastModal.attr("id"));
        }
      }
    });
  },
};

// Initialize modal system when DOM is ready
$(document).ready(function () {
  ModalManager.init();
});
