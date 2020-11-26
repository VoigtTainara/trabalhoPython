from config import *
from modelo import Cliente

@app.route("/")
def padrao():
    return "backend operante"

@app.route( "/listar_clientes")
def listar_clientes():
    clientes = db.session.query(Cliente).all()
    retorno = []
    for i in clientes:
        retorno.append(i.json())
    resposta = jsonify(retorno)
    resposta.headers.add("Access-Control-Allow-Origin", "*")

    return resposta

app.run(debug = True)