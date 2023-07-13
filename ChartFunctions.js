/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function TDRChart() {
  var csv = [];
  var weather = document.querySelector("#WeatherData");
  var rows = weather.querySelectorAll("table tr");

  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td, th");

    for (var j = 0; j < cols.length; j++)
      row.push(cols[j].innerText);

    csv.push(row.join(","));


  }
  let dayofyear = [];
  let HT = []; // hourly temp
  let PDEV = []; // % development
  for (var i = 0; i < csv.length; i++) {
    row = csv[i].split(",");
    dayofyear.push(row[4]);
    HT.push(row[6]);
    PDEV.push(row[7]);
  }
  var ht = {
    type: "scatter",
    mode: "markers",
    x: dayofyear,
    y: HT,
    name: 'Hourly Temp'
  };
  var pdev = {
    x: dayofyear,
    y: PDEV,
    name: 'Percent Development'
  };

  var data = [ht];

  var layout = {
    title: "Hourly Temps",
    xaxis: {
      title: 'Day of Year'
    },
    yaxis: {
      title: 'Degrees Celsius'
    }
  };

  Plotly.newPlot('ChartTemps', data, layout)

  var PDEVdata = [pdev]
  var PDEVlayout = {
    title: "Percent Development",
    xaxis: {
      title: 'Day of Year'
    },
    yaxis: {
      title: '% Development'
    }
  };


  Plotly.newPlot('ChartAD', PDEVdata, PDEVlayout);
  Charts.show();
}

function DDChart(stationname) {
  var csv = [];
  var weather = document.querySelector("#WeatherData");
  var rows = weather.querySelectorAll("table tr");

  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td, th");

    for (var j = 0; j < cols.length; j++)
      row.push(cols[j].innerText);

    csv.push(row.join(","));
  }


}

function ChartHrly() {
  var csv = [];
  var weather = document.querySelector("#WeatherData");
  var rows = weather.querySelectorAll("table tr");

  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td, th");

    for (var j = 0; j < cols.length; j++)
      row.push(cols[j].innerText);

    csv.push(row.join(","));
  }
  let dayofyear = [];
  let HT = []; // hourly temp
  let DH = []; // degree hours
  let ADH = []; // accumulated degree hours
  let PDEV = []; // % development
  for (i = 0; i < csv.length; i++) {
    row = csv[i].split(",");
    if(isDaily) {
      dayofyear.push(row[1]);
      HT.push(row[2]);
      DH.push(row[3]);
      ADH.push(row[4]);
      PDEV.push(row[5])
    }else {
    dayofyear.push(row[4]);
    HT.push(row[6]);
    DH.push(row[7]);
    ADH.push(row[8]);
    PDEV.push(row[11]);
    }
  }
  var ht = {
    type: "scatter",
    mode: "markers",
    x: dayofyear,
    y: HT,
    name: NAME + '<br> Air Temperature'
  };
  var hd = {
    type: "scatter",
    mode: "markers",
    x: dayofyear,
    y: HT,
    name: 'Day of Year'
  };
  var dh = {
    type: "scatter",
    mode: "markers",
    x: dayofyear,
    y: DH,
    name: 'Degree Hour'
  };
  var adh = {
    x: dayofyear,
    y: ADH,
    name: 'Accumulated Degree Hours'
  };

  var pdev = {
    x: dayofyear,
    y: PDEV,
    name: 'Percent Development'
  };

  var ddata = [ht];
  var hdata = [hd];
  //var dailyCheck = document.getElementById("dailyavg");
  //if (dailyCheck.checked) { ct = "Daily Temps"; data = ddata; dht = 'Degree Days'; adht = "Accumulated Degree Days"; dt = "Day of Year" }
  //else { ct = NAME + '<br> Air Temperature'; data = hdata; dht = 'Degree Hours'; adht = "Accumulated Degree Hours"; dt = "Day of Year" }
  ct = NAME + '<br> Air Temperature'; data = hdata; dht = 'Degree Hours'; adht = "Accumulated Degree Hours"; dt = "Day of Year";

  var layout = {
    title: ct,
    xaxis: {
      title: dt
    },
    yaxis: {
      title: 'Degrees Celsius'
    }
  };

  Plotly.newPlot('ChartTemps', data, layout);
  //ChartTemps.on('plotly_click', )
  var DHdata = [dh];

  var DHlayout = {
    title: dht,
    xaxis: {
      title: dt
    },
    yaxis: {
      title: dht
    }
  };

  Plotly.newPlot('ChartDD', DHdata, DHlayout);

  var ADHdata = [adh]
  var ADHlayout = {
    title: adht,
    xaxis: {
      title: dt
    },
    yaxis: {
      title: adht
    }
  };


  Plotly.newPlot('ChartAD', ADHdata, ADHlayout);

  var PDEVdata = [pdev]
  var PDEVlayout = {
    title: "Percent Development",
    xaxis: {
      title: 'Date and Time'
    },
    yaxis: {
      title: '% Development'
    }
  };
  if (modelIndex == 2 || modelIndex == 3 || modelIndex == 4) {
    Plotly.newPlot('ChartAD', PDEVdata, PDEVlayout);
    Charts.show();
  } else {


    Charts.show();
  }

}


