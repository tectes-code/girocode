function generateQRCode() {
  const iban = document.getElementById("iban").value.trim().replace(/\s+/g, "");
  const bic = document.getElementById("bic").value.trim();
  const name = document.getElementById("name").value.trim();
  const amount = parseFloat(document.getElementById("amount").value).toFixed(2);
  const purpose = document.getElementById("purpose").value.trim();

  const epcData = [
    "BCD",
    "001",
    "1",
    "SCT",
    bic,
    name,
    iban,
    "EUR" + amount,
    "", // optional purpose code
    "", // optional mandate reference
    purpose
  ].join("\n");

  const qrcodeContainer = document.getElementById("qrcode");
  qrcodeContainer.innerHTML = "";
  new QRCode(qrcodeContainer, {
    text: epcData,
    width: 256,
    height: 256
  });
}

document.getElementById("girocodeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  generateQRCode();
});

// generate QR-Code on page-load
window.addEventListener("DOMContentLoaded", generateQRCode);

// dynamically pad based on footer height
window.addEventListener("load", adjustFooterSpace);
window.addEventListener("resize", adjustFooterSpace);
function adjustFooterSpace() {
  const footer = document.querySelector("footer");
  const footerHeight = footer.offsetHeight;
  document.body.style.paddingBottom = `${footerHeight + 20}px`;
}
