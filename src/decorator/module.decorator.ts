/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
import { Module } from 'generated/prisma';

export const Modules = (...modules: Module[]) => SetMetadata('modules', modules);