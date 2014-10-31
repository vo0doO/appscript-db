/**
 * SSDB Object to be initialized with a constructor
 * @param {string} dbId This is the unique spreadsheet ID
 * @return {undefined}
 */
function SSDB(dbId) {
  var _ss = SpreadsheetApp.openById(dbId);
  var _sheets = {};
  
  this.getSheet = function(sheetName) {
    if (!sheetName) throw new Error("This is an extended error message");
 
    if (_sheets.hasOwnProperty(sheetName)) {
      Logger.log("Got cached sheet");
      return _sheets[sheetName];
    }
    return _sheets[sheetName] = new Sheet(_ss, sheetName);
  };
 
}

function Sheet(_ss, sheetName) {
  var _sheet = _ss.getSheetByName(sheetName);
  var _range = _sheet.getDataRange();
  var _data = _range.getValues();
  
  this.select = function(primaryKey, colIndex) {
    var colIndex = colIndex || 0;
    for (var i = 0, n = _data.length; i < n; i++) {
      if (_data[i][colIndex] == primaryKey) {
        return _data[i];
      }
    }
    return _data;
  };

  this.insert = function(data) {
    // TODO: generate unique id
    
    // TODO: add to data array
    
    // atomic append to sheet
    _sheet.appendRow(data);
    
    // refresh object cache
    _range = _sheet.getDataRange();
    _data = _range.getValues();
  }  
}
