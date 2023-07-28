// DOM Variables
const timeUnits = document.querySelectorAll("#events .remaining-time .unit h1");
const stats = document.getElementById("stats");
const headings = document.querySelectorAll("#stats .holder .stat h1");
const skillsSection = document.getElementById("skills");
const lastNavLink = document.querySelector("header .main-nav > li:last-child");
const megaMenu = document.querySelector(
  "header .main-nav > li:last-child .mega-menu"
);
// ============================================
// Toggle Mega menu
lastNavLink.addEventListener("click", (e) => {
  e.stopPropagation();
  megaMenu.classList.toggle("show-mega-menu");
});

document.body.addEventListener("click", () => {
  megaMenu.classList.remove("show-mega-menu");
});
// ============================================

// Show skills progresses whenever "Our skills" section is reached
let progressesShown = false;

window.addEventListener("scroll", () => {
  if (!progressesShown) {
    const skillProgresses = document.querySelectorAll(
      ".skills .technologies .tech .progress span"
    );

    if (
      this.scrollY + this.innerHeight >=
      skillsSection.offsetHeight + skillsSection.offsetTop
    ) {
      progressesShown = true;
      skillProgresses.forEach(
        (progress) => (progress.style.width = `${progress.dataset.width}%`)
      );
    }
  }
});
// ============================================

// The count down of the events section
const getYears = (date) => {
  const yearOfMilliSeconds = 1000 * 60 * 60 * 24 * 365.25;
  return {
    years: Math.floor(date / yearOfMilliSeconds),
    remDays: date % yearOfMilliSeconds,
  };
};

const getDays = (date) => {
  const dayOfMilliSeconds = 1000 * 60 * 60 * 24;

  return {
    days: Math.floor(date / dayOfMilliSeconds),
    remHours: date % dayOfMilliSeconds,
  };
};

const getHours = (date) => {
  const hourOfMilliSeconds = 1000 * 60 * 60;

  return {
    hours: Math.floor(date / hourOfMilliSeconds),
    remMinutes: date % hourOfMilliSeconds,
  };
};

const getMinutes = (date) => {
  const minuteOfMilliSeconds = 1000 * 60;

  return {
    minutes: Math.floor(date / minuteOfMilliSeconds),
    remSeconds: date % minuteOfMilliSeconds,
  };
};

const getSeconds = (date) => {
  const secondOfMilliSeconds = 1000;

  return {
    seconds: Math.floor(date / secondOfMilliSeconds),
    remMilliSeoconds: date % secondOfMilliSeconds,
  };
};

const getRemainingTime = (date) => {
  const dateNow = new Date();
  const remainingTime = date.getTime() - dateNow.getTime();

  const { years, remDays } = getYears(remainingTime);
  const { days, remHours } = getDays(remDays);
  const { hours, remMinutes } = getHours(remHours);
  const { minutes, remSeconds } = getMinutes(remMinutes);
  const seconds = getSeconds(remSeconds).seconds;

  return [years, days, hours, minutes, seconds];
};

const future = new Date("2030");
setInterval(() => {
  const remainingTime = getRemainingTime(future);
  timeUnits.forEach((unit, index) => {
    unit.innerHTML =
      remainingTime[index] < 10
        ? `0${remainingTime[index]}`
        : remainingTime[index];
  });
}, 1000);
// ============================================

// The incremental transition of the stats section
const inc = (heading, max) => {
  for (let i = 0; i <= max; i++) {
    setTimeout(() => {
      heading.innerHTML = i;
    }, 20 * i);
  }
};
const statIncremental = () => {
  if (
    window.scrollY + window.innerHeight >=
    stats.offsetTop + stats.offsetHeight
  ) {
    window.removeEventListener("scroll", statIncremental);
    headings.forEach((h) => inc(h, +h.dataset.amount));
  }
};
window.addEventListener("scroll", statIncremental);
// ============================================
