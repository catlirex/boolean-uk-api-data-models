const faker = require("faker");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function buildDesignerList() {
  const numOfDesigner = getRandomInt(3, 10);
  const designers = [];
  for (let i = 0; i < numOfDesigner; i++) {
    let designer = {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      bio: faker.lorem.paragraph(),
    };

    designers.push(designer);
  }

  return designers;
}

function buildOutfitList() {
  seasonOption = ["Spring", "Fall"];
  const numOfOutfit = getRandomInt(5, 20);
  const outfitList = [];
  for (let i = 0; i < numOfOutfit; i++) {
    const outfitName = faker.commerce.productName().split(" ");
    let outfit = {
      name: `${outfitName[0]} ${outfitName[1]}`,
      price: Number(faker.commerce.price()),
      season: seasonOption[getRandomInt(0, 1)],
    };

    outfitList.push(outfit);
  }

  return outfitList;
}

function buildModelList() {
  const numOfModel = getRandomInt(5, 10);
  const modelList = [];
  for (let i = 0; i < numOfModel; i++) {
    let model = {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      age: getRandomInt(18, 38),
      height: getRandomInt(170, 190),
    };

    modelList.push(model);
  }
  return modelList;
}

function buildEventList() {
  const numOfEvent = getRandomInt(1, 3);
  const eventList = [];
  for (let i = 0; i < numOfEvent; i++) {
    let event = {
      date: faker.date.future(),
      address: `${faker.address.city()}, ${faker.address.streetName()}`,
      name: `${faker.hacker.adjective()} ${faker.hacker.noun()} Showcase`,
    };

    eventList.push(event);
  }

  return eventList;
}

function buildGuestList() {
  const numOfGuest = getRandomInt(5, 10);
  const guestList = [];
  for (let i = 0; i < numOfGuest; i++) {
    let guest = {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
    };
    guestList.push(guest);
  }
  return guestList;
}

module.exports = {
  buildDesignerList,
  buildOutfitList,
  buildModelList,
  buildEventList,
  buildGuestList,
  getRandomInt,
};
