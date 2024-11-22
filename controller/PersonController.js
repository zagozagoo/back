// // USANDO MONGODB
const Person = require('../models/Person');

class PersonController {

    static async create(req, res) {
        const { name, lastname, salary } = req.body;
        if (!name || !lastname || !salary)
            return res.status(400).send({ message: "Dados inválidos" })
        const person = {
            name: name,
            lastname: lastname,
            salary: salary
        }
        try {
            const p = await Person.create(person);
            return res.status(201).send({ message: "Pessoa inserida com sucesso", body: p });
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    };

    static async getAllPeople(req, res) {
        try {
            const people = await Person.find();
            return res.status(200).send( people );
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    };


    static async deleteById(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).send({ message: "No id provider" });
        try {
            await Person.findByIdAndRemove(id);
            return res.status(200).send({ message: "Person deleted successfully" })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Something failled" })
        }
    }
}

module.exports = PersonController;


//USANDO SQL ->
// const connection = require('../config/db'); // Supondo que você tenha o arquivo de conexão como 'config/connection'

// class PersonController {

//     static async create(req, res) {
//         const { name, lastname, salary } = req.body;
//         if (!name || !lastname || !salary)
//             return res.status(400).send({ message: "Dados inválidos" });

//         try {
//             const [result] = await connection.promise().execute(
//                 'INSERT INTO people (name, lastname, salary) VALUES (?, ?, ?)', 
//                 [name, lastname, salary]
//             );
//             return res.status(201).send({
//                 message: "Pessoa inserida com sucesso",
//                 body: { id: result.insertId, name, lastname, salary }
//             });
//         } catch (error) {
//             return res.status(500).send({ error: error.message });
//         }
//     };

//     static async getAllPeople(req, res) {
//         try {
//             const [people] = await connection.promise().execute('SELECT * FROM people');
//             return res.status(200).json(people);
//         } catch (error) {
//             return res.status(500).send({ error: error.message });
//         }
//     };

//     static async deleteById(req, res) {
//         const { id } = req.params;
//         if (!id)
//             return res.status(400).send({ message: "No id provider" });

//         try {
//             const [result] = await connection.promise().execute('DELETE FROM people WHERE id = ?', [id]);
//             if (result.affectedRows === 0) {
//                 return res.status(404).send({ message: "Pessoa não encontrada" });
//             }
//             return res.status(200).send({ message: "Pessoa deletada com sucesso" });
//         } catch (error) {
//             console.log(error);
//             return res.status(500).send({ message: "Algo falhou" });
//         }
//     }
// }

// module.exports = PersonController;
