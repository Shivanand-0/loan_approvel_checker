from flask import Flask,request, jsonify
from flask_cors import CORS
from flask_cors import cross_origin
from joblib import load
import numpy as np 

app=Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:5173"}})
model=load('./loan_pridiction_model_joblib')
scaler = load('./scaler1.joblib')

@app.route('/predict', methods=['POST'])
@cross_origin(origin='http://localhost:5173')
def predict():
    data= request.get_json()
    income=data['ApplicantIncome']
    scaled_income=scaler.transform([[income]])[0][0]
    features=[
        data['Credit_History'],
        data['Property_Area'],
        data['Married'],
        data['Education'],
        data['Dependents'],
        data['Self_Employed'],
        scaled_income 
    ]
    features=np.array(features).reshape(1,-1)
    prediction=model.predict(features)
    return jsonify({'prediction':prediction.tolist()})


if __name__=='__main__':
    app.run(port=5000)