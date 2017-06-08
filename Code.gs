// заполняем имя листа в тформу редактированияаблице
var sheetName = 'Ответы на форму (6)';
// выбираем столбец для вставки ссылок на 
var columnIndex = 8;
// вставляем ссылку на нашу форму
var formURL = 'https://docs.google.com/forms/d/1Bb-lzqd3xzpSvr9pyABDqLTIRz6xXH5nZiXKFVGz1YA/edit';
function getEditResponseUrls() {
  //читаем данные из таблицы
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  //делаем автоматическое ранжирование данных
  var data = sheet.getDataRange().getValues();
  //получаем данные формы
  var form = FormApp.openByUrl('https://docs.google.com/forms/d/1Bb-lzqd3xzpSvr9pyABDqLTIRz6xXH5nZiXKFVGz1YA/edit');
  // цикл проверки и записи данных из формы в таблицу
  for(var i = 2; i < data.length; i++) {
    if (data[i][0] != '' && data[i][columnIndex-1] == '') {
      var timestamp = data[i][0];
      var formSubmitted = form.getResponses(timestamp);
      if (formSubmitted.length < 1) continue;
      var editResponseUrl = formSubmitted[0].getEditResponseUrl();
      sheet.getRange(i+1, columnIndex).setValue(editResponseUrl);
    }
  }
}