const button = document.querySelector("button");

button.addEventListener("click", async function () {
    const accountNumber = document.getElementById("accountNumber").value.trim();
    const message = document.getElementById("message");
    const loading = document.getElementById("loading");
    const result = document.getElementById("result");

    message.textContent = "";
    result.style.display = "none";
    result.innerHTML = "";

    if (accountNumber === "") {
        message.textContent = "⚠️ الرجاء إدخال رقم الحساب";
        return;
    }

    button.disabled = true;
    loading.style.display = "block";

    try {
        const response = await fetch(
            `/.netlify/functions/getBill?account=${accountNumber}`
        );

        const data = await response.json();

        if (!response.ok) {
            message.textContent = data.error || "حدث خطأ";
            return;
        }

        result.innerHTML = `
      <strong>اسم المشترك:</strong> ${data.name}<br>
      <strong>الشهر:</strong> ${data.month}<br>
      <strong>الاستهلاك:</strong> ${data.usage} متر<br>
      <strong>المبلغ:</strong> ${data.amount} ريال<br>
      <strong>الرصيد:</strong> ${data.balance} ريال
    `;

        result.style.display = "block";

    } catch (error) {
        message.textContent = "❌ فشل الاتصال بالسيرفر";
    } finally {
        loading.style.display = "none";
        button.disabled = false;
    }
});