const searchBtn = document.querySelector("#searchBtn");
const form = document.querySelector(".search-bar");

export function searchUserAction() {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector(".error-msg");
    const userNotFound = document.querySelector("#userNotFound");

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

    try {
      userNotFound.style.display = "none";
      const response = await fetch(`https://api.github.com/users/${value}`);
      if (!response.ok) {
        // throw new Error("Пользователь с таким именем не найден");
        userNotFound.style.display = "block";
        return;
      }
      const data = await response.json();
      const profileImg = document.querySelectorAll(".profile-img");
      for (const element of profileImg) {
        element.src = data.avatar_url;
        element.alt = `${data.login} Image`;
        // element.setAttribute("alt", `${data.login} Image`);
      }

      document.querySelector("#userName").textContent = data.name;
      document.querySelector("#userId").textContent = `@${data.login}`;

      const date = new Date(data.created_at);
      const monthName = date.toLocaleDateString("en-En", { month: "short" });
      document.querySelector("#joinDate").textContent = date.getDate();
      document.querySelector("#joinMonth").textContent = monthName;
      document.querySelector("#joinYear").textContent = date.getFullYear();

      if (data.bio) document.querySelector("#userBio").textContent = data.bio;

      document.querySelector("#userRepo").textContent = data.public_repos;
      document.querySelector("#userFollowers").textContent = data.followers;
      document.querySelector("#userFollowing").textContent = data.following;

      document.querySelector("#userLocation").textContent = data.location
        ? data.location
        : "Not availabble";
      console.log(data);
    } catch (error) {
      alert(error.message);
    }
  });
}

// export function searchUserAction() {
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const errorMsg = document.querySelector(".error-msg");
//     if (errorMsg) {
//       errorMsg.remove();
//     }
//     const formData = new FormData(form);
//     const value = formData.get("username").trim();
//     if (!value) {
//       form.insertAdjacentHTML(
//         "afterend",
//         `<p class="error-msg">Введите имя пользователя Github</p>`
//       );
//       return;
//     } else if (!/^[A-Za-z\s]*$/.test(value)) {
//       form.insertAdjacentHTML(
//         "afterend",
//         `<p class="error-msg">Допустимы только латинские символы и пробелы</p>`
//       );
//       return;
//     }

//     fetch(`https://api.github.com/users/${value}`)
//       .then((response) => {
//         if (!response.ok)
//           throw new Error("Пользователь с таким именем не найден");
//         return response.json();
//       })
//       .then((data) => console.log(data))
//       .catch((error) => alert(error.message))
//       .finally(() => console.log("Finally"));
//   });
// }
