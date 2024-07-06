
let shoppingList = [];

const itemInput = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const clearListButton = document.getElementById('clear-list-button');
const shoppingListContainer = document.getElementById('shopping-list');

addButton.addEventListener('click', addItem);
clearListButton.addEventListener('click', clearList);
shoppingListContainer.addEventListener('click', togglePurchased);

function addItem() {
  const item = itemInput.value.trim();
  if (item !== '') {
    shoppingList.push({ name: item, purchased: false });
    displayItem(item, false);
    itemInput.value = '';
    saveToLocalStorage();
  }
}

function togglePurchased(event) {
  if (event.target.tagName === 'LI') {
    const index = Array.from(shoppingListContainer.children).indexOf(event.target);
    shoppingList[index].purchased = !shoppingList[index].purchased;
    event.target.classList.toggle('purchased');
    saveToLocalStorage();
  }
}

function clearList() {
  shoppingList = [];
  shoppingListContainer.innerHTML = '';
  saveToLocalStorage();
}

function displayItem(item, isPurchased) {
  const listItem = document.createElement('li');
  listItem.textContent = item;
  if (isPurchased) {
    listItem.classList.add('purchased');
  }
  shoppingListContainer.appendChild(listItem);
}

function loadFromLocalStorage() {
  const storedList = localStorage.getItem('shoppingList');
  if (storedList) {
    shoppingList = JSON.parse(storedList);
    shoppingList.forEach((item) => {
      displayItem(item.name, item.purchased);
    });
  }
}

function saveToLocalStorage() {
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

window.addEventListener('beforeunload', saveToLocalStorage);

loadFromLocalStorage();
