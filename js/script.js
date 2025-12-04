// -----------------------------------
// ------ AOS И ОСНОВНЫЕ СЛАЙДЕРЫ ----
// -----------------------------------

// Инициализация анимации AOS на странице
// eslint-disable-next-line no-undef
AOS.init({
  once: true,
  duration: 1000,
});

// Слайдер в блоке лаборатории
$("#slider-laboratory").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
});

// Слайдер «Популярные продукты» на главной
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

// -----------------------------------
// ------ СЕКЦИЯ НОВОСТЕЙ (Табы) -----
// -----------------------------------

// Инициализация каждого слайдера новостей отдельно
// Находим все слайдеры и инициализируем каждый по отдельности
$(".block-news-slider").each(function () {
  const $slider = $(this);
  // Find the parent container that contains both slider and content
  // This works for both .block-news and .warehouse-content-section-content structures
  const $container = $slider.parent();
  const $sliderButtons = $slider.find(".block-news-slider-button");
  const $contentContainer = $container.find(".block-news-content");
  const $contentItems = $contentContainer.find(".block-news-content-main");
  const $contentDescription = $container.find(
    ".block-news-content-description"
  );

  // Hide all content items in this slider
  $contentItems.hide();

  // Find and show the active content
  const activeIndex = $sliderButtons.filter(".active").data("tab");
  const $activeContent = $contentContainer.find(
    `[data-tabContent="${activeIndex}"]`
  );

  if ($activeContent.length) {
    $activeContent.show();
    resizeBlockNewsContentDescription($activeContent, $contentDescription);
  }

  // Handle button clicks within this slider
  $sliderButtons.on("click", function () {
    const $clickedButton = $(this);
    const newActiveIndex = $clickedButton.data("tab");

    // Remove active class from all buttons in this slider
    $sliderButtons.removeClass("active");
    // Add active class to clicked button
    $clickedButton.addClass("active");

    // Hide all content items in this slider
    $contentItems.hide();
    // Show the selected content
    const $newActiveContent = $contentContainer.find(
      `[data-tabContent="${newActiveIndex}"]`
    );

    if ($newActiveContent.length) {
      $newActiveContent.show();
      resizeBlockNewsContentDescription($newActiveContent, $contentDescription);
    }
  });
});

// -----------------------------------
// ------ ОБРАБОТКА РЕСАЙЗА ОКНА -----
// -----------------------------------

// Пересчёт размеров активных элементов при изменении ширины окна
$(window).on("resize", function () {
  // Resize all active sliders
  $(".block-news-slider").each(function () {
    const $slider = $(this);
    const $container = $slider.parent();
    const $sliderButtons = $slider.find(".block-news-slider-button");
    const $contentContainer = $container.find(".block-news-content");
    const activeIndex = $sliderButtons.filter(".active").data("tab");
    const $activeContent = $contentContainer.find(
      `[data-tabContent="${activeIndex}"]`
    );
    const $contentDescription = $container.find(
      ".block-news-content-description"
    );

    if ($activeContent.length) {
      resizeBlockNewsContentDescription($activeContent, $contentDescription);
    }
  });
  productPageContentLeftSlider();
});

productPageContentLeftSlider();

// Слайдер изображений товара (левая колонка) на мобильных разрешениях
function productPageContentLeftSlider() {
  const $slider = $(".product-page-content-left");

  if (window.innerWidth <= 1170) {
    // Check if slider is already initialized
    if (!$slider.hasClass("slick-initialized")) {
      $slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
      });
    }
  } else {
    // Only destroy if slider is initialized
    if ($slider.hasClass("slick-initialized")) {
      $slider.slick("destroy");
    }
  }
}

// Установка высоты описания блока новостей по высоте активного элемента
function resizeBlockNewsContentDescription(element, contentDescription) {
  if (window.innerWidth > 768 && contentDescription.length) {
    contentDescription.height(element.height());
  } else if (contentDescription.length) {
    contentDescription.height("auto");
  }
}

// -----------------------------------
// ------ МОБИЛЬНОЕ МЕНЮ -------------
// -----------------------------------

// Элементы выпадающего списка в мобильном меню
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

// Основное мобильное меню – открытие/закрытие полного экрана
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

// -----------------------------------
// ------ СЛАЙДЕР В ДЕСКТОП-МЕНЮ -----
// -----------------------------------

