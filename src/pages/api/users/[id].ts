import { NextApiRequest, NextApiResponse } from "next"

export function users(request: NextApiRequest, response: NextApiResponse) {
  console.log(request.query);
  //retorna o valor passado em users/id
}