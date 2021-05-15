var firebaseConfig = {
    apiKey: "AIzaSyDV_U3SiH7JhqaH_9Vm3IJ8itBXSoK5z4k",
    authDomain: "covidate-b0d4c.firebaseapp.com",
    projectId: "covidate-b0d4c",
    storageBucket: "covidate-b0d4c.appspot.com",
    messagingSenderId: "969702061196",
    appId: "1:969702061196:web:348f2921fa98637ce537a9",
    measurementId: "G-F2E5MHLL82"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();

var oxygen_lead = firebase.database().ref("oxygen-lead");

function searchOxygenLead(region) {
    var query = oxygen_lead.orderByChild("supply_region").equalTo(region);
    query.on("value", function(snapshot){
        if(snapshot.hasChildren()) {

            createTableHeader();

            snapshot.forEach(function(childSnapshot) {
                var name = childSnapshot.val().oxygen_supplier;
                var contact = childSnapshot.val().supplier_contact;
                var region = childSnapshot.val().supply_region;
                var type = childSnapshot.val().supply_type;
                var status = childSnapshot.val().supplier_status;
                
                constructDisplayTable(name, contact, region, type, status);                
            });
        } else {
            confirm("No Lead Found");            
        }
    });
}

var form = document.getElementById("search");
form.addEventListener("submit", searchCalledForOxygenLead);

var table = document.getElementById("oxygen");

var search_region = document.getElementById("region_lookup");

function searchCalledForOxygenLead(event) {
    event.preventDefault();

    while(table.hasChildNodes()) {  
        table.removeChild(table.firstChild);
    } 

    var region = search_region.value;
    searchOxygenLead(region.toLowerCase());
}

function constructDisplayTable(name, contact, region, type, status) {
    var distributor_row = document.createElement("tr");
    var distributor_html = "<td>" + name + "</td>" + "<td>" + contact + "</td>" + "<td>" + region + "</td>" + "<td>" + type + "</td>" + "<td>" + status + "</td>";
    distributor_row.innerHTML = distributor_html;
    table.appendChild(distributor_row);
}

function createTableHeader() {
    var table_header = document.createElement("tr");
    var header_html = "<th>Oxygen Supplier</th><th>Supplier Contact</th><th>Supply Region</th><th>Supply Type</th><th>Supplier Status</th>";
    table_header.innerHTML = header_html;
    table.appendChild(table_header);
}
