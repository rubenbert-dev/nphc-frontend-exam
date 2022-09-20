import { employeesList } from "../employees";

export default async(req, res) => {
    const {
        query: { id },
        method,
    } = req;

    switch(method) {
        case 'GET':
            const employee = employeesList.find(({ id: employeeId }) => employeeId == id);
            res.status(200).json(employee);
            break;
        case 'POST':
            break;
        case 'PUT':
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
            break;
    }
}