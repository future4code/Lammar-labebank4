import express, {Request, Response} from "express"
import cors from 'cors'
import { users } from "./data"
import { user } from "./type"

const app = express()
app.use(express.json())
app.use(cors())

//----------- Endpoint todos usuarios ------------------------
app.get("/user",(req: Request, res: Response)=>{
  const listUsers = users.map((i)=>{
    return i
  })
  res.status(201).send(listUsers)
  console.table(listUsers);  
})
// ---------------Endpoint criar conta---------------

app.post("/user/create",(req:Request, res:Response)=>{

  let errorCode = 400

 try{
  // dados via body

  const {userName,userCpf,userBirth,userBalance,userValue,userDate,userDescription} = req.body

  //verifica se os dados foram passados
  if(!userName||!userCpf||!userBirth){
  errorCode = 422
  throw new Error("Falta passar os parametros: nome, cpf, data de nascimento");
 }    
 // Verificar se o usuario > 18
 
 //Criar dados do novo usuario
 const newUser: user ={
  id: Math.floor(Math.random()*1000),
  name:userName,
  cpf:userCpf,
  birth:userBirth,
  balance:userBalance,
  extract:{
    value:userValue,
    date:userDate,
    description:userDescription, 
  }
 }
// Atualizar o push
  users.push(newUser)

  res.status(201).send(users)
  }
  catch (error:any) {
    // 6. Mostrar o erro especifico e a mensagem 
        res.status(errorCode).send(error.message)
    }
})
//-----------Endpoint verficar saldo-------------
app.get('/users/verify-balance',(req:Request, res:Response)=>{
  let errorCode = 400
const userName = req.body.name 
const userCpf = req.body.cpf
try{
//Verificar se o dado foi passado
  if (!userName||!userCpf){
    errorCode = 422
    throw new Error("Falta o parametro name ou cpf")}

// Procurando no banco de dados
  const userNameCorrect = users.find((x)=>{
    return x.name === userName
  });
  const userCpfCorrect = users.find((x)=>{
    return x.cpf === userCpf
  }); 
// Tratamento de erro
if (!userNameCorrect && !userCpfCorrect){
  errorCode = 404
  throw new Error("Nome ou Cpf nao encontrado no banco de dados");
}
const showBalance = users.map((u)=>{
  return u.balance
})
res.status(201).send(showBalance)
}
catch(error:any){ res.status(errorCode).send(error.message)}
})


app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003");
});