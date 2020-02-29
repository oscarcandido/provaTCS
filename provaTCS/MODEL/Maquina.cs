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

        /// <summary>
        /// RETORNA TODOS AS MÁQUINAS CADASTRADAS
        /// </summary>
        /// <returns></returns>
        public IEnumerable<dynamic> GetAll()
        {
            using IDbConnection DB = new MySqlConnection(Conn);
            var dados = DB.Query<Maquina>(@"SELECT * FROM MAQUINA ORDER BY NOME");
            return dados;
        }
        /// <summary>
        /// RETORNA MÁQUINAS ATIVAS
        /// </summary>
        /// <returns></returns>
        public IEnumerable<dynamic> GetAtivos()
        {
            using IDbConnection DB = new MySqlConnection(Conn);
            var dados = DB.Query<Maquina>(@"SELECT * FROM MAQUINA WHERE ATIVO = b'1'  ORDER BY NOME");
            return dados;
        }
        /// <summary>
        /// INSERE UMA NOVA MÁQUINA
        /// </summary>
        public void Insert()
        {
            using IDbConnection DB = new MySqlConnection(Conn);
            DB.Execute(@"INSERT INTO MAQUINA
                        (Nome,Ativo)
                        VALUES
                        (@Nome,@Ativo)", this);
        }
        /// <summary>
        /// ATUALIZA UMA MÁQUINA EXISTENTE
        /// </summary>
        public void Update()
        {
            using IDbConnection DB = new MySqlConnection(Conn);
            DB.Execute(@"UPDATE MAQUINA
                        SET
                        Nome = @Nome,
                        Ativo = @Ativo
                        WHERE ID = @ID", this);
        }
        /// <summary>
        /// VERIFICA SE JÁ EXISTE MÁQUINA CADASTRADA COM O NOME INFORMADO
        /// </summary>
        /// <param name="Nome"></param>
        /// <returns></returns>
        public bool CheckNomeMaquinaExists(string Nome)
        {
            using IDbConnection DB = new MySqlConnection(Conn);
            return DB.Query<bool>("SELECT EXISTS(SELECT ID FROM MAQUINA WHERE NOME = @Nome)", new { Nome }).SingleOrDefault();
        }
    }
}
