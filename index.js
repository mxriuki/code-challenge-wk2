
let shoppingList = [];

const itemInput = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const markPurchasedButton = document.getElementById('mark-purchased-button');
const clearListButton = document.getElementById('clear-list-button');
const shoppingListContainer = document.getElementById('shopping-list');


addButton.addEventListener('click', addItem);
markPurchasedButton.addEventListener('click', markPurchased);
clearListButton.addEventListener('click', clearList);

function addItem() {
  const item = itemInput.value.trim();
  if (item !== '') {
    shoppingList.push(item);
    displayItem(item, false);
    itemInput.value = '';
  }
}

function markPurchased() {
  const listItems = document.querySelectorAll('#shopping-list li');
  listItems.forEach((item, index) => {
    if (item.classList.contains('purchased')) {
      item.classList.remove('purchased');
      shoppingList[index] = shoppingList[index].replace(/\s*\(purchased\)\s*$/, '');
    } else {
      item.classList.add('purchased');
      shoppingList[index] += ' (purchased)';
    }
  });
}


function clearList() {
  shoppingList = [];
  shoppingListContainer.innerHTML = '';
}

function displayItem(item, isPurchased) {
  const listItem = document.createElement('li');
  listItem.textContent = item;
  if (isPurchased) {
    listItem.classList.add('purchased');
  }
  shoppingListContainer.appendChild(listItem);
}


loadFromLocalStorage();


function loadFromLocalStorage() {
  const storedList = localStorage.getItem('shoppingList');
  if (storedList) {
    shoppingList = JSON.parse(storedList);
    shoppingList.forEach((item) => {
      const isPurchased = item.includes(' (purchased)');
      const itemText = item.replace(/\s*\(purchased\)\s*$/, '');
      displayItem(itemText, isPurchased);
    });
  }
}


function saveToLocalStorage() {
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}


window.addEventListener('beforeunload', saveToLocalStorage);