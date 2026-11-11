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


app.delete("/apagar/:id", (request, response) => {
    const { id } = request.params

    const comandoDelete = "DELETE FROM musicas_PauloHenrique WHERE id = ?"

    sql.query(comandoDelete, [id], (error) => {
        if (error) {
            console.log(error)
            return
        }

        response.json({ mensagem: "Música apagada com sucesso!" })
    })
})

app.get("/musica/:id", (request, response) => {
    const { id } = request.params

    const comandoSelect = "SELECT * FROM musicas_PauloHenrique WHERE id = ?"

    sql.query(comandoSelect, [id], (error, data) => {
        if (error) {
            console.log(error)
            return
        }

        response.json(data[0])
    })
})


app.put("/editar/:id", (request, response) => {
    const { id } = request.params
    const { titulo, artista, genero, ano, duracao } = request.body

    const comandoUpdate = "UPDATE musicas_PauloHenrique SET titulo = ?, artista = ?, genero = ?, ano = ?, duracao = ? WHERE id = ?"

    sql.query(comandoUpdate, [titulo, artista, genero, ano, duracao, id], (error) => {
        if (error) {
            console.log(error)
            return
        }

        response.json({ mensagem: "Música alterada com sucesso!" })
    })
})