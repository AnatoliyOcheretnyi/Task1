window.onload = () => {
 let first, second, third, values = [];
 let CLIENT_ID        = '769067592560-mkjt9jv59e7sfubu69o4unp4jf4blhfq.apps.googleusercontent.com',
     API_KEY         = 'AIzaSyCWDVJH1QiU6aCxKGE14NwVnA3WD7tviZ0',
     SCOPES          = "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets",
     DISCOVERY_DOCS  = ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
     SHEETID         = "1jIiiMpFZT9y5zNqFDy_3421rHmmUSDNCXhQo1r8wmbM";

document.getElementById("try").style.display = "none";
gapi.load('client:auth2', function() {
  gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
  }).then(function () {
         console.log(gapi.auth2.getAuthInstance().isSignedIn);
  });
    console.log("auth loaded");
});
  
buttons.addEventListener("click", (event) => {
  console.log(event.target.innerHTML);
  
  if(event.target.type === "submit"){
    switch (event.target.value) {
      case "Authorization":
        gapi.auth2.getAuthInstance().signIn();
        break;

      case "Add":
        addSomeInformation();
        break;

      default:
        break;
    }
  }
 
} );
  
  function addSomeInformation() {
    if (
          document.getElementById("firstname").value === "" ||
          document.getElementById("lastname").value === "" ||
          document.getElementById("middlename").value === ""
       )
      console.log("is full");
    else {
      document.getElementById("try").style.display = "none";
       
    first   = document.getElementById("firstname").value;
    second  = document.getElementById("lastname").value;
    third   = document.getElementById("middlename").value;
    values  = [[first,second,third]];

    document.getElementById("firstname").value  = "";
    document.getElementById("lastname").value = "";
    document.getElementById("middlename").value = "";
    
    gapi.client.sheets.spreadsheets.values.append({
      "spreadsheetId": SHEETID,
      "range": "form!A1:D3",
      "includeValuesInResponse": "false",
      "insertDataOption": "INSERT_ROWS",
      "responseDateTimeRenderOption": "FORMATTED_STRING",
      "valueInputOption": "RAW",
      "resource": { values: values}
      
    }).then(function(response) {
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
    }
  }
}
