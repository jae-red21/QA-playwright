const ExcelJS = require('exceljs');

async function readTestData(filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
    const data = [];

    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
            data.push({
                userID: row.getCell(1).value,
                title: row.getCell(2).value,
                body: row.getCell(3).value,
                    rowNumber: rowNumber
            });
        }
    })

    return data;
}

async function writeExcelReport(results, reportPath) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Test Results');

    sheet.columns = [
        {header: 'title', key: 'title', width: 25},
        {header: 'status', key: 'status', width: 25},

    ]

    results.forEach(res => {
        sheet.addRow(res);
    });
    await workbook.xlsx.writeFile(reportPath);
}

module.exports = {readTestData, writeExcelReport};