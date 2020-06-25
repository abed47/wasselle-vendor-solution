import React, {useState, useEffect, forwardRef} from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import app from './../utils/base';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

const ITEMS = () => {

    const [isLoadingItems, setLoadingItems] = useState(false);

    const [tableColumns, setTableColumns] = useState([
        { title: 'Image', field: 'imageUrl', render: rowData => <img src={rowData.imageUrl} alt="item image" style={{width: 40, borderRadius: '50%'}}/> },
            {title: "Name", field: "name"},
            {title: "Price", field: "price"},
            {title: "Quantity", field: "quantity"}
        ]);

    const [tableData, setTableData] = useState([
        {id: "test", name: "hello", price: 1354, quantity: 54465}
    ])

    const getItems = async (vendorId) => {
        setLoadingItems(true);
        let items = new Array();
        let placeHolderObj = new Object();
        let ref = await app.firestore().collection("items");
        ref
        .where("vendor_id", "==", vendorId)
        .get()
        .then( async docs => {
            await docs.forEach(doc => {
                let docData = doc.data();
                placeHolderObj.imageUrl = docData.imgPath;
                placeHolderObj.name = docData.name;
                placeHolderObj.price = docData.unitPrice;
                placeHolderObj.quantity = Number(docData.quantity);
                items.push(placeHolderObj);
            });
            setTableData(items);
            setLoadingItems(false);
        });
    }

    useEffect(() => {
        getItems("5ZMidrnxFXeJ5iqmTjYL0NjjqPq2");
    },[])
    return(
        <div className="items__container">
            <div className="items__top-bar">
                <span>Items</span>
                <button className="btn outline light">add item</button>
            </div>
            <div className="items__table">
                <MaterialTable
                icons={tableIcons}
                title="shop items"
                columns={tableColumns}
                data={tableData}
                editable={{
                    onRowAdd: (newData) => new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setTableData([newData])
                            console.log(newData)
                        }, 600)
                    })
                }}
                ></MaterialTable>
            </div>
        </div>
        )
}

export default ITEMS;