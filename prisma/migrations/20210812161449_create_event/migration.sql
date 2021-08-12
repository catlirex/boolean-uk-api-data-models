-- AlterTable
ALTER TABLE "Outfit" ADD COLUMN     "event_id" INTEGER;

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Outfit" ADD FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
