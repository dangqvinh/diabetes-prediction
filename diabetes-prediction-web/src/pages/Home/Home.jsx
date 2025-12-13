import React, { useState } from 'react';
import HealthForm from '../../components/common/HealthForm/';
import ResultCard from '../../components/common/ResultCard/';

const Home = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFormSubmit = async (healthData, predictionResponse) => {
    setIsProcessing(true);

    const finalResult = {
      ...predictionResponse,
      healthData: healthData,
    }

    setResult(finalResult);
    setIsProcessing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">
            Dự Đoán Bệnh Tiểu Đường
          </h1>
          <p className="text-blue-700 text-lg">
            Nhập các thông số sức khỏe để nhận kết quả dự đoán
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            {!result ? (
              <HealthForm onSubmit={handleFormSubmit} isProcessing={isProcessing} />
            ) : (
              <ResultCard result={result} onReset={handleReset} />
            )}
          </div>
        </div>

        <footer className="max-w-4xl mx-auto mt-8 text-center text-blue-600 text-sm">
          <p>Mô hình AI hỗ trợ dự đoán nguy cơ bệnh tiểu đường dựa trên dữ liệu y tế</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;