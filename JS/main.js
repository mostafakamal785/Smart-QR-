// js/main.js
import {
  generateBtn,
  qrTypeSelector,
  inputFields,
  qrSize,
  qrSizeValue,
  toggleModeBtn,
  downloadBtn,
  shareBtn,
  qrCodeContainer,
} from "./ui-elements.js";
import { initializeTheme, handleThemeToggle } from "./theme.js";
import { handleDownload, handleShare } from "./share-download.js";
import { getCurrentQrData, generateQrSample } from "./generator.js";

// --- Event Listeners ---
function adjustQrMaxSizeForScreen() {
  if (window.matchMedia("(max-width: 900px)").matches) {
    qrSize.max = "250";

    if (parseInt(qrSize.value) > 250) {
      qrSize.value = "250";
      qrSizeValue.textContent = "250";
    }
  } else {
    qrSize.max = "500";
  }
}
// 1. تهيئة الثيم عند تحميل الصفحة
window.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  adjustQrMaxSizeForScreen();
});

// 2. عند تغيير حجم الشاشة
window.addEventListener("resize", adjustQrMaxSizeForScreen);

// 2. تغيير الثيم عند الضغط
toggleModeBtn.addEventListener("click", handleThemeToggle);

// 3. تغيير نوع الـ QR لإظهار الحقول المناسبة
qrTypeSelector.addEventListener("change", () => {
  inputFields.forEach((input) => {
    input.style.display = "none";
  });
  document.querySelector(`.inputFild.${qrTypeSelector.value}`).style.display =
    "block";
});

// 4. الضغط على زر "Generate QR Code"
generateBtn.addEventListener("click", () => {
  const qrData = getCurrentQrData();
  generateQrSample(qrData);
});

// 5. تغيير حجم الـ QR Code
qrSize.addEventListener("input", () => {
  qrSizeValue.textContent = qrSize.value;

  // إعادة توليد الكود بالحجم الجديد إذا كان هناك كود موجود
  if (qrCodeContainer.classList.contains("hasQrCode")) {
    const qrData = getCurrentQrData();
    generateQrSample(qrData);
  }
});

// 6. الضغط على زر التحميل
downloadBtn.addEventListener("click", handleDownload);

// 7. الضغط على زر المشاركة
shareBtn.addEventListener("click", handleShare);
