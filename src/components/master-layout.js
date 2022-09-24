import React, { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Skeleton, Space, Typography } from 'antd';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import cln from 'classnames';

import utilStyles from '../styles/utils.module.less';
import styles from './master-layout.module.less';

const { Header, Sider, Content, Footer } = Layout;
const name = 'Ruben Bert Pingol';

function getMenuItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    }
}

const defaultActiveMenuKey = '/employees';
const menuItems = [
    getMenuItem(<Link href="/employees"><a>Employees</a></Link>, '/employees', <UserOutlined />),
    getMenuItem(<Link href="/users-upload"><a>Users upload</a></Link>, '/users-upload', <UploadOutlined />),
];

export default function MasterLayout({ children, header }) {
    const PageHeader = () => header || null;
    const { asPath } = useRouter();
    const [activeMenuKey, setActiveMenuKey] = useState(defaultActiveMenuKey);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        setActiveMenuKey(asPath);
    }, [asPath]);

    return (
        <Layout className={styles.masterLayout}>
            <Sider trigger={null} collapsed={collapsed} collapsible>
                {/* <Image
                    priority
                    src="/images/profile.jpg"
                    className={cln([utilStyles.borderCircle])}
                    height={108}
                    width={108}
                    alt={name}
                /> */}
                <Space align="center" size="large" direction="vertical" className={styles.masterUserAvatar}>
                    <Skeleton.Avatar active="true" size={108} shape="circle" />
                    <Typography.Title level={5}>{name}</Typography.Title>
                </Space>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['/employees']}
                    selectedKeys={[activeMenuKey]}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header className={styles.masterContentMainHeader}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: styles.masterSiderTrigger,
                        // onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content>{children}</Content>
                <Footer className={cln(styles.masterFooter)}>All rights reserved 2022.</Footer>
            </Layout>
        </Layout>
    );
}