document.addEventListener('DOMContentLoaded', function() {
    // Form validation for add transaction
    const addTransactionForm = document.getElementById('add-transaction-form');
    if (addTransactionForm) {
        addTransactionForm.addEventListener('submit', function(event) {
            const amount = document.getElementById('amount').value;
            if (isNaN(amount) || amount <= 0) {
                event.preventDefault();
                alert('Please enter a valid positive number for the amount.');
            }
        });
    }

    // Dynamic category suggestions
    const categoryInput = document.getElementById('category');
    if (categoryInput) {
        const categories = ['Groceries', 'Rent', 'Utilities', 'Entertainment', 'Transportation', 'Salary', 'Investments'];
        const datalist = document.createElement('datalist');
        datalist.id = 'category-suggestions';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            datalist.appendChild(option);
        });
        categoryInput.setAttribute('list', 'category-suggestions');
        categoryInput.after(datalist);
    }

    // Auto-hide flash messages
    const flashMessages = document.querySelectorAll('.alert');
    flashMessages.forEach(message => {
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 500);
        }, 5000);
    });

    // Toggle expense/income fields in add transaction form
    const typeSelect = document.getElementById('type');
    const amountLabel = document.querySelector('label[for="amount"]');
    if (typeSelect && amountLabel) {
        typeSelect.addEventListener('change', function() {
            if (this.value === 'income') {
                amountLabel.textContent = 'Income Amount:';
            } else {
                amountLabel.textContent = 'Expense Amount:';
            }
        });
    }

    // Simple chart for reports page (using Chart.js)
    const ctx = document.getElementById('expense-chart');
    if (ctx) {
        // Assuming we have a global variable `chartData` with categories and amounts
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: chartData.categories,
                datasets: [{
                    data: chartData.amounts,
                    backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                    ]
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Expense Distribution'
                }
            }
        });
    }
});