import { Injectable } from '@nestjs/common';
import { CreateDiagnosisRequestDto } from 'src/diagnosis/dto/create-diagnosis-reqeust.dto';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
  private openAI: OpenAI;

  constructor() {
    this.openAI = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
      organization: process.env.OPEN_AI_ORG_KEY,
      project: process.env.OPEN_AI_PROJ_KEY,
    });
  }

  public async createImprovementReport(
    predictedStrokeProbability: number,
    createDiagnosisReportRequestDto: CreateDiagnosisRequestDto,
  ) {
    const completion = await this.openAI.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `${createDiagnosisReportRequestDto}
                    ${predictedStrokeProbability}
                    여기 뇌졸중 관련 데이터와 예측된 뇌졸중 발병확률을 줄게
                    이 데이터들을 사용해 종합 건강 진단 결과, 식습관 개선방안, 생활습관 개선방안을
                    total_diagnosis, eating_habits, lifestyle_habits 프로퍼티값을 갖는 Json 으로 만들어줘
                    각각 200자 이상으로 채워줘`,
        },
      ],
      model: 'gpt-3.5-turbo-16k',
    });

    return JSON.parse(completion.choices[0].message.content);
  }
}
