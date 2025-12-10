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
// Сначала проверяем, что все нужные элементы есть в DOM, чтобы slick не упал с ошибкой
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
// Находим каждый слайдер новостей и настраиваем его логику табов
$(".block-news-slider").each(function () {
  const $slider = $(this);
  // Родительский контейнер, в котором лежат и слайдер, и контент
  // Работает и для блоков .block-news, и для .warehouse-content-section-content
  const $container = $slider.parent();
  const $sliderButtons = $slider.find(".block-news-slider-button");
  const $contentContainer = $container.find(".block-news-content");
  const $contentItems = $contentContainer.find(".block-news-content-main");
  const $contentDescription = $container.find(
    ".block-news-content-description"
  );

  // Скрываем все элементы контента внутри этого слайдера
  $contentItems.hide();

  // Находим и показываем контент, соответствующий активной кнопке
  const activeIndex = $sliderButtons.filter(".active").data("tab");
  const $activeContent = $contentContainer.find(
    `[data-tabContent="${activeIndex}"]`
  );

  if ($activeContent.length) {
    $activeContent.show();
    resizeBlockNewsContentDescription($activeContent, $contentDescription);
  }

  // Обработка кликов по кнопкам-таба внутри текущего слайдера
  $sliderButtons.on("click", function () {
    const $clickedButton = $(this);
    const newActiveIndex = $clickedButton.data("tab");

    // Убираем класс active у всех кнопок этого слайдера
    $sliderButtons.removeClass("active");
    // Добавляем класс active к нажатой кнопке
    $clickedButton.addClass("active");

    // Скрываем весь контент
    $contentItems.hide();
    // Показываем только контент, соответствующий выбранному табу
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
  // Для каждого слайдера новостей пересчитываем высоту описания под активный таб
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
    // Если слайдер ещё не инициализирован, запускаем slick
    if (!$slider.hasClass("slick-initialized")) {
      $slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
      });
    }
  } else {
    // При широком экране уничтожаем slick, только если он был инициализирован
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
// Конец логики списка в мобильном меню

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
  // Сначала закрываем все открытые меню
  desktopMenu.removeClass("active");
  desktopMenuItems.removeClass("active");

  // Открываем конкретное меню по переданному ID
  $(`#${menuId}`).addClass("active");
  menuItem.addClass("active");

  // Блокируем прокрутку страницы под открытым меню и поднимаем страницу к началу
  $(document.body).css("overflow", "hidden");
  $(window).scrollTop(0);
}

function closeDesktopMenu() {
  // Закрываем все меню и сбрасываем активные элементы
  desktopMenu.removeClass("active");
  desktopMenuItems.removeClass("active");

  $("#catalog-menu-icon").removeClass("d-none");
  $("#close-catalog-menu-icon").addClass("d-none");

  // Возвращаем стандартную прокрутку страницы
  $(document.body).css("overflow", "auto");
}

// Обработка кликов по пунктам верхнего меню (открытие/закрытие подменю)
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
      // Если меню уже открыто, при повторном клике — закрываем
      closeDesktopMenu();
    } else {
      // Иначе открываем выбранное меню
      openDesktopMenu(menuId, $menuItem);
    }
  }
});

// Закрываем меню при клике по фону / подложке вокруг контента меню
desktopMenu.on("click", function (e) {
  // Если клик пришёлся по самому контейнеру (фону), а не по содержимому
  if (
    $(e.target).is(desktopMenu) ||
    !$(e.target).closest(".desktop-menu-content").length
  ) {
    closeDesktopMenu();
  }
});

// Не даём меню закрываться при клике внутри его контента
desktopMenu.find(".desktop-menu-content").on("click", function (e) {
  e.stopPropagation();
});

