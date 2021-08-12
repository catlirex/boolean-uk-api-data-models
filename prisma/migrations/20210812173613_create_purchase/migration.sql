-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "outfit_id" INTEGER NOT NULL,
    "guest_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Purchase" ADD FOREIGN KEY ("outfit_id") REFERENCES "Outfit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD FOREIGN KEY ("guest_id") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
