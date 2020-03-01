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
                                                EVENTO_MAQUINA.*,
                                                MAQUINA.NOME AS NomeMaquina,
                                                STATUS.CODIGO AS CodigoStatus,
                                                STATUS.NOME AS NomeStatus
                                                FROM EVENTO_MAQUINA
                                                INNER JOIN MAQUINA ON MAQUINA.ID = EVENTO_MAQUINA.IDMAQUINA
                                                INNER JOIN STATUS ON STATUS.ID = EVENTO_MAQUINA.IDSTATUS
                                                WHERE EVENTO_MAQUINA.IDMAQUINA = @IDMaquina
                                                ORDER BY EVENTO_MAQUINA.DATA DESC", new { IDMaquina });
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
                                                    EVENTO_MAQUINA.*,
                                                    MAQUINA.NOME AS NomeMaquina,
                                                    STATUS.CODIGO AS CodigoStatus,
                                                    STATUS.NOME AS NomeStatus,
                                                    STATUS.COR
                                                    FROM EVENTO_MAQUINA
                                                    INNER JOIN MAQUINA ON MAQUINA.ID = EVENTO_MAQUINA.IDMAQUINA
                                                    INNER JOIN STATUS ON STATUS.ID = EVENTO_MAQUINA.IDSTATUS
                                                    WHERE EVENTO_MAQUINA.ID IN
                                                    (
	                                                    SELECT MAX(EVENTO_MAQUINA.ID) 
                                                        FROM EVENTO_MAQUINA 
                                                        INNER JOIN MAQUINA ON MAQUINA.ID = EVENTO_MAQUINA.IDMAQUINA AND MAQUINA.ATIVO = b'1' 
                                                        GROUP BY IDMAQUINA
                                                    )
                                                    ORDER BY MAQUINA.NOME");
            return dados;
        }

        public void Insert()
        {
            using IDbConnection DB = new MySqlConnection(Conn);
            DB.Execute(@"INSERT INTO EVENTO_MAQUINA
                        (DATA,IDMAQUINA,IDSTATUS)
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
        /// GERA UM EVENTO ALEATÓRIO PARA UMA MÁQUINA ALEATÓRIA E RETORNA A LISTAGEM DOS ULTIMOS STATUS POR MÁQUINA
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
