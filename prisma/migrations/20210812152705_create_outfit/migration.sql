-- CreateTable
CREATE TABLE "Outfit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "season" TEXT NOT NULL,
    "designer_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Outfit" ADD FOREIGN KEY ("designer_id") REFERENCES "Designer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
