/**
 * BSD 3-Clause License
 * 
 * Copyright (c) 2017, Carlos Henrique
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 ** Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 * 
 ** Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation
 *  and/or other materials provided with the distribution.
 * 
 ** Neither the name of the copyright holder nor the names of its
 *  contributors may be used to endorse or promote products derived from
 *  this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

 (function($) {

	$(document).on('submit', 'form.ajax-form', function(e) {
		// Preveine os eventos padrões do botão quando este for clicado
		if(!e.defaultPrevented) e.preventDefault();

		var formData = new FormData();
		var _beforeSendData = {};
		$(this).find('select:not(:disabled)').each(function() {
			formData.append($(this).prop('name'), $(this).val());
			_beforeSendData[$(this).prop('name')] = $(this).val();
		});
		var inputText = {};
		$(this).find('input[type="text"]:not(:disabled),input[type="password"]:not(:disabled)').each(function() {
			formData.append($(this).prop('name'), $(this).val());
			_beforeSendData[$(this).prop('name')] = $(this).val();
		});
		$(this).find('input[type="color"]:not(:disabled),input[type="date"]:not(:disabled)').each(function() {
			formData.append($(this).prop('name'), $(this).val());
			_beforeSendData[$(this).prop('name')] = $(this).val();
		});
		$(this).find('input[type="datetime-local"]:not(:disabled),input[type="email"]:not(:disabled)').each(function() {
			formData.append($(this).prop('name'), $(this).val());
			_beforeSendData[$(this).prop('name')] = $(this).val();
		});
		$(this).find('input[type="hidden"]:not(:disabled),input[type="month"]:not(:disabled)').each(function() {
			formData.append($(this).prop('name'), $(this).val());
			_beforeSendData[$(this).prop('name')] = $(this).val();
		});
		$(this).find('input[type="number"]:not(:disabled),input[type="range"]:not(:disabled)').each(function() {
			formData.append($(this).prop('name'), $(this).val());
			_beforeSendData[$(this).prop('name')] = $(this).val();
		});
		$(this).find('input[type="search"]:not(:disabled),input[type="tel"]:not(:disabled)').each(function() {
			formData.append($(this).prop('name'), $(this).val());
			_beforeSendData[$(this).prop('name')] = $(this).val();
		});
		$(this).find('input[type="time"]:not(:disabled),input[type="url"]:not(:disabled)').each(function() {
			formData.append($(this).prop('name'), $(this).val());
			_beforeSendData[$(this).prop('name')] = $(this).val();
		});
		$(this).find('input[type="week"]:not(:disabled)').each(function() {
			formData.append($(this).prop('name'), $(this).val());
			_beforeSendData[$(this).prop('name')] = $(this).val();
		});
		$(this).find('input[type="radio"]:not(:disabled):checked').each(function() {
			formData.append($(this).prop('name'), $(this).val());
			_beforeSendData[$(this).prop('name')] = $(this).val();
		});
		$(this).find('input[type="checkbox"]:not(:disabled):checked').each(function() {
			formData.append($(this).prop('name'), $(this).val());
			_beforeSendData[$(this).prop('name')] = $(this).val();
		});		
		$(this).find('input[type="file"]:not(:disabled)').each(function() {
			formData.append($(this).prop('name'), this.files[0]);
		});

		// Constroi os dados para envio do formulário via ajax.
		var configAjax = $(this).data();

		// Grava os dados de form antes do envio.
		$(this).prop('adata', JSON.stringify(_beforeSendData));
		
		// Adiciona as configurações de ajax para envio do form.
		$.extend(configAjax, {
			url : $(this).prop('action'),
			type : $(this).prop('method'),
			method : $(this).prop('method'),
			context : this,
			data : formData,
			contentType : false,
			processData : false
		});
		
		// Envia a requisição de dados para tratamento das informações.
		$.ajaxRequest(configAjax)
			.done(function(data, textStatus, jqXHR) {
				// Reseta os dados da tela
				$(this).each(function(){
					this.reset();
				});
				// Dispara os dados de sucesso
				$(this).trigger('success', data);
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				$(this).trigger('error', {
					'textStatus' : textStatus,
					'errorThrown' : errorThrown
				});
				
				var _this = this;
				var adata = JSON.parse($(this).prop('adata'));

				$.each(adata, function(name, val) {
					$(_this).find('[name='+ name +']').each(function() {
						$(this).val(val);
					});
				});
			});

		return false;
	});

	// Evento ao clicar em um botão ajax para envio.
	$(document).on('click', '.ajax-href:not(:disabled)', function(e) {
		// Preveine os eventos padrões do botão quando este for clicado
		if(!e.defaultPrevented) e.preventDefault();
		
		// Dados a enviar de configurador
		var dataToSend = $(this).data();
		
		// Transforma o próprio elemento no texto da requisição
		// Ignora a configuração, pois é necessário para disparar o evento.
		$.extend(dataToSend, {
			context : this
		});

		// Realiza a requisição ajax pelo botão
		$.ajaxRequest($(this).data())
			.done(function(data, textStatus, jqXHR) {
				$(this).trigger('success', data);
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				$(this).trigger('error', {
					'textStatus' : textStatus,
					'errorThrown' : errorThrown
				});
			});
	});

	/**
	 * Realiza uma requisição ajax com os dados padrões mais os configurados.
	 *
	 * 
	 */
	$.ajaxRequest = function(configs)
	{
		var requestId = 'AJAX_' + (new Date()).getTime();
		/**
		 * Configurações padrões para execução das requisições ajax
		 */
		var ajaxSetup = {
			// Define a requisição como assincrona
			async : true,
			// Evento a ser executado antes do envio dos dados.
			beforeSend : function(jqXHR, settings)
			{
				var bgCover = $('<div id="' + requestId + '" class="ajax-body-cover"/>');
				bgCover.hide();
				
				
				var bgLoadingAjax = $('<div class="ajax-loading-container"/>');
				bgLoadingAjax.appendTo(bgCover);
				
				for(var i = 0; i < 3; i++)
					$('<div class="ajax-loading-bar ajax-loading-bar-' + (i+1) + '"/>').appendTo(bgLoadingAjax);
				
				bgCover.appendTo('html');
				bgCover.stop(true, true).fadeIn('fast');
			},
			cache : false,
			complete : function(jqXHR, textStatus)
			{
				$('div#' + requestId)
					.stop(true, true)
					.fadeOut('fast', function() {
						$(this).remove();
					});
			},
			
			// tipo de retornados pela biblioteca
			dataType : 'json',
			
			// Impede eventos globais de serem invocados aqui
			global : false,
			
			// Timeout infinito...
			timeout : 0
		};
		
		// Verifica se as configurações foram definidas, caso tenham sido, então aplica elas ao
		// objeto de chamada que será executado.
		if(configs !== 'undefined' && typeof(configs) == 'object')
			$.extend(ajaxSetup, configs);

		// Retorna a requisição de ajax realizada e com ponteiro para executar novamente.
		return $.ajax(ajaxSetup);
	};

}) (window.jQuery);
