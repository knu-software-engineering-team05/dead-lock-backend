### ✏️ 개요

소프트웨어 공학 뇌졸중 예측 서비스 DeadLock 백엔드 Repository 입니다

### ✏️ API 명세서

http://api.deadlock.kro.kr:8080/docs

### ✏️ 기술스택

![](https://shields.io/badge/TypeScript-black?logo=typescript&style=flat&color=033963)
![](https://shields.io/badge/NodeJS-black?logo=nodedotjs&style=flat&color=367C2B)
![](https://img.shields.io/badge/NestJS-black?logo=nestjs&style=flat&color=E0234E)
![](https://img.shields.io/badge/TypeORM-black?logo=nestjs&style=flat&color=E0234E)
![](https://shields.io/badge/SQLite-black?logo=sqlite&style=flat&color=003B57)<br/>
![](https://shields.io/badge/Python-black?logo=python&style=flat&color=033963)
![](https://shields.io/badge/Django-black?logo=django&style=flat&color=092E20)
![](https://shields.io/badge/Open_AI-black?logo=openai&style=flat&color=412991)

![](https://shields.io/badge/AWS_EC2-black?logo=amazonec2&style=flat&color=ff7300)
![](https://shields.io/badge/NginX-black?logo=nginx&style=flat&color=009639)
![](https://shields.io/badge/Docker-black?logo=docker&style=flat&color=033963)
![](https://shields.io/badge/Docker_Compose-black?logo=docker&style=flat&color=033963)
<br/>
![](https://shields.io/badge/Github-black?logo=github&style=flat&color=181717)
![](https://shields.io/badge/Github_Actions-black?logo=githubactions&style=flat&color=003791)

### ✏️ 실행방법

의존성 패키지 설치

```bash
npm install
```

환경변수 설정

```env
DB_USER_NAME=deadlock
DB_PASSWORD=deadlock
DB_DATABASE=deadlock

JWT_SECRET=jwt-deadlock-secret
JWT_ACCESS_EXPIRES_IN=300
JWT_REFRESH_EXPIRES_IN=3600

OPEN_AI_API_KEY=OPEN_AI_API_KEY
OPEN_AI_ORG_KEY=OPEN_AI_ORGANIZATION_KEY
OPEN_AI_PROJ_KEY=OPEN_AI_PROJECT_KEY
```

개발 서버 실행

```bash
npm run start:dev
```

### ✏️ 아키텍쳐

![image](https://github.com/knu-software-engineering-team05/dead-lock-backend/assets/52105661/e27d31a7-059a-4f00-867a-e0abc3564e20)
