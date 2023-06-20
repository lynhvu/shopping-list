/* Create variables to get the ID to use for eventListener */

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const defaultMsg = document.getElementById('default');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;


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
 

  // Validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if(checkIfItemExist(newItem)) {
      alert('That item already exists!');
      return;
    }
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

  itemsFromStorage.push(item); // add new item to the array

  // Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage; // initialize variable

  if (localStorage.getItem('items') === null) { // item isn't in the storage
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}
 
function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function checkIfItemExist(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
  isEditMode = true;

  // Reset the other item to normal when a new item is clicked
  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i> Update Item';
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;

}

/** Remove item from both DOM and storage */
function removeItem(item) { 
  if (confirm('Are you sure?')) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to remove
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Re-set to localstorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems(e) {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // Clear from local storage
  localStorage.removeItem('items');
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
    defaultMsg.style.display = 'block';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
    defaultMsg.style.display = 'none';
  }

  formBtn.innerHTML = '<i class="fa fa-plus" aria-hidden="true"></i>Add Item';
  formBtn.style.backgroundColor = '#333';
  isEditMode = false;
}

/* Initialize app */
function init() {
  /* Event Listeners ('action', function) */
  itemForm.addEventListener('submit', addItem);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  checkUI();
}

init();


