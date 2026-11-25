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
