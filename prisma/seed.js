const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const {
  buildDesignerList,
  buildOutfitList,
  buildModelList,
  buildEventList,
} = require("../src/utils/mockData");

const getRandomElement = (array) => {
  const number = Math.floor(Math.random() * array.length);
  return array[number];
};

async function seed() {
  const designers = buildDesignerList();
  const designerPromises = designers.map(async (designer) => {
    return await prisma.designer.create({
      data: designer,
    });
  });
  const createdDesigners = await Promise.all(designerPromises);
  const designersIds = createdDesigners.map(({ id }) => id);
  console.log(createdDesigners);

  const models = buildModelList();
  const modelPromises = models.map(async (model) => {
    return await prisma.model.create({
      data: model,
    });
  });
  const createdModels = await Promise.all(modelPromises);
  const modelsIds = createdModels.map(({ id }) => id);
  console.log(createdModels);

  const events = buildEventList();
  const eventPromises = events.map(async (event) => {
    return await prisma.event.create({
      data: event,
    });
  });
  const createdEvents = await Promise.all(eventPromises);
  const eventsIds = createdEvents.map(({ id }) => id);
  console.log(createdEvents);

  const outFits = buildOutfitList();
  const outfitPromises = outFits.map(async (outFit) => {
    return await prisma.outfit.create({
      data: {
        ...outFit,
        designer: { connect: { id: parseInt(getRandomElement(designersIds)) } },
        model: { connect: { id: parseInt(getRandomElement(modelsIds)) } },
        event: { connect: { id: parseInt(getRandomElement(eventsIds)) } },
      },
    });
  });
  const createdOutfit = await Promise.all(outfitPromises);
  const outfitIds = createdOutfit.map(({ id }) => id);
  console.log(createdOutfit);
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());