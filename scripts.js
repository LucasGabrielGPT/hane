let currentEditableCell = null;

function addItem() {
    const itemID = document.getElementById('itemID').value;
    const itemName = document.getElementById('itemName').value;
    const quantity = document.getElementById('quantity').value;

    const table = document.getElementById('estoqueTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);

    cell1.className = 'editable';
    cell2.className = 'editable';
    cell3.className = 'editable';

    cell1.innerHTML = itemID;
    cell2.innerHTML = itemName;
    cell3.innerHTML = quantity;
    cell4.innerHTML = `
        <div class="actions">
            <button onclick="deleteItem(this)">Excluir</button>
        </div>
    `;

    cell1.addEventListener('click', () => makeEditable(cell1));
    cell2.addEventListener('click', () => makeEditable(cell2));
    cell3.addEventListener('click', () => makeEditable(cell3));

    document.getElementById('estoqueForm').reset();
}

function makeEditable(cell) {
    if (currentEditableCell && currentEditableCell !== cell) {
        currentEditableCell.contentEditable = false;
        currentEditableCell.style.padding = '12px';
    }

    cell.contentEditable = true;
    cell.style.padding = '8px';
    cell.focus();
    currentEditableCell = cell;
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
        const idCell = row.getElementsByTagName('td')[0];
        const match = idCell.innerHTML.toLowerCase().includes(input);
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
