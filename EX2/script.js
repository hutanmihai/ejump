let data = [];

// Fetch the data from the file
fetch('./dataScript/data.txt')
    .then(response => response.text())
    .then(text => {
        processData(text);
        createAndAppendSelects(data);
        updateTable(data);
    })
    .catch(error => {
        console.error('Error loading file:', error);
    });

// Function to process the data from the file and save it in the data array
function processData(text) {
    const lines = text.split('\n');

    lines.forEach(line => {
        const [a, b, c] = line.split(',').map(item => item.trim()); // Using map to trim the spaces or new lines

        data.push({
            A: a, B: b, C: c
        });
    });
}

// Function to create the selects and options based on the data input
function createAndAppendSelects(filteredData) {
    const container = document.querySelector('.container-selection');

    // We create a select for each letter
    ['A', 'B', 'C'].forEach(key => {
        const select = document.createElement('select');
        select.name = key;
        select.id = key;

        // Create the first option with value 'Toate' and text 'Toate' which is the general option
        const allOption = document.createElement('option');
        allOption.value = 'Toate';
        allOption.textContent = 'Toate';
        allOption.selected = true;
        select.appendChild(allOption);

        // Get the unique values for possible options based on input data
        const options = [...new Set(filteredData.map(item => item[key]))]; // Using Set to get the unique values

        // Create the options for the select
        options.forEach(optionValue => {
            const option = document.createElement('option');
            option.value = optionValue;
            option.textContent = optionValue;
            select.appendChild(option);
            select.addEventListener('change', filterData)
        });

        // Add the select and options in DOM
        const selectionDiv = document.createElement('div');
        selectionDiv.className = 'selection';
        const label = document.createElement('label');
        label.for = key.toUpperCase();
        label.textContent = key.toUpperCase() + ':';
        selectionDiv.appendChild(label);
        selectionDiv.appendChild(select);
        container.appendChild(selectionDiv);
    });
}

// Function that gets triggered by any change in any of the selects
function filterData() {
    const selectA = document.getElementById('A');
    const selectB = document.getElementById('B');
    const selectC = document.getElementById('C');

    // Get current selected values
    const selectedA = selectA.value;
    const selectedB = selectB.value;
    const selectedC = selectC.value;

    // Filter the data based on the selected values
    // Not really proud of this :))
    const filteredData = data.filter(item => {
        if (selectedA === 'Toate' && selectedB === 'Toate' && selectedC === 'Toate') {
            return data;
        } else if (selectedA === 'Toate' && selectedB === 'Toate') {
            return item.C === selectedC;
        } else if (selectedA === 'Toate' && selectedC === 'Toate') {
            return item.B === selectedB;
        } else if (selectedB === 'Toate' && selectedC === 'Toate') {
            return item.A === selectedA;
        } else if (selectedA === 'Toate') {
            return item.B === selectedB && item.C === selectedC;
        } else if (selectedB === 'Toate') {
            return item.A === selectedA && item.C === selectedC;
        } else if (selectedC === 'Toate') {
            return item.A === selectedA && item.B === selectedB;
        } else {
            return item.A === selectedA && item.B === selectedB && item.C === selectedC;
        }
    });

    // Update the table with the filtered data
    updateTable(filteredData);

    // Update the options for the selects based on the filtered data
    const optionsA = [...new Set(filteredData.map(item => item.A))];
    updateSelectOptions(selectA, optionsA, selectedA);

    const optionsB = [...new Set(filteredData.map(item => item.B))];
    updateSelectOptions(selectB, optionsB, selectedB);

    const optionsC = [...new Set(filteredData.map(item => item.C))];
    updateSelectOptions(selectC, optionsC, selectedC);
}

function updateSelectOptions(select, options, selected) {
    // Clear the existing options
    select.innerHTML = '';

    // Add the 'Toate' option if there are more than 1 options
    if (options.length !== 1) {
        const allOption = document.createElement('option');
        allOption.value = 'Toate';
        allOption.textContent = 'Toate';
        if (selected === 'Toate') {
            allOption.selected = true;
        }
        select.appendChild(allOption);
    }

    // Add the updated options
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        if (option === selected) {
            optionElement.selected = true;
        }
        select.appendChild(optionElement);
    });
}

// Function to update the table rows based on filtered data
function updateTable(filteredData) {

    const tableContainer = document.querySelector('.container-table');

    // Clear existing table
    while (tableContainer.firstChild) {
        tableContainer.removeChild(tableContainer.firstChild);
    }

    // Create the table element
    const table = document.createElement('table');

    filteredData.forEach(item => {
        const row = document.createElement('tr');
        ['A', 'B', 'C'].forEach(key => {
            const td = document.createElement('td');
            td.textContent = item[key];
            row.appendChild(td);
        });
        table.appendChild(row);
    });

    // Append the table to the container
    tableContainer.appendChild(table);
}

function resetPage() {
    const containerSelection = document.querySelectorAll('.selection')
    const containerTable = document.querySelector('.container-table');

    containerTable.innerHTML = '';
    containerSelection.forEach(item => {
        item.remove();
    });

    createAndAppendSelects(data);
    updateTable(data)
}