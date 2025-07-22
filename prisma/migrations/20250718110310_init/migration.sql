/*
  Warnings:

  - You are about to drop the `Module` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PermissionsProfile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `module` to the `PermissionsUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PermissionsProfile_profile_moduleId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Module";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PermissionsProfile";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PermissionsUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "moduleId" INTEGER NOT NULL,
    "module" TEXT NOT NULL,
    CONSTRAINT "PermissionsUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PermissionsUser" ("id", "moduleId", "userId") SELECT "id", "moduleId", "userId" FROM "PermissionsUser";
DROP TABLE "PermissionsUser";
ALTER TABLE "new_PermissionsUser" RENAME TO "PermissionsUser";
CREATE UNIQUE INDEX "PermissionsUser_userId_key" ON "PermissionsUser"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
