document.addEventListener("DOMContentLoaded", function() {
    const itemList = [];
  
    const getItem = document.getElementById("add-item");
  
    function display(itemList) {
      document.getElementById("item-display").innerHTML = itemList.length;
    }
  
    getItem.addEventListener("submit", function(e) {
      e.preventDefault();
      const input = document.getElementById('item-input').value;
      const item = input;
      console.log(item);
      itemList.push(item);
      console.log(itemList);
      display(itemList);
      alert("Added " + item);
    });
});
  
