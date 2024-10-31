// Получаем данные пользователей из localStorage
const users = JSON.parse(localStorage.getItem('users')) || [];

// Отображаем данные пользователей в таблице
const userTable = document.getElementById('userTable');
users.forEach(user => {
    const row = userTable.insertRow();
    row.insertCell(0).textContent = user.name;
    row.insertCell(1).textContent = user.email;
});

// Получаем данные о заказах из localStorage
const orderSummary = JSON.parse(localStorage.getItem('orderSummary')) || [];

// Отображаем карточки с заказами пользователей
const userSubmissions = document.getElementById('userSubmissions');
orderSummary.forEach(order => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<h3>${order.name}'s Order</h3>
                      <p>Product: ${order.product}</p>
                      <p>Email: ${order.email}</p>`;
    userSubmissions.appendChild(card);
});