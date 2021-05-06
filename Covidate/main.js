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

var form = document.getElementById("supplier_data");

var name_field = document.getElementById("supplier_name");
var region_field = document.getElementById("supplier_region");
var contact_field = document.getElementById("supplier_contact");

form.addEventListener("submit", sendDataToFirebase);

function sendDataToFirebase(event) {
    event.preventDefault();

    var name = name_field.value;
    var region = region_field.value;
    var contact = contact_field.value;

    storeDataIntoFirebase(name, region.toLowerCase(), contact);

    document.querySelector(".alert").style.display = "block";

    setTimeout(function(){
        document.querySelector(".alert").style.display = "none";
    }, 3000);

    form.reset();
}    

function storeDataIntoFirebase(name, region, contact) {
    var new_lead = oxygen_lead.push();

    new_lead.set({
        oxygen_supplier: name,
        supply_region: region,
        supplier_contact: contact
    });   
}