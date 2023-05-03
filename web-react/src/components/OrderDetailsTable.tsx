import * as React from 'react';
import { DataGrid, GridColDef, GridFooterContainer, GridPagination, GridRowSelectionModel, GridSlotsComponentsProps } from '@mui/x-data-grid';
import { OrderDetails, OrderProductDetails, ProductDetails } from '../../../api/dist/utils/types';
import { Button, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'customerName', headerName: 'Customer Name', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'totalAmount', headerName: 'Total Amount', type: 'number', width: 150 },
    {
        field: 'orderDate',
        headerName: 'Order Placed',
        type: 'date',
        width: 150,
        valueGetter: (params) => {
            const dateValue = Date.parse(params.value);
            return isNaN(dateValue) ? "Invalid Date" : new Date(params.value);
        },
    },
    {
        field: 'orderProducts',
        headerName: 'Products',
        width: 300,
        valueFormatter: (params) => {
            const orderProducts = params.value as OrderProductDetails[];
            // console.log(orderProducts)
            return orderProducts.map(orderProduct => `${orderProduct.quantity > 1 ? `${orderProduct.quantity}x ` : ``}${orderProduct.product.name}`).join(', ');
        },
    },
];

type OrderDetailsTableProps = {
    orderDetails: OrderDetails[];
    onDelete: (selectedIds: GridRowSelectionModel) => void;
};

export const OrderDetailsTable: React.FC<OrderDetailsTableProps> = ({
    orderDetails,
    onDelete,
}) => {
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 5,
        page: 0,
    });

    const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);
    const [deleteButtonVisible, setDeleteButtonVisible] = React.useState(false);

    const handleDeleteButtonClick = () => {
        onDelete(rowSelectionModel);
        setRowSelectionModel([]);
        setDeleteButtonVisible(false);
    };

    const navigate = useNavigate();

    const CustomFooter = (props: GridSlotsComponentsProps['footer']) => (
        <GridFooterContainer {...props}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: '10px',
                }}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDeleteButtonClick}
                    style={{ opacity: `${deleteButtonVisible ? 1 : 0}` }}
                >
                    Delete Orders
                </Button>
                <GridPagination />
            </div>
        </GridFooterContainer>
    );
    return (
        <div style={{ width: '100%', padding: `10px 20px` }}>
            <DataGrid
                sx={{
                    height: 400,
                    width: '100%',
                    '& .MuiDataGrid-root': {
                        backgroundColor: '#1f1f1f',
                        border: '1px solid #444',
                    },
                    '& .MuiDataGrid-columnHeader': {
                        color: '#fff',
                    },
                    '& .MuiDataGrid-row': {
                    },
                    '& .MuiDataGrid-cell': {
                        color: '#fff',
                    },
                    '& .MuiDataGrid-columnSeparator': {
                        display: 'none',
                    },
                }}
                rows={orderDetails}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setDeleteButtonVisible(newRowSelectionModel.length !== 0);
                    setRowSelectionModel(newRowSelectionModel);
                }}
                rowSelectionModel={rowSelectionModel}
                components={{
                    Footer: CustomFooter,
                }}
                componentsProps={{
                    footer: { className: 'data-grid-footer', },
                }}
            />
        </div>
    );
}    
