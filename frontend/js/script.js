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
   $("#btn_incluir_cliente").click(function(){
      client_name = $("client_name").val();
      client_cpf = $("client_cpf").val();

      dados = JSON.stringify({client_name : client_name},{client_cpf : client_cpf});
      $.ajax({
         url: 'http://localhost:5000/btn_incluir_cliente',
         type: 'POST',
         contentType: 'application/json',
         dataType: 'json',
         data: dados,
         success: incluirCliente,
         error: erroIncluirCliente

      });
      function incluirCliente(resposta){
         if (resposta.resultado == "ok"){
            alert('Cliente incluído com sucesso!');
            $("client_name").val();
            $("client_cpf").val();
         }else{
            alert('erro na comunicação');
         }
      }
      function erroIncluirCliente(resposta){
         alert('erro');
      }
   });

});