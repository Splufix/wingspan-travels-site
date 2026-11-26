const form = document.querySelector("#enquiry-form");
const serviceSelect = document.querySelector("#service");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const formStatus = document.querySelector("#form-status");

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    serviceSelect.value = link.dataset.service;
  });
});

emailInput.addEventListener("input", () => {
  emailInput.setCustomValidity("");
  emailError.textContent = "";
});

emailInput.addEventListener("invalid", () => {
  const message = emailInput.validity.valueMissing
    ? "Enter your email so we can reply."
    : "Enter a valid email so we can reply.";
  emailInput.setCustomValidity(message);
  emailError.textContent = message;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!emailInput.validity.valid) {
    emailError.textContent = "Enter a valid email so we can reply.";
    emailInput.focus();
    return;
  }

  const data = new FormData(form);
  const lines = [
    "Hello Wingspan Travels, I'd like to make an enquiry.",
    "",
    `Name: ${data.get("name")}`,
    `Email: ${data.get("email")}`,
    `Phone: ${data.get("phone") || "Not provided"}`,
    `Service: ${data.get("service")}`,
    `Message: ${data.get("message")}`,
  ];
  const whatsappUrl = `https://wa.me/2348058706268?text=${encodeURIComponent(lines.join("\n"))}`;
  formStatus.textContent = "Your message is ready. WhatsApp will open so you can send it to our team.";
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

document.querySelector("#year").textContent = new Date().getFullYear();

(() => {
  const siteHeader = document.querySelector(".site-header");
  const updateHeaderShadow = () => siteHeader?.classList.toggle("has-scrolled", window.scrollY > 8);
  updateHeaderShadow();
  window.addEventListener("scroll", updateHeaderShadow, { passive: true });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

  const revealQueue = [];
  const revealInterval = 120;
  let revealTimer;
  let observer;
  let serviceImageObserver;

  const addSequence = (root, selectors) => {
    const elements = selectors.flatMap((selector) => [...root.querySelectorAll(selector)]);
    elements.forEach((element) => element.classList.add("motion-reveal"));
    return elements;
  };

  const pagePlans = [
    { root: document.querySelector("#services"), selectors: [".section-intro", ".service-row"] },
    { root: document.querySelector("#how-it-works"), selectors: [".section-intro", ".steps li"] },
    { root: document.querySelector("#trust"), selectors: [".trust-topline", "#trust-title", ".trust-stamp", ".owner-line", ".trust-list li"] },
    { root: document.querySelector("#visit"), selectors: [".map-panel", ".visit-copy .section-intro", ".contact-detail", ".visit-actions"] },
    { root: document.querySelector("#enquire"), selectors: [".enquire-copy", ".enquire-form"] },
    { root: document.querySelector(".site-footer"), selectors: [".footer-main > div", ".footer-bottom > span"] },
  ].filter((plan) => plan.root);

  const hero = document.querySelector("#top");
  const heroSequence = hero
    ? addSequence(hero, ["h1", ".hero-subtitle", ".hero-actions"])
    : [];

  pagePlans.forEach((plan) => {
    plan.elements = addSequence(plan.root, plan.selectors);
  });

  const enqueue = (elements, interval = revealInterval) => {
    elements.forEach((element) => {
      if (element.classList.contains("motion-queued")) return;
      element.classList.add("motion-queued");
      revealQueue.push({ element, interval });
    });
    revealNext();
  };

  const revealNext = () => {
    if (revealTimer || !revealQueue.length || reducedMotion.matches) return;
    const queuedReveal = revealQueue.shift();
    queuedReveal.element.classList.add("is-visible");
    revealTimer = window.setTimeout(() => {
      revealTimer = undefined;
      revealNext();
    }, queuedReveal.interval);
  };

  try {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const plan = pagePlans.find((item) => item.root === entry.target);
        if (plan) enqueue(plan.elements);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    serviceImageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle("image-in-view", entry.isIntersecting));
    }, { threshold: 0.1 });

    pagePlans.forEach((plan) => observer.observe(plan.root));
    document.querySelectorAll(".service-row").forEach((row) => serviceImageObserver.observe(row));
    document.documentElement.classList.add("motion-ready");
    enqueue(heroSequence, 520);
  } catch {
    document.documentElement.classList.remove("motion-ready");
    observer?.disconnect();
    serviceImageObserver?.disconnect();
    return;
  }

  reducedMotion.addEventListener?.("change", (event) => {
    if (!event.matches) return;
    observer.disconnect();
    serviceImageObserver.disconnect();
    window.clearTimeout(revealTimer);
    revealQueue.length = 0;
    document.documentElement.classList.remove("motion-ready");
  });

  let pageLoaded = document.readyState === "complete";
  let launcherObserver;
  let launcherTimeout;

  const pulseChatLauncher = () => {
    if (!pageLoaded || reducedMotion.matches) return false;
    const launcher = document.querySelector(".bpFabWrapper");
    if (!launcher) return false;
    launcher.classList.add("chat-pulse-once");
    launcherObserver?.disconnect();
    window.clearTimeout(launcherTimeout);
    return true;
  };

  launcherObserver = new MutationObserver(pulseChatLauncher);
  launcherObserver.observe(document.body, { childList: true, subtree: true });
  window.addEventListener("load", () => {
    pageLoaded = true;
    if (pulseChatLauncher()) return;
    launcherTimeout = window.setTimeout(() => launcherObserver.disconnect(), 12000);
  }, { once: true });
})();
