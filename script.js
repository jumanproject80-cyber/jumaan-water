document.querySelector("button").addEventListener("click", function () {
    const accountNumber = document.getElementById("accountNumber").value.trim();
    const message = document.getElementById("message");

    message.textContent = "";

    if (accountNumber === "") {
        message.textContent = "⚠️ الرجاء إدخال رقم الحساب";
        return;
    }

    console.log("رقم الحساب:", accountNumber);
});