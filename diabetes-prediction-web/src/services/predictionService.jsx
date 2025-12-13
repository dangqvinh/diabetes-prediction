import { API_ENDPOINTS } from '../utils/constants';

export const predictDiabetes = async (healthData) => {
  const request_data = {
    'HighBP' : healthData.HighBP, 
    'HighChol' : healthData.HighChol, 
    'BMI' : healthData.BMI, 
    'Stroke' : healthData.Stroke, 
    'PhysActivity' : healthData.PhysActivity
  }
  console.log("Request Data: ", request_data);

  const response = await fetch(API_ENDPOINTS.PREDICT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request_data)
  });

  const result = await response.json();
  console.log("Prediction Result: ", result);
  return result;

};

