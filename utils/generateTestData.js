import ExcelJS from 'exceljs';

async function generatePostsExcel() {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Posts');

  // Add headers
  sheet.addRow(['userId', 'title', 'body']);

  // Generate 50 unique posts
  for (let i = 1; i <= 50; i++) {
    const userId = i; // unique userId
    const title = `Post Title ${i}`;
    const body = `This is the body content for post number ${i}.`;

    sheet.addRow([userId, title, body]);
  }

  // Save the Excel file
  await workbook.xlsx.writeFile('posts.xlsx');
  console.log('Excel file "posts.xlsx" created with 50 posts.');
}

generatePostsExcel();