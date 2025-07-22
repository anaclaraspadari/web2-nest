/*
  Warnings:

  - You are about to drop the `Module` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `moduleId` on the `Permissions` table. All the data in the column will be lost.
  - Added the required column `departmentId` to the `Permissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Module";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Permissions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,
    CONSTRAINT "Permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Permissions_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Permissions" ("id", "userId") SELECT "id", "userId" FROM "Permissions";
DROP TABLE "Permissions";
ALTER TABLE "new_Permissions" RENAME TO "Permissions";
CREATE UNIQUE INDEX "Permissions_userId_key" ON "Permissions"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
