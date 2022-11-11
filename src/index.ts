import express, {Request, Response} from "express"
import cors from 'cors'
import { users } from "./data"

const app = express()
app.use(express.json())
app.use(cors())

// endpoint list user
app.get("/user",(req: Request, res: Response)=>{
  const listUsers = users.map((i)=>{
    return i
  })
  res.status(201).send(listUsers)
  console.table(listUsers);  
})



app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003");
});