﻿using GISModel.Enums;
using System.ComponentModel.DataAnnotations;

namespace GISModel.DTO.Envolvidos
{
    public class VMProprio
    {

        public string UniqueKeyRel { get; set; }

        public string UniqueKeyEmpregado { get; set; }

        public string UKIncidente { get; set; }



        [Display(Name = "Matrícula")]
        public string NumeroPessoal { get; set; }

        [Display(Name = "Nome do Empregado")]
        public string Nome { get; set; }

        [Display(Name = "Função")]
        public string Funcao { get; set; }





        [Display(Name = "Descrição da Lesão/Doença")]
        [Required(ErrorMessage = "Favor Inserir uma Descrição")]
        public string DescricaoLesao { get; set; }

        [Display(Name = "Natureza da Lesão Principal")]
        public string UKNaturezaLesaoPrincipal { get; set; }

        [Display(Name = "Local da Lesão Principal")]
        public string UKLocalizacaoLesaoPrincipal { get; set; }

        [Display(Name = "Natureza da Lesão Secundária")]
        public string UKNaturezaLesaoSecundaria { get; set; }

        [Display(Name = "Local da Lesão Secundária")]
        public string UKLocalizacaoLesaoSecundaria { get; set; }



        //[Display(Name = "Tipo Acidente")]
        //public ETipoAcidente TipoAcidente { get; set; }

        //[Display(Name = "Atividade")]
        //public EAtividades Atividade { get; set; }

        //[Display(Name = "Tipo Atividade")]
        //public string UKTipoAtividade { get; set; }

        //[Display(Name = "Natureza")]
        //public string UKNatureza { get; set; }

        //[Display(Name = "Consequência Lesão")]
        //public EConsequencia ConsequenciaLesao { get; set; }

        //[Display(Name = "Função GRIDS")]
        //public string UKFuncaoGRIDS { get; set; }

        //[Display(Name = "Espécie Acid. Impressoal")]
        //public string UKEspecieAcidImpessoal { get; set; }

        //[Display(Name = "Tipo Acid. Pessoal")]
        //public string UKTipoAcidPessoal { get; set; }

        //[Display(Name = "Agente Acidente")]
        //public string UKAgenteAcidente { get; set; }

        //[Display(Name = "Fonte Lesão")]
        //public string UKFonteLesao { get; set; }

        //[Display(Name = "Fator Pessoal Inseg")]
        //public string UKFatorPessoalInseg { get; set; }

        //[Display(Name = "Ato Inseguro")]
        //public string UKAtoInseguro { get; set; }

        //[Display(Name = "Cond. Ambiental Inseg")]
        //public string UKCondAmbientalInseg { get; set; }

        //[Display(Name = "Prej. Material")]
        //public string UKPrejMaterial { get; set; }

        //public string Custo { get; set; }

        //[Display(Name = "Dias Perdidos")]
        //public string DiasPerdidos { get; set; }

        //[Display(Name = "Dias Debitados")]
        //public string DiasDebitados { get; set; }

        //[Display(Name = "Data do Óbito")]
        //public string DataObito { get; set; }


    }
}
