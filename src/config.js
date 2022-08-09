import {config} from 'dotenv'

config();

console.log(process.env.NICKNAME)

export default {
  port: 4000
}