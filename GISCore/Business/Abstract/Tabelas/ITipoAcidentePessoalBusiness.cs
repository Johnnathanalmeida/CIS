﻿using GISModel.Entidades.OBJ.Tabelas;
using System.Collections.Generic;

namespace GISCore.Business.Abstract.Tabelas
{
    public interface ITipoAcidentePessoalBusiness : IBaseBusiness<TipoAcidentePessoal>
    {

        List<TipoAcidentePessoal> ListarTodos();

    }
}
