// make text input affect card text
const editCardTextEvent = (element, hasStroke) => {
  const inputCardText = document.getElementById(`input-${element}`)
  const cardText = document.getElementById(element)
  // on reload, remove text from input
  // ideally you would keep everything but that's a lot harder
  inputCardText.value = ""
  inputCardText.addEventListener("input", function (event) {
    cardText.textContent = event.target.value
  })
    if (hasStroke) {
        const cardStroke = document.getElementById(`${element}-stroke`)
        inputCardText.addEventListener("input", function (event) {
            cardStroke.textContent = event.target.value
        })
    }
}

const editDescriptiveFlavor = () => {
    const inputCardText = document.getElementById(`input-flavor-text`)
    const cardText = document.getElementById(`flavor-text-descriptive`)
    inputCardText.addEventListener("input", function (event) {
        cardText.textContent = event.target.value
    })
}

const addKeyword = () => {
    var finalDescription = keywordDescriptions[keywordDropdown.value].replace("{VALUE}", keywordValue.value)
    keywordDescription.textContent = finalDescription
    var finalTitle = keywordTitles[keywordDropdown.value].replace("{VALUE}", keywordValue.value)
    keywordTitle.textContent = finalTitle
    keywordTitleStroke.textContent = finalTitle
    keywordImg.src = `src/img/Keyword/${keywordDropdown.value}.png`
    var newKeyword = keywordElement.cloneNode(true)
    newKeyword.style.display = "block"
    var addedKeyword = keywordHolder.appendChild(newKeyword)
    keywordList.push(addedKeyword)
}
const removeKeyword = () => {
    if (keywordList.length > 0) {
        keywordList[keywordList.length - 1].remove()
        keywordList.pop()
    }
}

