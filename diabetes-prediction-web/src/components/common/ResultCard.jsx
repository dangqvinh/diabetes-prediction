import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { HEALTH_FIELDS } from '../../utils/constants';

const ResultCard = ({ result, onReset }) => {
  const isRisk = result.diabetes_risk === true;

  const getFieldLabel = (fieldName) => {
    const field = HEALTH_FIELDS.find(f => f.name === fieldName);
    return field ? field.label : fieldName;
  };

  const getFieldValue = (fieldName, value) => {
    const field = HEALTH_FIELDS.find(f => f.name === fieldName);
    
    if (field?.type === 'checkbox') {
      return value === 1 ? 'Có' : 'Không';
    }
    
    if (field?.type === 'select' && field.options) {
      const option = field.options.find(opt => opt.value === String(value));
      return option ? option.label : value;
    }
    
    return `${value} ${field?.unit || ''}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        {isRisk ? (
          <AlertCircle className="mx-auto mb-4 text-orange-500" size={64} />
        ) : (
          <CheckCircle className="mx-auto mb-4 text-green-500" size={64} />
        )}
        
        <h2 className="text-2xl font-bold text-blue-900 mb-2">
          Kết quả phân tích
        </h2>
        
        <div className={`inline-block px-6 py-3 rounded-lg text-lg font-semibold mb-4 ${
          isRisk ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
        }`}>
          {isRisk ? 'Có nguy cơ tiểu đường' : 'Không có nguy cơ tiểu đường'}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <Info className="text-blue-600" size={20} />
          <h3 className="font-semibold text-blue-900">Thông số đã nhập</h3>
        </div>
        <div className="grid grid-cols-1 gap-2 text-sm">
          {Object.entries(result.healthData).map(([key, value]) => {
            if (value !== undefined && value !== '') {
              return (
                <div key={key} className="bg-white rounded p-3 flex justify-between">
                  <span className="text-blue-600">{getFieldLabel(key)}:</span>
                  <span className="font-medium text-blue-900">
                    {getFieldValue(key, value)}
                  </span>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800">
          <strong>⚠️ Lưu ý:</strong> Đây chỉ là kết quả dự đoán từ mô hình AI. 
          Vui lòng tham khảo ý kiến bác sĩ để có chẩn đoán chính xác.
        </p>
      </div>

      {isRisk && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="font-semibold text-orange-900 mb-2">Khuyến nghị:</h4>
          <ul className="text-sm text-orange-800 space-y-1 list-disc list-inside">
            <li>Đặt lịch khám với bác sĩ chuyên khoa nội tiết</li>
            <li>Theo dõi chỉ số đường huyết thường xuyên</li>
            <li>Duy trì chế độ ăn lành mạnh và tập thể dục</li>
            <li>Kiểm soát cân nặng và huyết áp</li>
          </ul>
        </div>
      )}
      
      <button
        onClick={onReset}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 
                 rounded-lg font-semibold text-lg transition-colors shadow-lg"
      >
        Thực hiện dự đoán mới
      </button>
    </div>
  );
};
export default ResultCard;