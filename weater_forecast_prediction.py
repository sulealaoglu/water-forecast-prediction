import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

import sklearn
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.linear_model import LinearRegression
from sklearn import preprocessing
from sklearn.metrics import precision_score, recall_score, f1_score, accuracy_score, confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

# Importing Libraries
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from datetime import datetime
import joblib
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LogisticRegression, SGDClassifier
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.ensemble import RandomForestClassifier, ExtraTreesClassifier, GradientBoostingClassifier, BaggingClassifier
import warnings
from flask import Flask
import joblib
from sklearn.preprocessing import StandardScaler, LabelEncoder
from flask import *
from json import *
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
@app.route("/", methods=["POST"], strict_slashes=False)
def start_api():
    df = pd.read_csv('weatherHistory.csv')

   
   

    df = df[(df["Summary"] == "Overcast") | (df["Summary"] == "Clear") | (df["Summary"] == "Foggy")]
    df.dropna(inplace=True)
    df.drop_duplicates(inplace=True)
    df.drop(columns=["Loud Cover"], axis=1, inplace=True)
    label_encoder = LabelEncoder()
    # Encode the 'Precip Type' column
    df.drop(columns=["Daily Summary"], axis=1, inplace=True)
    df['Precip Type'] = label_encoder.fit_transform(df['Precip Type'])

    from sklearn.preprocessing import MinMaxScaler, StandardScaler
    # Min-Max Normalizasyonu
    scaler_minmax = MinMaxScaler()
    numeric_columns = ["Temperature (C)", "Apparent Temperature (C)", "Humidity", "Wind Speed (km/h)", "Wind Bearing (degrees)", "Visibility (km)", "Pressure (millibars)"]
    df[numeric_columns] = scaler_minmax.fit_transform(df[numeric_columns])
    float_cols = df.select_dtypes(include='float')
    df[float_cols.columns] = float_cols.round(2)
    df['Formatted Date'] = pd.to_datetime(df['Formatted Date'], errors='coerce')
    df["Time"] = [d.time() for d in df['Formatted Date']]
    df["Time"] = df["Time"].astype(str)
    df["Time"] = df["Time"].str.split(':').str[0].astype(int)
    df["Date"] = [d.date() for d in df['Formatted Date']]
    df["Date"]= df["Date"].astype(str)
    df["Year"] = df["Date"].str.split('-').str[0].astype(int)
    df["Month"] = df["Date"].str.split('-').str[1].astype(int)
    df["Day"] = df["Date"].str.split('-').str[2].astype(int)
    # Initialize LabelEncoder

    df = df.drop(columns=['Formatted Date','Date'], axis=1)
    df.rename(columns={'Temperature (C)': 'Temperature'}, inplace=True)
    df.rename(columns={'Apparent Temperature (C)': 'Apparent Temperature'}, inplace=True)
    df.rename(columns={'Wind Speed (km/h)': 'Wind Speed'}, inplace=True)
    df.rename(columns={'Wind Bearing (degrees)': 'Wind Bearing'}, inplace=True)
    df.rename(columns={'Visibility (km)': 'Visibility'}, inplace=True)
    df.rename(columns={'Pressure (millibars)': 'Pressure'}, inplace=True)
    body = request.get_json()
   #Convert data of the body to a proper form

    d = {
    'Formatted Date': [body['FormattedDate']],
    'Precip Type': [body['PrecipType']],
    'Temperature': [body['Temperature']],
    'Apparent Temperature': [body['ApparentTemperature']],
    'Humidity': [body['Humidity']],
    'Wind Speed': [body['WindSpeed']],
    'Wind Bearing': [body['WindBearing']],
    'Visibility': [body['Visibility']],
    'Pressure': [body['Pressure']],
}

    #insert data to data frame
    inputData = pd.DataFrame(data=d) 

    #Identify Test and Train data
    test=df[-1:]
    df=df[:8523]
    test.drop(['Summary'],inplace=True, axis=1)
    # #Removes mean and scales each value to unit variance 
    # sc = StandardScaler()
    # X_train = sc.fit_transform(X_train)
    # X_test = sc.transform(X_test)
    # test=sc.transform(test)


    #Let's have all the features in X & target in Y
    X = df.drop(columns='Summary', axis=1)
    y = df['Summary']

    #Train data and splitting %30 test, and %70 training
    X_train, X_test, y_train, y_test = train_test_split(X,y, test_size = 0.3, random_state = 4)


    model_gb = GradientBoostingClassifier()
    model_gb.fit(X_train, y_train)

    #Prediction of sales with model predict
    data_prediction = model_gb.predict(test)                                          
    return jsonify(prediction=str(data_prediction[0]))

if __name__=="__main__":
    app.run(port=4000)
