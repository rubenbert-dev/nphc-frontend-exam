import { ObjectId } from "mongodb";
import { getMongoClient } from "../middlewares/database";

export async function findEmployeeById(db, id) {
    const employees = await db
        .collection("employees")
        .aggregate([
            { $match: { _id: new ObjectId(id) } },
            { $limit: 1 },
        ])
        .toArray();

    if (!employees[0]) return null;
    return employees[0];
}

export async function findEmployees(db, before, by, limit = 10) {
    return db
        .collection("employees")
        .aggregate([
            {
                $match: {
                    ...(before && { createdAt: { $lt: before } }),
                }
            },
            { $sort: { _id: 1 } },
            // { $limit: limit },
        ])
        .toArray();
}

export async function insertEmployee(db, { employee_id, employee_name, employee_login, employee_salary }) {
    const employee = {
        employee_id,
        employee_name,
        employee_login,
        employee_salary,
        createdAt: new Date(),
    }

    const { insertedId } = await db.collection("employees").insertOne(employee);
    employee._id = insertedId;

    return employee;
}

export async function insertBulkEmployees(db, data) {
    const client = await getMongoClient();
    const session = client.startSession();

    const employeesCollection = db.collection("employees");
    const transactionOptions = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' }
    };

    try {
        const results = await session.withTransaction(async () => {
            const employeeInsertResults = await employeesCollection.insertMany(data, { session });
            console.log(`${employeeInsertResults.insertedCount} document(s) inserted in the employees collection`);

            if (employeeInsertResults.insertedCount !== data.length) {
                await session.abortTransaction();
                return;
            }

        }, transactionOptions);
        
        if (results) {
            // await session.commitTransaction();
            return true;
        } else {
            // await session.abortTransaction();
        }

    } catch (e) {
        console.error("The transaction was aborted due to unexpected error: " + e);
    } finally {
        await session.endSession();
        await client.close();
    }
}

export async function updateEmployeeById(db, id, { employee_id, employee_name, employee_login, employee_salary }) {
    const employee = {
        employee_id,
        employee_name,
        employee_login,
        employee_salary,
    };

    return db
        .collection("employees")
        .findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: employee },
        );
}

export async function deleteEmployeeById(db, id) {
    return db
        .collection("employees")
        .deleteOne(
            { _id: new ObjectId(id) },
        );
}