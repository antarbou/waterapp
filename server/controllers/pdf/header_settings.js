const calculator = require('../../misc/calculator.js');
const lgge = require('../../misc/language_operations.js');

const b = `
`;

const reportHeader = `الجمهورية الجزائرية الديمقراطية الشعبية   
 قائمة  المستهلكين للمياه الخاصة للاستهلاك المنزلي والصناعي`;

const wilaya = "ولاية باتنة";
const daira = "دائرة تكوت";
const commune = "بلدية تكوت";
const pageAr = "الجمهورية الجزائرية الديمقراطية الشعبية";



exports.custum795X994headersBuilder=()=> {
    return [
      {
        "label": "رقم", "property": "no", "width": 49, 
        "align": "right", "features": ['rtla'], 
      },
  
      {
        "label": lgge.ara("اللقب و الاسم" + b + "العداد"),
        "property": "name", "width": 115, "height": 100,
        "align": "center", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("العدد القديم"), "property": "old", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
  
      {
        "label": lgge.ara("العدد الجديد"), "property": "new", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("ق1"), "property": "cons_level_0", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("ق2"), "property": "cons_level_1", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
      {
        "label": lgge.ara("ق3"), "property": "cons_level_2", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("ق4"), "property": "cons_level_3", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("م1 " + calculator.levelAmountTable[0].price + " دج"),
        "property": "amount_0", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("م2 " + calculator.levelAmountTable[1].price + " دج"),
        "property": "amount_1", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("م3 " + calculator.levelAmountTable[2].price + " دج"),
        "property": "amount_2", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("م4 " + calculator.levelAmountTable[3].price + " دج"),
        "property": "amount_3", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("ر1 " + calculator.levelAmountTable[0].tax + " دج"),
        "property": "tax_0", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("ر2 " + calculator.levelAmountTable[1].tax + " دج"),
        "property": "tax_1", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("ر3 " + calculator.levelAmountTable[2].tax + " دج"),
        "property": "tax_2", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("ر4 " + calculator.levelAmountTable[3].tax + " دج"),
        "property": "tax_3", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
  
  
      {
        "label": lgge.ara("المجموع"),
        "property": "totalAmounts", "width": 60, 
        "align": "right", "features": ['rtla'],
      },
      {
        "label": lgge.ara("رسم التطهير"),
        "property": "totalTaxes", "width": 60, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("الاشتراك"),
        "property": "inscriptionTax", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
  
      {
        "label": lgge.ara("tot"),
        "property": "totalToPay", "width": 60, 
        "align": "right", "features": ['rtla'],
      },
  
    ].reverse();
    ;
  }
  
  
  
  exports.a3headersBuilder=()=> {
    return [
      {
        "label": "رقم", "property": "no", "width": 49, 
        borders:['left','right'],
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("العداد"),
        "property": "watermeterId", "width": 62, 
        "align": "center", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("اللقب و الاسم"),
        "property": "name", "width": 95, 
        "align": "center", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("العدد القديم"), "property": "old", "width": 50, 
        "align": "right", "features": ['rtla'],
      },
  
  
      {
        "label": lgge.ara("العدد الجديد"), "property": "new", "width": 50, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("ق1"), "property": "cons_level_0", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("ق2"), "property": "cons_level_1", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
      {
        "label": lgge.ara("ق3"), "property": "cons_level_2", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("ق4"), "property": "cons_level_3", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("م1 " + calculator.levelAmountTable[0].price + " دج"),
        "property": "amount_0", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("م2 " + calculator.levelAmountTable[1].price + " دج"),
        "property": "amount_1", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("م3 " + calculator.levelAmountTable[2].price + " دج"),
        "property": "amount_2", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("م4 " + calculator.levelAmountTable[3].price + " دج"),
        "property": "amount_3", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": ("ر1 " + calculator.levelAmountTable[0].tax + " دج"),
        "property": "tax_0", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": ("ر2 " + calculator.levelAmountTable[1].tax + " دج"),
        "property": "tax_1", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": ("ر3 " + calculator.levelAmountTable[2].tax + " دج"),
        "property": "tax_2", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": ("ر4 " + calculator.levelAmountTable[3].tax + " دج"),
        "property": "tax_3", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
  
  
      {
        "label": lgge.ara("المجموع"),
        "property": "totalAmounts", "width": 60, 
        "align": "right", "features": ['rtla'],
      },
      {
        "label": lgge.ara("رسم التطهير"),
        "property": "totalTaxes", "width": 60, 
        "align": "right", "features": ['rtla'],
      },
  
      {
        "label": lgge.ara("الاشتراك"),
        "property": "inscriptionTax", "width": 49, 
        "align": "right", "features": ['rtla'],
      },
  
  
      {
        "label": lgge.ara("tot"),
        "property": "totalToPay", "width": 60, 
        "align": "right", "features": ['rtla'],
      },
  
    ].reverse();
  }
  
 