// Закрытие меню по клавише Escape
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
  // Открыть конкретное модальное окно по его ID
  open: function (modalId) {
    const modal = $(`#${modalId}`);
    if (modal.length) {
      modal.addClass("active");
      $(document.body).css("overflow", "hidden");
    }
  },

  // Закрыть конкретное модальное окно по его ID
  close: function (modalId) {
    const modal = $(`#${modalId}`);
    if (modal.length) {
      modal.removeClass("active");
      $(document.body).css("overflow", "auto");
    }
  },

  // Закрыть все активные модальные окна сразу
  closeAll: function () {
    $(".modal-overlay.active").each(function () {
      $(this).removeClass("active");
    });
    $(document.body).css("overflow", "auto");
  },

  // Инициализация обработчиков для модальных окон
  init: function () {
    // Клик по элементам с атрибутом data-modal — открываем указанную модалку
    $(document).on("click", "[data-modal]", function (e) {
      e.preventDefault();
      const modalId = $(this).data("modal");
      ModalManager.open(modalId);
    });

    // Клик по элементам с атрибутом data-close-modal — закрываем конкретную модалку
    $(document).on("click", "[data-close-modal]", function (e) {
      e.preventDefault();
      const modalId = $(this).data("close-modal");
      ModalManager.close(modalId);
    });

    // Кнопки внутри модального окна, которые должны его закрывать
    $(document).on("click", ".modal-content [data-modal-close]", function (e) {
      e.preventDefault();
      const modal = $(this).closest(".modal-overlay");
      if (modal.length) {
        ModalManager.close(modal.attr("id"));
      }
    });

    // Закрываем модальное окно по клику на фон (оверлей) вокруг контента
    $(document).on("click", ".modal-overlay", function (e) {
      if ($(e.target).is($(this))) {
        const modalId = $(this).attr("id");
        ModalManager.close(modalId);
      }
    });

    // Не закрываем модалку при клике по её контенту
    $(document).on("click", ".modal-content", function (e) {
      e.stopPropagation();
    });

    // Закрываем последнюю (верхнюю) активную модалку по клавише Escape
    $(document).on("keydown", function (e) {
      if (e.key === "Escape") {
        const activeModals = $(".modal-overlay.active");
        if (activeModals.length > 0) {
          // Закрываем последнюю открытую (верхнюю по DOM) модалку
          const lastModal = activeModals.last();
          ModalManager.close(lastModal.attr("id"));
        }
      }
    });
  },
};

