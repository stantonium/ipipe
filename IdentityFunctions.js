/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function AddModelerGroup(){
 alert("Your account is not authorized to add Groups");   
}

function EditModelerGroup(){
    alert("Your account is not authorized to edit Groups");   
   }

function DeleteModelerGroup(){
    alert("Your account is not authorized to edit Groups");   
   }

   function AddPest(){
    alert("Your account is not authorized to add Pests");   
   }

function DeletePest(){
    alert("Your account is not authorized to delete Pests");   
   }

   function insertCTRParams(){
    let table = document.getElementById('ModelMenuTable');
   // table.deleteRow(3);
    let row = table.insertRow(4);
    let cel1 = row.insertCell(0);
    let cel2 = row.insertCell(1);
     cel1.innerHTML = 'Regulator-accumulated degree days (RADD) <br> Insect Preferred Temperature = <input id ="CTR_temp_pref" type="number">\
     C<br>Sigma = <input id = "CTR_sigma" type ="number"> <br> C = <input id = "CTR_c" type ="number">';
     cel2.innerHTML = 'RADD <br> parameters applied <br>to all subsequent models.<br><button onclick="LoadRADD()">LOAD</button><button onclick="SaveRADD()">SAVE</button>';
   
   }

   function deleteCTRParams(){
    let table = document.getElementById('ModelMenuTable');
    console.log(table);   
    table.deleteRow(4);
   }
function AddSource(){
    if (user !== 'guest') {

    const templatesources = "<input id=\"ACME\"data-dojo-type=\"dijit/form/CheckBox\" value=\"ACME\"\
      onChange=\"AddModelTemplateSource.hide();\
      insertidentities();\
      \"\
      /><label for=\"ACME\" style=\"color:black\">ACME INC</style><br>\
      <input id=\"ScienceApps\"data-dojo-type=\"dijit/form/CheckBox\" value=\"ScienceApps\"\
      onChange=\"alert('Must register for Science Apps')\" /><label for=\"TAMU\" style=\"color:black\">ScienceApps</style><br>\
      "  
	
        AddModelTemplateSource.set("content", templatesources);
        AddModelTemplateSource.show();
    } else {
    alert("To add a source, please login or create an iPIPE account");
   
   }}
function DeleteSource(){
    alert("Default sources cannot be deleted");
}

function AddTemplate(){
    alert("No templates to add");
}

function DeleteTemplate(){
    alert("Public Templates cannot be deleted");
}