$(document).ready(function(){
   $("#conteudoInicial").removeClass("invisible");

     $("#link_listar").click(function(){
         $.ajax({ 
            url: 'http://localhost:5000/listar_clientes', 
            method: 'GET', 
            dataType: 'json', 
            success: listar_clientes, 
            error: function() { 
               alert("erro ao ler dados, verifique o backend"); 
            } 
         });
         function listar_clientes(clientes){
            linhas=""
            for (var i in clientes){
               lin = "<tr>"+
                  "<td>" + clientes[i].cpf + "</td>" +
                  "<td>" + clientes[i].nome + "</td>" +
                  "</tr>";

               linhas = linhas+lin;
            }

            $("#corpoTabelaClientes").html(linhas);
            $("#conteudoInicial").addClass("invisible");
            $("#tabelaClientes").addClass("invisible");

            $("#tabelaClientes").removeClass("invisible");
         }
    });
});