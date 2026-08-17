// dark mode toggle
const htmlDOM = document.querySelector("html");
const btnTheme = document.querySelector("#theme-toggle-button");

btnTheme.addEventListener("click", function () {
  htmlDOM.classList.toggle("dark");
});

//  gear " Setting side bar " translate xfull remove toggle , right : 20rem btn gear

const btnGear = document.querySelector("#settings-toggle");
const sideBar = document.querySelector("#settings-sidebar");
const btnCloseSide = document.querySelector("#close-settings");

btnGear.addEventListener("click", function (e) {
  btnGear.style.right = "20rem";
  sideBar.classList.remove("translate-x-full");
});

btnCloseSide.addEventListener("click", function () {
  btnGear.style.right = "0px";
  sideBar.classList.add("translate-x-full");
});

//choose Font

const btnlang = document.querySelectorAll('[role="radio"]');
const bodyDOM = document.querySelector("body");
function setActive(selected) {
  btnlang.forEach((item) => {
    item.classList.remove("active", "border-primary");
    item.classList.add("border-slate-200", "dark:border-slate-700");
  });

  selected.classList.add("active", "border-primary");
  selected.classList.remove("border-slate-200", "dark:border-slate-700");
  saveToStorage("font", selected);
}

function changeLang(value) {
  bodyDOM.classList.remove("font-cairo", "font-tajawal", "font-alexandria");
  bodyDOM.classList.add("font-" + value);

  saveToStorage("lastLang", value);
}

btnlang[0].addEventListener("click", function () {
  setActive(btnlang[0]);
  changeLang(btnlang[0].getAttribute("data-font"));
});

btnlang[1].addEventListener("click", function () {
  setActive(btnlang[1]);
  changeLang(btnlang[1].getAttribute("data-font"));
});

btnlang[2].addEventListener("click", function () {
  setActive(btnlang[2]);
  changeLang(btnlang[2].getAttribute("data-font"));
});

function saveToStorage(name, value) {
  sessionStorage.setItem(name, JSON.stringify(value));
}

function getFromStorage(name) {
  return JSON.parse(sessionStorage.getItem(name));
}

for (var i = 0; i < btnlang.length; i++) {
  var lastFont = getFromStorage("lastLang");
  if (!lastFont) {
    setActive(btnlang[1]);
    changeLang(btnlang[1].getAttribute("data-font"));
  }
  if (btnlang[i].getAttribute("data-font") == lastFont) {
    setActive(btnlang[i]);
    changeLang(btnlang[i].getAttribute("data-font"));
  }
}

// color primary Secondary
const themeDOM = document.querySelector("#theme-colors-grid");
const colorsList = [
  {
    name: "Purple Blue",
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#a855f7",
  },
  {
    name: "Pink Orange",
    primary: "#ec4899",
    secondary: "#f97316",
    accent: "#fb923c",
  },
  {
    name: "Green Emerald",
    primary: "#10b981",
    secondary: "#059669",
    accent: "#34d399",
  },
  {
    name: "Blue Cyan",
    primary: "#3b82f6",
    secondary: "#06b6d4",
    accent: "#22d3ee",
  },
  {
    name: "Red Rose",
    primary: "#ef4444",
    secondary: "#f43f5e",
    accent: "#fb7185",
  },
  {
    name: "Amber Orange",
    primary: "#f59e0b",
    secondary: "#ea580c",
    accent: "#fbbf24",
  },
];

function setRootVariable(variableName, value) {
  document.documentElement.style.setProperty(variableName, value);
}

display();

function display() {
  var cartona = "";
  for (var i = 0; i < colorsList.length; i++) {
    cartona += `  <div  class ="theme-color w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm" title ="${colorsList[i].name}" data-primary="${colorsList[i].primary}" data-secondary="${colorsList[i].secondary}" style="background-color: ${colorsList[i].primary};"
> </div>  `;
  }

  themeDOM.innerHTML = cartona;
}

themeDOM.addEventListener("click", function (e) {
  const color = e.target.closest(".theme-color");

  if (!color) return;

  const primary = color.dataset.primary;
  const secondary = color.dataset.secondary;

  setRootVariable("--color-primary", primary);
  setRootVariable("--color-secondary", secondary);
});

// reset

