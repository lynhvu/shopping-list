function addItem () {
    let form = document.getElementById("add-item");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let item = document.getElementById('item-input').value;
        console.log(item);
        document.getElementById("item-display").innerHTML = item;
        alert("Submitted");
    })

} 