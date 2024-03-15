import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserCredentialService } from './user-credential.service';

@Controller('user-credential')
export class UserCredentialController {
  constructor(private readonly userCredentialService: UserCredentialService) {}
}
