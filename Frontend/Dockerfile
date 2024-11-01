# 1. 빌드 단계
FROM node:18-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 설치 및 빌드
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. 실행 단계
FROM node:18-alpine

# 환경변수 설정
ENV NODE_ENV production

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 파일 복사
COPY --from=builder /app .

# 포트 설정
EXPOSE 3000

# 애플리케이션 시작 명령어
CMD ["npm", "start"]