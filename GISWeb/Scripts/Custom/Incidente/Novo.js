﻿
jQuery(function ($) {

    $.validator.unobtrusive.parse(document);

    DatePTBR();
    
    var date = new Date();
    date.setDate(date.getDate());

    $('.date-picker').datepicker({
        autoclose: true,
        todayHighlight: true,
        language: 'pt-BR',
        maxDate: date
    }).next().on(ace.click_event, function () {
        $(this).prev().focus();
    });

    

    $('#timepicker1').timepicker({
        minuteStep: 1,
        showSeconds: false,
        showMeridian: false,
        disableFocus: true,
        icons: {
            up: 'fa fa-chevron-up',
            down: 'fa fa-chevron-down'
        }
    }).on('focus', function () {
        $('#timepicker1').timepicker('showWidget');
    }).next().on(ace.click_event, function () {
        $(this).prev().focus();
    });

    Chosen();


    $("#UKOrgao").change(function () {
        
        if ($(this).val() == "") {
            $("#UKDiretoria").val("");
        }
        else {

            $(".LoadingLayout").show();
            $('.page-content-area').ace_ajax('startLoading');

            $.ajax({
                method: "POST",
                url: "/Departamento/BuscarDiretoriaPorOrgao",
                data: { ukDepartamento: $(this).val() },
                error: function (erro) {
                    $(".LoadingLayout").hide();
                    $('.page-content-area').ace_ajax('stopLoading', true);
                    ExibirMensagemGritter('Oops! Erro inesperado', erro.responseText, 'gritter-error')
                },
                success: function (content) {
                    $('.page-content-area').ace_ajax('stopLoading', true);
                    $(".LoadingLayout").hide();

                    var resultado = content.resultado;

                    if (resultado.Erro != null && resultado.Erro != undefined && resultado.Erro != "") {
                        ExibirMensagemDeErro(resultado.Erro);
                    }
                    else if (resultado.Alerta != null && resultado.Alerta != undefined && resultado.Alerta != "") {
                        ExibirMensagemDeAlerta(resultado.Alerta);
                    }
                    else {
                        if (resultado.Conteudo.indexOf("$") != -1) {
                            $("#UKDiretoria").val(resultado.Conteudo.substring(resultado.Conteudo.indexOf("$") + 1));
                        }
                        else {
                            $("#UKDiretoria").val(resultado.Conteudo);
                        }
                    }

                }
            });

        }

    });

    

});

