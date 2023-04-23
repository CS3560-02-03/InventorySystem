import * as React from 'react';
import { DataGrid, GridColDef, GridFooterContainer, GridPagination, GridRowSelectionModel, GridSlotsComponentsProps } from '@mui/x-data-grid';
import { ManufacturerDetails, ProductDetails } from '../../../api/dist/utils/types';
import { Button, IconButton } from '@mui/material';
import { mockProductDetails } from '../_mocks_/productDetails';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    // { field: 'description', headerName: 'Description', width: 200 },
    { field: 'price', headerName: 'Price', type: 'number', width: 100 },
    // { field: 'productTypeID', headerName: 'Product Type ID', type: 'number', width: 120 },
    { field: 'size', headerName: 'Size', width: 80 },
    { field: 'color', headerName: 'Color', width: 150 },
    { field: 'weight', headerName: 'Weight', type: 'number', width: 80 },
    { field: 'stock', headerName: 'Stock', type: 'number', width: 80 },
    { field: 'alertStockNumber', headerName: 'Alert#', type: 'number', width: 80, },
    {
        field: 'manufacturer',
        headerName: 'Manufacturer',
        width: 150,
        valueFormatter: (params) => {
            const manufacturer = params.value as ManufacturerDetails;
            return manufacturer ? manufacturer.name : 'N/A';
        },
    },
];

type ProductDetailsTableProps = {
    productDetails: ProductDetails[];
    onDelete: (selectedIds: GridRowSelectionModel) => void;
};
  
const ProductDetailsTable: React.FC<ProductDetailsTableProps> = ({
    productDetails,
    onDelete,
}) => {
    // console.log(productDetails)
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
    const handleEditClick = (productID: string) => {
        navigate(`/modules/products/edit/${productID}`);
    };

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
                style={{opacity: `${deleteButtonVisible ? 1 : 0}`}}
            >
                Delete Products
            </Button>
            <GridPagination />
            </div>
        </GridFooterContainer>
    );
    return (
        <div style={{width: '100%', padding: `10px 20px`}}>
            <DataGrid
                sx={{
                    height: 400,
                    width: '100%',
                    '& .MuiDataGrid-root': {
                        backgroundColor: '#1f1f1f',
                        border: '1px solid #444',
                    },
                    '& .MuiDataGrid-columnHeader': {
                        // backgroundColor: '#333',
                        color: '#fff',
                    },
                    '& .MuiDataGrid-row': {
                        // '&:nth-child(even)': {
                        //     backgroundColor: '#2a2a2a',
                        // },
                    },
                    '& .MuiDataGrid-cell': {
                        color: '#fff',
                    },
                    '& .MuiDataGrid-columnSeparator': {
                        isplay: 'none',
                    },
                }}
                rows={productDetails}
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
  };
  
export default ProductDetailsTable;
