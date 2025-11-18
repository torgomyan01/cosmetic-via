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

// Search autocomplete functionality
$(document).ready(function () {
  const searchInput = $("#search-input");
  const searchDropdown = $(".search-dropdown");
  const searchSuggestions = $(".search-suggestions");
  const searchLabel = $(".search-wrapper label");

  // Sample search suggestions data (you can replace this with an API call)
  const allSuggestions = [
    "Шампуни",
    "Шампура",
    "Шалфей",
    "Шанижки",
    "Шиповник",
    "Шоколад",
    "Шампунь для волос",
    "Шампунь для тела",
  ];

  // Filter suggestions based on input
  function filterSuggestions(query) {
    if (!query || query.trim() === "") {
      return [];
    }

    const lowerQuery = query.toLowerCase();
    return allSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(lowerQuery)
    );
  }

  // Display suggestions
  function displaySuggestions(suggestions) {
    searchSuggestions.empty();

    if (suggestions.length === 0) {
      searchDropdown.removeClass("active");
      searchLabel.removeClass("active");
      return;
    }

    suggestions.forEach((suggestion) => {
      const li = $("<li>").text(suggestion);
      li.on("click", function () {
        searchInput.val(suggestion);
        searchDropdown.removeClass("active");
        searchLabel.removeClass("active");
      });
      searchSuggestions.append(li);
    });

    searchDropdown.addClass("active");
    searchLabel.addClass("active");
  }

  // Handle input events
  searchInput.on("input", function () {
    const query = $(this).val();
    const suggestions = filterSuggestions(query);
    displaySuggestions(suggestions);
  });

  // Handle focus events
  searchInput.on("focus", function () {
    const query = $(this).val();
    const suggestions = filterSuggestions(query);
    // Only add active class if there are suggestions
    if (suggestions.length > 0) {
      displaySuggestions(suggestions);
    } else {
      // Remove active class if no suggestions
      searchLabel.removeClass("active");
      searchDropdown.removeClass("active");
    }
  });

  // Handle blur events
  searchInput.on("blur", function () {
    // Delay to allow click events on suggestions to fire first
    setTimeout(function () {
      if (!searchDropdown.hasClass("active")) {
        searchLabel.removeClass("active");
      }
    }, 200);
  });

  // Close dropdown when clicking outside
  $(document).on("click", function (e) {
    if (
      !$(e.target).closest(".search-wrapper").length &&
      !$(e.target).is(".search-wrapper")
    ) {
      searchDropdown.removeClass("active");
      searchLabel.removeClass("active");
    }
  });

  // Handle keyboard navigation
  searchInput.on("keydown", function (e) {
    const activeItem = searchSuggestions.find("li.highlighted");
    const allItems = searchSuggestions.find("li");

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (activeItem.length) {
        activeItem.removeClass("highlighted");
        const next = activeItem.next();
        if (next.length) {
          next.addClass("highlighted");
        } else {
          allItems.first().addClass("highlighted");
        }
      } else {
        allItems.first().addClass("highlighted");
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (activeItem.length) {
        activeItem.removeClass("highlighted");
        const prev = activeItem.prev();
        if (prev.length) {
          prev.addClass("highlighted");
        } else {
          allItems.last().addClass("highlighted");
        }
      } else {
        allItems.last().addClass("highlighted");
      }
    } else if (e.key === "Enter") {
      if (activeItem.length) {
        e.preventDefault();
        searchInput.val(activeItem.text());
        searchDropdown.removeClass("active");
      }
    } else if (e.key === "Escape") {
      searchDropdown.removeClass("active");
    }
  });

  // Add CSS for highlighted item
  $("<style>")
    .prop("type", "text/css")
    .html(
      ".search-suggestions li.highlighted { background-color: rgba(139, 151, 124, 0.15) !important; }"
    )
    .appendTo("head");
});

