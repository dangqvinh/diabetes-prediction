import React, { useState } from "react";
import { Activity, AlertCircle } from "lucide-react";
import { HEALTH_FIELDS } from "../../utils/constants";
import { predictDiabetes } from "../../services/predictionService";

const HealthForm = ({ onSubmit, isProcessing }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let newValue = value;

    if (type === 'radio') {
      newValue = parseInt(value);
    } else if (type === 'number') {
      const field = HEALTH_FIELDS.find((f) => f.name === name);
      const numValue = parseFloat(value);

      if (value !== '') {
        if (field.min !== undefined && numValue < field.min) {
          newValue = field.min;
          setErrors((prev) => ({
            ...prev,
            [name]: `Giá trị tối thiểu là ${field.min}`,
          }));
        } else if (field.max !== undefined && numValue > field.max) {
          newValue = field.max;
          setErrors((prev) => ({
            ...prev,
            [name]: `Giá trị tối đa là ${field.max}`,
          }));
        } else {
          newValue = value;
          if (errors[name]) {
            setErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors[name];
              return newErrors;
            });
          }
        }
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (type !== 'number' && errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const isFormValid = () => {
    if (Object.keys(errors).length > 0) {
      return false;
    }

    return HEALTH_FIELDS.every((field) => {
      const value = formData[field.name];
      if (field.type === 'checkbox') {
        return value === 0 || value === 1;
      }
      if (field.type === 'number' && value !== undefined && value !== '') {
        const numValue = parseFloat(value);
        if (field.min !== undefined && numValue < field.min) return false;
        if (field.max !== undefined && numValue > field.max) return false;
      }
      return value !== undefined && value !== '' && value !== null;
    });
  };

  const handleSubmit = () => {
    const newErrors = {};
    HEALTH_FIELDS.forEach((field) => {
      const value = formData[field.name];
      if (field.type === 'checkbox') {
        if (value !== 0 && value !== 1) {
          newErrors[field.name] = `Vui lòng chọn ${field.label}`;
        }
      } else if (!value || value === '') {
        newErrors[field.name] = `${field.label} là bắt buộc`;
      } else if (field.type === 'number') {
        const numValue = parseFloat(value);
        if (field.min !== undefined && numValue < field.min) {
          newErrors[field.name] = `${field.label} phải >= ${field.min}`;
        }
        if (field.max !== undefined && numValue > field.max) {
          newErrors[field.name] = `${field.label} phải <= ${field.max}`;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    predictDiabetes(formData).then((response) => {
      onSubmit(formData, response);
    });
  };

  const handleReset = () => {
    setFormData({});
    setErrors({});
  };

  const renderField = (field) => {
    const hasError = errors[field.name];

    if (field.type === 'checkbox') {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-blue-900">
            {field.label} <span className="text-red-500">*</span>
          </label>
          <div className={`flex gap-4 p-4 bg-blue-50/50 rounded-lg border-2 transition-colors ${
            hasError ? 'border-red-300 bg-red-50' : 'border-blue-200'
          }`}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={field.name}
                value="1"
                checked={formData[field.name] === 1}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-blue-900">Có</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={field.name}
                value="0"
                checked={formData[field.name] === 0}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-blue-900">Không</span>
            </label>
          </div>
          {hasError && (
            <div className="flex items-center gap-1 text-red-600 text-sm">
              <AlertCircle size={14} />
              <span>{hasError}</span>
            </div>
          )}
        </div>
      );
    }

    if (field.type === 'select') {
      return (
        <div className="space-y-2">
          <label htmlFor={field.name} className="block text-sm font-medium text-blue-900">
            {field.label} <span className="text-red-500">*</span>
          </label>
          <select
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 ${
              hasError 
                ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200'
                : 'border-blue-200 bg-blue-50/50 focus:border-blue-500 focus:ring-blue-200'
            }`}
          >
            {field.options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {hasError && (
            <div className="flex items-center gap-1 text-red-600 text-sm">
              <AlertCircle size={14} />
              <span>{hasError}</span>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <label htmlFor={field.name} className="block text-sm font-medium text-blue-900">
          {field.label} <span className="text-red-500">*</span>
          {field.unit && (
            <span className="text-blue-600 font-normal ml-1">({field.unit})</span>
          )}
        </label>
        <input
          id={field.name}
          name={field.name}
          type="number"
          min={field.min}
          max={field.max}
          step={field.step || 1}
          value={formData[field.name] || ''}
          onChange={handleChange}
          placeholder={field.placeholder}
          className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 ${
            hasError
              ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200'
              : 'border-blue-200 bg-blue-50/50 focus:border-blue-500 focus:ring-blue-200'
          }`}
        />
        {hasError && (
          <div className="flex items-center gap-1 text-red-600 text-sm">
            <AlertCircle size={14} />
            <span>{hasError}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-blue-200">
        <Activity className="text-blue-600" size={28} />
        <h2 className="text-xl font-semibold text-blue-900">
          Thông số sức khỏe
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {HEALTH_FIELDS.map(field => (
          <div key={field.name}>
            {renderField(field)}
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-700">
          <span className="text-red-500">*</span> Tất cả các trường đều bắt buộc phải điền
        </p>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={handleSubmit}
          disabled={isProcessing || !isFormValid()}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed
                   text-white py-4 rounded-lg font-semibold text-lg 
                   transition-colors shadow-lg hover:shadow-xl"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span>
              Đang phân tích...
            </span>
          ) : !isFormValid() ? (
            'Vui lòng điền đầy đủ thông tin'
          ) : (
            'Dự đoán ngay'
          )}
        </button>
        
        <button
          onClick={handleReset}
          disabled={isProcessing}
          className="px-6 py-4 bg-blue-100 hover:bg-blue-200 text-blue-700 
                   rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          Xóa hết
        </button>
      </div>
    </div>
  );
};

export default HealthForm;
