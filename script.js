// ---------------- QR GENERATOR ----------------
function generateQR() {
    let text = document.getElementById("qrText").value;
    document.getElementById("qrResult").innerHTML = ""; 

    if (text.trim() === "") {
        alert("Please enter text!");
        return;
    }

    new QRCode(document.getElementById("qrResult"), {
        text: text,
        width: 200,
        height: 200,
    });

    // Show download button
    document.getElementById("downloadBtn").classList.remove("d-none");
}

// ---------------- QR DOWNLOAD ----------------
function downloadQR() {
    const qrCanvas = document.querySelector("#qrResult canvas");

    if (!qrCanvas) {
        alert("Please generate QR first!");
        return;
    }

    const imageURL = qrCanvas.toDataURL("image/png");

    const a = document.createElement("a");
    a.href = imageURL;
    a.download = "qr-code.png";
    a.click();
}

// ---------------- QR SCANNER (CAMERA) ----------------
function onScanSuccess(decodedText) {
    document.getElementById("scanResult").value = decodedText;
}

const html5QrCode = new Html5Qrcode("reader");
html5QrCode.start(
    { facingMode: "environment" },
    {
        fps: 10,
        qrbox: 250
    },
    onScanSuccess
);

// ---------------- QR UPLOAD READER ----------------
function scanUploadedQR() {
    const fileInput = document.getElementById("qrUpload");

    if (fileInput.files.length === 0) {
        alert("Please upload an image first!");
        return;
    }

    const file = fileInput.files[0];
    const html5Qr = new Html5Qrcode("reader_upload");

    Html5Qrcode.getCameras();

    html5Qr.scanFile(file, true)
        .then(decodedText => {
            document.getElementById("uploadResult").value = decodedText;
        })
        .catch(err => {
            alert("QR Code not found in image.");
        });
}