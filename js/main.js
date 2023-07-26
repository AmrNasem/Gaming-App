// Show skills progresses whenever "Our skills" section is reached
let progressesShown = false;

const skillsSection = document.getElementById("skills");

window.onscroll = () => {
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
};

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
const timeUnits = document.querySelectorAll("#events .remaining-time .unit h1");
setInterval(() => {
  const remainingTime = getRemainingTime(future);
  timeUnits.forEach((unit, index) => {
    unit.innerHTML =
      remainingTime[index] < 10
        ? `0${remainingTime[index]}`
        : remainingTime[index];
  });
}, 1000);
