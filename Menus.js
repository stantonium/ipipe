function addToolbarMenu(menuList, menuName) {
    Sandcastle.addToolbarMenu(menuList, menuName);
  }
  

  const NCSUMenus = [
    { text: 'Model Template' },
    
    {
      text: 'Degree Day (DD)',
      onselect: () => {
        modelIndex = 1;
        modelName = 'Degree Day';
        document.getElementById("ActiveRuns").value = "";
        DDselectedstation = '';
      }
    },
    {
      text: 'Logistic Degree Day (LDD)',
      onselect: () => {
        modelIndex = 2;
        modelName = 'Logistic Degree Day';
        document.getElementById("ActiveRuns").value = "";
        LDDselectedstation = '';
        onchangeLDD();
      }
    },
    {
      text: 'Log Logistic Degree Day(LLDD)',
      onselect: () => {
        modelIndex = 3;
        modelName = 'Log Logistic Degree Day';
        document.getElementById("ActiveRuns").value = "";
        LLDDselectedstation = '';
        onchangeLLDD();
      }
    },
    {
      text: 'Weibull Degree Day (WDD)',
      onselect: () => {
        modelIndex = 4;
        modelName = 'Weibull Degree Day';
        document.getElementById("ActiveRuns").value = "";
        WDDselectedstation = '';
        onchangeWDD();
      }
    },
    {
      text: 'Temperature Development Rate (TDR)',
      onselect: () => {
        modelIndex = 5;
        modelName = 'Temperature Development Rate';
        document.getElementById("ActiveRuns").value = "";
        TDRselectedstation = '';
        onchangeTDR();
      }
    },
    {
      text: 'CART-SLD Leaf Wetness',
      onselect: () => {
        modelIndex = 6;
        modelName = 'CART-SLD Leaf Wetness';
        document.getElementById("ActiveRuns").value = "";
        CARTselectedstation = '';
        onchangeCART();
      }
    },
    {
        text: 'Infection Control Suite',
        onselect: () => {
          modelIndex = 7;
          modelName = 'Infection Control Suite';
          document.getElementById("ActiveRuns").value = "";
          onchangeICS();
        }
      }
  ];


  const IpipeMenus = [
    { text: 'Model Template' },
    {
      text: 'Get Weather (GW)',
      onselect: () => {
        modelIndex = 0;
        modelName = 'Get Weather';
        document.getElementById("ActiveRuns").value = "";
        GWselectedstation = '';
        onchangeGW();
      }
    },
    {
      text: 'Degree Day (DD)',
      onselect: () => {
        modelIndex = 1;
        modelName = 'Degree Day';
        document.getElementById("ActiveRuns").value = "";
        DDselectedstation = '';
      }
    },
    {
      text: 'Logistic Degree Day (LDD)',
      onselect: () => {
        modelIndex = 2;
        modelName = 'Logistic Degree Day';
        document.getElementById("ActiveRuns").value = "";
        LDDselectedstation = '';
        onchangeLDD();
      }
    },
    {
      text: 'Log Logistic Degree Day(LLDD)',
      onselect: () => {
        modelIndex = 3;
        modelName = 'Log Logistic Degree Day';
        document.getElementById("ActiveRuns").value = "";
        LLDDselectedstation = '';
        onchangeLLDD();
      }
    },
    {
      text: 'Weibull Degree Day (WDD)',
      onselect: () => {
        modelIndex = 4;
        modelName = 'Weibull Degree Day';
        document.getElementById("ActiveRuns").value = "";
        WDDselectedstation = '';
        onchangeWDD();
      }
    },
    {
      text: 'Temperature Development Rate (TDR)',
      onselect: () => {
        modelIndex = 5;
        modelName = 'Temperature Development Rate';
        document.getElementById("ActiveRuns").value = "";
        TDRselectedstation = '';
        onchangeTDR();
      }
    },
    {
      text: 'CART-SLD Leaf Wetness',
      onselect: () => {
        modelIndex = 6;
        modelName = 'CART-SLD Leaf Wetness';
        document.getElementById("ActiveRuns").value = "";
        CARTselectedstation = '';
        onchangeCART();
      }
    }
  ];
  
 
  