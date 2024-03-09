import pkg from 'pg';

const {Client} = pkg;

const connectionString ='postgres://default:B1CGPgAHOku6@ep-rough-cell-a4wy458s.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require';

const client = new Client({connectionString})

const connect = ()=>{
    client.connect()
    .then(()=>{
        console.log('Conection to database established');
    })
    .catch((error)=>{
        console.log('Error connecting to database: '+error.message);
    })
}

export default connect;
export {client};