// Catalog Filter functionality
$(document).ready(function () {
  // Initialize active subsection icons - ensure minus icon for active subsections
  $(".catalog-filter-subsection.active .catalog-filter-subsection-toggle").each(
    function () {
      $(this).removeClass("fa-plus").addClass("fa-minus");
    }
  );

  // Toggle filter sections
  $(".catalog-filter-section-header").on("click", function () {
    const section = $(this).closest(".catalog-filter-section");
    section.toggleClass("active");
  });

  // Toggle filter subsections
  $(".catalog-filter-subsection-header").on("click", function () {
    const subsection = $(this).closest(".catalog-filter-subsection");
    const toggleIcon = subsection.find(".catalog-filter-subsection-toggle");

    subsection.toggleClass("active");

    // Change icon
    if (subsection.hasClass("active")) {
      toggleIcon.removeClass("fa-plus").addClass("fa-minus");
    } else {
      toggleIcon.removeClass("fa-minus").addClass("fa-plus");
    }
  });

  // Reset filter
  $(".catalog-filter-reset").on("click", function (e) {
    e.preventDefault();

    // Close all sections and reset icons
    $(".catalog-filter-section.active, .catalog-filter-subsection.active").each(
      function () {
        const $this = $(this);
        const toggleIcon = $this.find(".catalog-filter-subsection-toggle");

        // Reset icon to plus
        if (toggleIcon.length) {
          toggleIcon.removeClass("fa-minus").addClass("fa-plus");
        }

        $this.removeClass("active");
      }
    );

    $(".catalog-filter-checkbox input[type='checkbox']").prop("checked", false);
    $("#packaging-toggle").prop("checked", false);
    $("#packaging-toggle-modal").prop("checked", false);
  });

  // Pagination functionality
  $(".catalog-pagination-number").on("click", function (e) {
    e.preventDefault();

    // Remove active and current classes from all numbers
    $(".catalog-pagination-number").removeClass("active current");

    // Add current class to clicked number
    $(this).addClass("current");

    // Add active class to previous number if exists
    const prevNumber = $(this).prev(".catalog-pagination-number");
    if (prevNumber.length && !prevNumber.hasClass("current")) {
      prevNumber.addClass("active");
    }
  });

  // Pagination arrow navigation
  $(".catalog-pagination-prev").on("click", function (e) {
    e.preventDefault();
    const current = $(".catalog-pagination-number.current");
    const prev = current.prev(".catalog-pagination-number");

    if (prev.length) {
      current.removeClass("current");
      prev.removeClass("active").addClass("current");

      // Update active state
      const prevPrev = prev.prev(".catalog-pagination-number");
      if (prevPrev.length) {
        prevPrev.addClass("active");
      }
    }
  });

  $(".catalog-pagination-next").on("click", function (e) {
    e.preventDefault();
    const current = $(".catalog-pagination-number.current");
    const next = current.next(".catalog-pagination-number");

    if (next.length) {
      current.removeClass("current").addClass("active");
      next.addClass("current");
    }
  });
});

// Product Page Functionality
$(document).ready(function () {
  // Product Page Packaging Button Selection
  $(".product-page-packaging-btn").on("click", function (e) {
    e.preventDefault();
    const $btn = $(this);
    const $allButtons = $(".product-page-packaging-btn");
    const isActive = $btn.hasClass("product-page-packaging-btn-active");

    // If clicking on the close icon, remove active state
    if ($(e.target).hasClass("product-page-packaging-close")) {
      $btn.removeClass("product-page-packaging-btn-active");
      $btn.find(".product-page-packaging-close").remove();
      return;
    }

    // Remove active class and close icon from all buttons
    $allButtons.removeClass("product-page-packaging-btn-active");
    $allButtons.find(".product-page-packaging-close").remove();

    // Add active class and close icon to clicked button
    if (!isActive) {
      $btn.addClass("product-page-packaging-btn-active");
      if (!$btn.find(".product-page-packaging-close").length) {
        $btn.append(
          '<i class="fa-solid fa-xmark product-page-packaging-close"></i>'
        );
      }
    }
  });

  // Product Page Application Button Selection
  $(".product-page-application-btn").on("click", function () {
    $(".product-page-application-btn").removeClass("active");
    $(this).addClass("active");
  });

  // Product Page Description Toggle
  $(".product-page-description-toggle").on("click", function (e) {
    e.preventDefault();
    const $toggle = $(this);
    const $text = $(".product-page-description-text");

    if ($text.text().includes("....")) {
      // Expand description
      $text.text(
        "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору опочить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия."
      );
      $toggle.text("Скрыть");
    } else {
      // Collapse description
      $text.text(
        "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору опочить навык публичных выступлений в домашних условиях. При созд...."
      );
      $toggle.text("Показать полностью");
    }
  });
});
