import { HEALTH_FIELDS } from './constants';

export const validateFormData = (formData) => {
  const errors = {};

  HEALTH_FIELDS.forEach(field => {
    const value = formData[field.name];
    
    // Kiểm tra required
    if (field.required && (!value || value === '')) {
      errors[field.name] = `${field.label} là bắt buộc`;
      return;
    }

    // Kiểm tra nếu có giá trị
    if (value) {
      const numValue = parseFloat(value);
      
      // Kiểm tra min
      if (field.min !== undefined && numValue < field.min) {
        errors[field.name] = `${field.label} phải >= ${field.min}`;
      }
      
      // Kiểm tra max
      if (field.max !== undefined && numValue > field.max) {
        errors[field.name] = `${field.label} phải <= ${field.max}`;
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};