const editCardTextEvent = (element) => {
  const inputCardText = document.getElementById(`input-${element}`)
  const cardText = document.getElementById(element)
  inputCardText.addEventListener("input", function (event) {
    // Update the card title with the input value
    cardText.textContent = event.target.value
  })
}

const setCoinQuantity = () => {
  const coins = document.getElementsByClassName("cost")
  const copiesSlider = document.getElementById("copies-slider")
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

const cardTypes = {
  monkey: {
    borderSrc: "src/img/MonkeyCardBorder.png",
    borderCircleVisible: false,
    damageSrc: "src/img/MonkeyDamage.png",
    imgHeight: "100%",
    imgWidth: "100%",
    imgTransform: "translate(-50%, 0%)",
    imgBorderRadius: "10%",
    imgObjectFit: "cover",
    delayTop: "42%",
    damageVisibility: true,
    ammoVisibility: true,
    delayVisibility: true
  },
  bloon: {
    borderSrc: "src/img/BloonCardBorder.png",
    borderCircleVisible: true,
    circleSrc: "src/img/BloonCardBorderCircle.png",
    damageSrc: "src/img/BloonDamage.png",
    imgHeight: "55%",
    imgWidth: "75%",
    imgTransform: "translate(-50%, -7%)",
    imgBorderRadius: "50%",
    imgObjectFit: "fill",
    delayTop: "25%",
    damageVisibility: true,
    ammoVisibility: false,
    delayVisibility: true
  },
  power: {
    borderSrc: "src/img/PowerCardBorder.png",
    borderCircleVisible: true,
    circleSrc: "src/img/PowerCardBorderCircle.png",
    imgHeight: "55%",
    imgWidth: "86%",
    imgTransform: "translate(-51%, -8%)",
    imgBorderRadius: "40%",
    imgObjectFit: "fill",
    damageVisibility: false,
    ammoVisibility: false,
    delayVisibility: false
  }
};

const updateCardLayout = (type) => {

  const cardType = cardTypes[type];

  cardBorder.src = cardType.borderSrc;
  cardBorderCircle.style.visibility = cardType.borderCircleVisible ? "visible" : "hidden";
  if (cardType.circleSrc) cardBorderCircle.src = cardType.circleSrc;
  if (cardType.damageSrc) cardDamage.src = cardType.damageSrc;
  cardImg.style.height = cardType.imgHeight;
  cardImg.style.width = cardType.imgWidth;
  cardImg.style.transform = cardType.imgTransform;
  cardImg.style.borderRadius = cardType.imgBorderRadius;
  cardImg.style.objectFit = cardType.imgObjectFit;
  cardDelay.style.top = cardType.delayTop;
  cardDelayText.style.top = cardType.delayTop;
  toggleVisibility(cardDamage, cardType.damageVisibility);
  toggleVisibility(cardDamageText, cardType.damageVisibility);
  toggleVisibility(cardAmmo, cardType.ammoVisibility);
  toggleVisibility(cardAmmoText, cardType.ammoVisibility);
  toggleVisibility(cardDelay, cardType.delayVisibility);
  toggleVisibility(cardDelayText, cardType.delayVisibility);
};

const damageCheckboxClicked = () => {
  const isVisible = damageCheckbox.checked;
  cardTypes.monkey.damageVisibility = isVisible
  cardTypes.monkey.ammoVisibility = isVisible
  cardTypes.monkey.delayVisibility = isVisible

  toggleVisibility(cardDamage, cardTypes.cardType.isVisible);
  toggleVisibility(cardDamageText, cardTypes.cardType.isVisible);
  toggleVisibility(cardAmmo, cardTypes.cardType.isVisible);
  toggleVisibility(cardAmmoText, cardTypes.cardType.isVisible);
  toggleVisibility(cardDelay, cardTypes.cardType.isVisible);
  toggleVisibility(cardDelayText, cardTypes.cardType.isVisible);
};

const changeRarityImg = (value) => {
  rarityElement.src = `src/img/Rarity${value}.png`
}

const resizeImage = (img, wantedWidth, wantedHeight) => {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = wantedWidth
  canvas.height = wantedHeight

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL()
}

const uploadImg = () => {
  const fileList = this.files
  const firstFile = fileList[0]
  const reader = new FileReader()

  reader.onload = function (event) {
    // resize img
    const newImg = document.createElement("img")
    newImg.src = event.target.result
    newImg.onload = function () {
      const resizedDataUri = resizeImage(newImg, 512, 512)
      document.getElementById("card-img").src = resizedDataUri
    }
  }
  if (firstFile.type.startsWith("image/")) {
    reader.readAsDataURL(firstFile)
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

let cardType = "monkey"
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

imgUploadElement.addEventListener(
  "change",
  function () {
    const fileList = this.files
    const firstFile = fileList[0]
    const reader = new FileReader()

    reader.onload = function (event) {
      // resize img
      const newImg = document.createElement("img")
      newImg.src = event.target.result
      newImg.onload = function () {
        const resizedDataUri = resizeImage(newImg, 512, 512)
        document.getElementById("card-img").src = resizedDataUri
      }
    }
    if (firstFile.type.startsWith("image/")) {
      reader.readAsDataURL(firstFile)
    }
  },
  false
)