const toggleDescriptiveMode = () => {
    descriptiveModeCheckbox.checked = false
    keywordDropdown.disabled = true
    keywordValue.disabled = true
    addKeywordBtn.disabled = true
    removeKeywordBtn.disabled = true
    flavorText.style.visibility = "visible"
    keywordDropdown.value = "Defender"
    keywordValue.value = 0
    descriptiveModeCheckbox.addEventListener("input", function (event) {
        if (descriptiveModeCheckbox.checked) {
            card.style.left = "-140px"
            cardContainer.style.width = "775px"
            descriptiveBox.style.display = "inline"
            keywordDropdown.disabled = false
            keywordValue.disabled = false
            addKeywordBtn.disabled = false
            removeKeywordBtn.disabled = false
            flavorText.style.visibility = "hidden"
        }
        else {
            card.style.left = ""
            cardContainer.style.width = "375px"
            descriptiveBox.style.display = "none"
            keywordDropdown.disabled = true
            keywordValue.disabled = true
            addKeywordBtn.disabled = true
            removeKeywordBtn.disabled = true
            flavorText.style.visibility = "visible"
        }
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

const editImagePositionEvent = (ID, variable) => {
    const positionInput = document.getElementById(`${ID}`)
    const positionInputLabel = document.getElementById(`${ID}-label`)
    const Pretext = positionInputLabel.textContent
    positionInputLabel.textContent += "0"
    positionInput.value = 0
    positionInput.addEventListener("input", function (event) {
        imageValues[variable] = positionInput.value
        positionInputLabel.textContent = `${Pretext}${imageValues[variable]}`
        updateImage()
    })
}

const editImageScaleEvent = (ID, variable) => {
    const scaleSlider = document.getElementById(`${ID}`)
    const scaleSliderLabel = document.getElementById(`${ID}-label`)
    const Pretext = scaleSliderLabel.textContent
    scaleSliderLabel.textContent += "100.00%"
    scaleSlider.value = 2
    scaleSlider.addEventListener("input", function (event) {
        imageValues[variable] = 512.0 * Math.pow(10.0, scaleSlider.value - 2)
        scaleSliderLabel.textContent = `${Pretext}${Math.min(Math.pow(10.0, scaleSlider.value), 500).toFixed(2)}%`
        updateImage()
    })
}

const toggleKeepRatio = () => {
    const keepRatioCheckbox = document.getElementById(`ratio-toggle`)
    keepRatioCheckbox.checked = true;
    keepRatioCheckbox.addEventListener("input", function (event) {
        if (keepRatioCheckbox.checked) cardImg.style.objectFit = "cover"
        else cardImg.style.objectFit = "none"
    })
}

const resetImageValues = () => {
    imageValues.x = 0
    imageValues.y = 0
    imageValues.w = 512
    imageValues.h = 512
    document.getElementById(`x-input`).value = 0
    document.getElementById(`y-input`).value = 0
    document.getElementById(`w-slider`).value = 2
    document.getElementById(`h-slider`).value = 2
    document.getElementById(`x-input-label`).textContent = "X: 0"
    document.getElementById(`y-input-label`).textContent = "Y: 0"
    document.getElementById(`w-slider-label`).textContent = "W: 100.00%"
    document.getElementById(`h-slider-label`).textContent = "H: 100.00%"
    updateImage()
}

const editDescriptionEvent = () => {
    const DescriptionBox = document.getElementById("input-description-text")
    var newFontSize = 2.8
    DescriptionBox.addEventListener("input", function (event) {
        newFontSize = 2.8
        do {
            newFontSize -= 1.0 / 16.0
            cardDescriptionText.style.fontSize = `${newFontSize}em`
        }
        while (cardDescriptionText.clientHeight > 188)
    })
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
  toggleVisibility(cardDamageTextContainer, cardTypeObj.damageVisibility);
  toggleVisibility(cardAmmo, cardTypeObj.ammoVisibility);
  toggleVisibility(cardAmmoTextContainer, cardTypeObj.ammoVisibility);
  toggleVisibility(cardDelay, cardTypeObj.delayVisibility);
  toggleVisibility(cardDelayTextContainer, cardTypeObj.delayVisibility);
}
// card art properties for every card type
const cardTypes = {
  monkey: {
    borderSrc: "src/img/Border/MonkeyCardBorder.png",
    damageSrc: "src/img/CardIcon/MonkeyDamage.png",
    imgHeight: "96%",
    imgWidth: "92%",
    damageLeft: "90%",
    damageTop: "4%",
    imgTransform: "translate(-50%, 2.2%)",
    imgBorderRadius: "10%",
    borderOffset: "translate(0%, -0.8%)",
    imgObjFit: "cover",
    delayTop: "39%",
    delayLeft: "95%",
    delayFontSize: "4em",
    classPinTransform: "translate(-66.2%, 60%)",
    heroPinTransform: "translate(-50%, -50%)",
    heroPinLeft: "50%",
    heroPinTop: "0%",
    damageVisibility: true,
    ammoVisibility: true,
    delayVisibility: true
  },
  bloon: {
    borderSrc: "src/img/Border/BloonCardBorder.png",
    damageSrc: "src/img/CardIcon/BloonDamage.png",
    imgHeight: "55%",
    imgWidth: "75%",
    damageLeft: "88%",
    damageTop: "5%",
    imgTransform: "translate(-50%, -7%)",
    borderOffset: "translate(0%, -6%)",
    classPinTransform: "translate(-50%, -50%)",
    heroPinTransform: "translate(-50%, -50%)",
    heroPinLeft: "89%",
    heroPinTop: "43%",
    imgBorderRadius: "50%",
    imgObjFit: "fill",
    delayTop: "22.25%",
    delayLeft: "88%",
    delayFontSize: "6em",
    damageVisibility: true,
    ammoVisibility: false,
    delayVisibility: true
  },
  power: {
    borderSrc: "src/img/Border/PowerCardBorder.png",
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

const keywordTitles = {
    Defender: "Defender +{VALUE}",
    DoubleAttack: "Double Attack",
    OnDamaged: "On Damaged",
    OnDestroyed: "On Destroyed",
    OnFire: "On Fire",
    OnLeak: "On Leak",
    OnPlay: "On Play",
    OnPopped: "On Popped",
    OnReplace: "On Replace",
    OnTurnStart: "On Turn Start",
    OnTurnEnd: "On Turn End",
    Pick: "Pick {VALUE}",
    Shield: "Shield {VALUE}",
    Stunned: "Stunned",
    Unique: "Unique"
}

const keywordDescriptions = {
    Defender: "Can defend on opponent's turn, has +{VALUE} damage on opponent's turn.",
    DoubleAttack: "Attacks twice.",
    OnDamaged: "Triggers on losing health from any source.",
    OnDestroyed: "Triggers when Bloon is Popped (by damage or effect) or when it hits opposoing Hero.",
    OnFire: "Will take 30 damage at the end of its turn and before attacking.",
    OnLeak: "Triggers when a bloon attacks a hero (after defenders have acted).",
    OnPlay: "Triggers when card is played",
    OnPopped: "Triggers when Bloon is Popped (by damage or effect). Does not trigger if Bloon hits opposing Hero.",
    OnReplace: "Triggers when this Monkey is replaced by another Monkey.",
    OnTurnStart: "Triggers at start of turn",
    OnTurnEnd: "Triggers once turn has ended",
    Pick: "Look at the next {VALUE} cards in your deck. Choose one and add it to your hand. Other cards go to the bottom of your deck.",
    Shield: "Shield will block {VALUE} incoming damage.",
    Stunned: "Monkey can't attack or reload until stun wears off.",
    Unique: "You can only have one copy of this card."
}

// occurs when type changes
const updateCardLayout = (type) => {
  cardType = type
  const cardTypeObj = cardTypes[type];
  
  cardBorder.src = cardTypeObj.borderSrc;
  cardBorder.style.transform = cardTypeObj.borderOffset;
  if (cardTypeObj.damageSrc)
  {
    cardDamage.src = cardTypeObj.damageSrc;
    cardDamage.style.top = cardTypeObj.damageTop;
    cardDamage.style.left = cardTypeObj.damageLeft;
    cardDamageTextContainer.style.top = cardTypeObj.damageTop;
    cardDamageTextContainer.style.left = cardTypeObj.damageLeft;
  }
  cardImg.style.height = cardTypeObj.imgHeight;
  cardImg.style.width = cardTypeObj.imgWidth;
  cardImg.style.transform = cardTypeObj.imgTransform;
  cardImg.style.borderRadius = cardTypeObj.imgBorderRadius;
  cardImg.style.ObjFit = cardTypeObj.imgObjFit;
  cardDelay.style.top = cardTypeObj.delayTop;
  cardDelay.style.left = cardTypeObj.delayLeft;
  cardDelayTextContainer.style.top = cardTypeObj.delayTop;
  cardDelayTextContainer.style.left = cardTypeObj.delayLeft;
  cardDelayTextContainer.style.fontSize = cardTypeObj.delayFontSize;
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
const updateImage = () => {
    if (storedImg == null || drawTimer != null) return;
    drawTimer = window.setTimeout(function () {
    canvas.width = imageValues.w
    canvas.height = imageValues.h

    ctx.drawImage(storedImg, imageValues.x, imageValues.y, imageValues.w, imageValues.h)
    cardImg.src = canvas.toDataURL()
    drawTimer = null
    }, 125)
}

function uploadImg(event) {
  const fileList = event.target.files;
  const firstFile = fileList[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    // Create a new image element
    const newImg = document.createElement("img");
    newImg.src = event.target.result;
    storedImg = newImg;

    // Resize the image and update card-img element
    newImg.onload = function () {
      updateImage();
    };
  };

  // Check if the selected file is an image
  if (firstFile.type.startsWith("image/")) {
    reader.readAsDataURL(firstFile);
  }
}

const downloadImg = () => {
    if (!descriptiveModeCheckbox.checked) {
        var cardContainer = document.getElementById("card-container")
        cardContainer.style.height = `${flavorText.clientHeight / 2 + 510}px`
    }
    else cardContainer.style.height = "510px"
  html2canvas(cardContainer, {
      backgroundColor: null,
      scale: 5,
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

const card = document.getElementById("card")
const cardContainer = document.getElementById("card-container")
const descriptiveModeCheckbox = document.getElementById(`keyword-toggle`)
const descriptiveBox = document.getElementById("descriptive-box")
const keywordHolder = document.getElementById("keyword-list")
const keywordList = []

const keywordDropdown = document.getElementById("keyword-dropdown")
const keywordImg = document.getElementById("keyword-img")
const keywordDescription = document.getElementById("keyword-description")
const keywordTitle = document.getElementById("keyword-title")
const keywordElement = document.getElementById("keyword-element")
const keywordTitleStroke = document.getElementById("keyword-title-stroke")
const keywordValue = document.getElementById("keyword-value")
const addKeywordBtn = document.getElementById("add-keyword")
const removeKeywordBtn = document.getElementById("remove-keyword")

const cardDamage = document.getElementById("card-damage")
const cardAmmo = document.getElementById("card-ammo")
const cardDelay = document.getElementById("card-delay")
const cardDamageTextContainer = document.getElementById("damage-text-container")
const cardAmmoTextContainer = document.getElementById("ammo-text-container")
const cardDelayTextContainer = document.getElementById("delay-text-container")
const cardDescriptionText = document.getElementById("description-text")

const rarityPin = document.getElementById("rarity-pin")
const heroPin = document.getElementById("hero-pin")
const classPin = document.getElementById("class-pin")
const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")
var storedImg = null
var drawTimer = null

const imgUploadElement = document.getElementById("img-upload")
const cardImg = document.getElementById("card-img")
const flavorText = document.getElementById("flavor-text")
const imageValues = { x: 0, y: 0, w: 512, h: 512 }

// make text editable
editCardTextEvent("title-text", true)
editCardTextEvent("class-text", true)
editCardTextEvent("cost-text", true)
editCardTextEvent("damage-text", true)
editCardTextEvent("ammo-text", true)
editCardTextEvent("delay-text", true)
editCardTextEvent("description-text", false)
editCardTextEvent("flavor-text", false)
editDescriptiveFlavor()
editDropdownEvent("rarity-pin", "RarityPin")
editDropdownEvent("hero-pin", "HeroPin")
editDropdownEvent("class-pin", "ClassPin")
editImagePositionEvent("x-input", "x")
editImagePositionEvent("y-input", "y")
editImageScaleEvent("w-slider", "w")
editImageScaleEvent("h-slider", "h")
toggleKeepRatio()
editDescriptionEvent()
toggleDescriptiveMode()
// other things which need to happen at startup
startup()