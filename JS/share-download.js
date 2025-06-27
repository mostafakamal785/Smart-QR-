import { qrCodeContainer } from "./ui-elements.js";

export function handleDownload() {
  const qrImage = qrCodeContainer.querySelector("img");
  if (!qrImage) {
    alert("Please generate a QR code first.");
    return;
  }
  const link = document.createElement("a");
  link.href = qrImage.src;
  link.download = "QR_Code.png";
  link.click();
}

export async function handleShare() {
  const qrImage = qrCodeContainer.querySelector("img");
  if (!qrImage) {
    alert("Please generate a QR code first.");
    return;
  }

  try {
    const response = await fetch(qrImage.src);
    const blob = await response.blob();
    const file = new File([blob], "QR_Code.png", { type: blob.type });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: "Smart QR Code",
        text: "Here's a QR code I generated",
        files: [file],
      });
    } else {
      alert("Sharing is not supported on this browser.");
    }
  } catch (error) {
    console.error("Sharing failed", error);
    alert("An error occurred while trying to share the QR code.");
  }
}
