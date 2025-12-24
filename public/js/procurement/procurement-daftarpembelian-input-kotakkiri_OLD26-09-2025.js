
////////UPDATE TEXT PHASER////////
function updateText() {
    // Get the selected value from the select dropdown
    var selectedValue = document.getElementById("phase-change-gahara").value;
    console.log('values===++++',selectedValue);
    // Update the text inside the span with the selected value
    document.getElementById("phase-change-prasarana").textContent = selectedValue === "1" ? "I" : selectedValue === "2" ? "II" : selectedValue === "3" ? "III" : selectedValue === "4" ? "IV" : selectedValue === "5" ? "V" : selectedValue === "6" ? "VI" : null;
    showtabel_atas();
}

let dataProcPrasaranaPrime = [];
let dataProcPrasaranaDeposit = [];
let dataProcPrasaranaDepositGahara = [];
let dataProcPrasaranaCashin = [];
function tabPrasarana(dataarray) {
    const rawList_prime = dataarray.proc_prasarana_tab[0].list_prime;
    const rawList_deposit = dataarray.proc_prasarana_tab[0].list_deposit;
    const rawList_deposit_gahara = dataarray.proc_prasarana_tab[0].list_deposit_gahara;
    const rawList_cashin = dataarray.proc_prasarana_tab[0].list_cashin;

    try {
        function parseList(rawList) {
            // Check if the data is already an array, if so, don't parse, otherwise parse it
            if (Array.isArray(rawList)) {
                return rawList.map((item, index) => ({
                    index: index,
                    name: item.name || '',
                    value: item.value || 0
                }));
            } else {
                // If not an array, attempt to parse it
                return JSON.parse(rawList).map((item, index) => ({
                    index: index,
                    name: item.name || '',
                    value: item.value || 0
                }));
            }
        }

        // Apply the parse function to all lists
        dataProcPrasaranaPrime = parseList(rawList_prime);
        dataProcPrasaranaDeposit = parseList(rawList_deposit);
        dataProcPrasaranaDepositGahara = parseList(rawList_deposit_gahara);
        dataProcPrasaranaCashin = parseList(rawList_cashin);

        // Render the content for each section
        renderContent(dataProcPrasaranaPrime, "prime");
        renderContent(dataProcPrasaranaDeposit, "deposit");
        renderContent(dataProcPrasaranaDepositGahara, "deposit-gahara");
        renderContent(dataProcPrasaranaCashin, "cashin");

    } catch (error) {
        console.error("Error parsing lists:", error);
    }
}

// Function to render rows
function renderContent(data, section) {
    const content = data.map((item, index) => {
        if (item.name === '') {
            // Render input fields for new item
            return `
                <div class="d-flex flex-row justify-content-center align-items-center  px-2">
                    <input type="text" id="input-name-${section}-${index}" list="datalistfinance_bankgayahidup_account" style="width: 45%; padding: 2px; font-size: 11px; border-width: 0px; height:11px; " placeholder="Enter name" />
                      <datalist id="datalistfinance_bankgayahidup_account">
                    </datalist>
                    <input type="text" id="input-value-${section}-${index}" style="width: 45%; text-align: right; padding: 2px; font-size: 11px;height:11px;  border-width: 0px; " placeholder="Enter value" />
                    <i class="bi bi-plus" style="font-size: 13px; color: blue; cursor: pointer;" onclick="saveItem('${section}', ${index})"></i>
                </div>
            `;
        } else {
            // Render editable name and value, with a remove button
            return `    
                <div class="d-flex flex-row justify-content-center align-items-center gap-1 px-2">
                    <input type="text" value="${item.name}" id="edit-name-${section}-${index}" 
                        style="width: 50%; padding: 0px; font-size: 11px; height:11px; border-width: 0px;" 
                        onchange="updateItem('${section}', ${index}, 'name')" 
                        onfocus="showIcons(${index}, '${section}')"
                        onblur="hideIcons(${index}, '${section}')"
                        />
                    <input type="text" value="${item.value}" id="edit-value-${section}-${index}" 
                        style="width: 50%; padding: 0px; height:11px; font-size: 11px; border-width: 0px; text-align: right;" 
                        onchange="updateItem('${section}', ${index}, 'value')" 
                        onfocus="showIcons(${index}, '${section}')"
                        onblur="hideIcons(${index}, '${section}')"
                        />
                    <i class="bi bi-pencil" style="font-size: 13px; color: blue; cursor: pointer; display: none;" id="edit-icon-${section}-${index}" onclick="editItem('${section}', ${index})"></i>
                    <i class="bi bi-trash" style="font-size: 13px; color: red; cursor: pointer; display: inline;" id="remove-icon-${section}-${index}" onclick="removeItem(${index}, '${section}')"></i>
                </div>

            `;
        }
    }).join(""); // Join the array of strings into a single string

    // Inject the generated content into the appropriate div based on section
    document.getElementById(`dynamic-content-${section}`).innerHTML = content;
}
// Function to show the icons when input field is focused
function showIcons(index, section) {
    const editIcon = document.getElementById(`edit-icon-${section}-${index}`);
    const removeIcon = document.getElementById(`remove-icon-${section}-${index}`);
    editIcon.style.display = 'inline';  // Show the edit icon
    // removeIcon.style.display = 'inline';  // Show the remove icon
}

