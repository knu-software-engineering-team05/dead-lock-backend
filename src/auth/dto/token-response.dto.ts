import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {
  @ApiProperty({ example: 'ACCESS_TOKEN', description: 'Access Token' })
  access: string;

  @ApiProperty({ example: 'REFRESH_TOKEN', description: 'Refresh Token' })
  refresh: string;

  constructor(access: string, refresh: string) {
    this.access = access;
    this.refresh = refresh;
  }
}
