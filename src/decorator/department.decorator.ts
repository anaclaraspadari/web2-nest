/* eslint-disable prettier/prettier */
import { SetMetadata } from "@nestjs/common";
import { Department } from "generated/prisma";

export const DEPARTMENTS_KEY='departments'
export const Departments=(...departments:Department[])=>SetMetadata(DEPARTMENTS_KEY, departments)