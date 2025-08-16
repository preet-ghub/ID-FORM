function doPost(e) {
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      var data = e.parameter;
  
      var fileUrl = "";
      if (e.parameters.photo && e.parameters.photo.length > 0) {
        var blob = Utilities.newBlob(Utilities.base64Decode(e.parameters.photo), "image/jpeg", "photo.jpg");
        var folder = DriveApp.getFolderById("1gcp5utWeBvRtgHakaIOquZMOGK2bpJNe"); // create a folder in Google Drive and paste ID here
        var file = folder.createFile(blob);
        fileUrl = file.getUrl();
      }
  
      sheet.appendRow([
        new Date(),
        data.name,
        data.fatherName,
        data.motherName,
        data.phone,
        data.guardianPhone,
        data.admissionNo,
        data.rollNo,
        data.section,
        data.email,
        data.dob,
        data.address,
        fileUrl
      ]);
  
      return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
    } catch (err) {
      return ContentService.createTextOutput("Error: " + err).setMimeType(ContentService.MimeType.TEXT);
    }
  }
  
  