-- CreateTable
CREATE TABLE "ResourceHistory" (
    "id" SERIAL NOT NULL,
    "resourceId" INTEGER NOT NULL,
    "level" DOUBLE PRECISION NOT NULL,
    "isCritical" BOOLEAN NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResourceHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResourceHistory" ADD CONSTRAINT "ResourceHistory_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
