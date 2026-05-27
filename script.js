const body = document.body;
const toggle = document.querySelector(".lang-toggle");
const revealItems = document.querySelectorAll(".reveal");

const setLanguage = (lang) => {
  const isEnglish = lang === "en";
  body.classList.toggle("en", isEnglish);
  document.documentElement.lang = isEnglish ? "en" : "zh-CN";
  toggle.setAttribute("aria-pressed", String(isEnglish));
  localStorage.setItem("portfolio-language", lang);
};

toggle.addEventListener("click", () => {
  setLanguage(body.classList.contains("en") ? "zh" : "en");
});

const savedLanguage = localStorage.getItem("portfolio-language");
if (savedLanguage === "en") {
  setLanguage("en");
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
  observer.observe(item);
});