function ChartData() {


  var csv = [];
  var weather = document.querySelector("#WeatherData");
  var rows = weather.querySelectorAll("table tr");

  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td, th");

    for (var j = 0; j < cols.length; j++)
      row.push(cols[j].innerText);

    csv.push(row.join(","));
  }
  let dayofyear = [];
  //let tmin = [];
  //let tmax = [];
  let tavg = [];
  let dd = [];
  let ad = [];
  let pdev = [];

  for (var i = 0; i < csv.length; i++) {
    row = csv[i].split(",");
    dayofyear.push(row[1]);
    //tmin.push(row[3]);
    //tmax.push(row[2]);
    tavg.push(row[2]);
    dd.push(row[3]);
    ad.push(row[4]);
    pdev.push(row[5]);

  }


 /* var Tmax = {
    x: dayofyear,
    y: tmax,
    name: 'Tmax'
  };

  var Tmin = {
    x: dayofyear,
    y: tmin,
    name: 'Tmin'
  };
*/
  var Tavg = {
    x: dayofyear,
    y: tavg,
    name: 'Tavg'
  }

  var DD = {
    x: dayofyear,
    y: dd,
    name: 'Daily Degree Days'
  }

  var AD = {
    x: dayofyear,
    y: ad,
    name: 'Cumulative Degree Days'
  }
  var PDEV = {
    x: dayofyear,
    y: pdev,
    name: 'Percent Development'
  };

  var Tdata = [Tavg];

  var Tlayout = {
    title: " Average Daily Temps",
    xaxis: {
      title: 'Day of Year'
    },
    yaxis: {
      title: 'Degrees Centigrade'
    }
  };

  var Dlayout = {
    title: "Daily Degree Days",
    xaxis: {
      title: 'Day of Year'
    },
    yaxis: {
      title: 'Degree Days'
    }
  };

  var Alayout = {
    title: "Accumulated Degree Days",
    xaxis: {
      title: 'Day of Year'
    },
    yaxis: {
      title: 'Degree Days'
    }
  };
  var PDEVlayout = {
    title: "Percent Development",
    xaxis: {
      title: 'Date and Time'
    },
    yaxis: {
      title: '% Development'
    }
  }

  var Ddata = [DD]
  var Adata = [AD]
  var PDEVdata = [PDEV]
  Plotly.newPlot('ChartTemps', Tdata, Tlayout);
  Plotly.newPlot('ChartDD', Ddata, Dlayout);
  Plotly.newPlot('ChartAD', Adata, Alayout);
  
  if (modelIndex == 2 || modelIndex == 3 || modelIndex == 4) {
    Plotly.newPlot('ChartAD', PDEVdata, PDEVlayout);
    Charts.show();
  } else {


    Charts.show();
  }

  Charts.show();

}
