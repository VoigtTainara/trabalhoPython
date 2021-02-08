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
               lin = '<tr>'+
                  '<td>' + clientes[i].cpf + '</td>' +
                  '<td>' + clientes[i].nome + '</td>' +
                  '<td>' + clientes[i].id + '</td>'+
                  '<td><a href=# id="excluir_' + clientes[i].id +'" '+
                  'class="excluir_cliente"><img src="../images/9308.png" height="20"'+ 
                  'alt="Excluir cliente" title="Excluir cliente"></a>' + 
                  '</td>' + 
                  '</tr>'; 

               linhas = linhas+lin;
            }

            $("#corpoTabelaClientes").html(linhas);
            $("#conteudoInicial").addClass("invisible");
            $("#tabelaClientes").addClass("invisible");

            $("#tabelaClientes").removeClass("invisible");
         }
    });
   $("#btn_incluir_cliente").click(function(){
      client_name = $("#client_name").val();
      client_cpf = $("#client_cpf").val();

      dados = JSON.stringify({nome : client_name, cpf : client_cpf});
      $.ajax({
         url: 'http://localhost:5000/incluir_cliente',
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
            $("#client_name").val();
            $("#client_cpf").val();
         }else{
            alert('erro no backend: ' + resposta.detalhes);
         }
      }
      function erroIncluirCliente(resposta){
         alert('erro');
      }
   });
   $(document).on("click", ".excluir_cliente", function() { 
      var componente_clicado = $(this).attr('id'); 
      var nome_icone = "excluir_"; 
      var id_cliente = componente_clicado.substring(nome_icone.length); 
      $.ajax({ 
         url: 'http://localhost:5000/excluir_cliente/'+id_cliente, 
         type: 'DELETE',
         dataType: 'json', 
         success: clienteExcluido,
         error: erroAoExcluir 
      });
      function clienteExcluido (retorno) { 
           if (retorno.resultado == "ok") { 
            $("#linha_" + id_cliente).fadeOut(1000, function(){ 
               alert("Cliente removido com sucesso!"); 
            }); 
         } else { 
            alert(retorno.resultado + ":" + retorno.detalhes); 
         } 
      } 
      function erroAoExcluir (retorno) { 
            alert("erro ao excluir dados, verifique o backend: "); 
      }
   });
});