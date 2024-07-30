"use strict";

///////////////////////////////////////
// Selected Elements
const headerEl = document.querySelector(".header");
const btnNavEl = document.querySelector(".btn-mobile-nav");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const header = document.querySelector(".header");
const navParent = document.querySelector(".nav-container");
const nav = document.querySelector(".nav");
const sections = document.querySelectorAll(".section");
const section2 = document.getElementById("section--2");
const section3 = document.querySelector("#section--3");
const section6 = document.querySelector("#section--6");
const linkBtn = document.querySelector(".nav__links");
const navContainer = document.querySelector(".nav__links");
const imgs = document.querySelectorAll("img[data-src]");
const tabContainer = document.querySelector(".faqs__tab-container");
const tabs = document.querySelectorAll(".faqs__tab");
const tabContents = document.querySelectorAll(".faqs__content");
const cards = document.querySelectorAll(".trainers__card");
const slides = document.querySelectorAll(".slide");
const nextSlideBtn = document.querySelector(".slider__btn--right");
const prevSlideBtn = document.querySelector(".slider__btn--left");
const dotContainer = document.querySelector(".dots");
const footerNav = document.querySelector(".footer");

const navHeight = navParent.getBoundingClientRect().height;

let currentSlide = 0;
let maxSlide = slides.length;

//=============================================================================
// Function Name: openModal
// Description: Opens the modal window and overlay, preventing default behavior.
// Arguments: e - event object
// Return Value: None
//-----------------------------------------------------------------------------
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

//=============================================================================
// Function Name: closeModal
// Description: Closes the modal window and overlay.
// Arguments: e - event object (optional)
// Return Value: None
//-----------------------------------------------------------------------------
const closeModal = function (e) {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

//=============================================================================
// Function Name: scrollTo
// Description: Scrolls to a specific section smoothly.
// Arguments: None
// Return Value: None
//-----------------------------------------------------------------------------
const scrollTo = function () {
  this.scrollIntoView({ behavior: "smooth" });
};

//=============================================================================
// Function Name: openMobileNav
// Description: Opens the mobile navigation.
// Arguments: None
// Return Value: None
//-----------------------------------------------------------------------------
const openMobileNav = function () {
  headerEl.classList.toggle("nav-open");
};

//=============================================================================
// Function Name: openMobileNavKey
// Description: Closes the mobile navigation using 'Esc" key.
// Arguments: e
// Return Value: None
//-----------------------------------------------------------------------------
const openMobileNavKey = function (e) {
  if (e.key === "Escape") headerEl.classList.toggle("nav-open");
};

//=============================================================================
// Function Name: navScrollTo
// Description: Scrolls to the section specified in the clicked nav link.
// Arguments: e - event object
// Return Value: None
//-----------------------------------------------------------------------------
const navScrollTo = function (e) {
  e.preventDefault();
  if (e.target.classList.contains(this)) {
    const section = e.target.getAttribute("href");
    document.querySelector(section).scrollIntoView({ behavior: "smooth" });
  }

  if (e.target.classList.contains(`nav__link`))
    headerEl.classList.toggle("nav-open");
};

//=============================================================================
// Function Name: navOnHover
// Description: Adjusts the opacity of nav links on hover.
// Arguments: e - event object
// Return Value: None
//-----------------------------------------------------------------------------
const navOnHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const target = e.target;
    const siblingLinks = target.closest("nav").querySelectorAll(".nav__link");

    siblingLinks.forEach((link) => {
      if (target !== link) {
        link.style.opacity = this;
      }
    });
  }
};

//=============================================================================
// Function Name: stickyNav
// Description: Toggles sticky class on the nav based on header intersection.
// Arguments: entries - array of IntersectionObserverEntry objects
// Return Value: None
//-----------------------------------------------------------------------------
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) navParent.classList.add("sticky");
  else navParent.classList.remove("sticky");
};

//=============================================================================
// Function Name: loadImgs
// Description: Loads images lazily when they intersect with the viewport.
// Arguments: entries - array of IntersectionObserverEntry objects
//            observer - IntersectionObserver instance
// Return Value: None
//-----------------------------------------------------------------------------
const loadImgs = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

//=============================================================================
// Function Name: revealSection
// Description: Reveals hidden sections when they intersect with the viewport.
// Arguments: entries - array of IntersectionObserverEntry objects
//            observer - IntersectionObserver instance
// Return Value: None
//-----------------------------------------------------------------------------
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

//=============================================================================
// Function Name: lazyLoadAll
// Description: Loads all images within a section when it intersects with the viewport.
// Arguments: entries - array of IntersectionObserverEntry objects
//            observer - IntersectionObserver instance
// Return Value: None
//-----------------------------------------------------------------------------
const lazyLoadAll = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  const galleryImgs = document.querySelectorAll(`.${this}`);
  galleryImgs.forEach((img) => {
    img.src = img.dataset.src;
    img.addEventListener("load", () => img.classList.remove("lazy-img"));
  });
  observer.unobserve(entry.target);
};

