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

@app.route("/incluir_cliente", methods=['post'])
def incluir_cliente():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova pessoa
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    try: # tentar executar a operação
        nova = Cliente(**dados) # criar a nova pessoa
        db.session.add(nova) # adicionar no BD
        db.session.commit() # efetivar a operação de gravação
    except Exception as ex: # em caso de erro...
    # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(ex)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

@app.route("/excluir_cliente/<int:cliente_id>", methods=['delete']) 
def excluir_cliente(cliente_id): 
    # preparar uma resposta otimista 
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"}) 
    try: 
        # excluir a pessoa do ID informado 
        Cliente.query.filter(Cliente.id == cliente_id).delete() 
        # confirmar a exclusão 
        db.session.commit() 
    except Exception as e: 
        # informar mensagem de erro 
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
     # adicionar cabeçalho de liberação de origem 
    resposta.headers.add("Access-Control-Allow-Origin", "*") 
    return resposta # responder!

app.run(debug=True)
