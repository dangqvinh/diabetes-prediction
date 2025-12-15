# HƯỚNG DẪN CÀI ĐẶT MÔI TRƯỜNG VÀ PHẦN MỀM

## 1. Giới thiệu

### 1.1. Mục đích

Tài liệu hướng dẫn chi tiết quy trình cài đặt môi trường, công cụ và
phần mềm cần thiết để chạy và phát triển dự án gồm 3 thành phần:

- Frontend React
- Backend FastAPI
- Model ở google collab

### 1.2. Đối tượng

- Developer mới tham gia dự án
- BA, QA cần chạy môi trường cục bộ
- Nhóm DevOps hoặc vận hành hệ thống

### 1.3. Phạm vi

Áp dụng cho hệ điều hành Windows 10/11, macOS và Linux.\
Công nghệ chính: Node.js, Python 3.10+, PostgreSQL.

## 2. Yêu cầu hệ thống

### 2.1. Yêu cầu phần cứng

- CPU: 4 nhân trở lên
- RAM: tối thiểu 8 GB (khuyến nghị 16 GB nếu chạy Docker)
- Ổ cứng trống: 10--20 GB

### 2.2. Yêu cầu phần mềm

- Git
- Node.js v18+
- Python 3.10+
- PostgreSQL 14+
- VS Code

## 3. Danh sách công cụ cần cài đặt

| Công cụ    | Phiên bản   | Mục đích            |
| ---------- | ----------- | ------------------- |
| Node.js    | 18+         | Chạy React & NestJS |
| NPM/Yarn   | đi kèm Node | Quản lý package     |
| Python     | 3.10+       | Chạy FastAPI        |
| PostgreSQL | 14+         | Database            |
| Git        | mới nhất    | Clone source code   |
| VS Code    | mới nhất    | IDE phát triển      |

## 4. Hướng dẫn cài đặt công cụ

### 4.1. Node.js

Tải tại: https://nodejs.org/

**Kiểm tra:**

    node -v
    npm -v

### 4.2. Python

Tải tại: https://www.python.org/downloads/

**Kiểm tra:**

    python --version
    pip --version

### 4.3. PostgreSQL

Tải tại: https://www.postgresql.org/download/

Cấu hình mặc định:

- Username: postgres
- Port: 5432

### 4.4. Git

Tải tại: https://git-scm.com/downloads

## 5. Thiết lập môi trường làm việc

### 5.1. Clone source code

    git clone https://github.com/dangqvinh/diabetes-prediction
    cd diabetes-prediction

## 6. Cài đặt dependencies

### 6.1. FastAPI

    cd diabetes-prediction-backend
    python -m venv venv
    venv\Scripts\activate
    pip install -r requirements.txt

### 6.2. React

    cd diabetes-prediction-web
    npm install

## 7. Khởi chạy hệ thống

### 7.1. FastAPI

    uvicorn app.main:app --reload --port 8000

### 7.2. React

    npm start

## 9. Troubleshooting

| Lỗi      | Nguyên nhân   | Cách khắc phục           |
| -------- | ------------- | ------------------------ |
| Lỗi venv | Chưa activate | Kích hoạt lại môi trường |
| Lỗi CORS | Chưa bật CORS | Bật CORS trong BE        |
