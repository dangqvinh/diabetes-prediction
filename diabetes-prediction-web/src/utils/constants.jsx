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
  },
  {
    name: 'HeartDiseaseorAttack',
    label: 'Bệnh tim hoặc từng đau tim',
    type: 'checkbox',
    placeholder: '0 = Không, 1 = Có'
  },
  {
    name: 'GenHlth',
    label: 'Sức khỏe tổng quát',
    type: 'select',
    options: [
      { value: '', label: 'Chọn mức độ' },
      { value: '1', label: '1 - Tốt nhất' },
      { value: '2', label: '2 - Rất tốt' },
      { value: '3', label: '3 - Trung bình' },
      { value: '4', label: '4 - Kém' },
      { value: '5', label: '5 - Tệ nhất' }
    ]
  },
  {
    name: 'PhysHlth',
    label: 'Số ngày sức khỏe thể chất kém',
    type: 'number',
    min: 0,
    max: 30,
    placeholder: 'Ví dụ: 5',
    unit: 'ngày'
  },
  {
    name: 'Income',
    label: 'Mức thu nhập',
    type: 'select',
    options: [
      { value: '', label: 'Chọn mức thu nhập' },
      { value: '1', label: '1 - Dưới $10,000' },
      { value: '2', label: '2 - $10,000 - $15,000' },
      { value: '3', label: '3 - $15,000 - $20,000' },
      { value: '4', label: '4 - $20,000 - $25,000' },
      { value: '5', label: '5 - $25,000 - $35,000' },
      { value: '6', label: '6 - $35,000 - $50,000' },
      { value: '7', label: '7 - $50,000 - $75,000' },
      { value: '8', label: '8 - Trên $75,000' }
    ]
  },
  {
    name: 'Education',
    label: 'Trình độ học vấn',
    type: 'select',
    options: [
      { value: '', label: 'Chọn trình độ' },
      { value: '1', label: '1 - Không học' },
      { value: '2', label: '2 - Tiểu học' },
      { value: '3', label: '3 - THCS' },
      { value: '4', label: '4 - THPT' },
      { value: '5', label: '5 - Cao đẳng' },
      { value: '6', label: '6 - Đại học trở lên' }
    ]
  },
  {
    name: 'Age',
    label: 'Nhóm tuổi',
    type: 'select',
    options: [
      { value: '', label: 'Chọn nhóm tuổi' },
      { value: '1', label: '18-24 tuổi' },
      { value: '2', label: '25-29 tuổi' },
      { value: '3', label: '30-34 tuổi' },
      { value: '4', label: '35-39 tuổi' },
      { value: '5', label: '40-44 tuổi' },
      { value: '6', label: '45-49 tuổi' },
      { value: '7', label: '50-54 tuổi' },
      { value: '8', label: '55-59 tuổi' },
      { value: '9', label: '60-64 tuổi' },
      { value: '10', label: '65-69 tuổi' },
      { value: '11', label: '70-74 tuổi' },
      { value: '12', label: '75-79 tuổi' },
      { value: '13', label: '80+ tuổi' }
    ]
  },
  {
    name: 'DiffWalk',
    label: 'Khó khăn khi đi lại',
    type: 'checkbox',
    placeholder: '0 = Không, 1 = Có'
  },
  {
    name: 'CholCheck',
    label: 'Đã kiểm tra cholesterol trong 5 năm',
    type: 'checkbox',
    placeholder: '0 = Không, 1 = Có'
  },
  {
    name: 'HvyAlcoholConsump',
    label: 'Uống rượu nhiều',
    type: 'checkbox',
    placeholder: '0 = Không, 1 = Có'
  },
  {
    name: 'MentHlth',
    label: 'Số ngày sức khỏe tinh thần kém',
    type: 'number',
    min: 0,
    max: 30,
    placeholder: 'Ví dụ: 3',
    unit: 'ngày'
  }
];

export const API_ENDPOINTS = {
  PREDICT: 'http://localhost:8000/predict'
};