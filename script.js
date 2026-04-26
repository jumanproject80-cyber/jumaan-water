document.querySelector("button").addEventListener("click", function () {
    const accountNumber = document.getElementById("accountNumber").value.trim();
    const message = document.getElementById("message");
    const loading = document.getElementById("loading");
    const result = document.getElementById("result");

    message.textContent = "";
    result.style.display = "none";

    if (accountNumber === "") {
        message.textContent = "⚠️ الرجاء إدخال رقم الحساب";
        return;
    }

    loading.style.display = "block";

    setTimeout(() => {
        loading.style.display = "none";

        // بيانات وهمية (سنستبدلها لاحقاً)
        result.innerHTML = `
      <strong>اسم المشترك:</strong> أحمد محمد<br>
      <strong>الشهر:</strong> مارس 2026<br>
      <strong>الاستهلاك:</strong> 25 متر<br>
      <strong>المبلغ:</strong> 500 ريال<br>
      <strong>الرصيد:</strong> 1200 ريال
    `;

        result.style.display = "block";
    }, 2000);
});