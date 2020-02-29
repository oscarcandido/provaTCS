using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace provaTCS.MODEL
{
    public class Maquina:BaseModel
    {
        public int ID { get; set; }
        public string Nome { get; set; }
        public bool Ativo { get; set; }

        public IEnumerable<dynamic> GetAll()
        {
            using IDbConnection DB = new MySqlConnection(Conn);
            var dados = DB.Query<Maquina>(@"SELECT * FROM MAQUINA");
            return dados;
        }

        public IEnumerable<dynamic> GetAtivos()
        {
            using IDbConnection DB = new MySqlConnection(Conn);
            var dados = DB.Query<Maquina>(@"SELECT * FROM MAQUINA WHERE ATIVO = b'1'");
            return dados;
        }

        public void Insert()
        {
            using IDbConnection DB = new MySqlConnection(Conn);
            DB.Execute(@"INSERT INTO MAQUINA
                        (Nome,Ativo)
                        VALUES
                        (@Nome,@Ativo)", this);
        }

        public void Update()
        {
            using IDbConnection DB = new MySqlConnection(Conn);
            DB.Execute(@"UPDATE MAQUINA
                        SET
                        Nome = @Nome,
                        Ativo = @Ativo
                        WHERE ID = @ID", this);
        }

        public bool CheckNomeMaquinaExists(string Nome)
        {
            using IDbConnection DB = new MySqlConnection(Conn);
            return DB.Query<bool>("SELECT EXISTS(SELECT ID FROM MAQUINA WHERE NOME = @Nome)", new { Nome }).SingleOrDefault();
        }
    }
}