// Function to hide the icons when input field loses focus
function hideIcons(index, section) {
    const editIcon = document.getElementById(`edit-icon-${section}-${index}`);
    const removeIcon = document.getElementById(`remove-icon-${section}-${index}`);
    editIcon.style.display = 'none';  // Hide the edit icon
    // removeIcon.style.display = 'none';  // Hide the remove icon
}


/// CREATE LIST ///
var gayaiduplists_element;
function createlist(index = 1) {
    var dataarray = window.dataall;
    console.log(dataarray);

    ////// category ////////////////
    var fixitemsarray = [];
    for (let i = 0; i < dataarray.finance_bankgayahidup_account.length; i++) {
        let element = dataarray.finance_bankgayahidup_account[i];
        if (fixitemsarray.indexOf(element.account) === -1) {
            fixitemsarray.push(element.account);
        }
    }
    gayaiduplists_element = returnarraydata(fixitemsarray);
    console.log(gayaiduplists_element);

    document.getElementById(`datalistfinance_bankgayahidup_account`).innerHTML = gayaiduplists_element;
}

// ==== RETURN OPTION GENERATORS ====
// semua pakai innerText biar tampil di dropdown
function returnarraydata(array) {
    return array.map(function (element) {
        return `<option value="${element}">${element}</option>`;
    }).join('');
}
/// TUTUP CREATE LIST ///

function addNewItemTabPrasarana(section) {

    if (section === "deposit-gahara") {
        setTimeout(() => {
            createlist()
        }, 1000);
    }
    const newItem = {
        name: '',
        value: 0
    };
    let dataArray;
    switch (section) {
        case "prime":
            dataArray = dataProcPrasaranaPrime;
            break;
        case "deposit":
            dataArray = dataProcPrasaranaDeposit;
            break;
        case "deposit-gahara":
            dataArray = dataProcPrasaranaDepositGahara;
            break;
        case "cashin":
            dataArray = dataProcPrasaranaCashin;
            break;
        default:
            console.error("Unknown section:", section);
            return;
    }
    dataArray.push(newItem);
    renderContent(dataArray, section);
}

function saveItem(section, index) {
    const nameInput = document.getElementById(`input-name-${section}-${index}`);
    const valueInput = document.getElementById(`input-value-${section}-${index}`);
    let dataArray;

    // Validate if the name and value inputs are not empty
    if (!nameInput.value.trim() || !valueInput.value.trim()) {
        alert("Both Name and Value fields must be filled out.");
        return; // Prevent further execution if fields are empty
    }
    switch (section) {
        case "prime":
            dataArray = dataProcPrasaranaPrime;
            break;
        case "deposit":
            dataArray = dataProcPrasaranaDeposit;
            break;
        case "deposit-gahara":
            dataArray = dataProcPrasaranaDepositGahara;
            break;
        case "cashin":
            dataArray = dataProcPrasaranaCashin;
            break;
        default:
            console.error("Unknown section:", section);
            return;
    }
    let updatedItem = dataArray[index];
    if (!updatedItem.hasOwnProperty('index')) {
        updatedItem.index = index;  // Add index
    }
    dataArray[index].name = nameInput.value;
    dataArray[index].value = valueInput.value;

    updatePrasaranaTab(dataArray[index], section, index);
    renderContent(dataArray, section);
}

