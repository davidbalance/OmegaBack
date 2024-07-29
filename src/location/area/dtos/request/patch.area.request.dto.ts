import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { AreaResponseDto } from "../response/base.area.response.dto";
import { PostAreaRequestDto } from "./post.area.request.dto";

export class PatchAreaRequestDto extends PostAreaRequestDto { }