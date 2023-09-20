import React, { useEffect, useState } from "react";
import Description from "./Description";
import GroupAndCategories from "./GroupAndCategories";
import SimpleProduct from "./SimpleProduct";
import Select from "react-select";
import VariableProduct from "./VariableProduct";
import UploadImages from "./UploadImages";
import { toast } from "react-toastify";
import {
  addInventory,
  singleInventory,
  editInventory,
} from "../../../../redux/actions/inventory";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Loader from "../../../common/Loader";
// import { route } from "next/dist/server/router";

const productTypes = [
  { value: "simple", label: "Simple" },
  { value: "variable", label: "Variable" },
];

const data = {
  name: "",
  unit: "",
  description: "",
  status: "",
  type_id: "",
  categories: [],
  product_type: "simple",
  shop_id: "",
  tags: [],
  image: null,
  gallery: [],
  in_stock: 1,
  is_taxable: 1,
};
const simpleProductData = {
  price: "",
  sale_price: "",
  quantity: "",
  sku: "",
  height: "",
  length: "",
  width: "",
};

const variableProductData = {
  variations: [],
  variation_options: {
    upsert: [],
    delete: [],
  },
};
// remove toggle from prop
// isEdit check karna hai
const AddInventory = ({
  addNewInventory,
  // toggle,
  isEdit,
  getSignleInventoryData,
  singleInventoryData,
  updateInventory,
}) => {
  const [selectedType, setSelectedType] = useState(productTypes[0]);
  const [productData, setProductData] = useState(data);
  const [isInitialSet, SetInitialSet] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const route = useRouter();

  useEffect(() => {
    if (singleInventoryData && isEdit && isInitialSet) {
      const { data } = singleInventoryData;
      const type = data.product_type;
      const selected = productTypes.find((el) => {
        return el.value === type;
      });
      setSelectedType(selected);

      // description field
      let newObj = { ...productData };
      newObj = {
        ...newObj,
        id: data.id,
        name: data.name,
        unit: data.unit,
        product_type: data.product_type,
        description: data.description,
        status: data.status,
        type_id: data.type_id,
        image: data.image,
        gallery: data.gallery,
        categories: (data.categories || []).map((el) => {
          return el.id;
        }),
      };
      if (data.product_type === "simple") {
        newObj = {
          ...newObj,
          price: data.price,
          sale_price: data.sale_price,
          quantity: data.quantity,
          sku: data.sku,
          width: data.width,
          height: data.height,
          length: data.length,
        };
      } else {
        newObj = {
          ...newObj,
          variations: data.variations,
          variation_options: data.variation_options,
        };
      }
      setProductData(newObj);
      SetInitialSet(false);
    }
  }, [singleInventoryData]);

  /// for get single product detail that we need to edit
  useEffect(() => {
    if (isEdit) {
      const { query } = route;
      if (query.slug) {
        setLoading(true);
        getSignleInventoryData(query.slug).then(() => {
          setLoading(false);
        });
        SetInitialSet(true);
      }
    }
  }, [route]);

  const handleChange = (key, data) => {
    let newObj = { ...productData };
    newObj[key] = data;
    setProductData(newObj);
  };

  const handleAddInventory = () => {
    let data = { ...productData };
    if (data.product_type === "simple") {
      Object.keys(variableProductData).forEach((el) => {
        delete data[el];
      });
      data = {
        ...simpleProductData,
        ...data,
      };
    } else {
      Object.keys(simpleProductData).forEach((el) => {
        delete data[el];
      });
      data = {
        ...variableProductData,
        ...data,
      };
    }

    data = {
      ...data,
      shop_id: localStorage.getItem("shop_id"),
    };
    const error = handleValidateData(data);
    if (error) {
      toast.error(error);
    } else {
      const dataForApi = makeDataToForAPI(data);
      // here decide which api we have to call

      if (isEdit) {
        setLoading(true);
        updateInventory(dataForApi).then((action) => {
          if (action.payload.data.status === 1) {
            toast.success(action?.payload?.data?.message);
            route.push("/inventory");
            setLoading(false);
          }
        });
      } else {
        setLoading(true);
        addNewInventory(dataForApi).then((action) => {
          setLoading(false);
          if (action.payload.data.status === 1) {
            toast.success(action?.payload?.data?.message);
            route.push("/inventory");
          } else {
            toast.error(action?.payload?.data?.message);
          }
        });
      }
    }
  };

  const makeDataToForAPI = (data) => {
    const newObject = { ...data };
    Object.keys(newObject).forEach((el) => {
      if (!newObject[el]) {
        delete newObject[el];
      }
    });
    return newObject;
  };

  const handleValidateData = (data) => {
    let error = "";
    Object.keys(data).forEach((el) => {
      if (
        (el === "unit" && data[el] === "") ||
        (el === "status" && data[el] === "") ||
        (el === "price" && data[el] === "") ||
        (el === "quantity" && data[el] === "") ||
        (el === "categories" && data[el].length === 0) ||
        (el === "type_id" && data[el] === "") ||
        (el === "name" && data[el] === "")
      ) {
        const element = el === "type_id" ? "group" : el;
        error = `${element} field is required`;
      } else if (data.product_type === "variable") {
        if (
          (el === "variations" && data[el].length === 0) ||
          (el === "variation_options" && data[el]?.upsert?.length === 0)
        ) {
          error = "Add variable product info";
        }
        if (el === "variation_options" && data[el]?.upsert?.length > 0) {
          const dataArray = data[el]?.upsert;
          const isValidArray = dataArray.every((ele) => {
            return ele.price && ele.sale_price && ele.quantity;
          });
          error = !isValidArray && "Add variable product info";
        }
        if (el === "variation_options" && data[el]?.upsert?.length > 0) {
          const dataArray = data[el]?.upsert;
          const isValidPrice = dataArray.every((ele) => {
            return parseFloat(ele.price) > parseFloat(ele.sale_price);
          });
          error =
            !isValidPrice &&
            "Sales price should be less than or equal to actual price";
        }
      }
    });
    return error;
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className="create-inventory">
        <div className="top-heading">
          <h3>{!isEdit ? "Create New Inventory" : "Update Inventory"}</h3>
        </div>
        <div className="row mb-4 inventory_upload">
          <UploadImages
            title="Featured Image"
            multiple={false}
            subTitle="Upload your product featured image here"
            onChange={handleChange}
            values={{ image: productData.image }}
          />
          <UploadImages
            title="Gallery"
            values={{ gallery: productData.gallery }}
            multiple={true}
            onChange={handleChange}
            subTitle="Select product group and categories from here"
          />
          <GroupAndCategories
            onChange={handleChange}
            values={{
              group: productData.type_id,
              categories: productData.categories,
            }}
          />
          <Description
            onChange={handleChange}
            values={{
              name: productData.name,
              unit: productData.unit,
              description: productData.description,
              status: productData.status,
            }}
          />
          {selectedType.value === "simple" ? (
            <SimpleProduct
              onChange={handleChange}
              values={{
                price: productData.price,
                sale_price: productData.sale_price,
                quantity: productData.quantity,
                sku: productData.sku,
                width: productData.width,
                height: productData.height,
                length: productData.length,
              }}
            />
          ) : (
            <VariableProduct
              onChange={handleChange}
              values={
                isEdit
                  ? {
                      variations: singleInventoryData?.data?.variations,
                      variation_options:
                        singleInventoryData?.data.variation_options,
                    }
                  : {
                      variations: null,
                      variation_options: null,
                    }
              }
            />
          )}
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <div className="group-cat prod-type gallry feature-image text-center mt-4">
              <h3>Product Type</h3>
              <p>Select product type form here</p>
              <Select
                className="basic-multi-select"
                classNamePrefix="select"
                defaultValue={productTypes[0]}
                options={productTypes}
                onChange={(value) => {
                  if (value.value) {
                    handleChange("product_type", value.value);
                  }
                  setSelectedType(value);
                }}
                value={selectedType}
              />
            </div>
           <div className="add_invent-btn">
           <button
              type="button"
              onClick={handleAddInventory}
              className="invent-butn btn btn-success mx-auto"
            >
              Add Inventory
            </button>
           </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = function (state) {
  return {
    singleInventoryData: state.inventory.singleInventoryData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewInventory: (data) => {
      return dispatch(addInventory(data));
    },
    getSignleInventoryData: (product_slug) => {
      return dispatch(singleInventory(product_slug));
    },
    updateInventory: (values) => {
      return dispatch(editInventory(values));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddInventory);