function updateItem(section, index, field) {
    let dataArray;


    switch (section) {
        case "prime":
            dataArray = dataProcPrasaranaPrime;
            break;
        case "deposit":
            dataArray = dataProcPrasaranaDeposit;
            break;
        case "deposit-gahara":
            dataArray = dataProcPrasaranaDepositGahara;
            break;
        case "cashin":
            dataArray = dataProcPrasaranaCashin;
            break;
        default:
            console.error("Unknown section:", section);
            return;
    }

    // Validate that the fields are not empty
    if (field === 'name') {
        const nameInput = document.getElementById(`edit-name-${section}-${index}`).value.trim();
        if (!nameInput) {
            alert("Name field cannot be empty.");
            return; // Prevent update if name is empty
        }
        dataArray[index].name = nameInput;
    } else if (field === 'value') {
        const valueInput = document.getElementById(`edit-value-${section}-${index}`).value.trim();
        if (!valueInput) {
            alert("Value field cannot be empty.");
            return; // Prevent update if value is empty
        }
        dataArray[index].value = valueInput;
    }

    // Re-render the content with the updated data
    renderContent(dataArray, section);

    // Optionally, send the updated data to the backend
    updatePrasaranaTab(dataArray, section);
}


// Function to start editing an item
function editItem(section, index) {
    let dataArray;

    switch (section) {
        case "prime":
            dataArray = dataProcPrasaranaPrime;
            break;
        case "deposit":
            dataArray = dataProcPrasaranaDeposit;
            break;
        case "deposit-gahara":
            dataArray = dataProcPrasaranaDepositGahara;
            break;
        case "cashin":
            dataArray = dataProcPrasaranaCashin;
            break;
        default:
            console.error("Unknown section:", section);
            return;
    }

    // Set the item to be in editing mode
    dataArray[index].isEditing = true;

    // Call updatePrasaranaTab to update the backend with the new data
    updatePrasaranaTab(dataProcPrasaranaPrime, dataProcPrasaranaDeposit, dataProcPrasaranaDepositGahara, dataProcPrasaranaCashin);
    console.log(dataArray);

    // Re-render the content after changing the edit mode
    renderContent(dataArray, section);
}

// Function to remove item
function removeItem(index, section) {
    let dataArray;

    switch (section) {
        case "prime":
            dataArray = dataProcPrasaranaPrime;
            break;
        case "deposit":
            dataArray = dataProcPrasaranaDeposit;
            break;
        case "deposit-gahara":
            dataArray = dataProcPrasaranaDepositGahara;
            break;
        case "cashin":
            dataArray = dataProcPrasaranaCashin;
            break;
        default:
            console.error("Unknown section:", section);
            return;
    }

    // Remove the item from the array
    dataArray.splice(index, 1);

    // Re-render the content after removal
    renderContent(dataArray, section);

    // Call updatePrasaranaTab to update the backend with the new data
    updatePrasaranaTab(dataProcPrasaranaPrime, dataProcPrasaranaDeposit, dataProcPrasaranaDepositGahara, dataProcPrasaranaCashin);
    console.log(dataArray);

}

// Function to update the backend via API
function updatePrasaranaTab(updatedItem, section, index) {
    const data = {
        no: 1,
        list_prime: dataProcPrasaranaPrime,
        list_deposit: dataProcPrasaranaDeposit,
        list_deposit_gahara: dataProcPrasaranaDepositGahara,
        list_cashin: dataProcPrasaranaCashin
    };

    fetch('/procurement/updateprocprasaranatab', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': xi // Make sure `xi` is a valid variable containing the authorization token
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(resdat => {
            console.log('resdat:', resdat);

            if (resdat.icons === 'success') {
                console.log("Successfully updated item in the backend");
                socket.emit('updateprocprasaranatab', data);
            } else {
                warningpopup('error', 'Failed to save checklist');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            warningpopup('error', 'Error in catching: ' + error);
        });
}

// Call renderContent once to render the initial content

////////UPDATE TEXT PHASER////////
