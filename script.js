/* Create variables to get the ID to use for eventListener */

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');


/* Implement the functions before they get called */


function displayItems() {
 const itemsFromStorage = getItemsFromStorage();
 // Add items from local storage to the DOM
 itemsFromStorage.forEach((item) => {
  addItemtoDOM(item);
 })
 checkUI();
}

function addItem(e) {
  e.preventDefault();
  let newItem = itemInput.value;
  newItem = newItem.charAt(0).toUpperCase() + newItem.slice(1); // Capitalize the first letter
  console.log(newItem);
  // Validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  // Create item DOM element
  addItemtoDOM(newItem);

  // Add item to local storage
  addItemToStorage(newItem);

  checkUI();

  itemInput.value = '';
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa fa-times');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function addItemtoDOM(item) {
  // Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  itemList.appendChild(li);
}

function addItemToStorage(item) {
  let itemsFromStorage = getItemsFromStorage(); 

  itemsFromStorage.push(); // add new item to the array

  // Convert to JSON string and set to local storage
  localStorage.setItem('item', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage; // initialize variable

  if (localStorage.getItem('item') === null) { // item isn't in the storage
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('item'));
  }
  return itemsFromStorage;
}
 
function removeItem(e) { 
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
  
}

function clearItems(e) {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUI();
}

function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLocaleLowerCase();

    // If text doesn't have anything that match itemName, then indexOf would return a -1
    if(itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  })

}

function checkUI() {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

/* Initialize app */
function init() {
  /* Event Listeners ('action', function) */
  itemForm.addEventListener('submit', addItem);
  itemList.addEventListener('click', removeItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  checkUI();
}

init();


