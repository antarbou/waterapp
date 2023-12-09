const pdfkitTable = require('pdfkit-table');
const pdfkit = require('pdfkit');
const fs = require('fs');
const taf=require('tafgeetjs');

const paginationController=require('./pagination_controller.js');





const tableReport = new pdfkitTable({
  size: 'A3',//[795, 994],
  margin: 15,
  bufferPages: true,
  layout: 'landscape',
  rtl: true
});
const invoices = new pdfkit({
  size: 'A4',//[795, 994],
  margin: 20,
  bufferPages: true,
  rtl: true
});



invoices.registerFont('Amiri', './public/fonts/Amiri-Bold.ttf');
tableReport.registerFont('Amiri', './public/fonts/Amiri-Bold.ttf');

// this is pdfkit table

exports.printListInPDF = async (list, res,context) => {

console.log('->[*] {printListInPDF} ')
  tableReport.pipe(fs.createWriteStream('outputs/consumer_list.pdf'));
  tableReport.font('Amiri',);

  paginationController.paginateReport1(tableReport,list,context);
  tableReport.end();

}



// this is pdf only page
 exports.printInvoicesInPDF=async (list,res,context)=>{
  invoices.pipe(fs.createWriteStream('outputs/invoices_list.pdf'));

  paginationController.paginateInvoices(invoices,list,context)
  invoices.end();
 }