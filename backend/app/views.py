from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

class PredictView(APIView):
    def post(self, request):
        try:
            # Load the dataset
            data = pd.read_csv('C:/Users/LAKSHU/Desktop/Breast_Cancer.csv')
            
            # Preprocess the data
            data.dropna(inplace=True)  # Drop rows with missing values
            
            # Train a Random Forest Classifier
            model = RandomForestClassifier(n_estimators=100, random_state=42)
            
            # Split data into input features (X) and target variable (y)
            X = data[['input1', 'input2', 'input3', 'input4', 'input5']].astype(int)
            y = data['output'].astype(int)
            
            # Train the model
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
            model.fit(X_train, y_train)
            
            # Evaluate accuracy
            train_accuracy = accuracy_score(y_train, model.predict(X_train))
            test_accuracy = accuracy_score(y_test, model.predict(X_test))
            
            # Make predictions
            input_data = request.data
            input_features = [int(input_data.get('input1')), int(input_data.get('input2')), int(input_data.get('input3')), int(input_data.get('input4')), int(input_data.get('input5'))]
            prediction = model.predict([input_features])[0]
            
            # Return response
            response_data = {
                'prediction': prediction,
                'train_accuracy': train_accuracy,
                'test_accuracy': test_accuracy
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
