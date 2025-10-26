const searchBtn = document.querySelector("#searchBtn");
const form = document.querySelector(".search-bar");

export function searchUserAction() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector(".error-msg");
    if (errorMsg) {
      errorMsg.remove();
    }
    const formData = new FormData(form);
    const value = formData.get("username").trim();
    if (!value) {
      form.insertAdjacentHTML(
        "afterend",
        `<p class="error-msg">Введите имя пользователя Github</p>`
      );
      return;
    } else if (!/^[A-Za-z\s]*$/.test(value)) {
      form.insertAdjacentHTML(
        "afterend",
        `<p class="error-msg">Допустимы только латинские символы и пробелы</p>`
      );
      return;
    }

    console.log("OKK");
  });
}
