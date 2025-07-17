-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "profile" TEXT NOT NULL DEFAULT 'USER'
);

-- CreateTable
CREATE TABLE "Module" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "PermissionsProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profile" TEXT NOT NULL,
    "moduleId" INTEGER NOT NULL,
    CONSTRAINT "PermissionsProfile_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PermissionsUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "moduleId" INTEGER NOT NULL,
    CONSTRAINT "PermissionsUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PermissionsUser_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Finance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AccessLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "route" TEXT NOT NULL,
    "permissionGranted" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AccessLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PermissionsProfile_profile_moduleId_key" ON "PermissionsProfile"("profile", "moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "PermissionsUser_userId_moduleId_key" ON "PermissionsUser"("userId", "moduleId");
