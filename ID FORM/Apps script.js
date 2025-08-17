function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var folder = DriveApp.getFolderById("1nlCWTz-c6V1vh3czfq55gOwG7lgoQGrZ");

    var name = e.parameter.name;
    var fatherName = e.parameter.fatherName;
    var motherName = e.parameter.motherName;
    var phone = e.parameter.phone;
    var guardianPhone = e.parameter.guardianPhone;
    var admissionNo = e.parameter.admissionNo;
    var rollNo = e.parameter.rollNo;
    var section = e.parameter.section;
    var email = e.parameter.email;
    var dob = e.parameter.dob;
    var address = e.parameter.address;

    var fileUrl = "";

    if (e.parameter.photoLink && e.parameter.photoLink.length > 0) {
      var blob = Utilities.newBlob(Utilities.base64Decode(e.parameter.photoLink), "image/jpeg", name + "_photo.jpg");
      var file = folder.createFile(blob);

      
      fileUrl = '=HYPERLINK("' + file.getUrl() + '","' + name + '")';
    }

    sheet.appendRow([
      new Date(),
      name,
      fatherName,
      motherName,
      phone,
      guardianPhone,
      admissionNo,
      rollNo,
      section,
      email,
      dob,
      address,
      fileUrl
    ]);

    return ContentService.createTextOutput("Success")
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (err) {
    return ContentService.createTextOutput("Error: " + err)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}
