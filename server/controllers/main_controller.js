const Consumer = require('../model/consumer.js');
const pdf = require('./pdf/pdf_controller.js');
const op = require('./pdf/rows_operations');
/**
 * 
     get   home page list of all consumer
     //todo: should be all functionalities
 */
const Header=1
const context = {
    periode: "2022",
    PAPC: 'عبد الحفيظ سلطاني',
    organization: 'بلدية تكوت',
    titleOfInvoice: ' كشف عداد المياه للاستعمال المنزلي والصناعي ',
    note: 'عدم تسديد الفاتورة في أجل 30 يوم ابتداء من تاريخ صدورها تطبق عليه غرامة التأخير',
    datelabel: 'تكوت في : _________',
    username: 'bechina belkacem',
    topPage: 0,
    sum:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],      //17 sums
    isFirstPage:true,
    sumLabel:'',//'المجموع الكلي' 'المجموع المرحل', 'المجموع للترحيل'
    endOfDocument:false
   
}

exports.homepage = async (req, res) => {
    const perPage = 10;
    let page = req.query.page || 1;
    try {
        const title = 'تسيير استهلاك المياه';
        let consumers = await Consumer.aggregate([{ $sort: { no: 1 } }])
            .skip(page * perPage - perPage)
            .limit(perPage)
            .exec();

        // Count is deprecated - please use countDocuments
        // const count = await Post.count();
        const count = await Consumer.countDocuments({});
        const nextPage = parseInt(page) + 1;
        const previousPage = parseInt(page) - 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        const hasPreviousPage = previousPage >= 1;


        res.render('index', {
            consumers,
            title,
            nextPage: hasNextPage ? nextPage : null,
            previousPage: hasPreviousPage ? previousPage : null,
        });
    } catch (e) {
        console.log(e)
    }

};
exports.about = async (req, res) => {
    const title = 'تسيير استهلاك المياه';
    res.render('about', { title });
}



/**
 * get consumer data readonly
 */


exports.consumerInfoReadOnly = async (req, res) => {
    const title = 'تسيير استهلاك المياه- بيانات المستهلك';

    let id = req.params.id;
    let consumer = await Consumer.findById(id);

    res.render('pages/consumer', { consumer, title });
}






/**
 * get Form page for id
 */


exports.editFormForConsumer = async (req, res) => {
    //todo edited by user belkacem

    const title = 'تسيير استهلاك المياه-تعديل بيانات المستهلك';
    let id = req.params.id;
    let consumer = await Consumer.findById(id);
    res.render('forms/consumer_form', { consumer, id, title });
}

/*
POST save consumer infos   
*/

exports.editAndSaveConsumer = async (req, res) => {
    try {

        const title = 'تسيير استهلاك المياه-تعديل بيانات المستهلك';
        const id = req.params.id;
        //belkacem
        //todo edited by :USER:
        user = 'belkacem';
        console.log('body=', JSON.stringify(req.body));
        const consumerFromUI = req.body;
        await Consumer.updateOne({ _id: id }, { $set: consumerFromUI }, {})
        const url = '/consumer/' + id;
        res.redirect(url)
    } catch (error) {
        console.log(error)
    }
}


exports.saveNewConsumer = async (req, res) => {


    const user = 'belkacem';//todo: verify if the [user] has the right to change : 5 nov 2023

    console.log('new ----    consumer');
    const title = 'تسيير استهلاك المياه-ادراج مستهلك جديد';
    const consumerFromUI = req.body;

    consumerFromUI.redactions = [{ user: user, time: Date.now() }];
    console.log(consumerFromUI);

    const consumer = await Consumer.insertMany(consumerFromUI);


    res.redirect('/');
}

exports.newConsumerForm = async (req, res) => {
    res.render('forms/new_consumer', { title: "new" });
}


exports.printList = async (req, res) => {
    const title = 'تسيير استهلاك المياه-تعديل بيانات المستهلك';

    const list = await Consumer.find();
    console.log('[*] {printList}.')
    pdf.printListInPDF(list, res, context);
    res.redirect('/home');
}
// post search
exports.search = async (req, res) => {
    try {
        const title = 'بحث';
        const perPage = 10;
        let page = req.query.page || 1;

        searchTerm = req.body.searchTerm;


        const q1 = { $text: { $search: searchTerm }, };

        const _projection = { no: 1, name: 1, address: 1, }

        const consumers = await Consumer.find(q1, _projection)
            .skip(page * perPage - perPage)
            //.limit(perPage)
            .exec();
        const count = await Consumer.countDocuments({ name: { $eq: searchTerm } },);
        const nextPage = parseInt(page) + 1;
        const previousPage = parseInt(page) - 1;
        const hasNextPage = nextPage < Math.ceil(count / perPage);
        const hasPreviousPage = previousPage > 0;
        console.log('[#] {Search} for request: [', searchTerm, '], found[', consumers.length, '] consumer(s)');
        res.render('index', {
            consumers,
            title,
            nextPage: hasNextPage ? nextPage : null,
            previousPage: hasPreviousPage ? previousPage : null,
        });
    } catch (error) {
        console.log(error);
    }

}




/** logout */
exports.logout = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/');

}



exports.editMany = async (req, res) => {
    const perPage = 10;
    let page = req.query.page || 1;
    try {
        const title = 'تسيير استهلاك المياه';
        let consumers = await Consumer.aggregate([{ $sort: { no: 1 } }])
            .skip(page * perPage - perPage)
            .limit(perPage)
            .exec();

        // Count is deprecated - please use countDocuments
        // const count = await Post.count();
        const count = await Consumer.countDocuments({});
        const nextPage = parseInt(page) + 1;
        const previousPage = parseInt(page) - 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        const hasPreviousPage = previousPage >= 1;


        res.render('forms/edit_list', {
            consumers,
            title,
            nextPage: hasNextPage ? nextPage : null,
            previousPage: hasPreviousPage ? previousPage : null,
        });
    } catch (e) {
        console.log(e);
    }
}

exports.saveRow = async (req, res) => {
    try {
        const newValue = req.body;
        const query = { no: newValue.no };
        let element = await Consumer.findOne(query);
        const { _id } = element._id;
        console.log('[*] [_id] element  found after search in db waterApp:', _id);
        element = updateFromUI(element, newValue);
        const result = await Consumer.updateOne({ _id: _id }, { $set: element });
        console.log('[*] Saving element Result report:', result);

    } catch (error) {
        console.log('[*] Error while saving row', error);
    }
}



const updateFromUI = (toUpdate, newValue) => {
    console.log(`[*] {updateFromUI}`);
    console.log(`[*] Updating :
`, JSON.stringify(toUpdate), `with 
values from UI:
`, JSON.stringify(newValue))
    toUpdate.name = newValue.name;
    toUpdate.address = newValue.address;
    let index = op.findIndex(toUpdate.consumptions, newValue.periode)

    toUpdate.consumptions[index].oldConsumption = Number(newValue.oldConsumption);
    toUpdate.consumptions[index].newConsumption = Number(newValue.newConsumption);
    console.log('[*] {updateFromUI} [toUpdate] =[', toUpdate, '].');

    return toUpdate
}




exports.printInvoices = async (req, res) => {
    const title = 'تسيير استهلاك المياه-تعديل بيانات المستهلك';

    const list = await Consumer.find();
    console.log('[*] call {printInvoices}   [list.count] = [', list.length, ']')
    pdf.printInvoicesInPDF(list, res, context);
    res.redirect('/home');
}

