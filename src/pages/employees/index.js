import { Card, Col, Row, Space, Table } from "antd";
import cln from "classnames";

import MasterLayout from "../../components/master-layout";
import styles from "./styles.module.less";

export default function Employees() {
    const data = [
        {
            id: 'e0001',
            login: 'hpotter',
            name: 'Harry Potter',
            salary: 1234.00,
        },
        {
            id: 'e0002',
            login: 'rweasley',
            name: 'Ron Weasley',
            salary: 19234.50,
        },
        {
            id: 'e0003',
            login: 'ssnape',
            name: 'Severus Snape',
            salary: 4000.0,
        },
        {
            id: 'e0004',
            login: 'rhagrid',
            name: 'Rubeus Hagrid',
            salary: 3999.99,
        },
        {
            id: 'e0005',
            login: 'voldemort',
            name: 'Lord Voldemort',
            salary: 523.4,
        },
    ];
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Login',
            dataIndex: 'login',
            key: 'login',
        },
        {
            title: 'Salary',
            dataIndex: 'salary',
            key: 'salary',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        }
    ];
    return (
        <MasterLayout>
            <Space>
                <h3 className={styles.pageHeaderTitle}>Employees</h3>
            </Space>
            <Card className={cln(styles.recordCardList)}>
                <Table dataSource={data} columns={columns} />
            </Card>
        </MasterLayout>
    );
}