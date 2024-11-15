// make text input affect card text
const editCardTextEvent = (element) => {
  const inputCardText = document.getElementById(`input-${element}`)
  const cardText = document.getElementById(element)
  // on reload, remove text from input
  // ideally you would keep everything but that's a lot harder
  inputCardText.value = ""
  inputCardText.addEventListener("input", function (event) {
    cardText.textContent = event.target.value
  })
}

// make dropdown affect card images
const editDropdownEvent = (ID, folderName) => {
    const Dropdown = document.getElementById(`${ID}-dropdown`)
    const DropdownImg = document.getElementById(`${ID}`)
    // on reload, the empty image is selected by default
    Dropdown.value = "None"
    Dropdown.addEventListener("change", function (event) {
    DropdownImg.src = `src/img/${folderName}/${Dropdown.value}.png`})
}

// set as many coins visible
const setCoinQuantity = () => {
  const coins = document.getElementsByClassName("cost")
   const coinCount = copiesSlider.value;
  const copiesText = document.getElementById("copies-label")
  for (let coin_i = 0; coin_i < coins.length; coin_i++) {
    coins[coin_i].style.visibility = coin_i < coinCount ? "visible" : "hidden"
  }
  copiesText.textContent = `Copies: ${coinCount}`
  if (coinCount > 3) copiesText.textContent = `Copies: 3+`
}

const toggleVisibility = (element, isVisible) => {
  element.style.visibility = isVisible ? "visible" : "hidden";
};

const toggleVisibilities = (cardTypeObj) => {
  toggleVisibility(cardDamage, cardTypeObj.damageVisibility);
  toggleVisibility(cardDamageText, cardTypeObj.damageVisibility);
  toggleVisibility(cardAmmo, cardTypeObj.ammoVisibility);
  toggleVisibility(cardAmmoText, cardTypeObj.ammoVisibility);
  toggleVisibility(cardDelay, cardTypeObj.delayVisibility);
  toggleVisibility(cardDelayText, cardTypeObj.delayVisibility);
}
// card art properties for every card type
const cardTypes = {
  monkey: {
    borderSrc: "src/img/MonkeyCardBorder.png",
    damageSrc: "src/img/MonkeyDamage.png",
    imgHeight: "96%",
    imgWidth: "92%",
    imgTransform: "translate(-50%, 2.2%)",
    imgBorderRadius: "10%",
    borderOffset: "translate(0%, -0.8%)",
    imgObjFit: "cover",
    delayTop: "43%",
    delayLeft: "95.5%",
    classPinTransform: "translate(-66.2%, 60%)",
    heroPinTransform: "translate(-50%, -50%)",
    heroPinLeft: "50%",
    heroPinTop: "0%",
    damageVisibility: true,
    ammoVisibility: true,
    delayVisibility: true
  },
  bloon: {
    borderSrc: "src/img/BloonCardBorder.png",
    damageSrc: "src/img/BloonDamage.png",
    imgHeight: "55%",
    imgWidth: "75%",
    imgTransform: "translate(-50%, -7%)",
    borderOffset: "translate(0%, -6%)",
    classPinTransform: "translate(-50%, -50%)",
    heroPinTransform: "translate(-50%, -50%)",
    heroPinLeft: "89%",
    heroPinTop: "43%",
    imgBorderRadius: "50%",
    imgObjFit: "fill",
    delayTop: "25%",
    delayLeft: "90%",
    damageVisibility: true,
    ammoVisibility: false,
    delayVisibility: true
  },
  power: {
    borderSrc: "src/img/PowerCardBorder.png",
    imgHeight: "55%",
    imgWidth: "86%",
    imgTransform: "translate(-51%, -5%)",
    borderOffset: "translate(0%, -5.5%)",
    classPinTransform: "translate(-50%, -50%)",
    heroPinTransform: "translate(-50%, -50%)",
    heroPinLeft: "89%",
    heroPinTop: "43%",
    imgBorderRadius: "40%",
    imgObjFit: "fill",
    damageVisibility: false,
    ammoVisibility: false,
    delayVisibility: false,

  }
};

