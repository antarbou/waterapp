const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bcrypt = require('bcrypt');


const levelSchema = Schema({
    levelConsumption: { type: Number, default: 0 },
    levelValue: { type: Number, default: 0 }
});


const consumptionSchema = Schema({
    periode: { type: String, required: true },
    oldConsumption: { type: Number, default: 0 },
    newConsumption: { type: Number, default: 0 },
    invoice: [levelSchema],
    payed: { type: Number, default: 0 ,get:(value)=>{return value.toFixed(2)} },
    canceledBy: { type: String, default: '-' },
    isFlatRated:{type:Boolean, default:false}
},
);

const redactionSchema = Schema({
    user: { type: String, reaqired: true },
    time: { type: Date, default: Date.now() }
});






const consumerSchema = Schema({
    no: { type: String, unique: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    watermeterId:  { type: String, defaut:'//', },
    consumptions: [consumptionSchema],
    redactions: [redactionSchema],
    hash: { type: String, default: '0' },
});

consumerSchema.index({name:'text',address:'text'});




const Consumer = mongoose.model('Consumer', consumerSchema);


module.exports = Consumer;