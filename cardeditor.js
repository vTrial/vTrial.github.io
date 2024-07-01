const editCardTextEvent = (element) => {
  const inputCardText = document.getElementById(`input-${element}`)
  const cardText = document.getElementById(element)
  inputCardText.addEventListener("input", function (event) {
    // Update the card title with the input value
    cardText.textContent = event.target.value
  })
}

const setCoinQuantity = (coin_count) => {
  coins = document.getElementsByClassName("cost")
  console.log(coins)
  for (let coin_i = 0; coin_i < coins.length; coin_i++) {
    coins[coin_i].style.visibility = coin_i < coin_count ? "visible" : "hidden"
  }
}

// right side of card has many parameters
// modifies if each one is visible
const cardIconVisiblityChange = (damage_vis, ammo_vis, delay_vis) => {
  cardDamage.style.visibility = damage_vis
  cardDamageText.style.visibility = damage_vis
  cardAmmo.style.visibility = ammo_vis
  cardAmmoText.style.visibility = ammo_vis
  cardDelay.style.visibility = delay_vis
  cardDelayText.style.visibility = delay_vis
}

const monkeyIconVisiblityChange = () => {
  if (cardType == "monkey") {
    if (damageCheckbox.checked) {
      cardIconVisiblityChange("visible", "visible", "visible")
    } else {
      cardIconVisiblityChange("hidden", "hidden", "hidden")
    }
  }
}

// type buttons
const onCardTypeMonkeyClick = () => {
  cardType = "monkey"

  cardBorder.src = "src/MonkeyCardBorder.png"
  cardBorderCircle.style.visibility = "hidden"
  cardDamage.src = "src/MonkeyDamage.png"
  cardImg.style.height = "100%"
  cardImg.style.borderRadius = "10%"
  cardImg.style.transform = "translate(-50%, 0%)"

  cardDelay.style.top = "42%"
  cardDelayText.style.top = "42%"
  monkeyIconVisiblityChange()
}

const onCardTypeBloonClick = () => {
  cardType = "bloon"

  cardBorder.src = "src/BloonCardBorder.png"
  cardBorderCircle.style.visibility = "visible"
  cardBorderCircle.src = "src/BloonCardBorderCircle.png"
  cardDamage.src = "src/BloonDamage.png"
  cardImg.style.height = "55%"
  cardImg.style.transform = "translate(-50%, -7%)"
  cardImg.style.borderRadius = "50%"

  cardDelay.style.top = "25%"
  cardDelayText.style.top = "25%"
  cardIconVisiblityChange("visible", "hidden", "visible")
}

const onCardTypePowerClick = () => {
  cardType = "power"

  cardBorder.src = "src/PowerCardBorder.png"
  cardBorderCircle.style.visibility = "visible"
  cardBorderCircle.src = "src/PowerCardBorderCircle.png"
  cardImg.style.height = "55%"
  cardImg.style.transform = "translate(-50%, -7%)"
  cardImg.style.borderRadius = "40%"

  cardAmmo.style.visibility = "hidden"
  cardAmmoText.style.visibility = "hidden"
  cardIconVisiblityChange("hidden", "hidden", "hidden")
}

const changeRarityImg = (value) => {
  rarityElement.src = `src/Rarity${value}.png`
}
// make text editable
editCardTextEvent("title-text")
editCardTextEvent("cost-text")
editCardTextEvent("damage-text")
editCardTextEvent("ammo-text")
editCardTextEvent("delay-text")
editCardTextEvent("description-text")

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

const resizeImage = (img, wantedWidth, wantedHeight) => {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = wantedWidth
  canvas.height = wantedHeight

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL()
}

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

const downloadImg = () => {
  var cardContainer = document.getElementById("card-container")
  html2canvas(cardContainer, {
    backgroundColor: null,
  }).then(function (canvas) {
    let imageData = canvas.toDataURL("image/png")
    var downloadLink = document.createElement("a")
    downloadLink.href = imageData
    downloadLink.download = "card.png" // Set the download file name
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  })
}
