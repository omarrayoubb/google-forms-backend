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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('forms')
@ApiBearerAuth()
@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}
  @ApiOperation({ summary: 'Create a new form' })
  @ApiBody({ type: CreateReqDto })
  @ApiResponse({ status: 200, description: 'Form created successfully.' })
  @HttpCode(HttpStatus.OK)
  @Post('')
  public postForm(@Request() req, @Body() createReqDto: CreateReqDto) {
    const userId: unknown = req.user.id;
    console.log(req);
    if (typeof userId === 'string')
      return this.formsService.createForm(userId, createReqDto);
  }
  @ApiOperation({ summary: 'Get all forms for the user' })
  @ApiResponse({ status: 200, description: 'List of user forms.' })
  @HttpCode(HttpStatus.OK)
  @Get()
  public getUserForms(@Request() req) {
    const userId: unknown = req.user.id;
    if (typeof userId === 'string')
      return this.formsService.getFormsByUser(userId);
  }
  @ApiOperation({ summary: 'Get a form by ID' })
  @ApiParam({ name: 'formId', type: String })
  @ApiResponse({ status: 200, description: 'Form details.' })
  @HttpCode(HttpStatus.OK)
  @Get(':formId')
  public getForm(@Request() req, @Param('formId') paramForm) {
    const userId: unknown = req.user.id;
    if (typeof userId === 'string')
      return this.formsService.getFormById(userId, paramForm);
  }
  @ApiOperation({ summary: 'Update a form by ID' })
  @ApiParam({ name: 'formId', type: String })
  @ApiBody({ type: UpdateFormReqDto })
  @ApiResponse({ status: 200, description: 'Form updated successfully.' })
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
  @ApiOperation({ summary: 'Delete a form by ID' })
  @ApiParam({ name: 'formId', type: String })
  @ApiResponse({ status: 200, description: 'Form deleted successfully.' })
  @HttpCode(HttpStatus.OK)
  @Delete(':formId')
  public deleteForm(@Request() req, @Param('formId') ParamForm) {
    const userId: unknown = req.user.id;
    if (typeof userId === 'string')
      return this.formsService.deleteForm(userId, ParamForm);
  }

  @ApiOperation({ summary: 'Submit answers to a form' })
  @ApiParam({ name: 'formId', type: String })
  @ApiBody({ type: SubmissionDto })
  @ApiResponse({ status: 200, description: 'Form submitted successfully.' })
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
  @ApiOperation({ summary: 'Get all submissions for a form' })
  @ApiParam({ name: 'formId', type: String })
  @ApiResponse({ status: 200, description: 'List of form submissions.' })
  @HttpCode(HttpStatus.OK)
  @Get(':formId/submissions')
  getSubmissions(@Request() req, @Param('formId') formId) {
    const userId = req.user.id;
    if (typeof userId === 'string')
      return this.formsService.getFormResponses(userId, formId);
  }
}
