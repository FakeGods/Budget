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
const modal = document.querySelector(".modal");
const editSaveButton = document.getElementById("edit-save");
const editCancelButton = document.getElementById("edit-cancel");
const editModal = document.querySelector(".modal");

const incomeTransactions = [];
const expenseTransactions = [];

function addTransaction(name, amount, type) {
  if (!name || amount <= 0) {
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

function calculateBalance() {
  const incomeTotal = calculateTotal(incomeTransactions);
  const expenseTotal = calculateTotal(expenseTransactions);
  const balance = incomeTotal - expenseTotal;
  return balance;
}

function updateUI() {
  clearList(incomeList);
  clearList(expenseList);

  displayTransactions(incomeTransactions, incomeList, "income");
  displayTransactions(expenseTransactions, expenseList, "expense");

  const balance = calculateBalance();
  const totalIncome = calculateTotal(incomeTransactions);
  const totalExpense = calculateTotal(expenseTransactions);

  if (balance > 0) {
    balanceInfo.textContent = `Możesz jeszcze wydać ${balance.toFixed(
      2
    )} złotych`;
  } else if (balance < 0) {
    balanceInfo.textContent = `Bilans jest ujemny. Jesteś na minusie ${Math.abs(
      balance
    ).toFixed(2)} złotych`;
  } else {
    balanceInfo.textContent = "Bilans wynosi zero";
  }

  totalIncomeElement.textContent = `Suma przychodów: ${totalIncome.toFixed(
    2
  )} złotych`;
  totalExpenseElement.textContent = `Suma wydatków: ${totalExpense.toFixed(
    2
  )} złotych`;

  incomeName.value = "";
  incomeAmount.value = "";
  expenseName.value = "";
  expenseAmount.value = "";
}
function clearList(list) {
  list.innerHTML = "";
}

function calculateTotal(transactions) {
  const total = transactions.reduce(
    (prevValue, currValue) => prevValue + currValue.amount,
    0
  );
  return total;
}

function displayTransactions(transactionsArray, list, type) {
  transactionsArray.forEach((transaction) => {
    const listItem = createTransactionElement(transaction, type);
    list.appendChild(listItem);
  });
}

addIncomeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = incomeName.value;
  const amount = parseFloat(incomeAmount.value);
  addTransaction(name, amount, "income");
});

addExpenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = expenseName.value;
  const amount = parseFloat(expenseAmount.value);
  addTransaction(name, amount, "expense");
});

function deleteTransaction(id, type) {
  if (type === "income") {
    const indexToRemove = incomeTransactions.findIndex(
      (item) => item.id === id
    );
    incomeTransactions.splice(indexToRemove, 1);
  } else {
    const indexToRemove = expenseTransactions.findIndex(
      (item) => item.id === id
    );
    expenseTransactions.splice(indexToRemove, 1);
  }
  updateUI();
}

function editTransaction(id, type) {
  const transactions =
    type === "income" ? incomeTransactions : expenseTransactions;
  const transaction = transactions.find((item) => item.id === id);
  const editNameInput = document.getElementById("edit-name");
  const editAmountInput = document.getElementById("edit-amount");

  editNameInput.value = transaction.name;
  editAmountInput.value = transaction.amount;
  modal.style.display = "block";

  editSaveButton.addEventListener("click", () => {
    const newName = editNameInput.value;
    const newAmount = parseFloat(editAmountInput.value);

    if (newName && newAmount > 0) {
      transaction.name = newName;
      transaction.amount = newAmount;
      updateUI();
      modal.style.display = "none";
    } else {
      alert("Wprowadź poprawne dane transakcji.");
    }
  });

  editCancelButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

function createTransactionElement(transaction, type) {
  const listItem = document.createElement("li");
  listItem.textContent = `${transaction.name}: ${transaction.amount.toFixed(
    2
  )} złotych`;

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTransaction(transaction.id, type);
  });

  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fas fa-edit"></i>';
  editButton.classList.add("edit-button");
  editButton.addEventListener("click", () => {
    editTransaction(transaction.id, type);
  });

  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

updateUI();