// Слайдер рекламных баннеров внутри десктопного меню
$(".desktop-menu-content-ads").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
});

// -----------------------------------
// ------ ДЕСКТОПНОЕ ВЫПАДАЮЩЕЕ МЕНЮ -
// -----------------------------------

// Логика работы десктопного выпадающего меню
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
  $(window).scrollTop(0);
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

// -----------------------------------
// ------ МОДАЛЬНЫЕ ОКНА -------------
// -----------------------------------

// Динамический менеджер модальных окон – поддерживает несколько модалок на странице
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

// -----------------------------------
// ------ ПОИСК (ХЕДЕР, АВТОДОП.) ----
// -----------------------------------

// Автодополнение в поле поиска в шапке сайта
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

// -----------------------------------
// ------ ПОИСКОВАЯ СТРАНИЦА ---------
// -----------------------------------

// Автодополнение на отдельной странице поиска (отдельная логика от глобального поиска)
$(document).ready(function () {
  const searchPageInput = $("#search-page-input");
  const searchPageDropdown = $(".search-page-dropdown");
  const searchPageSuggestions = $(".search-page-suggestions");
  const searchPageLabel = $(".search-page-wrapper .def-input-gray");

  // Sample search suggestions data (you can replace this with an API call)
  const allSearchPageSuggestions = [
    "AIVK",
    "AEVER Ingredient Co. Ltd",
    "ALCO",
    "Apoena Biotech",
    "AY YILDIZ",
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
  function filterSearchPageSuggestions(query) {
    if (!query || query.trim() === "") {
      return [];
    }

    const lowerQuery = query.toLowerCase();
    return allSearchPageSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(lowerQuery)
    );
  }

  // Display suggestions
  function displaySearchPageSuggestions(suggestions) {
    searchPageSuggestions.empty();

    if (suggestions.length === 0) {
      searchPageDropdown.removeClass("active");
      searchPageLabel.removeClass("active");
      return;
    }

    suggestions.forEach((suggestion) => {
      const li = $("<li>").text(suggestion);
      li.on("click", function () {
        searchPageInput.val(suggestion);
        searchPageDropdown.removeClass("active");
        searchPageLabel.removeClass("active");
      });
      searchPageSuggestions.append(li);
    });

    searchPageDropdown.addClass("active");
    searchPageLabel.addClass("active");
  }

  // Handle input events
  searchPageInput.on("input", function () {
    const query = $(this).val();
    const suggestions = filterSearchPageSuggestions(query);
    displaySearchPageSuggestions(suggestions);
  });

  // Handle focus events
  searchPageInput.on("focus", function () {
    const query = $(this).val();
    const suggestions = filterSearchPageSuggestions(query);
    // Only add active class if there are suggestions
    if (suggestions.length > 0) {
      displaySearchPageSuggestions(suggestions);
    } else {
      // Remove active class if no suggestions
      searchPageLabel.removeClass("active");
      searchPageDropdown.removeClass("active");
    }
  });

  // Handle blur events
  searchPageInput.on("blur", function () {
    // Delay to allow click events on suggestions to fire first
    setTimeout(function () {
      if (!searchPageDropdown.hasClass("active")) {
        searchPageLabel.removeClass("active");
      }
    }, 200);
  });

  // Close dropdown when clicking outside
  $(document).on("click", function (e) {
    if (
      !$(e.target).closest(".search-page-wrapper").length &&
      !$(e.target).is(".search-page-wrapper")
    ) {
      searchPageDropdown.removeClass("active");
      searchPageLabel.removeClass("active");
    }
  });

  // Handle keyboard navigation
  searchPageInput.on("keydown", function (e) {
    const activeItem = searchPageSuggestions.find("li.highlighted");
    const allItems = searchPageSuggestions.find("li");

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
        searchPageInput.val(activeItem.text());
        searchPageDropdown.removeClass("active");
        searchPageLabel.removeClass("active");
      }
    } else if (e.key === "Escape") {
      searchPageDropdown.removeClass("active");
      searchPageLabel.removeClass("active");
    }
  });

  // Add CSS for highlighted item
  $("<style>")
    .prop("type", "text/css")
    .html(
      ".search-page-suggestions li.highlighted { background-color: rgba(139, 151, 124, 0.15) !important; }"
    )
    .appendTo("head");
});

