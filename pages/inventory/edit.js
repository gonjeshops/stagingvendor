import React from 'react';
import CreateInventory from '../../components/Layout/Inventory/CreateInventory';

function EditInventory(props) {
    return (
        <CreateInventory
        // toggle={() => {
        //   setAddOrUpdate(false);
        // }}
        isEdit={true}
        // toggleEdit={() => {
        //   setEdit(!isEdit);
        // }}
      />
    );
}

export default EditInventory;