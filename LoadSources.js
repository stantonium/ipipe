Sandcastle.addToolbarMenu([
	{
		text: 'Model Template Source',
		onselect: function () {
		}
	}, {
		text: 'iPiPE',
		value: 'iPiPE',
		onselect: function () {
			ModelSource = 'iPIPE';
			loadipipetoolbar();
		}
	}, {
		text: 'NCSU',
		value: 'NCSU',
		onselect: function () {
			if (user == 'guest') {
				alert("Must be logged in to use NCSU models");
				window.location.href = "../index.php"
			} else {
				if (ModelSource == 'TAMU') {
					deleteCTRParams();
				}
				ModelSource = 'NCSU'; console.log(ModelSource);
			}
		}
	},
	{
		text: 'TAMU',
		value: 'TAMU',
		onselect: function () {
			if (user == 'guest') {
				alert("Must be logged in to use TAMU models");
				window.location.href = "../index.php"
			} else {
				ModelSource = 'TAMU'; console.log(ModelSource);
			}
		}
	}

], 'Source');