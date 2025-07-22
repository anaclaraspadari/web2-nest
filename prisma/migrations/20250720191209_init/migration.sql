/*
  Warnings:

  - You are about to drop the column `module` on the `PermissionsUser` table. All the data in the column will be lost.
  - Added the required column `moduleId` to the `PermissionsUser` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Module" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PermissionsUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "moduleId" INTEGER NOT NULL,
    CONSTRAINT "PermissionsUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PermissionsUser_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PermissionsUser" ("id", "userId") SELECT "id", "userId" FROM "PermissionsUser";
DROP TABLE "PermissionsUser";
ALTER TABLE "new_PermissionsUser" RENAME TO "PermissionsUser";
CREATE UNIQUE INDEX "PermissionsUser_userId_key" ON "PermissionsUser"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
