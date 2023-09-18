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

// Inicjalizacja danych budżetowych
let incomeTransactions = [];
let expenseTransactions = [];

// Funkcja dodająca transakcję
function addTransaction(name, amount, type) {
    if (name === "" || amount <= 0) {
        alert("Wprowadź poprawne dane transakcji.");
        return;
    }

    const transaction = {
        name,
        amount,
    };

    if (type === "income") {
        incomeTransactions.push(transaction);
    } else {
        expenseTransactions.push(transaction);
    }

    updateUI();
}

// Funkcja obliczająca bilans
function calculateBalance() {
    const incomeTotal = calculateTotal(incomeTransactions);
    const expenseTotal = calculateTotal(expenseTransactions);
    const balance = incomeTotal - expenseTotal;
    return balance;
}

// Funkcja aktualizująca interfejs użytkownika
function updateUI() {
    clearList(incomeList);
    clearList(expenseList);

    displayTransactions(incomeTransactions, incomeList, "income");
    displayTransactions(expenseTransactions, expenseList, "expense");

    const balance = calculateBalance();
    const totalIncome = calculateTotal(incomeTransactions);
    const totalExpense = calculateTotal(expenseTransactions);

    // Aktualizacja bilansu
    if (balance > 0) {
        balanceInfo.textContent = `Możesz jeszcze wydać ${balance.toFixed(2)} złotych`;
    } else if (balance < 0) {
        balanceInfo.textContent = `Bilans jest ujemny. Jesteś na minusie ${Math.abs(balance).toFixed(2)} złotych`;
    } else {
        balanceInfo.textContent = "Bilans wynosi zero";
    }

    // Aktualizacja sumy wydatków i przychodów
    totalIncomeElement.textContent = `Suma przychodów: ${totalIncome.toFixed(2)} złotych`;
    totalExpenseElement.textContent = `Suma wydatków: ${totalExpense.toFixed(2)} złotych`;

    // Wyczyszczenie pól do dodawania transakcji
    incomeName.value = "";
    incomeAmount.value = "";
    expenseName.value = "";
    expenseAmount.value = "";
}

// Funkcja usuwająca element z listy
function clearList(list) {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

// Funkcja obliczająca sumę transakcji
function calculateTotal(transactions) {
    let total = 0;
    for (const transaction of transactions) {
        total += transaction.amount;
    }
    return total;
}

// Funkcja wyświetlająca transakcje
function displayTransactions(transactions, list, type) {
    for (let i = 0; i < transactions.length; i++) {
        const listItem = createTransactionElement(transactions[i], i, type);
        list.appendChild(listItem);
    }
}

// Obsługa dodawania przychodów
addIncomeButton.addEventListener("click", () => {
    const name = incomeName.value;
    const amount = parseFloat(incomeAmount.value);
    addTransaction(name, amount, "income");
});

// Obsługa dodawania wydatków
addExpenseButton.addEventListener("click", () => {
    const name = expenseName.value;
    const amount = parseFloat(expenseAmount.value);
    addTransaction(name, amount, "expense");
});

// Funkcja usuwająca transakcję
function deleteTransaction(id, type) {
    if (type === "income") {
        incomeTransactions = incomeTransactions.filter((transaction, index) => index !== id);
    } else {
        expenseTransactions = expenseTransactions.filter((transaction, index) => index !== id);
    }

    updateUI();
}

// Funkcja tworząca element listy transakcji
function createTransactionElement(transaction, id, type) {
    const listItem = document.createElement("li");
    listItem.textContent = `${transaction.name}: ${transaction.amount.toFixed(2)} złotych`;

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
        deleteTransaction(id, type);
    });

    listItem.appendChild(deleteButton);
    return listItem;
}

//interfejs
updateUI();