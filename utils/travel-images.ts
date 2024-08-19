const travelImages = [
  require("../assets/images/travel/pexels-apasaric-1285625.jpg"),
  require("../assets/images/travel/pexels-freestockpro-2166559.jpg"),
  require("../assets/images/travel/pexels-maxravier-2253821.jpg"),
  require("../assets/images/travel/pexels-pixabay-210012.jpg"),
  require("../assets/images/travel/pexels-quang-nguyen-vinh-222549-2132180.jpg"),
  require("../assets/images/travel/pexels-quang-nguyen-vinh-222549-2178175.jpg"),
  require("../assets/images/travel/pexels-sulimansallehi-2162891.jpg"),
  require("../assets/images/travel/pexels-vince-2147487.jpg"),
  require("../assets/images/travel/pexels-vitor-gusmao-shimabukuro-1110669-2104044.jpg"),
];

function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * travelImages.length);
  return travelImages[randomIndex];
}

function getRandomImageArray(n: number) {
  const randomImages = [];
  for (let i = 0; i < n; i++) {
    randomImages.push(getRandomImage());
  }
  return randomImages;
}

export { getRandomImage, getRandomImageArray };
