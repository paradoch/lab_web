document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('productList');
    const searchInput = document.getElementById('search');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const submitBtn = document.getElementById('submitBtn');
    const summaryDiv = document.getElementById('summary');

    submitBtn.addEventListener('click', function(event) {
        event.preventDefault();

        // Валидация полей
        if (nameInput.value.trim() === '' || emailInput.value.trim() === '') {
            alert('Please fill in all fields');
            return;
        }

        if (!validateEmail(emailInput.value)) {
            alert('Please enter a valid email address');
            return;
        }

        // Создаем объект с информацией о заказе
        const orderSummary = {
            product: productList.options[productList.selectedIndex].text,
            name: nameInput.value,
            email: emailInput.value
        };

        // Получаем существующие данные из локального хранилища или создаем новый массив
        let existingOrders = JSON.parse(localStorage.getItem('orderSummary')) || [];

        // Убедимся, что existingOrders является массивом
        if (!Array.isArray(existingOrders)) {
            existingOrders = [];
        }

        existingOrders.push(orderSummary);

        // Сохраняем обновленный массив в локальное хранилище
        localStorage.setItem('orderSummary', JSON.stringify(existingOrders));
    });

    // Функция валидации email
    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
});