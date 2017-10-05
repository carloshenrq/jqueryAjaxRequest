# jqueryAjaxRequest

É um pequeno plugin para jQuery que permite criar forms e algumas requisições com ajax de forma simples e rápida. Não faz validações de campos além do que o próprio HTML já executa.

## Requisitos

Este plugin foi testado desde a versão 2.1.4 do jQuery até a versão 3.2.1 do mesmo. Para executar você precisa ter o jQuery incluso em seu HTML.

Você deve incluir em seu HTML os arquivos do jQuery e desde plugin. Uma sugestão de como fazer a inclusão:

    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="jquery.ajax.js"></script>
    <link href="jquery.ajax.css" rel="stylesheet" type="text/css" />

## Como usar

Para usar o plugin, você deve declarar o class no form ou no botão que deseja usar. Para usar com formulário, você pode fazer da seguinte forma:

    <!DOCTYPE html>
    <html>
        <head>
            <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
            <script src="jquery.ajax.js"></script>
            <link href="jquery.ajax.css" rel="stylesheet" type="text/css" />
        </head>
        <body>
            <form class="ajax-form" action="teste.php" method="post">
                <input type="text" name="nome" value=""/>
                <input type="submit"/>
            </form>
        </body>
    </html>

Quando o submit do form for executado, os dados serão enviados ao `action`.

## Definindo e tratando os retornos

Segue abaixo um exemplo de como saber o retorno da requisição. Sempre será chamado o evento `success` caso a requisição seja feita com sucesso. Em caso contrario, será chamado o evento `error`.

    <!DOCTYPE html>
    <html>
        <head>
            <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
            <script src="jquery.ajax.js"></script>
            <link href="jquery.ajax.css" rel="stylesheet" type="text/css" />

            <script>
                (function($) {

                    $('form.ajax-form').on('success', function(e, data) {
                        // @TODO: TRATAR OS DADOS DE RETORNO
                        // O Conteúdo por padrão deve ser JSON, mas se você preferir
                        // Você pode alterar o retorno declarando atributos na tag do form.
                        // * Para alterar o formato de retorno, você deve adicionar o atributo: data-data-type="json"
                        // * Os tipos aceitos são identificos ao $.ajax()
                        // ... LINK DE REFERENCIA: http://api.jquery.com/jquery.ajax/
                        //                         * Olhar no atributo 'dataType'
                    }).on('error', function(e, error) {

                        /* Na varíavel error existem as propriedades: */
                        //  .textStatus
                        //  .errorThrown
                        // Elas são as mesmas declaradas por uma requisição ajax com erro
                        // vindas do proprio $.ajax().
                        // ... LINK DE REFERENCIA: http://api.jquery.com/jquery.ajax/
                        //                         * Olhar no atributo 'error'

                    });

                }) (window.jQuery);
            </script>


        </head>
        <body>
            <form class="ajax-form" action="teste.php" method="post">
                <input type="text" name="nome" value=""/>
                <input type="submit"/>
            </form>
        </body>
    </html>
