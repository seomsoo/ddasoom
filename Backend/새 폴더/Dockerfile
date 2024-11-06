# 1. Python 3.9 기반의 이미지를 사용
FROM python:3.9-slim

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 필수 패키지들을 설치할 때 사용
# 패키지 목록을 복사하고, 설치
COPY requirements.txt ./

# 4. 의존성 설치
RUN pip install --no-cache-dir -r requirements.txt

# 5. 앱의 코드를 컨테이너에 복사
COPY . .

# 6. FastAPI 서버를 uvicorn으로 실행
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000"]

# 7. 외부에서 접근할 수 있도록 포트 개방
EXPOSE 10000