const products = [
    { id: 1, name: "Laptop", brand: "Apple", price: 1500, quantity: 5 },
    { id: 2, name: "Smartphone", brand: "Samsung", price: 1200, quantity: 10 },
    { id: 3, name: "Tablet", brand: "Apple", price: 800, quantity: 7 },
    { id: 4, name: "Smartwatch", brand: "Garmin", price: 300, quantity: 15 },
    { id: 5, name: "Headphones", brand: "Sony", price: 200, quantity: 20 }
];

const productsCopy = [...products];

const productIdToFind = 3;
const productIndex = products.findIndex(product => product.id === productIdToFind);
console.log(productIndex); 

const expensiveProducts = products.filter(product => product.price > 1000);
console.log(expensiveProducts);

const totalValue = products.reduce((accumulator, product) => accumulator + (product.price * product.quantity), 0);
console.log(totalValue); 

const hasAppleProduct = products.some(product => product.brand === "Apple");
console.log(hasAppleProduct); 

const allProductsInStock = products.every(product => product.quantity > 0);
console.log(allProductsInStock); 

const moreProducts = [
    { id: 6, name: "Camera", brand: "Canon", price: 900, quantity: 8 },
    { id: 7, name: "Printer", brand: "HP", price: 150, quantity: 12 }
];
const combinedProducts = [...products, ...moreProducts];
console.log(combinedProducts);

products.forEach(product => {
    console.log(`ID: ${product.id}, Name: ${product.name}, Brand: ${product.brand}, Price: $${product.price}, Quantity: ${product.quantity}`);
});

const newProductEnd = { id: 8, name: "Monitor", brand: "Dell", price: 400, quantity: 6 };
products.push(newProductEnd);
console.log(products);

const newProductStart = { id: 9, name: "Keyboard", brand: "Logitech", price: 100, quantity: 25 };
products.unshift(newProductStart);
console.log(products);