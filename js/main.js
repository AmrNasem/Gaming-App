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
