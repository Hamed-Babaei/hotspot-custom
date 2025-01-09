export const showToast = (toastId) => {
  const toast = document.getElementById(toastId);

  if (!toast) {
    console.error(`Toast with ID "${toastId}" not found.`);
    return;
  }

  // نمایش توست
  toast.classList.remove("hidden", "-translate-y-10", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100", "z-50", "duration-300");

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("-translate-y-10", "opacity-0", "duration-300");
    setTimeout(() => toast.classList.add("hidden"), 300); // مخفی کردن بعد از انیمیشن
  }, 5000);
};
///////////////////////////////////////////////////////////////

export const showLoading = (buttonId, loadingText = "لطفاً صبر کنید...") => {
  console.log(buttonId);
  const button = document.getElementById(buttonId);
  const loadingIcon = button.querySelector("#loading-icon");
  const buttonText = button.querySelector("#button-text");

  loadingIcon.classList.remove("hidden");
  buttonText.textContent = loadingText;
  button.disabled = true;
};

export const hideLoading = (buttonId, originalText = "ورود") => {
  const button = document.getElementById(buttonId);
  const loadingIcon = button.querySelector("#loading-icon");
  const buttonText = button.querySelector("#button-text");

  loadingIcon.classList.add("hidden");
  buttonText.textContent = originalText;
  button.disabled = false;
};
