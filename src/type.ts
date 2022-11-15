export type user = {
  id: number,
  name: string,
  cpf: string,  
  birth: string,
  balance: number,
  extract:{
  value: number,
  date: string,
  description: string 
}
}

export enum BankOperations {
  GETBALANCE = "Pegar Saldo",
  ADDBALANCE = "Adicionar saldo",
  PAYBILL= "Pagar Conta",
  PAYMENT= "Transferência Interna"
}
// export type extract = {
//   valor: number,
//   date: number,
//   description: string 
// }