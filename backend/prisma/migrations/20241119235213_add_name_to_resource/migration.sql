-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_resourceId_fkey";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
