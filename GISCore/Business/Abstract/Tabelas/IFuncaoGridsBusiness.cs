﻿using GISModel.Entidades.OBJ.Tabelas;
using System.Collections.Generic;

namespace GISCore.Business.Abstract.Tabelas
{
    public interface IFuncaoGridsBusiness : IBaseBusiness<FuncaoGrids>
    {

        List<FuncaoGrids> ListarTodos();

    }
}
