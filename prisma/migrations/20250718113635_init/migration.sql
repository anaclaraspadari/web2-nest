/*
  Warnings:

  - You are about to drop the column `moduleId` on the `PermissionsUser` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PermissionsUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "module" TEXT NOT NULL,
    CONSTRAINT "PermissionsUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PermissionsUser" ("id", "module", "userId") SELECT "id", "module", "userId" FROM "PermissionsUser";
DROP TABLE "PermissionsUser";
ALTER TABLE "new_PermissionsUser" RENAME TO "PermissionsUser";
CREATE UNIQUE INDEX "PermissionsUser_userId_key" ON "PermissionsUser"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
