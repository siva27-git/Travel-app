import './TablePage.css'

import React, { useState, useEffect } from 'react';
import { Table, Spin } from 'antd';
import axios from 'axios';
import moment from 'moment'

const TablePage = () => {

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const callApi = axios.get('http://localhost:8000/travelopia/getAllCxDetails');
        callApi.then((res) => {
            let { data } = res.data;
            data.map((ele) => ele["key"] = ele._id);
            setTableData(data);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setTableData([]);
            setLoading(false);
        })
    }, [])

    const columns = [
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (ele) => moment(ele).format("DD-MMM-YYYY hh:mm A"),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Destination',
            dataIndex: 'destination',
            key: 'destination',
        },
        {
            title: 'No. of Travellers',
            dataIndex: 'headCount',
            key: 'headCount',
            sorter: (a, b) => a.headCount - b.headCount,
        },
        {
            title: 'Budget (in dollars)',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            sorter: (a, b) => a.totalAmount - b.totalAmount,
        },

    ]

    return (
        <div className='table'>
            <Spin className='spin' spinning={loading ? true : false} tip="Loading" size="large"></Spin>
            <Table
                columns={columns}
                dataSource={tableData}
                bordered={true}
                pagination={{
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    defaultPageSize: 10,
                    pageSizeOptions: ['10', '30', '50']
                }}>
            </Table>
        </div>
    )
};

export default TablePage;