changeTheme = () => {
  const localStorage = window.localStorage;
  let theme = localStorage.getItem("theme");

  if (theme === "dark") {
    theme = "light";
  } else {
    theme = "dark";
  }

  document.body.setAttribute("theme", theme);
  localStorage.setItem("theme", theme);
}

getTheme = () => {
  const localStorage = window.localStorage;
  let theme = localStorage.getItem("theme");

  if (theme === null) {
    localStorage.setItem("theme", "dark");
    theme = "dark";
  } else {
    document.body.setAttribute("theme", theme);
  }
}