/* eslint-disable prettier/prettier */
import { SetMetadata } from "@nestjs/common";

export const DEPARTMENTS_KEY='departments'
export const Departments=(...departments:string[])=>{
    return SetMetadata(DEPARTMENTS_KEY, departments)
};