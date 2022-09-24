import { useState } from "react";
import { message, Card, Upload, Button, Row, Col, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { mutate } from "swr";

import { fetcher } from "../../lib/fetch";
import MasterLayout from "../../components/master-layout";
import styles from "./styles.module.less";
import { parseToJson } from "../../utils/file";

export default function UsersUpload() {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const onUpload = async () => {
        try {
            setUploading(true);
            fileList.forEach(async (file) => {
                const data = await parseToJson(file);
                const response = await fetcher('/api/users/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ data }),
                });

                console.log({ response });
                setUploading(false);
                // mutate('/api/employees');
            });
        } catch (e) {
            message.error(e.message);
        } finally {
            // setUploading(false);
        }
    };

    const props = {
        onRemove(file) {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload(file) {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };
    return (
        <MasterLayout>
            <Card className={styles.userUploadCard}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Typography.Title level={5}>Upload users/employees</Typography.Title>
                        <Card className={styles.userUploadCardInfo}>
                            <p>
                                Create employee records by selecting a file in CSV format that includes at <Typography.Text code>Employee ID</Typography.Text>, <Typography.Text code>Employee Name</Typography.Text>, <Typography.Text code>Employee Login</Typography.Text>, and <Typography.Text code>Employee Salary</Typography.Text>.
                            </p>
                        </Card>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>
                        <Button
                            type="primary"
                            onClick={onUpload}
                            disabled={fileList.length === 0}
                            loading={uploading}
                            style={{
                                marginTop: 16,
                            }}
                        >
                            {uploading ? 'Uploading' : 'Start Upload'}
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Typography.Title level={5}>Recently uploaded files</Typography.Title>
                    </Col>
                </Row>
            </Card>
        </MasterLayout>
    );
}