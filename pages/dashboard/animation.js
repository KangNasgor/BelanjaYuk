console.log("connected")
const subtitle = document.querySelector(".sub-title");

subtitle.addEventListener("animationend", () => {
  subtitle.style.opacity = 1;
  console.log("berhasil");
});