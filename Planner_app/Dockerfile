
FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /planner
COPY requirements.txt /planner/
RUN pip install -r requirements.txt
COPY . /planner/