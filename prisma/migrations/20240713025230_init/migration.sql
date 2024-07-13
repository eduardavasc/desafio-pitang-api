-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "scheduledDate" DATETIME NOT NULL,
    "patientName" TEXT NOT NULL,
    "patientBirthDate" DATETIME NOT NULL,
    "scheduleCompleted" BOOLEAN NOT NULL DEFAULT false,
    "scheduleConclusion" TEXT
);
