import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateReqDto } from './dto/CreateReq.dto';
import { UpdateFormReqDto } from './dto/UpdateReq.dto';
import { SubmissionDto } from './dto/submitReq.dto';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}
  @HttpCode(HttpStatus.OK)
  @Post('')
  public postForm(@Request() req, @Body() createReqDto: CreateReqDto) {
    const userId: unknown = req.user.id;
    console.log(req);
    if (typeof userId === 'string')
      return this.formsService.createForm(userId, createReqDto);
  }
  @HttpCode(HttpStatus.OK)
  @Get()
  public getUserForms(@Request() req) {
    const userId: unknown = req.user.id;
    if (typeof userId === 'string')
      return this.formsService.getFormsByUser(userId);
  }
  @HttpCode(HttpStatus.OK)
  @Get(':formId')
  public getForm(@Request() req, @Param('formId') paramForm) {
    const userId: unknown = req.user.id;
    if (typeof userId === 'string')
      return this.formsService.getFormById(userId, paramForm);
  }
  @HttpCode(HttpStatus.OK)
  @Put(':formId')
  public updateForm(
    @Request() req,
    @Param('formId') ParamForm,
    @Body() update: UpdateFormReqDto,
  ) {
    const userId: unknown = req.user.id;
    if (typeof userId === 'string')
      return this.formsService.updateFormById(userId, ParamForm, update);
  }
  @HttpCode(HttpStatus.OK)
  @Delete(':formId')
  public deleteForm(@Request() req, @Param('formId') ParamForm) {
    const userId: unknown = req.user.id;
    if (typeof userId === 'string')
      return this.formsService.deleteForm(userId, ParamForm);
  }

  @HttpCode(HttpStatus.OK)
  @Post(':formId/submit')
  submitForm(
    @Request() req,
    @Body() userAnswers: SubmissionDto,
    @Param('formId') formId,
  ) {
    const userId = req.user.id;
    if (typeof userId === 'string')
      return this.formsService.createResponses(userId, formId, userAnswers);
  }
  @HttpCode(HttpStatus.OK)
  @Get(':formId/submissions')
  getSubmissions(@Request() req, @Param('formId') formId) {
    const userId = req.user.id;
    if (typeof userId === 'string')
      return this.formsService.getFormResponses(userId, formId);
  }
}
