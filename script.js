var namesElement = document.getElementById("projectNames");
var backgroundTextElement = document.getElementById("backgroundText");
var changelogElement = document.getElementById("changelog");
var centerTitleElement = document.getElementById("centerTitle");
var downloadElement = document.getElementById("downloadButton");
var versionElement = document.getElementById("version");
var lastUpdatedElement = document.getElementById("lastUpdated");
var centerElement = document.getElementById("center");

var defaultURL = "https://github.com/notnotnotswipez/notnotnotswipez.github.io/raw/refs/heads/main/Binaries/";
var currentDownloadURL = "";
var currentDownloadName = "";

createEntry("TIMELINE", "timeline.txt");
createEntry("BL FULL BODY TRACKING", "fullbody.txt");

loadTextSettings("timeline.txt");

repeatBackgroundText("LIGHTS CAMERA ACTION");

downloadElement.addEventListener('click', function(){
    downloadBegin(currentDownloadURL, currentDownloadName);
});


function loadTextSettings(fileName){
fetch(fileName)
  .then((res) => res.text())
  .then((text) => {
    let split = text.split("\n");
    versionElement.textContent = split[0];
    lastUpdatedElement.textContent = split[1];
    repeatBackgroundText(split[2]);
    centerTitleElement.style.color = split[3];
    downloadElement.style.background = split[3];
    versionElement.style.color = split[3];
    centerElement.style.boxShadow = "5px 5px 1px " + split[3];
    currentDownloadURL = defaultURL+split[4];

    let changelogTotal = "";
    for (let i = 5; i < split.length; i++){
        changelogTotal += split[i] + "\n";
    }

    changelogElement.textContent = changelogTotal;
   })
  .catch((e) => console.error(e));

}

function createEntry(name, fileName) {
    var newElement = document.createElement("div");
    newElement.textContent = name;
    newElement.className = "projectEntry";

    namesElement.appendChild(newElement);
    
    newElement.addEventListener('mouseenter', function() {
        console.log(name);
        newElement.style.color = "gray";
    });

    newElement.addEventListener('mouseleave', function() {
        console.log(name);
        newElement.style.color = "white";
    });

    newElement.addEventListener('click', function() {
        loadTextSettings(fileName);
        centerTitleElement.textContent = name;
    });
}

function downloadBegin(link, name){
    fetch(link)
    .then(response => response.blob())
    .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
  });
}

function repeatBackgroundText(repeat){
    repeat += " ";
    var text = "";
    for (let i = 0; i < 100; i++){
        for (let j = 0; j < 15; j++){
            text += repeat;
        }
        text += "\n" + repeat.split(" ")[i % repeat.split(" ").length]+" ";
    }

    backgroundTextElement.textContent = text;
}