var btnRest = document.querySelector("#reset-settings");

btnRest.addEventListener("click", function () {
  setRootVariable("--color-primary", colorsList[0].primary);
  setRootVariable("--color-secondary", colorsList[0].secondary);

  setActive(btnlang[1]);
  changeLang(btnlang[1].getAttribute("data-font"));
  btnGear.style.right = "0px";
  sideBar.classList.add("translate-x-full");
});

// Scroll to up
const btnScrollToUp = document.querySelector("#scroll-to-top");

window.addEventListener("scroll", function () {
  if (window.scrollY > window.innerHeight) {
    btnScrollToUp.classList.remove("opacity-0", "invisible");
    btnScrollToUp.classList.add("opacity-100");
  } else {
    btnScrollToUp.classList.remove("opacity-100");
    btnScrollToUp.classList.add("opacity-0", "invisible");
  }
});

btnScrollToUp.addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

// Scroll down active Nav
const sectionDOM = document.querySelectorAll("section");
window.addEventListener("scroll", function () {
  const scrollY = window.pageYOffset;

  sectionDOM.forEach((section) => {
    var sectionHeight = section.offsetHeight;
    var sectionTop = section.offsetTop - 100;
    var id = section.getAttribute("id");
    const nav = document.querySelector(`[role="menuitem"][href="#${id}"]`);
    if (!nav) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      nav.classList.add("active");
    } else {
      nav.classList.remove("active");
    }
  });
});

// Carousel next-testimonial and prev-testimonial buttons

const btnNextTestimonial = document.querySelector("#next-testimonial");
const btnPrevTestimonial = document.querySelector("#prev-testimonial");
const testimonialCarousel = document.querySelector("#testimonials-carousel");
const testimonialDOM = document.querySelectorAll(".testimonial-card");
const indicator = document.querySelectorAll(".carousel-indicator");

let currentTestimonial = 0;

function updateCarouselShownCards() {
  if (window.innerWidth >= 1024) {
    return 3;
  } else if (window.innerWidth >= 768) {
    return 2;
  } else {
    return 1;
  }
}

btnNextTestimonial.addEventListener("click", function () {
  const visibleTestimonials = updateCarouselShownCards();
  const maxIndex = testimonialDOM.length - visibleTestimonials;

  if (currentTestimonial === maxIndex) {
    console.log(maxIndex);
    currentTestimonial = 0;
    testimonialCarousel.style.transform = `translateX(${currentTestimonial * testimonialDOM[0].offsetWidth}px)`;
  }

  if (currentTestimonial < maxIndex) {
    currentTestimonial++;
    testimonialCarousel.style.transform = `translateX(${currentTestimonial * testimonialDOM[0].offsetWidth}px)`;
  }
});

btnPrevTestimonial.addEventListener("click", function () {
  const visibleTestimonials = updateCarouselShownCards();
  const maxIndex = testimonialDOM.length - visibleTestimonials;
  if (currentTestimonial === 0) {
    console.log(maxIndex);
    currentTestimonial = maxIndex + 1;
    testimonialCarousel.style.transform = `translateX(${currentTestimonial * testimonialDOM[0].offsetWidth}px)`;
  }
  if (currentTestimonial > 0) {
    currentTestimonial--;
    testimonialCarousel.style.transform = `translateX(${currentTestimonial * testimonialDOM[0].offsetWidth}px)`;
  }
});

indicator.forEach(function (indicator) {
  indicator.addEventListener("click", () => {
    currentTestimonial = Number(indicator.dataset.index);
    testimonialCarousel.style.transform = `translateX(${currentTestimonial * testimonialDOM[0].offsetWidth}px)`;
  });
});

//  portfolio-Filters
const filterBtns = document.querySelectorAll(".portfolio-filter");
const portfolioDivs = document.querySelectorAll(
  "#portfolio-grid .portfolio-item",
);

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const filterBtn = e.target.closest(".portfolio-filter");

    portfolioDivs.forEach(function (item) {
      const category = item.dataset.category;

      if (category === filterBtn.dataset.filter || filterBtn.dataset.filter === "all") {
        item.classList.add("block");
        item.classList.remove("hidden");
      } else {
        item.classList.remove("block");
        item.classList.add("hidden");
      }
    });
  });
});
