//===============
// document.addEventListener('DOMConsumerSaved',function(page, index){
// console.log('page', page, 'save', index);
//alert('helloo')
const baseUrl='http://localhost:6734';


const saveElement=(e)=>{
    const _consumer={
        "periode":"2022",//todo: should be from ui
        "no": e.parentElement.children[0].innerHTML,
        "name":e.parentElement.children[2].value,
        "address":e.parentElement.children[4].value,
        "oldConsumption":e.parentElement.children[6].value,
        "newConsumption":e.parentElement.children[8].value,
    }


    let xhr=new XMLHttpRequest();

    let req= xhr.open('POST',baseUrl+'/saveRow',true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    console.log('try to sending element to save in db:',_consumer);


    xhr.send(JSON.stringify(_consumer));
}