// occurs when type changes
const updateCardLayout = (type) => {
  cardType = type
  const cardTypeObj = cardTypes[type];
  
  cardBorder.src = cardTypeObj.borderSrc;
  cardBorder.style.transform = cardTypeObj.borderOffset;
  if (cardTypeObj.damageSrc) cardDamage.src = cardTypeObj.damageSrc;
  cardImg.style.height = cardTypeObj.imgHeight;
  cardImg.style.width = cardTypeObj.imgWidth;
  cardImg.style.transform = cardTypeObj.imgTransform;
  cardImg.style.borderRadius = cardTypeObj.imgBorderRadius;
  cardImg.style.ObjFit = cardTypeObj.imgObjFit;
  cardDelay.style.top = cardTypeObj.delayTop;
  cardDelay.style.left = cardTypeObj.delayLeft;
  cardDelayText.style.top = cardTypeObj.delayTop;
  cardDelayText.style.left = cardTypeObj.delayLeft;
  classPin.style.transform = cardTypeObj.classPinTransform;
  heroPin.style.transform = cardTypeObj.heroPinTransform;
  heroPin.style.left = cardTypeObj.heroPinLeft;
  heroPin.style.top = cardTypeObj.heroPinTop;
  toggleVisibilities(cardTypeObj)
};


const damageCheckboxClicked = () => {
  cardTypes.monkey.damageVisibility = damageCheckbox.checked
  cardTypes.monkey.ammoVisibility = damageCheckbox.checked
  cardTypes.monkey.delayVisibility = damageCheckbox.checked
  console.log(cardTypes[cardType])
  toggleVisibilities(cardTypes[cardType])
};

// resize img to wanted width and height
const resizeImage = (img, wantedWidth, wantedHeight) => {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = wantedWidth
  canvas.height = wantedHeight

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL()
}

function uploadImg(event) {
  const fileList = event.target.files;
  const firstFile = fileList[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    // Create a new image element
    const newImg = document.createElement("img");
    newImg.src = event.target.result;

    // Resize the image and update card-img element
    newImg.onload = function () {
      const resizedDataUri = resizeImage(newImg, 512, 512);
      document.getElementById("card-img").src = resizedDataUri;
    };
  };

  // Check if the selected file is an image
  if (firstFile.type.startsWith("image/")) {
    reader.readAsDataURL(firstFile);
  }
}


const downloadImg = () => {
    var cardContainer = document.getElementById("card-container")
    cardContainer.style.height =  `${flavorText.clientHeight + 525}px`
  html2canvas(cardContainer, {
    backgroundColor: null,
  }).then(function (canvas) {
    const titleText = document.getElementById("title-text").textContent.trim();
    
    let sanitizedTitleText = titleText
      // remove unsuitable characters
      .replace(/[^\w\s]/gi, '')
      // more consistent with rest of download name
      .replace(/ /gi, '-')
      .toLowerCase()
      // Example: limit to 50 characters
      .substring(0, 50);
    let imageData = canvas.toDataURL("image/png")
    var downloadLink = document.createElement("a")
    downloadLink.href = imageData
    downloadLink.download = `bcs-${sanitizedTitleText}.png` // Set the download file name
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  })
    cardContainer.style.height = "525px"
}

const startup = () => {
  damageCheckbox.checked = true
  copiesSlider.value = 1
}

let cardType = "monkey"

const copiesSlider = document.getElementById("copies-slider")
const damageCheckbox = document.getElementById("damage-checkbox")

const cardBorder = document.getElementById("card-border")
const cardTypeButtons = document.querySelectorAll(".card-type-button")

const cardDamage = document.getElementById("card-damage")
const cardAmmo = document.getElementById("card-ammo")
const cardDelay = document.getElementById("card-delay")
const cardDamageText = document.getElementById("damage-text")
const cardAmmoText = document.getElementById("ammo-text")
const cardDelayText = document.getElementById("delay-text")

const rarityPin = document.getElementById("rarity-pin")
const heroPin = document.getElementById("hero-pin")
const classPin = document.getElementById("class-pin")

const imgUploadElement = document.getElementById("img-upload")
const cardImg = document.getElementById("card-img")
const flavorText = document.getElementById("flavor-text")

// make text editable
editCardTextEvent("title-text")
editCardTextEvent("class-text")
editCardTextEvent("cost-text")
editCardTextEvent("damage-text")
editCardTextEvent("ammo-text")
editCardTextEvent("delay-text")
editCardTextEvent("description-text")
editCardTextEvent("flavor-text")
editDropdownEvent("rarity-pin", "RarityPin")
editDropdownEvent("hero-pin", "HeroPin")
editDropdownEvent("class-pin", "ClassPin")

// other things which need to happen at startup
startup()