// Инициализация системы модальных окон при загрузке DOM
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

  // Демонстрационный список подсказок (можно заменить на реальные данные с сервера)
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

  // Фильтрация подсказок по введённому тексту
  function filterSuggestions(query) {
    if (!query || query.trim() === "") {
      return [];
    }

    const lowerQuery = query.toLowerCase();
    return allSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(lowerQuery)
    );
  }

  // Отрисовка списка подсказок в выпадающем блоке
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

  // Обработка ввода в поле поиска – пересчёт подсказок
  searchInput.on("input", function () {
    const query = $(this).val();
    const suggestions = filterSuggestions(query);
    displaySuggestions(suggestions);
  });

  // При фокусе в поле поиска показываем подсказки (если они есть)
  searchInput.on("focus", function () {
    const query = $(this).val();
    const suggestions = filterSuggestions(query);
    // Добавляем класс активности только если есть варианты подсказок
    if (suggestions.length > 0) {
      displaySuggestions(suggestions);
    } else {
      // Если подсказок нет – убираем подсветку/открытие дропдауна
      searchLabel.removeClass("active");
      searchDropdown.removeClass("active");
    }
  });

  // При потере фокуса убираем активное состояние подписи (с задержкой для клика по подсказке)
  searchInput.on("blur", function () {
    // Делаем небольшую задержку, чтобы успел отработать клик по подсказке
    setTimeout(function () {
      if (!searchDropdown.hasClass("active")) {
        searchLabel.removeClass("active");
      }
    }, 200);
  });

  // Закрываем дропдаун, если клик был вне области поиска
  $(document).on("click", function (e) {
    if (
      !$(e.target).closest(".search-wrapper").length &&
      !$(e.target).is(".search-wrapper")
    ) {
      searchDropdown.removeClass("active");
      searchLabel.removeClass("active");
    }
  });

  // Навигация по подсказкам с клавиатуры (стрелки, Enter, Escape)
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

  // Динамически добавляем CSS-правило для подсвеченного элемента подсказки
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

  // Демонстрационный набор подсказок для страницы поиска (можно заменить на данные с сервера)
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

  // Фильтрация подсказок на странице поиска по введённому тексту
  function filterSearchPageSuggestions(query) {
    if (!query || query.trim() === "") {
      return [];
    }

    const lowerQuery = query.toLowerCase();
    return allSearchPageSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(lowerQuery)
    );
  }

  // Отрисовка подсказок в выпадающем списке на странице поиска
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

  // Обработка ввода в поле поиска на отдельной странице
  searchPageInput.on("input", function () {
    const query = $(this).val();
    const suggestions = filterSearchPageSuggestions(query);
    displaySearchPageSuggestions(suggestions);
  });

  // Обработка фокуса на поле поиска – показать/скрыть подсказки
  searchPageInput.on("focus", function () {
    const query = $(this).val();
    const suggestions = filterSearchPageSuggestions(query);
    // Добавляем активный класс, только если есть подсказки
    if (suggestions.length > 0) {
      displaySearchPageSuggestions(suggestions);
    } else {
      // Если подсказок нет — убираем активное состояние
      searchPageLabel.removeClass("active");
      searchPageDropdown.removeClass("active");
    }
  });

  // При потере фокуса даём время на клик по подсказке и затем скрываем активное состояние
  searchPageInput.on("blur", function () {
    // Задержка нужна, чтобы сначала отработал клик по подсказке
    setTimeout(function () {
      if (!searchPageDropdown.hasClass("active")) {
        searchPageLabel.removeClass("active");
      }
    }, 200);
  });

  // Закрываем выпадающий блок при клике вне поискового блока
  $(document).on("click", function (e) {
    if (
      !$(e.target).closest(".search-page-wrapper").length &&
      !$(e.target).is(".search-page-wrapper")
    ) {
      searchPageDropdown.removeClass("active");
      searchPageLabel.removeClass("active");
    }
  });

  // Навигация по подсказкам на странице поиска с клавиатуры
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

  // Добавляем CSS-правило для подсвеченного элемента в списке подсказок
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
  // Инициализируем иконки подкатегорий: для активных сразу ставим иконку «минус»
  $(".catalog-filter-subsection.active .catalog-filter-subsection-toggle").each(
    function () {
      $(this).removeClass("fa-plus").addClass("fa-minus");
    }
  );

  // Открытие/закрытие основных секций фильтра
  $(".catalog-filter-section-header").on("click", function () {
    const section = $(this).closest(".catalog-filter-section");
    section.toggleClass("active");
  });

  // Открытие/закрытие подкатегорий фильтра
  $(".catalog-filter-subsection-header").on("click", function () {
    const subsection = $(this).closest(".catalog-filter-subsection");
    const toggleIcon = subsection.find(".catalog-filter-subsection-toggle");

    subsection.toggleClass("active");

    // Переключаем иконку «плюс/минус» в зависимости от состояния
    if (subsection.hasClass("active")) {
      toggleIcon.removeClass("fa-plus").addClass("fa-minus");
    } else {
      toggleIcon.removeClass("fa-minus").addClass("fa-plus");
    }
  });

  // Сброс фильтра к начальному состоянию
  $(".catalog-filter-reset").on("click", function (e) {
    e.preventDefault();

    // Закрываем все секции и подкатегории и возвращаем иконки в состояние «плюс»
    $(".catalog-filter-section.active, .catalog-filter-subsection.active").each(
      function () {
        const $this = $(this);
        const toggleIcon = $this.find(".catalog-filter-subsection-toggle");

        // Возвращаем иконку в состояние «плюс»
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

  // Логика клика по конкретной странице пагинации
  $(".catalog-pagination-number").on("click", function (e) {
    e.preventDefault();

    // Снимаем классы active/current со всех номеров
    $(".catalog-pagination-number").removeClass("active current");

    // Помечаем кликнутый номер как текущий
    $(this).addClass("current");

    // Если есть предыдущий номер — подсвечиваем его как «активный»
    const prevNumber = $(this).prev(".catalog-pagination-number");
    if (prevNumber.length && !prevNumber.hasClass("current")) {
      prevNumber.addClass("active");
    }
  });

  // Переход по стрелке «назад» в пагинации
  $(".catalog-pagination-prev").on("click", function (e) {
    e.preventDefault();
    const current = $(".catalog-pagination-number.current");
    const prev = current.prev(".catalog-pagination-number");

    if (prev.length) {
      current.removeClass("current");
      prev.removeClass("active").addClass("current");

      // Обновляем состояние: номер перед текущим тоже подсвечиваем как «активный»
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
  // Обработка кликов по кнопкам выбора упаковки на странице товара
  $(".product-page-packaging-btn").on("click", function (e) {
    e.preventDefault();
    const $btn = $(this);
    const $allButtons = $(".product-page-packaging-btn");
    const isActive = $btn.hasClass("product-page-packaging-btn-active");

    // Если клик пришёл по иконке «закрыть», снимаем активное состояние с кнопки
    if ($(e.target).hasClass("product-page-packaging-close")) {
      $btn.removeClass("product-page-packaging-btn-active");
      $btn.find(".product-page-packaging-close").remove();
      return;
    }

    // Снимаем активный класс и иконку закрытия со всех кнопок
    $allButtons.removeClass("product-page-packaging-btn-active");
    $allButtons.find(".product-page-packaging-close").remove();

    // Добавляем активный класс и иконку закрытия только к нажатой кнопке
    if (!isActive) {
      $btn.addClass("product-page-packaging-btn-active");
      if (!$btn.find(".product-page-packaging-close").length) {
        $btn.append(
          '<i class="fa-solid fa-xmark product-page-packaging-close"></i>'
        );
      }
    }
  });

  // Переключение кнопок «Область применения» на странице товара
  $(".product-page-application-btn").on("click", function () {
    $(".product-page-application-btn").removeClass("active");
    $(this).addClass("active");
  });

  // Переключатель «показать/скрыть» для длинного описания товара
  $(".product-page-description-toggle").on("click", function (e) {
    e.preventDefault();
    const $toggle = $(this);
    const $text = $(".product-page-description-text");

    if ($text.text().includes("....")) {
      // Полностью раскрываем текст описания
      $text.text(
        "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору опочить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия."
      );
      $toggle.text("Скрыть");
    } else {
      // Сворачиваем текст описания до короткой версии
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

  // При клике по кнопке «Добавить к заказу» скрываем её и показываем счётчик
  $addToOrderBtn.on("click", function () {
    $addToOrderBtn.hide();
    $quantitySelector.removeClass("hidden");
  });

  // Уменьшаем количество (не даём опуститься ниже 1)
  $quantityDecrease.on("click", function () {
    if (quantity > 1) {
      quantity--;
      $quantityValue.text(quantity);
    }
  });

  // Увеличиваем количество
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
  // Обработка клика по кнопке «Добавить к заказу» для всех карточек товара
  $(document).on("click", ".product-card-btn", function () {
    const $btn = $(this);
    const $card = $btn.closest(".product-card");
    const $quantitySelector = $card.find(".product-card-quantity-selector");

    // Скрываем кнопку и показываем блок с количеством
    $btn.hide();
    $quantitySelector.removeClass("hidden");
  });

  // Обработка уменьшения количества в карточке товара
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

  // Обработка увеличения количества в карточке товара
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

// -----------------------------------
// ------ CUSTOM SELECT (SELECT2-LIKE) --
// -----------------------------------

// Custom Select Component - Select2-like functionality
$(document).ready(function () {
  function initCustomSelect($wrapper) {
    const $select = $wrapper.find(".custom-select-hidden");
    const $trigger = $wrapper.find(".custom-select-trigger");
    const $selected = $wrapper.find(".custom-select-selected");
    const $dropdown = $wrapper.find(".custom-select-dropdown");
    const $options = $wrapper.find(".custom-select-options");
    const $searchInput = $wrapper.find(".custom-select-search-input");

    let allOptions = [];
    let filteredOptions = [];
    let highlightedIndex = -1;
    const wrapperId =
      "custom-select-" + Math.random().toString(36).substr(2, 9);
    $wrapper.attr("data-select-id", wrapperId);

    // Initialize options from select element
    function initOptions() {
      allOptions = [];
      $select.find("option").each(function () {
        const value = $(this).val();
        const text = $(this).text();
        allOptions.push({ value, text });
      });
      filteredOptions = [...allOptions];
      renderOptions();
    }

    // Render options in dropdown
    function renderOptions() {
      $options.empty();

      if (filteredOptions.length === 0) {
        $options.html(
          '<div class="custom-select-no-results">Ничего не найдено</div>'
        );
        return;
      }

      filteredOptions.forEach((option, index) => {
        const $option = $('<div class="custom-select-option"></div>')
          .text(option.text)
          .data("value", option.value)
          .data("index", index);

        if (option.value === $select.val()) {
          $option.addClass("selected");
        }

        $option.on("click", function () {
          selectOption(option.value, option.text);
        });

        $options.append($option);
      });

      highlightedIndex = -1;
    }

    // Select an option
    function selectOption(value, text) {
      $select.val(value);
      $selected.text(text).removeClass("placeholder");
      $dropdown.removeClass("active");
      $trigger.removeClass("active");
      $searchInput.val("");
      filteredOptions = [...allOptions];
      renderOptions();
      $select.trigger("change");
    }

    // Filter options based on search
    function filterOptions(query) {
      if (!query || query.trim() === "") {
        filteredOptions = [...allOptions];
      } else {
        const lowerQuery = query.toLowerCase();
        filteredOptions = allOptions.filter((option) =>
          option.text.toLowerCase().includes(lowerQuery)
        );
      }
      renderOptions();
      highlightedIndex = -1;
    }

    // Open dropdown
    function openDropdown() {
      $dropdown.addClass("active");
      $trigger.addClass("active");

      // Check if dropdown goes below viewport
      setTimeout(function () {
        const triggerRect = $trigger[0].getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - triggerRect.bottom;
        const spaceAbove = triggerRect.top;

        // Estimate dropdown height (search + options)
        const estimatedDropdownHeight =
          60 + Math.min(filteredOptions.length * 48, 300);

        // If dropdown doesn't fit below, open it upward
        if (spaceBelow < estimatedDropdownHeight && spaceAbove > spaceBelow) {
          $dropdown.addClass("open-up");
          // Set max-height based on available space above
          const maxHeight = Math.min(spaceAbove - 20, 300);
          $dropdown.css("max-height", maxHeight + "px");
        } else {
          $dropdown.removeClass("open-up");
          // Reset max-height for normal dropdown
          $dropdown.css("max-height", "");
        }
      }, 0);

      $searchInput.focus();
      renderOptions();
    }

    // Close dropdown
    function closeDropdown() {
      $dropdown.removeClass("active");
      $dropdown.removeClass("open-up");
      $dropdown.css("max-height", "");
      $trigger.removeClass("active");
      $searchInput.val("");
      filteredOptions = [...allOptions];
      renderOptions();
      highlightedIndex = -1;
    }

    // Highlight option
    function highlightOption(index) {
      $options.find(".custom-select-option").removeClass("highlighted");
      if (index >= 0 && index < filteredOptions.length) {
        $options
          .find(".custom-select-option")
          .eq(index)
          .addClass("highlighted")
          .get(0)
          ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }

    // Initialize
    initOptions();

    // Set initial selected value
    const initialValue = $select.val();
    if (initialValue) {
      const initialOption = allOptions.find(
        (opt) => opt.value === initialValue
      );
      if (initialOption) {
        $selected.text(initialOption.text).removeClass("placeholder");
      }
    } else {
      $selected.addClass("placeholder");
    }

    // Toggle dropdown on trigger click
    $trigger.on("click", function (e) {
      e.stopPropagation();
      if ($dropdown.hasClass("active")) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    // Search input handler
    $searchInput.on("input", function () {
      const query = $(this).val();
      filterOptions(query);
    });

    // Keyboard navigation
    $searchInput.on("keydown", function (e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        highlightedIndex =
          highlightedIndex < filteredOptions.length - 1
            ? highlightedIndex + 1
            : 0;
        highlightOption(highlightedIndex);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        highlightedIndex =
          highlightedIndex > 0
            ? highlightedIndex - 1
            : filteredOptions.length - 1;
        highlightOption(highlightedIndex);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length
        ) {
          const option = filteredOptions[highlightedIndex];
          selectOption(option.value, option.text);
        }
      } else if (e.key === "Escape") {
        closeDropdown();
      }
    });

    // Close dropdown when clicking outside the select wrapper
    $(document).on("click." + wrapperId, function (e) {
      // Check if dropdown is active
      if ($dropdown.hasClass("active")) {
        // Check if click is outside the wrapper
        const clickedInsideWrapper = $(e.target).closest($wrapper).length > 0;

        // Close if clicked outside wrapper
        if (!clickedInsideWrapper) {
          closeDropdown();
        }
      }
    });

    // Prevent dropdown from closing when clicking inside dropdown content
    $dropdown.on("click", function (e) {
      e.stopPropagation();
    });
  }

  // Initialize all custom selects on the page
  $(".custom-select-wrapper").each(function () {
    initCustomSelect($(this));
  });
});

// -----------------------------------
// ------ HEADER VIDEO PLAYER --------
// -----------------------------------

// Video player controls for header video
$(document).ready(function () {
  const $video = $("#header-video");
  const $playPauseBtn = $("#header-video-play-pause");
  const $fullscreenBtn = $("#header-video-fullscreen");
  const $playPauseIcon = $playPauseBtn.find("i");

  // Check if video element exists
  if (!$video.length) {
    return;
  }

  // Initialize video state - start playing if autoplay is set
  const videoElement = $video[0];
  const $coverImage = $(".header-content-images-img");

  // Initially show cover image
  if ($coverImage.length) {
    $coverImage.css("opacity", "1");
  }

  // Ensure video plays on load if autoplay attribute is present
  if ($video.attr("autoplay") !== undefined) {
    videoElement
      .play()
      .then(function () {
        // If autoplay succeeds, hide cover image and show video
        $video.addClass("playing");
        if ($coverImage.length) {
          $coverImage.css("opacity", "0");
        }
        updatePlayPauseIcon();
      })
      .catch(function (error) {
        console.log("Autoplay prevented:", error);
        // If autoplay fails, keep cover image visible
        if ($coverImage.length) {
          $coverImage.css("opacity", "1");
        }
      });
  }

  // Update play/pause icon based on video state and show/hide cover image
  function updatePlayPauseIcon() {
    if (videoElement.paused) {
      $playPauseIcon.removeClass("fa-pause").addClass("fa-play");
      $video.removeClass("playing");
      // Show cover image when paused
      if ($coverImage.length) {
        $coverImage.css("opacity", "1");
      }
    } else {
      $playPauseIcon.removeClass("fa-play").addClass("fa-pause");
      $video.addClass("playing");
      // Hide cover image when playing
      if ($coverImage.length) {
        $coverImage.css("opacity", "0");
      }
    }
  }

  // Toggle play/pause
  $playPauseBtn.on("click", function (e) {
    e.stopPropagation();
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
    updatePlayPauseIcon();
  });

  // Update icon when video state changes
  videoElement.addEventListener("play", updatePlayPauseIcon);
  videoElement.addEventListener("pause", updatePlayPauseIcon);

  // Handle video load - if autoplay works, hide cover image
  videoElement.addEventListener("playing", function () {
    updatePlayPauseIcon();
  });

  // Fullscreen functionality
  $fullscreenBtn.on("click", function (e) {
    e.stopPropagation();

    if (!document.fullscreenElement) {
      // Enter fullscreen
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if (videoElement.webkitRequestFullscreen) {
        videoElement.webkitRequestFullscreen();
      } else if (videoElement.mozRequestFullScreen) {
        videoElement.mozRequestFullScreen();
      } else if (videoElement.msRequestFullscreen) {
        videoElement.msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  });

  // Update fullscreen icon when entering/exiting fullscreen
  document.addEventListener("fullscreenchange", function () {
    const $fullscreenIcon = $fullscreenBtn.find("i");
    if (document.fullscreenElement) {
      $fullscreenIcon.removeClass("fa-expand").addClass("fa-compress");
    } else {
      $fullscreenIcon.removeClass("fa-compress").addClass("fa-expand");
    }
  });

  document.addEventListener("webkitfullscreenchange", function () {
    const $fullscreenIcon = $fullscreenBtn.find("i");
    if (document.webkitFullscreenElement) {
      $fullscreenIcon.removeClass("fa-expand").addClass("fa-compress");
    } else {
      $fullscreenIcon.removeClass("fa-compress").addClass("fa-expand");
    }
  });

  document.addEventListener("mozfullscreenchange", function () {
    const $fullscreenIcon = $fullscreenBtn.find("i");
    if (document.mozFullScreenElement) {
      $fullscreenIcon.removeClass("fa-expand").addClass("fa-compress");
    } else {
      $fullscreenIcon.removeClass("fa-compress").addClass("fa-expand");
    }
  });

  document.addEventListener("msfullscreenchange", function () {
    const $fullscreenIcon = $fullscreenBtn.find("i");
    if (document.msFullscreenElement) {
      $fullscreenIcon.removeClass("fa-expand").addClass("fa-compress");
    } else {
      $fullscreenIcon.removeClass("fa-compress").addClass("fa-expand");
    }
  });

  // Initial icon state
  updatePlayPauseIcon();
});