//=============================================================================
// Function Name: onClickTab
// Description: Handles tab click events and toggles active tab/content.
// Arguments: e - event object
// Return Value: None
//-----------------------------------------------------------------------------
const onClickTab = function (e) {
  const clickedTab = e.target.closest(".faqs__tab");

  if (!clickedTab) return;

  tabs.forEach((tab) => tab.classList.remove("faqs__tab--active"));
  tabContents.forEach((content) =>
    content.classList.remove("faqs__content--active")
  );

  clickedTab.classList.add("faqs__tab--active");

  document
    .querySelector(`.faqs__content--${clickedTab.dataset.tab}`)
    .classList.add(`faqs__content--active`);
};

//=============================================================================
// Function Name: onHoverSocialIcons
// Description: Translates social icons on hover effect.
// Arguments: e - event object
// Return Value: None
//-----------------------------------------------------------------------------
const onHoverSocialIcons = function (e) {
  if (e.target.classList.contains("social__logo")) {
    const logo = e.target;
    logo.style.transform = `translateY(-${this}px)`;
  }
};

cards.forEach((card) =>
  card.addEventListener("mouseover", onHoverSocialIcons.bind(10))
);
cards.forEach((card) =>
  card.addEventListener("mouseout", onHoverSocialIcons.bind(0))
);

//=============================================================================
// Function Name: slide
// Description: Initializes and controls the slider functionality.
// Arguments: None
// Return Value: None
//-----------------------------------------------------------------------------
const slide = function () {
  const goToSlide = function (slide) {
    slides.forEach((slde, indx) => {
      slde.style.transform = `translateX(${100 * (indx - slide)}%)`;
    });
  };

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide='${i}'></button>`
      );
    });
  };

  const activeDots = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activeDots(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activeDots(currentSlide);
  };

  const arrowFunction = function (e) {
    e.key === "ArrowRight" && nextSlide();
    e.key === "ArrowLeft" && prevSlide();
  };

  const dotNavigate = function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDots(slide);
    }
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activeDots(0);
  };

  init();

  nextSlideBtn.addEventListener("click", nextSlide);
  prevSlideBtn.addEventListener("click", prevSlide);
  document.addEventListener("keydown", arrowFunction);
  dotContainer.addEventListener("click", dotNavigate);
};

//=============================================================================
// Function Name: onHoverFooterNav
// Description: Changes the color of footer links on hover.
// Arguments: e - event object
// Return Value: None
//-----------------------------------------------------------------------------
const onHoverFooterNav = function (e) {
  if (e.target.classList.contains("footer__link")) {
    const target = e.target;
    const siblingTargets = target
      .closest(".footer__item")
      .querySelectorAll(".footer__link");

    siblingTargets.forEach((link) => (link.style.color = this));
  }
};

///////////////////////////////////////
// Event Listeners

// Modal
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Scroll to
btnScrollTo.addEventListener("click", scrollTo.bind(section2));

// Nav Scroll to
linkBtn.addEventListener("click", navScrollTo.bind("nav__link"));

// Nav Hover
navContainer.addEventListener("mouseout", navOnHover.bind(1));
navContainer.addEventListener("mouseover", navOnHover.bind(0.5));

// Open mobile navigation
btnNavEl.addEventListener("click", openMobileNav);
btnNavEl.addEventListener("keydown", openMobileNav);

// Sticky Nav
const navObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
  // rootMargin: `-50%`,
});

navObserver.observe(header);

// Lazy Loading
const imgObserver = new IntersectionObserver(loadImgs, {
  root: null,
  threshold: 0,
  rootMargin: "100px",
});

imgs.forEach((img) => imgObserver.observe(img));

// Section hidden
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Trainers Lazy Loading
const lazyTrainersObserver = new IntersectionObserver(
  lazyLoadAll.bind("trainers__img"),
  {
    root: null,
    threshold: 0.15,
  }
);

lazyTrainersObserver.observe(section3);

// Tabbed container
tabContainer.addEventListener("click", onClickTab);

// Slider
slide();

// Gallery lazy loading
const lazyGalleryObserver = new IntersectionObserver(
  lazyLoadAll.bind("gallery__img"),
  {
    root: null,
    threshold: 0.15,
  }
);

lazyGalleryObserver.observe(section6);

// Footer Nav Hover Effect
footerNav.addEventListener("mouseover", onHoverFooterNav.bind("#7bc043"));
footerNav.addEventListener("mouseout", onHoverFooterNav.bind("#eee"));

// Footer Scroll
footerNav.addEventListener("click", navScrollTo.bind("footer__link"));
