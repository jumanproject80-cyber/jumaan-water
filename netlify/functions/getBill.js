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

        const spreadsheetId = process.env.SPREADSHEET_ID;

        // 1️⃣ قراءة الفواتير
        const billsRes = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: "الفواتير!A2:Z",
        });

        const bills = billsRes.data.values;

        // 2️⃣ قراءة القيود
        const entriesRes = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: "القيود!A2:Z",
        });

        const entries = entriesRes.data.values;

        // 🔍 آخر فاتورة للحساب
        const userBills = bills.filter(r => r[0] === accountNumber);
        const lastBill = userBills[userBills.length - 1];

        if (!lastBill) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "❌ لا توجد فواتير لهذا الحساب" }),
            };
        }

        // 🧮 استخراج القيم من الأعمدة الصحيحة
        const name = lastBill[3];
        const month = lastBill[11];

        const usage = Number(lastBill[21] || 0);
        const price = Number(lastBill[17] || 0);
        const discount = Number(lastBill[23] || 0);

        const rent = Number(lastBill[10] || 0);
        const other = Number(lastBill[19] || 0);
        const maintenance = Number(lastBill[20] || 0);

        // 🧮 المعادلة
        const consumption = usage * price;
        const afterDiscount = consumption * (1 - discount / 100);
        const totalBill = afterDiscount + rent + other + maintenance;

        // 💰 المدفوعات (من القيود - دائن)
        const userPayments = entries
            .filter(r => r[0] === accountNumber)
            .reduce((sum, r) => sum + Number(r[3] || 0), 0);

        const balance = totalBill - userPayments;

        return {
            statusCode: 200,
            body: JSON.stringify({
                name,
                month,
                usage,
                amount: totalBill.toFixed(2),
                balance: balance.toFixed(2),
            }),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "❌ خطأ في قراءة Google Sheets" }),
        };
    }
};