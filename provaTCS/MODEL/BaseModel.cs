﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Configuration;
namespace provaTCS.MODEL
{
    public class BaseModel
    {
        public static string Conn = Program.Configuration["connectionString"];
    }
}
