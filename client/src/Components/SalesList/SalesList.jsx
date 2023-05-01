import s from './SalesList.module.css'
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { GetSalesInfo } from '../../Redux/Actions/ActionsDashboard';
import { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
export default function DataTable() {


    const dispatch = useDispatch()

    const sales = useSelector(state => state.salesInfo.report)
    const pages = useSelector(state => state.salesInfo.totalPages)

    const [pageQuery, setPageQuery] = useState(1)

    useEffect(() => {
        dispatch(GetSalesInfo(pageQuery))
    }, [dispatch, pageQuery])

    let rows = []
    if (sales) {
        rows = sales?.map(sale => {

            return { id: sale.id, amount: sale.amount, paymentMethod: sale.paymentMethod, date: sale.createdAt.slice(0, 10), status: sale.status }
        })

    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 120, headerClassName: s.header },
        { field: 'amount', headerName: 'MONTO ($)', width: 220, headerClassName: s.header },
        { field: 'paymentMethod', headerName: 'MÉTODO DE PAGO', width: 240, headerClassName: s.header },
        {
            field: 'date',
            headerName: 'FECHA',
            width: 220,
            headerClassName: s.header
        },
        {
            field: 'status',
            headerName: 'ESTADO',
            width: 220,
            headerClassName: s.header

        },

    ];

    const handleChange = (event, value) => {
        setPageQuery(value);
    };


    return (
        <div className={s.dataTable}>
            <Stack spacing={2} className={s.pages}>
                <Pagination count={pages} onChange={handleChange} size="large" />
            </Stack>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                pagination={false}
                hideFooterPagination={true}

            >

            </DataGrid>

            <Stack spacing={2} className={s.pages}>
                <Pagination count={pages} onChange={handleChange} size="large"/>
            </Stack>
        </div>
    )
}
