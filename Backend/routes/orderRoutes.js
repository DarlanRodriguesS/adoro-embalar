const router = require("express").Router();
const moment = require("moment");
const Order = require("../models/Order");

//Cria novo usu´´ario

router.post("/create-order", async (req, res) => {
  const { code } = req.body;

  //o nome foi preechido?
  if (!code) {
    res.status(422).json({ error: "O número do pedido é obrigatório!" });
  }

  const order = {
    code,
  };

  const orderAlreadyExists = await Order.findOne({ code });

  if (orderAlreadyExists) {
    res.status(400).json({ error: "O pedido já existe!" });
  } else {
    try {
      await Order.create(order);
      res.status(201).json({ message: "Pedido inserido com sucesso!" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
});

// Consulta todos os usuários cadastrados

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();

    // const orders = [
    //     {
    //         code: "123",
    //         date: moment().format("12/02/2001"),
    //     },
    //     {
    //         code: "321",
    //         date: moment().format("12/02/2001"),
    //     },
    //     {
    //         code: "444",
    //         date: moment().format("12/02/2001"),
    //     },
    // ]
    const formatedOrders = [];

    orders.map((order) => {
      formatedOrders.push({
        code: order.code,
        date: moment(new Date(order.date)).format("DD/MM/YYYY - HH:mm:ss"),
      });
    });

    res.status(200).json(formatedOrders);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
// Consultar dado específico
// router.get('/orders/:code', async (req, res) => {
//   const { code } = req.params;

//   try {
//     let order = await Order.findOne({ code });

//     //Esse ID ixiste?
//     if (!order) {
//       res.status(422).json({ error: "O pedido não foi encontrado!" });
//     }

//     let formatedOrder = [{
//       code: order.code,
//       date: moment(new Date(order.date)).format("DD/MM/YYYY - HH:mm:ss"),
//     }];
//     res.status(200).json(formatedOrder);
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// });

// //atualizar os dados

// router.patch('/:id', async (req, res) => {

//     const id = req.params.id

//     const { code } = req.body

//     const order = {
//         code
//     }

//     try {
//         const updatePerson = await Order.updateOne({ _id: id }, person)

//         //Foi atualizado algum dado?
//         if (updatePerson.matchedCount === 0) {
//             res.status(422).json({ error: 'O usuário não foi encontrado!' })
//             return
//         }

//         res.status(200).json(person)
//     }
//     catch (error) {
//         res.status(500).json({ error: error })
//     }

// })

//Deletar cadastro de usuário
// router.delete('/:id', async (req, res) => {

//     const id = req.params.id

//     const person = await Order.findOne({ _id: id })

//     if (!person) {
//         res.status(422).json({ error: 'O usuário não foi encontrado!' })
//     }

//     try{
// await Order.deleteOne({_id: id})

// res.status(200).json({message: 'Usuário removido com sucesso!'})

//     }catch{
// res.status(500).json({error:error})
//     }
// })

module.exports = router;
