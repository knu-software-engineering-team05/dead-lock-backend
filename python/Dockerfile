FROM --platform=amd64 python:3.9

WORKDIR /deadlock/app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "server.py"]