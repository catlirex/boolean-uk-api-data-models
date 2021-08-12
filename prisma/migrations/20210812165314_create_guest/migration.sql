-- CreateTable
CREATE TABLE "Guest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event_guest" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "guest_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event_guest" ADD FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event_guest" ADD FOREIGN KEY ("guest_id") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
