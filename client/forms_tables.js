var sno = 0;
var details = [];
var isEdit = false;
var selId;
var baseUrl = "http://localhost:3000/api/customers/";
function onSubmit() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let dob = document.getElementById("dob").value;
    let city = document.getElementById("city").value;
    let gender = document.querySelector("input[name='gender']:checked").value;
    let commodities = document.querySelectorAll("input[name='commodity']:checked");
    let selcoms = [];
    for (let e of commodities) {
        selcoms.push(e.value);
    }
    let obj = {
        name: name,
        phone: phone,
        city: city,
        dob: new Date(dob),
        gender: gender,
        bike: selcoms.includes("bike") ? "Yes" : "No",
        car: selcoms.includes("car") ? "Yes" : "No",
        laptop: selcoms.includes("laptop") ? "Yes" : "No",
        mobile: selcoms.includes("mobile") ? "Yes" : "No"
    }
    isEdit ? updateData(obj) : postData(obj);
}

window.onload = function () {
    getAllData();
}

function getAllData() {
    fetch(baseUrl + 'getAllCustomers')
        .then(response => response.json())
        .then(data => {
            details = data.data;
            loopArray();
        }).
        catch((error) => {
            console.error('Error:', error);
        });
}

function deleteById(id) {
    fetch(baseUrl + 'removeCustomer/' + id, {
        method: 'DELETE',

    }).then(response => response.json())
        .then(data =>{
            getAllData();
        } ).
        catch((error) => {
            console.error('Error:', error);
        });
}
function updateData(customer) {
    customer._id = selId;
    fetch(baseUrl + 'updateCustomer', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer),
    }).then(response => response.json())
        .then(data => {
            getAllData();
            onClr();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
function postData(customer) {
    fetch(baseUrl + 'addNewCustomer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer),
    }).then(response => response.json())
        .then(data => {
            getAllData();
            document.getElementById("form").reset();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function loopArray() {
    details.filter(e => {
        e.age = findAge(e.dob);
        e.dob = e.dob.slice(0, 10).split("-").reverse().join("/")
    })
    let table = document.getElementById("dTable");
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    for (let i = 0; i < details.length; i++) {
        let obj = details[i];
        let tRow = `<tr>
            <td>${i + 1}</td>
            <td>${obj.name}</td>
            <td>${obj.phone}</td>
            <td>${obj.dob}</td>
            <td>${obj.age}</td>
            <td>${obj.city}</td>
            <td>${obj.gender}</td>
            <td>${obj.bike}</td>
            <td>${obj.car}</td>
            <td>${obj.laptop}</td>
            <td>${obj.mobile}</td>
            <td>
                <button class="btn btn-info" onclick="onEdit('${obj._id}')">Edit</button>
                <button class="btn btn-danger" onclick="onDelete('${obj._id}')">Delete</button>
            </td>
    </tr>`;
        table.insertAdjacentHTML("beforeend", tRow);
    }
}

function findAge(d) {
    let tDay = new Date();
    let bDay = new Date(d);
    let age = tDay.getFullYear() - bDay.getFullYear();
    let md = tDay.getMonth() - bDay.getMonth();
    let dd = tDay.getDate() - bDay.getDate();
    if (md < 0 || (md == 0 && dd < 0)) {
        age--;
    }
    return age;

}

function onEdit(id) {
    let obj;
    for (let e of details) {
        if (e._id == id) {
            obj = e;
            break;
        }
    }
    isEdit = true;
    selId = id;
    document.getElementById("sbtn").innerHTML = "Update";
    document.getElementById("sbtn").className = "btn btn-success m-2";
    document.getElementById("name").value = obj.name;
    document.getElementById("phone").value = obj.phone;
    document.getElementById("dob").value = obj.dob.split("/").reverse().join("-");
    document.getElementById("city").value = obj.city;
    document.getElementById(obj.gender).checked = true;
    let coms = ["bike", "car", "laptop", "mobile"];
    for (let c of coms) {
        document.getElementById(c).checked = obj[c] == "Yes" ? true : false;
    }

}

function onDelete(id) {
    deleteById(id);
}

function onClr() {
    isEdit = false;
    selId = null;
    document.getElementById("sbtn").innerHTML = "Submit";
    document.getElementById("sbtn").className = "btn btn-primary m-2";
    document.getElementById("form").reset();
}