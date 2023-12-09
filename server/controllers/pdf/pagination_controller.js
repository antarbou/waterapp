const a31 = require('./a3_report_builder1.js');
const a3 = require('./a3_report_builder.js');
const invoiceBuilder = require('./a4_invoice_builder.js');
const headerBuilder = require('./headless_settings.js');
const options = require('./waterapp_table_options.js');
const op = require('./rows_operations.js')
const lgge = require('../../misc/language_operations.js');
const fontName = 'Amiri';


const footerSum = {

    //Sum of conssumptions
    cons_level_0: 0,
    cons_level_1: 0,
    cons_level_2: 0,
    cons_level_3: 0,
    amount_0: 0,
    amount_1: 0,
    amount_2: 0,
    amount_3: 0,
    tax_0: 0,
    tax_1: 0,
    tax_2: 0,
    tax_3: 0,
    totalToPay: 0,
    totalAmounts: 0,
    totalTaxes: 0,
    inscriptionTax: 0,
}

const headerSum = {
    //Sum of conssumptions
    cons_level_0: 0,
    cons_level_1: 0,
    cons_level_2: 0,
    cons_level_3: 0,
    amount_0: 0,
    amount_1: 0,
    amount_2: 0,
    amount_3: 0,
    tax_0: 0,
    tax_1: 0,
    tax_2: 0,
    tax_3: 0,
    totalToPay: 0,
    totalAmounts: 0,
    totalTaxes: 0,
    inscriptionTax: 0,
}
exports.paginateReport1 = (doc, datas, context) => {
    console.log('->[*] {paginateReport} ')
    //console.log('table length=', datas.length)
    const pageHeight = doc.page.height;
    const rowHeight = 22;
    const rowsInPage = Math.floor(pageHeight / rowHeight) - 4;//28
    let rowsInFirstPage = rowsInPage - 4;
    const pagesCount = Math.ceil((datas.length - rowsInFirstPage) / rowsInPage);  //!datas.sort()


    let lastIndexInPreviousPage = 0;
    let lastIndexInCurrentPage = rowsInFirstPage - 1;
    let SinglePageList = (rowsInFirstPage <= datas.length) ?
        datas.slice(0, rowsInFirstPage)
        : datas;

    let _isLastPage = lastIndexInPreviousPage + rowsInPage > datas.length;
    for (let i = 0; !_isLastPage; i++) {
        _isLastPage = lastIndexInPreviousPage + rowsInPage > datas.length
        if (i > 0) {
            context.topPage = 0;//todo toppage
            doc.addPage();

        } else {
            a31.buildReportHeader(doc, context)
        }

        //  console.log('the total data.length=', datas.length,' this SinglePageList length=', SinglePageList.length,'_isLastPage=', _isLastPage, 'i=', i, '/', pagesCount, '==', SinglePageList.map((item) => item.name + item.no));
        a31.buildPDFReport(doc, SinglePageList, context);

        lastIndexInPreviousPage = lastIndexInCurrentPage;
        lastIndexInCurrentPage = (datas.length > rowsInPage + lastIndexInPreviousPage) ?
            rowsInPage + lastIndexInPreviousPage
            : datas.length - 1;


        SinglePageList = datas.slice(lastIndexInPreviousPage, lastIndexInCurrentPage);
        
        //console.log('SinglePageList.length=', SinglePageList.length, 'lastIndexInCurrentPage=', lastIndexInCurrentPage, 'lastIndexInPreviousPage=', lastIndexInPreviousPage);
    }
}

exports.paginateReport = (tablepdf, datas, context) => {
    console.log('->[*] {paginateReport} ')
    console.log('table length=', datas.length)
    const pageHeight = tablepdf.page.height;
    const rowHeight = 20;

    const rowsInPage = Math.floor(pageHeight / rowHeight) - 7;//28
    let rowsInFirstPage = rowsInPage - 4;
    const pagesCount = 1 + Math.ceil((datas.length - rowsInFirstPage) / rowsInPage);

    console.log('pageHeight=', pageHeight)
    console.log('rowsInPage=', rowsInPage)
    console.log('pagesCount=', pagesCount)

    let rowsInCurrentPage = rowsInFirstPage;//24

    let lastRowInPreviousPage = 0;
    //pagination 
    let isLastPage = false;
    for (let i = 0; i < pagesCount; i++) {
        isLastPage = rowsInFirstPage + i * rowsInPage >= datas.length;
        console.log('i=', i, 'isLastPage=', isLastPage, 'rowsInFirstPage +i*rowsInPage=', rowsInFirstPage + i * rowsInPage, '>=datas.length=', datas.length);
        op.rowAssignement(headerSum, footerSum);

        if (i > 0) {
            tablepdf.addPage();

            lastRowInPreviousPage = rowsInFirstPage + (i - 1) * rowsInPage;
            rowsInCurrentPage = Math.min(datas.length - lastRowInPreviousPage, rowsInPage);
        } else {
            tablepdf.table(a3.buildReportHeader(), headerBuilder.heaadlessOptions(tablepdf));
        }

        let currentPage = [];

        for (let j = 0; j < rowsInCurrentPage; j++) {
            previous = (i === 0) ? 0 : rowsInFirstPage + (i - 1) * rowsInPage;
            currentPage.push(datas[previous + j]);
        }

        let index = i;
        const contentOfPage = a3.buildReportPage(currentPage, index, headerSum, footerSum, isLastPage, context);

        tablepdf.table(a3.getHeaderContent(), options.getHeaderOptions(tablepdf, fontName));
        tablepdf.table(contentOfPage, options.getTableOptions(tablepdf, fontName));
    }
}


/**   page building invoices
 * 
 */

exports.paginateInvoices = async (doc, datas, context) => {
    const pageHeight = doc.page.height
    const rowHeight = 165;

    const rowsInPage = Math.floor(pageHeight / rowHeight);//- 7;//28
    console.log('pageHeight=', pageHeight, 'rowsInPage=', rowsInPage,)
    const pagesCount = Math.ceil(datas.length / rowsInPage);

    for (let i = 0; i < pagesCount; i++) {//todo dont forget pagecount



        if (i > 0) {
            doc.addPage();
        }

        for (let j = 0; j < rowsInPage; j++) {
            i
            let currentInvoice = i * rowsInPage + j;
            if (currentInvoice < datas.length) {
                invoiceBuilder.buildInvoices(doc, datas[currentInvoice], j, rowsInPage, context); //todo 2023
            } else break;
        }
    }
}
