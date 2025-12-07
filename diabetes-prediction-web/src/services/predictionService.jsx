import { API_ENDPOINTS } from '../utils/constants';

export const predictDiabetes = async (healthData) => {
  const request_data = {
    'HighBP' : healthData.HighBP, 
    'HighChol' : healthData.HighChol, 
    'BMI' : healthData.BMI, 
    'Stroke' : healthData.Stroke, 
    'PhysActivity' : healthData.PhysActivity, 
    'HeartDiseaseorAttack' : healthData.HeartDiseaseorAttack, 
    'GenHlth' : healthData.GenHlth, 
    'PhysHlth' : healthData.PhysHlth, 
    'Income' : healthData.Income, 
    'Education' : healthData.Education, 
    'Age' : healthData.Age, 
    'DiffWalk' : healthData.DiffWalk, 
    'CholCheck' : healthData.CholCheck, 
    'HvyAlcoholConsump' : healthData.HvyAlcoholConsump, 
    'MentHlth' : healthData.MentHlth
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