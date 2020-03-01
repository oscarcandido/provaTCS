using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace provaTCS.MODEL
{
    public class Evento_Maquina : BaseModel
    {
        public int ID { get; set; }
        public DateTime Data { get; set; }
        public int IDMaquina { get; set; }
        public int IDStatus { get; set; }

        #region Atributos Virtuais

        public string NomeMaquina { get; private set; }
        public string CodigoStatus { get; private set; }
        public string NomeStatus { get; private set; }

        public string Cor { get; private set; }

        #endregion
        /// <summary>
        /// REDUPERA TODOS OS EVENTOS DE UMA MÁQUINA INFORMADA
        /// </summary>
        /// <param name="IDMaquina"></param>
        /// <returns></returns>
        public IEnumerable<dynamic> GetByMaquina(int IDMaquina)
        {
            using IDbConnection DB = new MySqlConnection(Conn);
            var dados = DB.Query<Evento_Maquina>(@"SELECT 
                                                evento_maquina.*,
                                                maquina.NOME AS NomeMaquina,
                                                status.CODIGO AS CodigoStatus,
                                                status.NOME AS NomeStatus
                                                FROM evento_maquina
                                                INNER JOIN maquina ON maquina.ID = evento_maquina.IDmaquina
                                                INNER JOIN status ON status.ID = evento_maquina.IDstatus
                                                WHERE evento_maquina.IDmaquina = @IDMaquina
                                                ORDER BY evento_maquina.DATA DESC", new { IDMaquina });
            return dados;

        }
        /// <summary>
        /// RETORNA A LISTAGEM DOS ÚLTMOS EVENTOS EM CADA MÁQUINA ATIVA
        /// </summary>
        /// <returns></returns>
        public IEnumerable<dynamic> GetUltimoEventoMaquinas()
        {
            using IDbConnection DB = new MySqlConnection(Conn);
            var dados = DB.Query<Evento_Maquina>(@"SELECT 
                                                    evento_maquina.*,
                                                    maquina.NOME AS NomeMaquina,
                                                    status.CODIGO AS CodigoStatus,
                                                    status.NOME AS NomeStatus,
                                                    status.COR
                                                    FROM evento_maquina
                                                    INNER JOIN maquina ON maquina.ID = evento_maquina.IDmaquina
                                                    INNER JOIN status ON status.ID = evento_maquina.IDstatus
                                                    WHERE evento_maquina.ID IN
                                                    (
	                                                    SELECT MAX(evento_maquina.ID) 
                                                        FROM evento_maquina 
                                                        INNER JOIN maquina ON maquina.ID = evento_maquina.IDmaquina AND maquina.ATIVO = b'1' 
                                                        GROUP BY IDmaquina
                                                    )
                                                    ORDER BY maquina.NOME");
            return dados;
        }

        public void Insert()
        {
            using IDbConnection DB = new MySqlConnection(Conn);
            DB.Execute(@"INSERT INTO evento_maquina
                        (DATA,IDmaquina,IDstatus)
                        VALUES
                        (@Data,@IDMaquina,@IDStatus)", this);
        }


        private static readonly Random getrandom = new Random();

        public static int GetRandomNumber(int min, int max)
        {
            lock (getrandom) // synchronize
            {
                return getrandom.Next(min, max);
            }
        }

        /// <summary>
        /// GERA UM EVENTO ALEATÓRIO PARA UMA MÁQUINA ALEATÓRIA E RETORNA A LISTAGEM DOS ULTIMOS status POR MÁQUINA
        /// </summary>
        /// <returns></returns>
        public IEnumerable<dynamic> GeraEventoAleatorio()
        {
            using IDbConnection DB = new MySqlConnection(Conn);
            List<dynamic> Maquinas = new List<dynamic>();
            List<dynamic> Status = new List<dynamic>();
            Maquinas = new Maquina().GetAtivos().ToList();
            Status = new MODEL.Status().GetAtivos().ToList();
            int IndexMaquina = GetRandomNumber(0, Maquinas.Count());
            int IndexStatus = GetRandomNumber(0, Status.Count());
            Maquina MaquinaSelecionada = Maquinas[IndexMaquina];
            Status StatusSelecionado = Status[IndexStatus];
            this.IDMaquina = MaquinaSelecionada.ID;
            this.IDStatus = StatusSelecionado.ID;
            this.Data = DateTime.Now;
            Insert();
            return GetUltimoEventoMaquinas();
        }
    }
}
