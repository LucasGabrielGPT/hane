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

function searchItems() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const table = document.getElementById('estoqueTable').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');

    for (let row of rows) {
        const cells = row.getElementsByTagName('td');
        let match = false;
        for (let cell of cells) {
            if (cell.innerHTML.toLowerCase().includes(input)) {
                match = true;
                break;
            }
        }
        row.style.display = match ? '' : 'none';
    }
}

function sortTable(n) {
    const table = document.getElementById('estoqueTable');
    let switching = true;
    let shouldSwitch;
    let switchcount = 0;
    let direction = 'asc';
    let rows, i, x, y;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName('TD')[n];
            y = rows[i + 1].getElementsByTagName('TD')[n];

            if ((direction === 'asc' && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) ||
                (direction === 'desc' && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase())) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount === 0 && direction === 'asc') {
                direction = 'desc';
                switching = true;
            }
        }
    }
}
