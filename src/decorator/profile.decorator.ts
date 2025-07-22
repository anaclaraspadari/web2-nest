/* eslint-disable prettier/prettier */
import { SetMetadata } from "@nestjs/common";
import { Profile } from "generated/prisma";

export const PROFILES_KEY='profiles';
export const Profiles=(...profiles:Profile[])=> SetMetadata(PROFILES_KEY,profiles)