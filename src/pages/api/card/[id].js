import clientPromise from "../../../utils/mongodb";
import { employeesList } from "../employees";

export default async(req, res) => {
    const {
        query: { id },
        method,
        body,
    } = req;
    console.log({ body });

    const client = await clientPromise;
    const db = client.db("nphc_db");

    switch(method) {
        case 'GET':
            const employee = db.collection("employees").find({ _id: id });
            res.status(200).json(employee);
            break;
        case 'POST':
            const newEmployee = {};
            // const newEmployee = db.insertOne();
            res.status(201).json(newEmployee);
            break;
        case 'PATCH':
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
            break;
    }
}

export async function saveEmployee(req, db) {
    
}
