// js/theme.js

// لا يوجد داعي لاستيراد أي شيء هنا لأننا نتعامل مباشرة مع localStorage و document.body

// تهيئة الثيم عند تحميل الصفحة
export function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("darkMode");
  }
}

// وظيفة تغيير الثيم عند الضغط على الزر
export function handleThemeToggle() {
  document.body.classList.toggle("darkMode");

  if (document.body.classList.contains("darkMode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}
