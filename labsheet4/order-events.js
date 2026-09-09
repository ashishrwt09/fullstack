const { EventEmitter } = require('events');
const orderEmitter = new EventEmitter();

orderEmitter.on('orderPlaced', (order) => {
  console.log("----- Receipt -----");
  console.log(`Order ID : ${order.id}`);
  console.log(`Item     : ${order.item}`);
  console.log(`Amount   : $${order.amount}`);
  console.log("-------------------\n");
});

orderEmitter.emit('orderPlaced', { id: 101, item: 'Laptop Stand', amount: 35 });
orderEmitter.emit('orderPlaced', { id: 102, item: 'Mechanical Keyboard', amount: 80 });
orderEmitter.emit('orderPlaced', { id: 103, item: 'USB-C Cable', amount: 12 });