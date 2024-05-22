/**
 * 가입 시 얻는 정보 (따로 질문단계에서 받을 필요 없음)
나이는 몇 살인가요? (생년월일을 받고 서비스에서 계산)
성별을 선택해주세요 (Male/Female)

-- 질문 입력 단계 --
기본정보
결혼 여부를 선택해주세요 (Yes/No)
현재 직업 유형을 선택해주세요 (Private/Self-employed/Govt_job/Children/Never_worked)
거주 유형을 선택해주세요 (Urban/Rural)

건강정보
고혈압이 있나요? (1: 예, 0: 아니요)
심장 질환 이력이 있나요? (1: 예, 0: 아니요)
평균 혈당 수치는 얼마인가요? (숫자 입력)
BMI 지수는 얼마인가요? (숫자 입력)
흡연 상태를 선택해주세요 (FormerLy smoked/Never smoked/Smokes/Unknown)
 */

import { IsBoolean, IsEnum } from 'class-validator';
import { JobType, ResidenceType } from '../entities/diagnosis.entity';

export class CreateDiagnosisRequestDto {
  @IsBoolean()
  isMarried: boolean;

  @IsEnum(JobType, {
    message:
      'jobType 은 PRIVATE, SELF_EMPLOYED, GOVT_JOB, CHILDREN, NEVER_WORKED 중 하나여야 합니다',
  })
  jobType: JobType;

  residenceType: ResidenceType;
}
