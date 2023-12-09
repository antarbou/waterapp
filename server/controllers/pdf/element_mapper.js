const calculator=require('../../misc/calculator');
exports.rowMappedFrom = (item) => {
    ///choose an element i in list[list]
    // if it is null should be 0
    //and calculate invoice of a consumption

    return {
        no:item.no,
        watermeterId: item.watermeterId,
        name: lgge.ara(item.name),
        address:  lgge.ara(item.address),
        old:item.oldConsumption,
        new:item.newConsumption,
        ...calculator.calculateDetailedInvoice(item.newConsumption-item.oldConsumption),
    }

    }
    