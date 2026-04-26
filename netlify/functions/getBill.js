const { google } = require("googleapis");

exports.handler = async function (event) {
    const accountNumber = event.queryStringParameters.account;

    if (!accountNumber) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "رقم الحساب مطلوب" }),
        };
    }

    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });

        const client = await auth.getClient();

        const sheets = google.sheets({ version: "v4", auth: client });

        const spreadsheetId = "YOUR_SHEET_ID_HERE";

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: "الفواتير!A2:Z",
        });

        const rows = response.data.values;

        // البحث عن رقم الحساب
        const row = rows.find(r => r[0] === accountNumber);

        if (!row) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "❌ لم يتم العثور على الحساب" }),
            };
        }

        // مثال مؤقت (سنحسن الحساب لاحقاً)
        const data = {
            name: row[1],
            month: row[2],
            usage: row[3],
            amount: row[4],
            balance: 0
        };

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "خطأ في جلب البيانات" }),
        };
    }
};