const balanceInfo = document.getElementById("balance-info");
const incomeList = document.getElementById("income-list");
const expenseList = document.getElementById("expense-list");
const incomeName = document.getElementById("income-name");
const incomeAmount = document.getElementById("income-amount");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const addIncomeButton = document.getElementById("add-income");
const addExpenseButton = document.getElementById("add-expense");
const totalIncomeElement = document.getElementById("total-income");
const totalExpenseElement = document.getElementById("total-expense");
const addIncomeForm = document.getElementById("addIncomeForm");
const addExpenseForm = document.getElementById("addExpenseForm");


const incomeTransactions = [];
const expenseTransactions = [];

// dodanie transakcji
function addTransaction(name, amount, type) {
    if (!name|| amount <= 0) {
        alert("Wprowadź poprawne dane transakcji.");
        return;
    }

    const transaction = {
        name,
        amount,
        id: Math.random(),
    };
    if (type === "income") {
        incomeTransactions.push(transaction);
    } else {
        expenseTransactions.push(transaction);
    }

    updateUI();
}

// obliacznie bilansu
function calculateBalance() {
    const incomeTotal = calculateTotal(incomeTransactions);
    const expenseTotal = calculateTotal(expenseTransactions);
    const balance = incomeTotal - expenseTotal;
    return balance;
}

// interfejs
function updateUI() {
    clearList(incomeList);
    clearList(expenseList);

    displayTransactions(incomeTransactions, incomeList, "income");
    displayTransactions(expenseTransactions, expenseList, "expense");

    const balance = calculateBalance();
    const totalIncome = calculateTotal(incomeTransactions);
    const totalExpense = calculateTotal(expenseTransactions);

    // aktualizacja bilansu
    if (balance > 0) {
        balanceInfo.textContent = `Możesz jeszcze wydać ${balance.toFixed(2)} złotych`;
    } else if (balance < 0) {
        balanceInfo.textContent = `Bilans jest ujemny. Jesteś na minusie ${Math.abs(balance).toFixed(2)} złotych`;
    } else {
        balanceInfo.textContent = "Bilans wynosi zero";
    }

   
    totalIncomeElement.textContent = `Suma przychodów: ${totalIncome.toFixed(2)} złotych`;
    totalExpenseElement.textContent = `Suma wydatków: ${totalExpense.toFixed(2)} złotych`;

    // Wyczyszczenie pól do dodawania transakcji
    incomeName.value = "";
    incomeAmount.value = "";
    expenseName.value = "";
    expenseAmount.value = "";
}


function clearList(list) {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

// f sumy transakcji
function calculateTotal(transactions) {
    let total = 0;
    for (const transaction of transactions) {
        total += transaction.amount;
    }
    return total;
}

function displayTransactions(transactions, list, type) {
    for (let i = 0; i < transactions.length; i++) {
        const listItem = createTransactionElement(transactions[i], type);
        list.appendChild(listItem);
    }
}

// dodawanie przychodów i wydaktów
addIncomeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = incomeName.value;
    const amount = parseFloat(incomeAmount.value);
    addTransaction(name, amount, "income");
});

addExpenseForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const name = expenseName.value;
    const amount = parseFloat(expenseAmount.value);
    addTransaction(name, amount, "expense");
});

function deleteTransaction(id, type) {
    if (type === "income") {
        const IndexToRemove = incomeTransactions.findIndex((item) => item.id === id);
        incomeTransactions.splice(IndexToRemove, 1);
    } else {
        expenseTransactions.splice((transaction, index) => index !== id);
    }

    updateUI();
}

// lista transakcji
function createTransactionElement(transaction, type) {
    const listItem = document.createElement("li");
    listItem.textContent = `${transaction.name}: ${transaction.amount.toFixed(2)} złotych`;

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
        deleteTransaction(transaction.id, type);
    });

    listItem.appendChild(deleteButton);
    return listItem;
}

updateUI();