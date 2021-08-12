-- AlterTable
ALTER TABLE "Outfit" ADD COLUMN     "model_id" INTEGER;

-- CreateTable
CREATE TABLE "Model" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Outfit" ADD FOREIGN KEY ("model_id") REFERENCES "Model"("id") ON DELETE SET NULL ON UPDATE CASCADE;