function InitDropZoneSingle() {
    try {
        Dropzone.autoDiscover = false;

        var dictDefaultMessage = "";
        dictDefaultMessage += '<span class="bigger-150 bolder">';
        dictDefaultMessage += '  <i class="ace-icon fa fa-caret-right red"></i> Arraste a logo</span> para upload \
				                <span class="smaller-80 grey">(ou clique)</span> <br /> \
				                <i class="upload-icon ace-icon fa fa-cloud-upload blue fa-3x"></i>';

        var previewTemplate = "";
        previewTemplate += "<div class=\"dz-preview dz-file-preview\">\n ";
        previewTemplate += "    <div class=\"dz-details\">\n ";
        previewTemplate += "        <div class=\"dz-filename\">";
        previewTemplate += "            <span data-dz-name></span>";
        previewTemplate += "        </div>\n    ";
        previewTemplate += "        <div class=\"dz-size\" data-dz-size></div>\n  ";
        previewTemplate += "        <img data-dz-thumbnail />\n  ";
        previewTemplate += "    </div>\n  ";
        previewTemplate += "    <div class=\"progress progress-small progress-striped active\">";
        previewTemplate += "        <div class=\"progress-bar progress-bar-success\" data-dz-uploadprogress></div>";
        previewTemplate += "    </div>\n  ";
        previewTemplate += "    <div class=\"dz-success-mark\">";
        previewTemplate += "        <span></span>";
        previewTemplate += "    </div>\n  ";
        previewTemplate += "    <div class=\"dz-error-mark\">";
        previewTemplate += "        <span></span>";
        previewTemplate += "    </div>\n  ";
        previewTemplate += "    <div class=\"dz-error-message\">";
        previewTemplate += "        <span data-dz-errormessage></span>";
        previewTemplate += "    </div>\n";
        previewTemplate += "</div>";

        //#######################################################################################################
        //Recupera do form montado os respectivos valores retornados do servidor e armazenados na web como 'data'
        //var extensoes = $('#formUpload').data('extensoes');
        //if (extensoes == '') extensoes = null;

        //var uploadMultiplo = $('#formUpload').data('uploadmultiplo');
        //var maxArquivos = 1;
        //if (uploadMultiplo && uploadMultiplo.toUpperCase() == 'TRUE') maxArquivos = 20;
        //#######################################################################################################

        var myDropzone = new Dropzone("#formUpload", {
            paramName: "file",
            uploadMultiple: true, //se habilitar upload múltiplo, pode bugar o SPF
            parallelUploads: 10, //se for mais que 1, pode bugar o SPF
            maxFilesize: 20, // MB
            dictFileTooBig: 'Tamanho máximo permitido ultrapassado.',
            //maxFiles: maxArquivos,
            dictMaxFilesExceeded: 'Limite máximo de número de arquivos permitidos ultrapassado.',
            acceptedFiles: ".png,.jpg,.jpeg,.gif,.PDF",
            dictInvalidFileType: 'Extensão de arquivo inválida para este tipo de anexo.',
            addRemoveLinks: true,
            dictCancelUpload: 'Cancelar',
            dictCancelUploadConfirmation: 'Tem certeza que deseja cancelar?',
            dictRemoveFile: 'Remover',
            dictDefaultMessage: dictDefaultMessage,
            dictResponseError: 'Erro ao fazer o upload do arquivo.',
            dictFallbackMessage: 'Este browser não suporta a funcionalidade de arrastar e soltar arquivos para fazer upload.',
            previewTemplate: previewTemplate,
        });

        myDropzone.on('sending', function (file) {
            if (!$('#formUpload').valid()) {
                myDropzone.removeFile(file);
            } else {
                $('#modalArquivoX').hide();
                $('#modalArquivoFechar').addClass('disabled');
                $('#modalArquivoFechar').attr('disabled', 'disabled');
            }
        });

        myDropzone.on('canceled', function () {
            if (myDropzone.getUploadingFiles().length === 0 && myDropzone.getQueuedFiles().length === 0) {
                $('#modalArquivoX').show();
                $('#modalArquivoFechar').removeClass('disabled');
                $('#modalArquivoFechar').removeAttr('disabled', 'disabled');
            }
        });

        myDropzone.on('success', function (file, content) {
            if (content.sucesso) {
                ExibirMensagemGritter('Sucesso!', content.sucesso, 'gritter-success');

                $("#txtAnexo").val(content.arquivo);

                if (myDropzone.getUploadingFiles().length === 0 && myDropzone.getQueuedFiles().length === 0 && myDropzone.getRejectedFiles().length === 0) {
                    $('#modalArquivo').modal('hide');
                }
            } else if (content.alerta) {
                ExibirMensagemGritter('Alerta!', content.alerta, 'gritter-warning');

                if (myDropzone.getUploadingFiles().length === 0 && myDropzone.getQueuedFiles().length === 0 && myDropzone.getRejectedFiles().length === 0) {
                    $('#modalArquivo').modal('hide');
                }
            }
            else {
                $('#modalArquivoX').show();
                $('#modalArquivoFechar').removeClass('disabled');
                $('#modalArquivoFechar').removeAttr('disabled', 'disabled');

                if (content.erro)
                    ExibirMensagemGritter('Oops! Erro inesperado', content.erro, 'gritter-error');
                else
                    ExibirMensagemGritter('Oops! Erro inesperado', 'Ocorreu algum problema não identificado ao fazer o upload do arquivo para o servidor.', 'gritter-error');
            }
        });

        myDropzone.on('error', function () {
            $('#modalArquivoX').show();
            $('#modalArquivoFechar').removeClass('disabled');
            $('#modalArquivoFechar').removeAttr('disabled', 'disabled');
        });

        myDropzone.on('removedfile', function (file) {
            if (myDropzone.getUploadingFiles().length === 0 && myDropzone.getQueuedFiles().length === 0) {
                $('#modalArquivoX').show();
                $('#modalArquivoFechar').removeClass('disabled');
                $('#modalArquivoFechar').removeAttr('disabled', 'disabled');
            }
        });

        myDropzone.on('maxfilesexceeded', function () {
            ExibirMensagemGritter('Alerta', 'Só é permitida a inclusão de 1 arquivo para cada tipo de anexo.', 'gritter-warning');
        });

        $(document).one('ajaxloadstart.page', function (e) {
            try {
                myDropzone.destroy();
            } catch (e) { }
        });

    } catch (e) {
        ExibirMensagemGritter('Alerta', 'Este browser não é compatível com o componente Dropzone.js. Sugerimos a utilização do Google Chrome ou Internet Explorer 10 (ou versão superior).', 'gritter-warning');
    }
}


function OnBeginCadastrarAcidente(jqXHR, settings) {
    
    if ($("#AcidenteFatal").prop("checked") == true) {
        $("#AcidenteFatal").val(true);
    }
    else {
        $("#AcidenteFatal").val(false);
    }

    if ($("#AcidenteGraveIP102").prop("checked") == true) {
        $("#AcidenteGraveIP102").val(true);
    }
    else {
        $("#AcidenteGraveIP102").val(false);
    }


    var form = $("#formCadastroAcidente");
    settings.data = form.serialize();


    $(".LoadingLayout").show();
    $('.page-content-area').ace_ajax('startLoading');

}

function OnSuccessCadastrarAcidente(data) {
    $(".LoadingLayout").hide();
    $('.page-content-area').ace_ajax('stopLoading', true);

    TratarResultadoJSON(data.resultado);
}

function OnFailureCadastrarAcidente() {
    $('.page-content-area').ace_ajax('stopLoading', true);
}