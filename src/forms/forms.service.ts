import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { Forms, FormsDocument } from 'src/database/forms/Form.schema';
import { FormResponseDto } from './dto/FormResponse.dto';
import { FormDto } from './dto/Form.dto';
import { CreateReqDto } from './dto/CreateReq.dto';
import { v4 as uuid4 } from 'uuid';
// import { Question } from 'src/schemas/Question.schema';
import { CreateResDto } from './dto/CreateRes.dto';
import { UpdateFormReqDto } from './dto/UpdateReq.dto';
import { SubmissionDto } from './dto/submitReq.dto';
// import { FormSubmission } from 'src/database/forms/FormSubmission.schema';
// import { Question } from 'src/database/forms/Question.schema';
@Injectable()
export class FormsService {
  constructor(
    @InjectModel(Forms.name) private formModel: Model<FormsDocument>,
  ) {}

  async getFormsByUser(
    userID: string,
    page = 1,
    limit = 10,
  ): Promise<FormResponseDto> {
    const skip = (page - 1) * limit;
    const forms = await this.formModel
      .find({ createdBy: userID, isDeleted: false })
      .skip(skip)
      .limit(limit);
    const totalNumberOfForms = await this.formModel.countDocuments({
      createdBy: userID,
    });
    if (!forms.length) {
      throw new BadRequestException('No Forms Created By This User');
    }

    const removeDeletedOption = forms.map((form) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { isDeleted, ...rest } = form.toObject();
      return rest as FormDto;
    });
    const totalPages = Math.ceil(totalNumberOfForms / limit);
    return {
      forms: removeDeletedOption,
      pageNumber: page,
      totalNumberOfForms,
      totalPages: totalPages,
    };
  }

  async createForm(
    userID: string,
    createReqDto: CreateReqDto,
  ): Promise<CreateResDto> {
    const form = await this.formModel.create({
      formId: uuid4().toString(),
      createdBy: new mongoose.Types.ObjectId(userID),
      createdAt: Date.now(),
      isDeleted: false,
      responses: [],
      ...createReqDto,
    });

    return {
      message: 'Form has created sucessfully',
      form,
      formId: form.formId,
    };

    // } catch (e: unknown) {
    //   throw new BadRequestException(
    //     'Error in Creating new form please try again later',
    //   );
    // }
  }

  async getFormById(userId: string, formId: string): Promise<Forms> {
    const form = await this.formModel.findOne({
      formId: formId,
      isDeleted: false,
    });
    if (!form) {
      throw new BadRequestException('this form was deleted');
    }
    return form;
  }

  async updateFormById(
    userId: string,
    formId: string,
    updateForm: UpdateFormReqDto,
  ) {
    const form = await this.formModel.findOne({
      formId: formId,
      isDeleted: false,
    });
    if (!form) {
      throw new BadRequestException('Deleted Form');
    }
    const updatedForm = await this.formModel.updateOne(
      { formId, createdBy: userId, isDeleted: false },
      { $set: updateForm },
      { new: true },
    );
    if (!updateForm) {
      throw new BadRequestException('Error in Updating Form');
    }
    return {
      message: 'form has been updated',
      updatedForm,
    };
  }

  async deleteForm(userId: string, formId: string) {
    const form = await this.formModel.findOneAndUpdate(
      { formId, createdBy: userId },
      { isDeleted: true },
    );
    if (!form) {
      throw new NotFoundException('Form is not found');
    }
    return {
      message: 'Form has been deleted Successfully',
    };
  }

  async getFormResponses(
    userId: string,
    formId,
    limit: number = 10,
    page: number = 1,
  ) {
    const getForm = await this.formModel.findOne({ formId, isDeleted: false });
    if (!getForm) {
      throw new NotFoundException('Form Is Not Found');
    }
    if (userId != getForm.createdBy.toString()) {
      throw new UnauthorizedException();
    }
    const skip = (page - 1) * limit;
    const pageSubmissions = getForm.responses.slice(skip, skip + limit);
    const totalNumberOfSubmissions = getForm.responses.length;
    return {
      pageSubmissions,
      page,
      limit,
      totalNumberOfSubmissions,
      totalPages: Math.ceil(totalNumberOfSubmissions / limit),
    };
  }

  async createResponses(
    userId: string,
    formId: string,
    answers: SubmissionDto,
  ) {
    const getForm = await this.formModel.findOne({
      formId,
      isDeleted: false,
      isActive: true,
    });
    if (!getForm) {
      throw new NotFoundException('This Form is not available for responses');
    }
    for (const q of getForm.questions) {
      if (q.isRequired) {
        const checkValid = answers.userAnswers.some((question) => {
          // console.log(q._id);
          console.log(question.QID);
          return question.QID.toString() === q._id?.toString();
        });
        if (!checkValid) {
          throw new BadRequestException(`question ${q._id} is Required`);
        }
      }
    }
    getForm.responses.push({
      submissionTime: new Date(),
      userId: new mongoose.Types.ObjectId(userId),
      userAnswers: answers.userAnswers,
    });
    try {
      await getForm.save();
      return {
        message: 'Response saved successfully.',
        formId,
      };
    } catch {
      throw new BadRequestException(
        'Form Can not recieve responses right now please try again later',
      );
    }
  }
}
