using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace provaTCS.MODEL
{
    public class Status:BaseModel
    {
        public int ID { get; set; }
        public string  Codigo { get; set; }
        public string Nome { get; set; }
        public string Cor { get; set; }
        public bool Ativo { get; set; }

        /// <summary>
        /// RETORNA TODAS OS status CADASTRADOS
        /// </summary>
        /// <returns></returns>
        public IEnumerable<dynamic> GetAll()
        {
            using IDbConnection DB = new MySqlConnection(Conn);
            var dados = DB.Query<Status>(@"SELECT * FROM status ORDER BY NOME");
            return dados;
        }
        /// <summary>
        /// RETORNA OS status ATIVOS
        /// </summary>
        /// <returns></returns>
        public IEnumerable<dynamic> GetAtivos()
        {
            using IDbConnection DB = new MySqlConnection(Conn);
            var dados = DB.Query<Status>(@"SELECT * FROM status WHERE ATIVO = b'1' ORDER BY NOME");
            return dados;
        }
        /// <summary>
        /// INSERE UM NOVO status
        /// </summary>
        public void Insert()
        {
            using IDbConnection DB = new MySqlConnection(Conn);
            DB.Execute(@"INSERT INTO status
                        (CODIGO,NOME,COR,ATIVO)
                        VALUES
                        (@Codigo,@Nome,@Cor,@Ativo)", this);

        }

        /// <summary>
        /// ATUALIZA UM status EXISTENTE
        /// </summary>
        public void Update()
        {
            using IDbConnection DB = new MySqlConnection(Conn);
            DB.Execute(@"UPDATE status
                        SET
                        CODIGO = @Codigo,
                        NOME = @Nome,
                        COR = @Cor,
                        ATIVO = @Ativo
                        WHERE ID = @ID", this);
        }
        /// <summary>
        /// VERIFICA SE JÁ EXISTE status CADASTRADO COM O CODIGO INFORMADO
        /// </summary>
        /// <param name="Codigo"></param>
        /// <returns></returns>
        public bool CheckCodigoExists(string Codigo)
        {
            using IDbConnection DB = new MySqlConnection(Conn);
            return DB.Query<bool>(@"SELECT EXISTS(SELECT ID FROM status WHERE CODIGO = @Codigo)", new { Codigo }).SingleOrDefault();
        }

        /// <summary>
        /// VERIFICA SE JÁ EXISTE status CADASTRADO COM O NOME INFORMADO
        /// </summary>
        /// <param name="Nome"></param>
        /// <returns></returns>
        public bool CheckNomeStatusExists(string Nome)
        {
            using IDbConnection DB = new MySqlConnection(Conn);
            return DB.Query<bool>(@"SELECT EXISTS(SELECT ID FROM status WHERE NOME = @Nome)", new { Nome }).SingleOrDefault();
        }
    }
}