// -----------------------------------
// ------ ФИЛЬТР КАТАЛОГА ------------
// -----------------------------------

// Логика фильтрации, аккордеонов и пагинации каталога
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

// -----------------------------------
// ------ ОПИСАНИЕ КАТАЛОГА (МОБИЛ.) -
// -----------------------------------

// Сворачивание/разворачивание описания каталога на мобильных
$(document).ready(function () {
  $(".catalog-description-toggle-mobile").on("click", function () {
    const $wrapper = $(this).closest(".catalog-description-wrapper");
    $wrapper.toggleClass("expanded");
  });
});

// -----------------------------------
// ------ СТРАНИЦА ТОВАРА ------------
// -----------------------------------

// Логика выбора упаковки, применения и раскрытия описания на странице товара
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

// -----------------------------------
// ------ КОРЗИНА --------------------
// -----------------------------------

// Логика увеличения/уменьшения количества товара в корзине
$(document).ready(function () {
  $(".basket-table-count-btn.minus").on("click", function () {
    const $btn = $(this);
    const $count = $btn.siblings("span");
    const count = parseInt($count.text());
    if ($btn.is(":disabled")) {
      return;
    }
    $count.text(count - 1);

    disableMinusButton(count);
  });

  $(".basket-table-count-btn.plus").on("click", function () {
    const $btn = $(this);
    const $count = $btn.siblings("span");
    const count = parseInt($count.text()) + 1;
    $count.text(count);
    disableMinusButton(count);
  });
});

function disableMinusButton(count) {
  if (count <= 1) {
    $(".basket-table-count-btn.minus").prop("disabled", true);
  } else {
    $(".basket-table-count-btn.minus").prop("disabled", false);
  }
}

// -----------------------------------
// ------ МАСКИ ДЛЯ ПОЛЕЙ ФОРМ -------
// -----------------------------------

// Маска телефона
const phoneInput = $(".number-mask");

phoneInput.each((index, element) => {
  const maskOptions = {
    mask: "+{7}(000)000-00-00",
  };
  // eslint-disable-next-line no-undef
  IMask(element, maskOptions);
});

// Маска ИНН
const innInput = $(".inn-mask");
innInput.each((index, element) => {
  const maskOptions = {
    mask: "000 000 000 0000 0000 0000",
  };
  // eslint-disable-next-line no-undef
  IMask(element, maskOptions);
});

// Маска КПП
const kppInput = $(".kpp-mask");
kppInput.each((index, element) => {
  const maskOptions = {
    mask: "0000 0000 000 0000 0000 0000",
  };
  // eslint-disable-next-line no-undef
  IMask(element, maskOptions);
});

// Маска БИК
const bikInput = $(".bik-mask");
bikInput.each((index, element) => {
  const maskOptions = {
    mask: "0000 0000 000 0000 0000 0000",
  };
  // eslint-disable-next-line no-undef
  IMask(element, maskOptions);
});

// Маска Р/С (расчётный счёт)
const rsInput = $(".rs-mask");
rsInput.each((index, element) => {
  const maskOptions = {
    mask: "0000 0000 0000 0000 0000",
  };
  // eslint-disable-next-line no-undef
  IMask(element, maskOptions);
});

// Маска К/С (корреспондентский счёт)
const ksInput = $(".ks-mask");
ksInput.each((index, element) => {
  const maskOptions = {
    mask: "0000 0000 0000 0000 0000",
  };
  // eslint-disable-next-line no-undef
  IMask(element, maskOptions);
});

// -----------------------------------
// ------ ПАРОЛИ (ПОКАЗ/СКРЫТИЕ) -----
// -----------------------------------

// Переключение видимости пароля на форме логина/регистрации
$("#show-password").on("click", function () {
  $(this).hide();
  $("#hide-password").show();
  $(this).siblings("input").attr("type", "text");
});

$("#hide-password").on("click", function () {
  $(this).hide();
  $("#show-password").show();
  $(this).siblings("input").attr("type", "password");
});

// Переключение видимости пароля в профиле аккаунта (два отдельных поля)
$("#show-password-1").on("click", function () {
  $(this).addClass("d-none");
  $("#hide-password-1").removeClass("d-none");
  $("#password-input").attr("type", "text");
});

$("#hide-password-1").on("click", function () {
  $(this).addClass("d-none");
  $("#show-password-1").removeClass("d-none");
  $("#password-input").attr("type", "password");
});

