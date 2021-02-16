var sno = 0;
var details = [];
var isEdit = false;
var selRow;
function onSubmit() {
    isEdit ? onUpdate() : onSave();
}

window.onload = function () {
    // getAllData();
    // postData();
    // deleteById();
    updateData();
}

function getAllData() {
    fetch('http://localhost:3000/api/customers/getAllCustomers')
        .then(response => response.json())
        .then(data => console.log(data)).
        catch((error) => {
            console.error('Error:', error);
        });
}

function deleteById(){
    fetch('http://localhost:3000/api/customers/removeCustomer/602b9a8bf40ce10e4c84567c',{
        method:'DELETE',

    }).then(response => response.json())
        .then(data => console.log(data)).
        catch((error) => {
            console.error('Error:', error);
        });
}


function updateData() {
    let customer = {
        dob: new Date("1994-11-17"),
        _id:"601ff64696611b22dc15c011"
    }
    fetch('http://localhost:3000/api/customers/updateCustomer', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer) ,
    }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function postData() {
    let customer = {
        name:"Gowtami",
        phone:8970091132,
        dob: new Date("1994-11-17"),
        city:"Chennai",
        gender:"Female",
        car:"Yes",
        bike:"Yes",
        laptop:"Yes",
        mobile:"Yes"
    }
    fetch('http://localhost:3000/api/customers/addNewCustomer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer) ,
    }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function onUpdate() {
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
        dob: dob.split("-").reverse().join("/"),
        age: findAge(dob),
        gender: gender,
        bike: selcoms.includes("bike") ? "Yes" : "No",
        car: selcoms.includes("car") ? "Yes" : "No",
        laptop: selcoms.includes("laptop") ? "Yes" : "No",
        mobile: selcoms.includes("mobile") ? "Yes" : "No"
    }
    details[selRow - 1] = obj;
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
                <button class="btn btn-info" onclick="onEdit(${sno})">Edit</button>
                <button class="btn btn-danger" onclick="onDelete(${sno})">Delete</button>
            </td>
    </tr>`;
        table.insertAdjacentHTML("beforeend", tRow);
    }
    onClr();
}

function onSave() {
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
        dob: dob.split("-").reverse().join("/"),
        age: findAge(dob),
        gender: gender,
        bike: selcoms.includes("bike") ? "Yes" : "No",
        car: selcoms.includes("car") ? "Yes" : "No",
        laptop: selcoms.includes("laptop") ? "Yes" : "No",
        mobile: selcoms.includes("mobile") ? "Yes" : "No"
    }
    details.push(obj);
    sno++;
    let tRow = `<tr>
            <td>${sno}</td>
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
                <button class="btn btn-info" onclick="onEdit(${sno})">Edit</button>
                <button class="btn btn-danger" onclick="onDelete(${sno})">Delete</button>
            </td>
    </tr>`;
    document.getElementById("dTable").insertAdjacentHTML("beforeend", tRow);
    document.getElementById("form").reset();
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


function onEdit(i) {
    isEdit = true;
    selRow = i;
    document.getElementById("sbtn").innerHTML = "Update";
    document.getElementById("sbtn").className = "btn btn-success m-2";
    let obj = details[i - 1];
    document.getElementById("name").value = obj.name;
    document.getElementById("phone").value = obj.phone;
    document.getElementById("dob").value = obj.dob.split("/").reverse().join("-");
    document.getElementById("city").value = obj.city;
    document.getElementById(obj.gender).checked = true;
    let coms = ["bike", "car", "laptop", "mobile"];
    for (let c of coms) {
        document.getElementById(c).checked = obj[c] == "Yes" ? true : false;
    }
    // document.getElementById("bike").checked = obj.bike=="Yes"?true:false; 
    // document.getElementById("car").checked = obj.car=="Yes"?true:false; 
    // document.getElementById("laptop").checked = obj.laptop=="Yes"?true:false; 
    // document.getElementById("mobile").checked = obj.mobile=="Yes"?true:false; 
}


function onDelete(i) {
    details.splice(i - 1, 1);
    sno = details.length;
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
                <button class="btn btn-info" onclick="onEdit(${sno})">Edit</button>
                <button class="btn btn-danger" onclick="onDelete(${sno})">Delete</button>
            </td>
    </tr>`;
        table.insertAdjacentHTML("beforeend", tRow);
    }

}

function onClr() {
    isEdit = false;
    selRow = null;
    document.getElementById("sbtn").innerHTML = "Submit";
    document.getElementById("sbtn").className = "btn btn-primary m-2";
    document.getElementById("form").reset();
}