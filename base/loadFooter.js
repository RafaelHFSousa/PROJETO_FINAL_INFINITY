document.addEventListener("DOMContentLoaded", () => {

    // Carregar o footer
    fetch("../base/footer.html")
      .then((response) => response.text())
      .then((html) => {
        document.body.insertAdjacentHTML("beforeend", html);
      });
  });
  