$("#show-password-2").on("click", function () {
  $(this).addClass("d-none");
  $("#hide-password-2").removeClass("d-none");
  $("#password-repeat-input").attr("type", "text");
});

$("#hide-password-2").on("click", function () {
  $(this).addClass("d-none");
  $("#show-password-2").removeClass("d-none");
  $("#password-repeat-input").attr("type", "password");
});

// -----------------------------------
// ------ ВЫБОР ГОРОДА (DROPDOWN) ----
// -----------------------------------

// Кастомный комбобокс выбора города на основе скрытого select
const cityInput = $("#city-input");
const citySelect = $("#city-select");
const citySelectTrigger = $("#city-select-trigger");
const cityDropdown = $("#city-dropdown");
const cityDropdownList = $("#city-dropdown-list");

// Инициализация списка городов из select
function initCityDropdown() {
  if (!citySelect.length || !cityDropdownList.length) return;

  cityDropdownList.empty();
  const selectedValue = citySelect.val();

  citySelect.find("option").each(function () {
    const optionValue = $(this).val();
    const optionText = $(this).text();
    const isSelected = optionValue === selectedValue;

    const dropdownItem = $('<div class="city-dropdown-item"></div>')
      .text(optionText)
      .data("value", optionValue);

    if (isSelected) {
      dropdownItem.addClass("selected");
      cityInput.val(optionValue);
    }

    dropdownItem.on("click", function () {
      const value = $(this).data("value");
      citySelect.val(value);
      cityInput.val(value);
      cityDropdownList.find(".city-dropdown-item").removeClass("selected");
      $(this).addClass("selected");
      closeCityDropdown();
    });

    cityDropdownList.append(dropdownItem);
  });
}

// Открыть выпадающий список
function openCityDropdown() {
  cityDropdown.addClass("active");
  citySelectTrigger.addClass("active");
}

// Закрыть выпадающий список
function closeCityDropdown() {
  cityDropdown.removeClass("active");
  citySelectTrigger.removeClass("active");
}

// Переключение состояния выпадающего списка
citySelectTrigger.on("click", function (e) {
  e.stopPropagation();
  if (cityDropdown.hasClass("active")) {
    closeCityDropdown();
  } else {
    openCityDropdown();
  }
});

// Закрытие дропдауна при клике вне компонента
$(document).on("click", function (e) {
  if (
    !$(e.target).closest(".city-combobox").length &&
    !$(e.target).closest(".city-dropdown").length
  ) {
    closeCityDropdown();
  }
});

// Инициализация комбобокса при загрузке страницы
if (citySelect.length && cityInput.length) {
  initCityDropdown();
}

// -----------------------------------
// ------ ТАБЫ ЛОГИН/РЕГИСТРАЦИЯ -----
// -----------------------------------

// Переключение вкладок «Вход» / «Регистрация»
const loginRegisterTabs = $(".login-register-tab");
const loginRegisterTabContents = $(".login-register-tab-content");

loginRegisterTabs.on("click", function () {
  loginRegisterTabs.removeClass("active");
  $(this).addClass("active");

  const findID = $(this).data("tab");

  loginRegisterTabContents.hide();

  $(`#${findID}`).show();
});

// -----------------------------------
// ------ МЕНЮ АККАУНТА (МОБИЛЬНОЕ) --
// -----------------------------------

// Мобильное выпадающее меню разделов личного кабинета
const accountContentMenuListMobile = $(".account-content-menu-list-mobile");
const accountContentMenuList = $(".account-content-menu-list");
const accountContentMenuListWrapper = $(".account-content-menu-list-wrapper");

accountContentMenuListMobile.on("click", function (e) {
  e.stopPropagation();
  $(this).toggleClass("active");
  accountContentMenuList.toggleClass("active");
  accountContentMenuListWrapper.toggleClass("active");
});

// Закрытие мобильного меню аккаунта при клике вне его
$(document).on("click", function (e) {
  if (
    accountContentMenuListWrapper.hasClass("active") &&
    !$(e.target).closest(accountContentMenuListWrapper).length &&
    !$(e.target).closest(accountContentMenuListMobile).length
  ) {
    accountContentMenuListMobile.removeClass("active");
    accountContentMenuList.removeClass("active");
    accountContentMenuListWrapper.removeClass("active");
  }
});

