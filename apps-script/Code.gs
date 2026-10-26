// Receives a recording from the web page and saves it in a Drive folder.
// Deploy as a Web app: Execute as "Me", Who has access "Anyone".

var FOLDER_NAME = "Mom's Stories";
var MAX_BYTES = 40 * 1024 * 1024;

function getFolder_() {
  var it = DriveApp.getFoldersByName(FOLDER_NAME);
  return it.hasNext() ? it.next() : DriveApp.createFolder(FOLDER_NAME);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var mime = String(body.mime || "audio/webm").split(";")[0];
    if (mime.indexOf("audio/") !== 0 && mime !== "video/webm") {
      return json_({ ok: false, error: "not audio" });
    }
    var bytes = Utilities.base64Decode(body.data);
    if (bytes.length > MAX_BYTES) {
      return json_({ ok: false, error: "too large" });
    }
    var name = String(body.name || "recording").replace(/[\\/:*?"<>|]/g, "-");
    var file = getFolder_().createFile(Utilities.newBlob(bytes, mime, name));
    file.setDescription(String(body.question || ""));
    return json_({ ok: true, name: file.getName() });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// Open the web app URL in a browser to confirm it is live.
function doGet() {
  return json_({ ok: true, message: "Ready to receive recordings." });
}

// Run this once from the editor so Google asks you to approve Drive access.
function authorize() {
  getFolder_();
}
