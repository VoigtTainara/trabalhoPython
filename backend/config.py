
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify
from flask_cors import CORS
import os 
app = Flask(__name__)
CORS(app)
caminho = os.path.dirname(os.path.abspath(__file__))
arquivodb = os.path.join(caminho,"clientes.db")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + arquivodb
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db = SQLAlchemy(app)




