

export const employeesList = [
    {
        key: 'e0001',
        id: 'e0001',
        login: 'hpotter',
        name: 'Harry Potter',
        salary: 1234.00,
    },
    {
        key: 'e0002',
        id: 'e0002',
        login: 'rweasley',
        name: 'Ron Weasley',
        salary: 19234.50,
    },
    {
        key: 'e0003',
        id: 'e0003',
        login: 'ssnape',
        name: 'Severus Snape',
        salary: 4000.0,
    },
    {
        key: 'e0004',
        id: 'e0004',
        login: 'rhagrid',
        name: 'Rubeus Hagrid',
        salary: 3999.99,
    },
    {
        key: 'e0005',
        id: 'e0005',
        login: 'voldemort',
        name: 'Lord Voldemort',
        salary: 523.4,
    },
];
 
/**
 * @todo:
 * > Connect to MongoDB
 * > Create a database
 * > Create employees/users collection
 * > Fetch employees
 * > Create endpoints for edit/update and delete employee
 */
export default (req, res) => {
    res.status(200).json(employeesList);
}