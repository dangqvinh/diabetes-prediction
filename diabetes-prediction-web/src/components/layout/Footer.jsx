import React from 'react';

const Footer = () => {
  return (
    <footer className="max-w-3xl mx-auto mt-8 text-center text-blue-600 text-sm">
      <p>Mô hình AI hỗ trợ dự đoán nguy cơ bệnh tiểu đường dựa trên dữ liệu y tế</p>
      <p className="mt-2 text-xs text-blue-500">
        Lưu ý: Kết quả chỉ mang tính chất tham khảo. Vui lòng tham khảo ý kiến bác sĩ chuyên khoa.
      </p>
    </footer>
  );
};

export default Footer;