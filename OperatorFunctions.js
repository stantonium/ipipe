/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
var active
var inactive
var selectedscheduledmodel = []
function activateruns() {
  //console.log(selectedscheduledmodel)
  $.ajax({
    url: 'SetActiveModels.php',
    data: {
      'selectedscheduledmodel': selectedscheduledmodel,
      'action': 'activate',
      'userid': user.user_id
    },
    type: 'POST'
  }).done(function (reply) {
    //console.log(reply)
    ShowSchedulePanel(reply)
    selectedscheduledmodel = []
  })
}


function deactivateruns() {
  // console.log(selectedscheduledmodel)
  $.ajax({
    url: 'SetActiveModels.php',
    data: {
      'selectedscheduledmodel': selectedscheduledmodel,
      'action': 'deactivate',
      'userid': user.user_id

    },
    type: 'POST'
  }).done(function (reply) {
    //console.log(reply)
    ShowSchedulePanel(reply)
    selectedscheduledmodel = []
  })
}
function selectedscheduledmodels(x) {
  selectedscheduledmodel.push(x)
  let selectedscheduledmodelspan = x + 'ID'
  selectedscheduledmodelspan = document.getElementById(selectedscheduledmodelspan)
  //console.log(selectedscheduledmodelspan)
  selectedscheduledmodelspan.setAttribute('style', 'color:red;');
  event.stopPropagation();
}
function removefromschedule(scheduledmodelid) {
  $.ajax({
    url: 'RemovefromSchedule.php',
    data: {
      'scheduledmodelid': scheduledmodelid
    },
    type: 'POST'
  }).done(function (reply) {
    //console.log(reply)
    let selectedscheduledmodelspan = scheduledmodelid + 'SM'
    selectedscheduledmodelspan = document.getElementById(selectedscheduledmodelspan)
    selectedscheduledmodelspan.remove()
  })
}

function populateschedulepanel(entry) {
  if (entry.includes('true')) {
    console.log(entry)
    entry = entry.split(':')
    let aoiname = entry[2]
    entry = entry[0].split('|')
    active = active + '<li id="' + entry[0] + 'SM" onclick="removefromschedule(\''
    active = active + entry[0] + '\')"><span id="' + entry[0] + 'SMID'
    active = active + '" onclick="selectedscheduledmodels(\'' + entry[0]
    active = active + 'SM\')" style="color:white;">' + entry[1] + ' ' + aoiname + '</span></li>'

  }
  else if (entry.includes('false')) {
    entry = entry.split(':')
    let aoiname = entry[2]
    entry = entry[0].split('|')
    inactive = inactive + '<li id="' + entry[0] + 'SM" onclick="removefromschedule(\''
    inactive = inactive + entry[0] + '\')"><span id="' + entry[0] + 'SMID'
    inactive = inactive + '" onclick="selectedscheduledmodels(\'' + entry[0]
    inactive = inactive + 'SM\')" style="color:white;">' + entry[1] + ' ' + aoiname + '</span></li>'
  }

}

function getScheduledModel(){
  $.ajax({
    url: 'getScheduledModel.php',
    data: {
      'userid': user.user_id
    },
    type: 'POST'
  }).done(function (reply) {
    console.log(reply)
    ShowSchedulePanel(reply)
  })

}
function ShowSchedulePanel(schedule) {
  console.log(schedule)
  active = ''
  inactive = ''
  var scheduledmodels = schedule.split(',')
  let fixfirst = scheduledmodels[0].split(':')
  scheduledmodels[0] = fixfirst[1] + ':' + fixfirst[2] + ':' + fixfirst[3]
  fixfirst = scheduledmodels[0].split('"')
  scheduledmodels[0] = fixfirst[1]
  document.getElementById("ActiveUserModels").innerHTML = '';
  document.getElementById("InactiveUserModels").innerHTML = '';
  console.log(scheduledmodels)
  scheduledmodels.forEach(populateschedulepanel)
  document.getElementById("ActiveUserModels").innerHTML = active;
  document.getElementById("InactiveUserModels").innerHTML = inactive;
  document.getElementById("schedulepanel").style.display = 'block'
}
function HideSchedulePanel(){
  document.getElementById("schedulepanel").style.display = 'none'
}
function ScheduleModel(frequency, userid, delivery, units, modelname, templatename, aoiname) {
  $.ajax({
    url: 'ScheduleModel.php',
    data: {
      frequency,
      userid,
      delivery,
      units,
      modelname,
      templatename,
      aoiname
    },
    type: 'POST'
  }).done(function (reply) {
    console.log(reply)
    ShowSchedulePanel(reply)
  });
}
function ShowScheduleMenu() {
  document.getElementById('frequency').style.display = 'block'
  document.getElementById('recipient').style.display = 'block'
  document.getElementById('delivery').style.display = 'block'
  document.getElementById('units').style.display = 'block'
  document.getElementById('ScheduleButton').style.display = 'block'

}
function HideScheduleMenu() {
  document.getElementById('frequency').style.display = 'none'
  document.getElementById('recipient').style.display = 'none'
  document.getElementById('delivery').style.display = 'none'
  document.getElementById('units').style.display = 'none'
  document.getElementById('ScheduleButton').style.display = 'none'

}
function ScheduleModelMenu() {
  //ModelMenu.show
  //pass following vars to the back end-- these should get set by the gui that we are developing

  //console.log(frequency);

  if (recipient) { recipient = user.user_id } else { recipient = user.user_id }
  // console.log(recipient);
  //console.log(delivery);
  // console.log(units);
  let aoiname = document.getElementById("Station").value;
  let modelname = SelectedModel.innerText;
  console.log(modelname);
  console.log(modelName);
  var templateabbreviation;
  
  if (modelName === 'Get Weather') {
    templateabbreviation = 'GW';
  }
  else if (modelName === 'Degree Day') {
    templateabbreviation = 'dd';
  }
  else if (modelName === 'Logistic Degree Day') {
    templateabbreviation = 'ldd';
  }
  else if (modelName === 'Log Logistic Degree Day') {
    templateabbreviation = 'lldd';
  }
  else if (modelName === 'Weibull Degree Day') {
    templateabbreviation = 'wdd';
  }
  else if (modelName === 'Temperature Development Rate') {
    templateabbreviation = 'tdr';}
  else if (modelName === 'CART-SLD Leaf Wetness') {
      templateabbreviation = 'clw';
  } else if(modelName == null){
    alert('ModelName cannot be null ;')
  } 
  console.log(aoiname);
  console.log(frequency)
  console.log(recipient)
  console.log(delivery)
  console.log(units)
  console.log(modelname)
  console.log(templateabbreviation)

  if (aoiname == null || aoiname == ''){
    alert('Must use a valid area of interest')
  }

  else if (frequency == null){alert('Frequency must be specified')}
  
  else if (recipient == null) {alert('Recipient must be specified')}
  else if (delivery == null) {alert('Delivery method must be specified')}
  else if (units == null) {alert("Units must be specified")}
  else if (modelname == null) {alert("Model Name is not valid")}
  else {
    ScheduleModel(frequency, recipient, delivery, units, modelname, templateabbreviation, aoiname);
  }
}