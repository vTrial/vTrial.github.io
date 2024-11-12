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

// set as many coins visible
const setCoinQuantity = () => {
  const coins = document.getElementsByClassName("cost")
  const coinCount = copiesSlider.value
  const copiesText = document.getElementById("copies-label")
  for (let coin_i = 0; coin_i < coins.length; coin_i++) {
    coins[coin_i].style.visibility = coin_i < coinCount ? "visible" : "hidden"
  }
  copiesText.textContent = `Copies: ${coinCount}`
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
    borderCircleVisible: false,
    damageSrc: "src/img/MonkeyDamage.png",
    imgHeight: "95%",
    imgWidth: "100%",
    imgTransform: "translate(-50%, 0%)",
    imgBorderRadius: "10%",
    imgObjFit: "cover",
    delayTop: "42%",
    damageVisibility: true,
    ammoVisibility: true,
    delayVisibility: true
  },
  bloon: {
    borderSrc: "src/img/BloonCardBorder.png",
    borderCircleVisible: true,
    damageSrc: "src/img/BloonDamage.png",
    imgHeight: "55%",
    imgWidth: "75%",
    imgTransform: "translate(-50%, -7%)",
    imgBorderRadius: "50%",
    imgObjFit: "fill",
    delayTop: "25%",
    damageVisibility: true,
    ammoVisibility: false,
    delayVisibility: true
  },
  power: {
    borderSrc: "src/img/PowerCardBorder.png",
    borderCircleVisible: true,
    imgHeight: "55%",
    imgWidth: "86%",
    imgTransform: "translate(-51%, -8%)",
    imgBorderRadius: "40%",
    imgObjFit: "fill",
    damageVisibility: false,
    ammoVisibility: false,
    delayVisibility: false
  }
};

// occurs when type changes
const updateCardLayout = (type) => {
  cardType = type
  const cardTypeObj = cardTypes[type];
  
  cardBorder.src = cardTypeObj.borderSrc;
  cardBorderCircle.style.visibility = cardTypeObj.borderCircleVisible ? "visible" : "hidden";
  if (cardTypeObj.circleSrc) cardBorderCircle.src = cardTypeObj.circleSrc;
  if (cardTypeObj.damageSrc) cardDamage.src = cardTypeObj.damageSrc;
  cardImg.style.height = cardTypeObj.imgHeight;
  cardImg.style.width = cardTypeObj.imgWidth;
  cardImg.style.transform = cardTypeObj.imgTransform;
  cardImg.style.borderRadius = cardTypeObj.imgBorderRadius;
  cardImg.style.ObjFit = cardTypeObj.imgObjFit;
  cardDelay.style.top = cardTypeObj.delayTop;
  cardDelayText.style.top = cardTypeObj.delayTop;
  toggleVisibilities(cardTypeObj)
};


const damageCheckboxClicked = () => {
  cardTypes.monkey.damageVisibility = damageCheckbox.checked
  cardTypes.monkey.ammoVisibility = damageCheckbox.checked
  cardTypes.monkey.delayVisibility = damageCheckbox.checked
  console.log(cardTypes[cardType])
  toggleVisibilities(cardTypes[cardType])
};

// rarity buttons clicked
const changeRarityImg = (value) => {
  rarityElement.src = `src/img/Rarity${value}.png`
}

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
  html2canvas(cardContainer, {
    backgroundColor: null,
  }).then(function (canvas) {
    const titleText = document.getElementById("title-text").textContent.trim();
    
    let sanitizedTitleText = titleText
      // remove unsuitable characters
      .replace(/[^\w\s]/gi, '')
      // more consistent with rest of download name
      .replace(/\s/, '-')
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
}

const startup = () => {
  damageCheckbox.checked = true
  copiesSlider.value = 1
}

let cardType = "monkey"

const copiesSlider = document.getElementById("copies-slider")
const damageCheckbox = document.getElementById("damage-checkbox")

const cardBorder = document.getElementById("card-border")
const cardBorderCircle = document.getElementById("card-border-circle")
const cardTypeButtons = document.querySelectorAll(".card-type-button")

const cardDamage = document.getElementById("card-damage")
const cardAmmo = document.getElementById("card-ammo")
const cardDelay = document.getElementById("card-delay")
const cardDamageText = document.getElementById("damage-text")
const cardAmmoText = document.getElementById("ammo-text")
const cardDelayText = document.getElementById("delay-text")

const rarityButtons = document.querySelectorAll(".rarity-button")
const rarityElement = document.getElementById("rarity-img")

const imgUploadElement = document.getElementById("img-upload")
const cardImg = document.getElementById("card-img")

// make text editable
editCardTextEvent("title-text")
editCardTextEvent("cost-text")
editCardTextEvent("damage-text")
editCardTextEvent("ammo-text")
editCardTextEvent("delay-text")
editCardTextEvent("description-text")

// other things which need to happen at startup
startup()