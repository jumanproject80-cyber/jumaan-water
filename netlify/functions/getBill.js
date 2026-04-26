exports.handler = async function (event) {
    const accountNumber = event.queryStringParameters.account;

    if (!accountNumber) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "رقم الحساب مطلوب" }),
        };
    }

    // بيانات وهمية (سنربطها لاحقاً بـ Google Sheets)
    const data = {
        name: "أحمد محمد",
        month: "مارس 2026",
        usage: 25,
        amount: 500,
        balance: 1200,
    };

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
};