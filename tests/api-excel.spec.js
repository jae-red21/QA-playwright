const {test, expect} =  require('@playwright/test');
const {readTestData, writeExcelReport} = require('../utils/excelhelper');
const path = require('path');
const { ReadStream } = require('fs');

test.describe('Data-Driven API testing', () => {
    let testData;
    let reportResults = [];

    test.beforeAll(async () => {
        testData = await readTestData(path.join(__dirname, '../test-data/posts.xlsx'));
    })

    test('Use Excel data to send multiple posts', async({request}) => {
        for (const data of testData) {
            const payload = {
                userID: data.userID,
                title: data.title,
                body: data.body
            }

            const response = await request.post('/posts', {
                data: payload,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'                }
            })

            if(response.ok() != true){
                //write failure log to excel with current payload
            } else {
                reportResults.push({
                    title: payload.title,
                    status: 'PASS'
                })
            }

        }

    })

    test.afterAll(async () => {
        const reportPath = path.join(__dirname, '../test-results/Execution_Report.xlsx');
        await writeExcelReport(reportResults, reportPath);
        console.log(`Report generated at: ${reportPath}`);
    })
})