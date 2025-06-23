const qrSize = document.getElementById("QRsize");
const qrSizeValue = document.getElementById("QRsize-value");
const qrText = document.getElementById("QRText");
const generateQR = document.getElementById("generateQR");
const qrImg = document.getElementById("QRimg");
const qrImgInput = document.getElementById("qr-img-input");
const downloadBtn = document.getElementById("download-btn");
const historyList = document.querySelector(".history-list");
const uploadbtn = document.getElementById("imgUploading");
const uploadImg = document.querySelector(".upload-img");
const loading = document.querySelector(".loading");
qrSize.addEventListener("input", (e) => {
  qrSizeValue.textContent = e.target.value;
});
uploadImg.addEventListener("click", () => {
  uploadbtn.click();
  loading.style.opacity = 1;
  loading.style.position = "relative";
  setTimeout(() => {
    loading.style.opacity = 0;
    loading.style.position = "absolute";
  }, 2000);
});
