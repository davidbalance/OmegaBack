import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SenderStatusService } from './sender-status.service';

@Controller('sender-status')
export class SenderStatusController {
  constructor(private readonly senderStatusService: SenderStatusService) { }
}
