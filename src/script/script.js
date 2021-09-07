import placeholder from '../img/placeholder.jpg';

// Создаем переменную, где будет храниться структура документа
// получаем массив из JSON
let docStructure = [];
let prods = require('../prods.json');
prods = prods.products;

// Разбиваем документы по датам, где каждой дате соответствует массив продуктов
let docsByDate = sortDocsByDate(prods);

// Структурируем информацию:
// 1. Разбиваем продукты по документам внутри каждой даты
// 2. Распределяем необходимую информацию по соответствующим уровням вложенности
// 3. Собираем сформированные объекты в массив
for (let key in docsByDate) {
  let docsArr = docsByDate[key],
    productsByDoc = sortProdsByDocs(docsArr),
    docs = [],
    docsSum = 0;

  for (let key in productsByDoc) {
    let doc = productsByDoc[key],
      rawProdInfo = doc.products,
      processedInfo = handelProductsInfo(rawProdInfo),
      prodsSum = processedInfo.sum;

    docsSum += prodsSum;
    doc.products = processedInfo.products;
    doc.prodsSum = prodsSum.toFixed(2);
    docs.push(doc);
  }

  let day = {
    dateShort: getShortDate(key),
    documents: docs,
    docsSum: docsSum.toFixed(2)
  }

  docStructure.push(day);
}

function getShortDate(d) {
  let date = new Date(d);
  date = date.toLocaleString('ru', { day: 'numeric', month: 'long' });
  date = date.split(' ');
  date[1] = date[1].substr(0, 1).toUpperCase() + date[1].substr(1);
  date = date.join(' ');
  return date;
}

function sortDocsByDate(products) {
  let sortedByDate = {};
  products.forEach(el => {
    let elDate = el.date.split(' ');
    elDate = elDate[0];

    if (!sortedByDate[elDate]) sortedByDate[elDate] = [];

    sortedByDate[elDate].push(el);
  })

  return sortedByDate;
}

function sortProdsByDocs(arr) {
  let sortedByDocs = {}
  arr.forEach(el => {
    if (!sortedByDocs[el.docId]) {
      sortedByDocs[el.docId] = {
        docId: el.docId,
        typeName: el.typeName,
        typeId: el.typeId,
        date: el.date,
        products: []
      };
    }
    sortedByDocs[el.docId].products.push(el);
  })
  return sortedByDocs;
}

function handelProductsInfo(arr) {
  let prods = [];
  let prodsSum = 0;

  arr.forEach(el => {
    let img = (el.image) ? el.image : placeholder;
    prodsSum += el.price * el.quantity;
    let obj = {
      rowId: el.rowId,
      quantity: el.quantity,
      prodId: el.prodId,
      prodName: el.prodName,
      image: img,
      price: el.price,
      removed: el.removed,
    }

    if(!el.image) obj.noImg = true;

    prods.push(obj);
  })

  return {
    products: prods,
    sum: prodsSum
  }
}

export default docStructure;
