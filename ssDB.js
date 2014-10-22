/**
 * SSDB Object to be initialized with a constructor
 * @param {string} dbId This is the unique spreadsheet ID
 * @return {undefined}
 */
function SSDB(dbId) {
  var _ss = SpreadsheetApp.openById(dbId);
  var _sheets = {};
  
  this.getSheet = function(sheetName) {
    if (!sheetName) throw new Error("Invalid number of arguments");
    
    if (_sheets.hasOwnProperty(sheetName)) {
      return _sheets[sheetName];
    }
    return _sheets[sheetName] = _ss.getSheetByName(sheetName);
  };
  
  this.select = function(sheetName, primaryKey, colIndex) {
    var data = this.getSheet(sheetName).getDataRange().getValues();
    var colIndex = colIndex || 0;
    
    for (var i = 0, n = data.length; i < n; i++) {
      if (data[i][colIndex] == primaryKey) {
        return data[i];
      }
    }
    return false;
  };
}