// Блокируем закрытие при клике внутри обёртки меню
accountContentMenuListWrapper.on("click", function (e) {
  e.stopPropagation();
});

// -----------------------------------
// ------ ИСТОРИЯ ЗАКАЗОВ (СЛАЙДЕР) --
// -----------------------------------

// Слайдер карточек заказов в истории заказов аккаунта
const $accountOrderHistorySlider = $(".account-order-history-section-list");

if ($accountOrderHistorySlider.length) {
  $accountOrderHistorySlider.slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "0px",
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1375,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "16px",
        },
      },
    ],
  });
}

// -----------------------------------
// ------ АККОРДЕОН FAQ В АККАУНТЕ ---
// -----------------------------------

// Раскрытие/сворачивание вопросов и ответов в разделе FAQ личного кабинета
$(document).ready(function () {
  $(".account-faq-item-header").on("click", function () {
    const $item = $(this).closest(".account-faq-item");
    const $allItems = $(".account-faq-item");

    // Toggle the clicked item
    if ($item.hasClass("active")) {
      $item.removeClass("active");
    } else {
      // Close all items first
      $allItems.removeClass("active");
      // Open the clicked item
      $item.addClass("active");
    }
  });
});

// -----------------------------------
// ------ ИЗБРАННЫЕ ПРОИЗВОДИТЕЛИ ----
// -----------------------------------

// Переключение иконки «избранное» в списке производителей
const heartIcons = $(
  ".find-manufacturer-content-box .fanufacturers-all-item-list li img"
);

heartIcons.on("click", function () {
  const $icon = $(this);
  if ($icon.hasClass("active")) {
    $icon.removeClass("active");
    $icon.attr("src", "images/icons/heart-gray.svg");
  } else {
    $icon.addClass("active");
    $icon.attr("src", "images/icons/heart-green-full.svg");
  }
});

// -----------------------------------
// ------ КОЛИЧЕСТВО ТОВАРА (СТР. ТОВАРА)
// -----------------------------------

// Счётчик количества для кнопки «Добавить к заказу» на странице товара
$(document).ready(function () {
  const $addToOrderBtn = $("#add-to-order-btn");
  const $quantitySelector = $("#quantity-selector");
  const $quantityValue = $("#quantity-value");
  const $quantityDecrease = $("#quantity-decrease");
  const $quantityIncrease = $("#quantity-increase");

  let quantity = 1;

  // Show quantity selector when "Добавить к заказу" button is clicked
  $addToOrderBtn.on("click", function () {
    $addToOrderBtn.hide();
    $quantitySelector.removeClass("hidden");
  });

  // Decrease quantity
  $quantityDecrease.on("click", function () {
    if (quantity > 1) {
      quantity--;
      $quantityValue.text(quantity);
    }
  });

  // Increase quantity
  $quantityIncrease.on("click", function () {
    quantity++;
    $quantityValue.text(quantity);
  });
});

// -----------------------------------
// ------ КОЛИЧЕСТВО ТОВАРА (КАРТОЧКИ)
// -----------------------------------

// Счётчик количества в карточках товара (каталог и другие списки)
$(document).ready(function () {
  // Handle "Добавить к заказу" button click for all product cards
  $(document).on("click", ".product-card-btn", function () {
    const $btn = $(this);
    const $card = $btn.closest(".product-card");
    const $quantitySelector = $card.find(".product-card-quantity-selector");

    // Hide button and show quantity selector
    $btn.hide();
    $quantitySelector.removeClass("hidden");
  });

  // Handle decrease quantity button
  $(document).on(
    "click",
    ".product-card-quantity-selector .quantity-btn-minus",
    function () {
      const $btn = $(this);
      const $quantityValue = $btn.siblings(".quantity-value");
      let quantity = parseInt($quantityValue.text()) || 1;

      if (quantity > 1) {
        quantity--;
        $quantityValue.text(quantity);
      }
    }
  );

  // Handle increase quantity button
  $(document).on(
    "click",
    ".product-card-quantity-selector .quantity-btn-plus",
    function () {
      const $btn = $(this);
      const $quantityValue = $btn.siblings(".quantity-value");
      let quantity = parseInt($quantityValue.text()) || 1;

      quantity++;
      $quantityValue.text(quantity);
    }
  );
});
