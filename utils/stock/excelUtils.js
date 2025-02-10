import ExcelJS from "exceljs";

export const generateExcelFile = async (transactions) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Transactions");

  worksheet.columns = [
    { header: "Stock Name", key: "stockSymbol", width: 20 },
    { header: "Quantity", key: "qty", width: 10 },
    { header: "purchasePrice", key: "purchasePrice", width: 10 },
    { header: "Action", key: "action", width: 10 },
    { header: "Date", key: "date", width: 20 },
    { header: "Worth", key: "worth", width: 15 },
  ];

  transactions.forEach((transaction) => {
    worksheet.addRow({
      stockSymbol: transaction.stockSymbol,
      qty: transaction.qty,
      purchasePrice: `₹${transaction.purchasePrice}`,
      action: transaction.action,
      date: transaction.date,
      worth: `₹${transaction.qty * transaction.purchasePrice}`,
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};
