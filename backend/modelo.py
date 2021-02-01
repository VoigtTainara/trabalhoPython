from config import *

class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    cpf = db.Column(db.String(254))
    def __str__(self):
        return self.nome + ", " + self.cpf
    def json(self):
        return{
            "id": self.id,
            "nome": self.nome,
            "cpf": self.cpf
        }

if __name__ == "__main__":

    if os.path.exists(arquivodb):
        os.remove(arquivodb)

    db.create_all()
    novoCliente = Cliente(nome = "Tai", cpf="123456789-01")

    db.session.add(novoCliente)
    db.session.commit()
    todas = db.session.query(Cliente).all()

    for i in todas:
        print(i)
        print(i.json())
