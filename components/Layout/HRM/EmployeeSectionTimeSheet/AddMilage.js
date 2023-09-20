import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
let deleteData = [];
const AddMilage = ({
  onClose,
  isOpen,
  onAddMilage,
  milageData,
  onDeleteMilage,
  container,
}) => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    setFields(milageData || []);
  }, [milageData]);

  const addFields = () => {
    const data = {
      pickup_address: "",
      destination_address: "",
      distance: 0,
    };
    setFields([...fields, data]);
  };

  const removeField = (index) => {
    const data = [...fields];
    data.splice(index, 1);
    setFields(data);
    const dataTodelete = milageData
      .filter((el) => {
        const item = data.find((ele) => {
          return el.id === ele.id;
        });
        if (item) {
          return false;
        } else {
          return true;
        }
      })
      .map((el) => el.id);
    onDeleteMilage(dataTodelete);
    deleteData = dataTodelete;
    if (milageData.length > 0 && data.length === 0) {
      onAddMilage({ data, delete: deleteData });
    }
  };

  const handleChange = (e, index) => {
    e.preventDefault();
    const key = e.target.name;
    const value = e.target.value;
    const newArray = [...fields];
    newArray[index][key] = value;
    setFields(newArray);
  };

  return (
    <Modal
      // classNames={{ root: "", overlay: "overlay" }}
      open={isOpen}
      onClose={onClose}
      center
      container={container}
    >
      <div className="modal-body">
        <p className="mt-3 mb-0 text-center">Add Your Milages Detail</p>
        <div className="milage_fields">
          {fields?.map((item, index) => {
            return (
              <div key = {`key_${index}`}>
                <input
                  type="text"
                  name="pickup_address"
                  placeholder="Pickup Address"
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  value={item.pickup_address}
                />
                <input
                  type="text"
                  placeholder="Destination Address"
                  name="destination_address"
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  value={item.destination_address}
                />
                <input
                  type="number"
                  name="distance"
                  placeholder="distance"
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  min={0}
                  value={item.distance}
                />
                <button
                  type="button"
                  className="remove_milage"
                  onClick={() => {
                    removeField(index);
                  }}
                >
                  <i className="fa fa-times" aria-hidden="true" />
                </button>
              </div>
            );
          })}

          <div className="add_milage_field text-end">
            <button onClick={addFields}>Add</button>
          </div>
        </div>
        {fields.length > 0 && (
          <div className="add_milage_detail text-end">
            <button
              type="button"
              onClick={() => {
                const dataTosent = {
                  data: fields,
                  delete: deleteData,
                };
                onAddMilage(dataTosent);
              }}
            >
              Add Full Day Milage
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddMilage;
