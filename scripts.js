function addItem() {
    const itemName = document.getElementById('itemName').value;
    const quantity = document.getElementById('quantity').value;

    const table = document.getElementById('estoqueTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);

    cell1.innerHTML = itemName;
    cell2.innerHTML = quantity;
    cell3.innerHTML = `
        <div class="actions">
            <button onclick="editItem(this)">Editar</button>
            <button onclick="deleteItem(this)">Excluir</button>
        </div>
    `;

    document.getElementById('estoqueForm').reset();
}

function editItem(button) {
    const row = button.parentNode.parentNode.parentNode;
    const itemName = row.cells[0].innerHTML;
    const quantity = row.cells[1].innerHTML;

    document.getElementById('itemName').value = itemName;
    document.getElementById('quantity').value = quantity;

    row.remove();
}

function deleteItem(button) {
    const row = button.parentNode.parentNode.parentNode;
    row.remove();
}
