document.querySelector("button").addEventListener("click", function () {
    const accountNumber = document.getElementById("accountNumber").value.trim();
    const message = document.getElementById("message");
    const loading = document.getElementById("loading");

    message.textContent = "";

    if (accountNumber === "") {
        message.textContent = "⚠️ الرجاء إدخال رقم الحساب";
        return;
    }

    // إظهار اللودينق
    loading.style.display = "block";

    // محاكاة عملية البحث (2 ثانية)
    setTimeout(() => {
        loading.style.display = "none";
        console.log("تم البحث عن:", accountNumber);
    }, 2000);
});