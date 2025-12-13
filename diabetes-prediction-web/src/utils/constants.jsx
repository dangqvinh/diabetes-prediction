export const HEALTH_FIELDS = [
  {
    name: 'HighBP',
    label: 'Huyết áp cao',
    type: 'checkbox',
    placeholder: '0 = Không, 1 = Có'
  },
  {
    name: 'HighChol',
    label: 'Cholesterol cao',
    type: 'checkbox',
    placeholder: '0 = Không, 1 = Có'
  },
  {
    name: 'BMI',
    label: 'Chỉ số BMI',
    type: 'number',
    min: 0,
    max: 70,
    step: 0.1,
    placeholder: 'Ví dụ: 25.5',
    unit: 'kg/m²'
  },
  {
    name: 'Stroke',
    label: 'Tiền sử đột quỵ',
    type: 'checkbox',
    placeholder: '0 = Không, 1 = Có'
  },
  {
    name: 'PhysActivity',
    label: 'Hoạt động thể chất',
    type: 'checkbox',
    placeholder: '0 = Không, 1 = Có'
  }
];

export const API_ENDPOINTS = {
  PREDICT: 'http://localhost:8000/predict'
};