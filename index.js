import express from "express";
import cors from "cors";
import mysql2 from "mysql2";

const app = express();
app.use(express.json());
app.use(cors());

const sql = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_backend_03MC"
});

app.get("/", (request, response) => {
    const comandoSelect = "SELECT * FROM musicas_PauloHenrique";

    sql.query(comandoSelect, (error, data) => {
        if (error) {
            console.log(error);
            return;
        }

        response.json(data);
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

export default app;

app.post("/cadastrar", (request, response) => {
    const { titulo, artista, genero, ano, duracao } = request.body

    const comandoInsert = "INSERT INTO musicas_PauloHenrique(titulo, artista, genero, ano, duracao) VALUES (?, ?, ?, ?, ?)"

    sql.query(comandoInsert, [titulo, artista, genero, ano, duracao], (error) => {
        if (error) {
            console.log(error)
            return
        }

        response.status(201).json({ mensagem: "Música cadastrada com sucesso!" })
    })
})