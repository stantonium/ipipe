/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

function insertRADDParams(value) {
    console.log(value);
    $.ajax({
        url: './models/ThirdPartyModels/TAMU/insertRADDParams.php',
        data: {
            'user_id': user.user_id,
            'Name': value
        },
        type: 'POST'
    }).done(reply => {
        if (reply) {
            console.log(reply);
            let params = JSON.parse(reply);
            params = params[0];
            //console.log(params);
            document.getElementById("CTR_temp_pref").value = params.IPT;
            document.getElementById("CTR_sigma").value = params.sigma;
            document.getElementById("CTR_c").value = params.c;
            

        }
    })
}

var SavedRADDModelsfromDB = '';
function putinbox(value) {
    //console.log(value.Name);
    value = value.Name;
    SavedRADDModelsfromDB += "<input id=\"" + value + "\"data-dojo-type=\"dijit/form/CheckBox\" value=\"" + value + "\
\"onChange=\"SavedRADDModels.hide();insertRADDParams('"+ value + "');\"/><label for=\"" + value + "\" style =\"color:black\">" + value + "</style><br>";
}

function LoadRADD() {
    $.ajax({
        url: './models/ThirdPartyModels/TAMU/RADDLoadModels.php',
        data: {
            'user_id': user.user_id
        },
        type: 'POST'
    }).done(reply => {
        if (reply) {
            let models = JSON.parse(reply);
            //    console.log(models);
            SavedRADDModelsfromDB = '';
            models.forEach(putinbox);


            //console.log(SavedRADDModelsfromDB);
            SavedRADDModels.set("content", SavedRADDModelsfromDB);
            SavedRADDModels.show();
        }
    })
}
function SaveToRADD(ModelName) {
    let RADDName = dijit.byId('RADDnameBox').get('value');
    console.log(RADDName);
    dijit.byId('RADDPrompt').hide();
    let IPT = document.getElementById("CTR_temp_pref").value;
    let sigma = document.getElementById("CTR_sigma").value;
    let c = document.getElementById("CTR_c").value;
    if (!IPT || !sigma || !c) { alert('RADD parameters cannot be blank.'); }
    $.ajax({
        url: './models/ThirdPartyModels/TAMU/RADDSaveAsModel.php',
        data: {
            "IPT": IPT,
            "sigma": sigma,
            "c": c,
            "user_id": parseInt(user.user_id),
            "Name": RADDName
        },

        type: 'POST'
    }).done(reply => { alert(reply); })

}
function SaveRADD() {

    let MN = userInitials + " RADD";
    let uiop = '<form data-dojo-type="dijit.form.Form" onsubmit="SaveToRADD(RaddName); return false"><div class="dijitDialogPaneContentArea"><label for="RADDnameBox" style="color:black">RADD Parameter set Name: </label><div data-dojo-type="dijit.form.TextBox" data-dojo-props="required:true" id="RADDnameBox" value="';
    uiop += MN;
    uiop += '"></div></div><div class="dijitDialogPaneActionBar"><button data-dojo-type="dijit.form.Button" type="button" data-dojo-props="onClick:SaveToRADD">OK</button><button data-dojo-type="dijit.form.Button" type="button" data-dojo-props="onClick:function(){ModelName = null; dijit.byId(\'RADDPrompt\').hide(); }">Cancel</button></div> </form>';
    RADDPrompt.set("content", uiop)
    RADDPrompt.show();

}