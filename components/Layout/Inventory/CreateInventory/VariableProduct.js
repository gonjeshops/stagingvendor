import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { getAttributeList } from "../../../../redux/actions/inventory";
import Variant from "./Variant";
let deleteArray = [];
// const dummyProductOption = {
//   attributeName: {
//     options: [
//       { value: "stuff", label: "stuff" },
//       { value: "size", label: "size" },
//     ],
//     value: null,
//     placeholder: "Attribute Name",
//   },
//   attributeValue: {
//     stuff: [
//       { value: "wool", label: "wool" },
//       { value: "cotton", label: "cotton" },
//     ],
//     size: [
//       { value: "S", label: "S" },
//       { value: "M", label: "M" },
//       { value: "L", label: "L" },
//     ],
//     placeholder: "Attribute Value",
//     value: null,
//   },
// }

// NOtes useEfect with variantList have to be delete
let InitialVariableOption;
const VariableProduct = ({
  getAttributesData,
  attributes,
  onChange,
  values,
}) => {
  const [productOption, setProductOption] = useState();
  const [productOptionList, setProductOptionList] = useState([]);
  const [variant, setVariant] = useState({
    title: "",
    price: "",
    sale_price: "",
    sku: "",
    quantity: "",
    is_disable: false,
  });
  const [variantList, setVarintList] = useState([]);

  useEffect(() => {
    const shop_id = localStorage.getItem("shop_id");
    getAttributesData(shop_id);
  }, []);

  //// here setting initial values while edit product

  useEffect(() => {
    if (
      values?.variations?.length > 0 &&
      attributes?.length > 0 &&
      InitialVariableOption &&
      productOptionList.length == 0
    ) {
      const selectedAttributes = (attributes || []).filter((el) => {
        return values.variations.find((item) => {
          return el.id === item.attribute_id;
        });
      });

      const showInitialOptions = selectedAttributes.map((el) => {
        const valueData = values?.variations.filter((item) => {
          return item.attribute_id === el.id;
        });

        const attributeNameOptionData =
          InitialVariableOption.attributeName.options.filter((item) => {
            el.id !== item.id;
          });
        // const attributeNameOptions =
        return {
          ...InitialVariableOption,
          attributeValue: {
            ...InitialVariableOption.attributeValue,
            value: valueData.map((ele) => {
              return {
                ...ele,
                label: ele.value,
                name: el.name,
              };
            }),
          },
          attributeName: {
            ...InitialVariableOption.attributeName,
            options: attributeNameOptionData,
            value: {
              ...el,
              value: el.id,
              label: el.name,
            },
          },
        };
      });

      changeVariationsArray(showInitialOptions);
      setProductOptionList(showInitialOptions);
    }
  }, [values, attributes, InitialVariableOption, productOptionList]);

  /// here using attribute for initial options
  useEffect(() => {
    if (attributes?.length > 0) {
      const attributeValue = {
        placeholder: "Attribute Value",
        value: null,
      };
      const attribNameOptions = attributes.map((el) => {
        return {
          ...el,
          value: el.id,
          label: el.name,
        };
      });
      attribNameOptions.forEach((el, index) => {
        attributeValue[el.name] = el.values.map((item) => {
          return {
            ...item,
            label: item.value,
            name: el.name,
          };
        });
      });

      const attributeName = {
        value: null,
        placeholder: "Attribute Name",
        options: attribNameOptions,
      };

      const productOptionObject = {
        attributeName,
        attributeValue,
      };
      InitialVariableOption = productOptionObject;
      setProductOption(productOptionObject);
    }
  }, [attributes]);

  useEffect(() => {
    const isUpdateVariants = productOptionList.find((el) => {
      return (
        el.attributeValue.value === null || el.attributeValue.value.length === 0
      );
    });
    if (!isUpdateVariants) {
      const dataToSent = (productOptionList || []).map((list) => {
        return list.attributeValue.value || [];
      });
      const variantsData = handleVariants(dataToSent);
      const dataTosetForVariations = variantsData.map((el) => {
        const data = (values?.variation_options || []).find((item) => {
          const itemTitle = item.title.toLowerCase();
          return (
            itemTitle === el.title.toLowerCase() ||
            itemTitle === el.title.toLowerCase().split("/").reverse().join("/")
          );
        });
        if (data) {
          return {
            ...el,
            id: data.id,
            price: data.price,
            sale_price: data.sale_price,
            sku: data.sku,
            quantity: data.quantity,
            is_disable: false,
          };
        } else {
          return el;
        }
      });
      handleVariationValidations(dataTosetForVariations);
      setVarintList(dataTosetForVariations);
    } else {
      setVarintList([]);
    }
  }, [productOptionList]);

  const changeVariationsArray = (list) => {
    ///// here send  variant to parent
    let variations = [];
    (list || [])
      .filter((el) => {
        return el.attributeValue.value;
      })
      .forEach((el) => {
        const rawData = el?.attributeValue?.value;
        const valueToResturn = rawData.map((data) => {
          return data.id;
        });
        variations.push(...valueToResturn);
      });
    onChange("variations", variations);
  };

  // const validateVariantList = (variantList) => {
  //   let isError = false;
  //   variantList.forEach((el) => {
  //     Object.keys(el).forEach((item) => {
  //       if (
  //         (item === "quantity" && el[item] === "") ||
  //         (item === "sale_price" && el[item] === "") ||
  //         (item === "price" && el[item] === "")
  //       ) {
  //         isError = true;
  //       }
  //     });
  //   });
  //   return isError;
  // };

  const handleVariantsChange = (e, index) => {
    // console.log("call in change",e)
    e.preventDefault();
    const key = e.target.name;
    const value =
      key === "is_disable" ? (e.target.checked ? 1 : 0) : e.target.value;
    let list = [...variantList];
    let item = list[index];
    item = {
      ...item,
      [key]: value,
    };
    list[index] = item;
    /// here test variants list on time of change data in vaariants fields
    handleVariationValidations(list);
    setVarintList(list);
  };

  const handleVariationValidations = (list) => {
    if (list.length > 0) {
      // const isError = validateVariantList(list);
      // console.log("isErrorisError=", isError);
      // if (!isError) {
      // const data = list.map((el) => {
      //   Object.keys(el).forEach((item) => {
      //     if (el[item] === "") {
      //       delete el[item];
      //     }
      //   });
      //   return el;
      // });
      // here checking variation option for delete
      checkVariationsOptionsToDelete(list);
      const variationOptions = {
        upsert: list,
        delete: deleteArray,
      };
      onChange("variation_options", variationOptions);
    }
  };

  const handleAddOption = () => {
    setProductOptionList((prev) => {
      return [...prev, productOption];
    });
  };

  const removeOption = (index) => {
    const data = [...productOptionList];
    const removedData = data.splice(index, 1);
    const newOption = removedData[0]?.attributeName?.value;
    const listToUpdate = data.map((el) => {
      const existingOptions = el?.attributeName?.options || [];
      return {
        ...el,
        attributeName: {
          ...el.attributeName,
          options: [...existingOptions, newOption],
        },
      };
    });

    ///// set variants array for api from  product list

    changeVariationsArray(listToUpdate);
    setProductOptionList(listToUpdate);

    const optionData = { ...productOption };
    const existingOption = optionData?.attributeName?.options || [];
    const optionToUpdate = {
      ...optionData,
      attributeName: {
        ...optionData.attributeName,
        options: [...existingOption, newOption],
      },
    };
    setProductOption(optionToUpdate);
  };

  const handleAttributeNameChange = (value, index) => {
    const optionList = [...productOptionList];
    let option = optionList[index];
    option = {
      ...option,
      attributeName: {
        ...option.attributeName,
        value,
      },
      attributeValue: {
        ...option.attributeValue,
        value: null,
      },
    };

    const optionsToUpdate = option.attributeName.options.slice();
    const valueToremoveFromOption = optionsToUpdate.findIndex((el) => {
      return el.id === value.id;
    });
    const valueToAddInOptions = optionList[index].attributeName.value;
    if (valueToremoveFromOption !== -1) {
      optionsToUpdate.splice(valueToremoveFromOption, 1);
    }
    if (valueToAddInOptions) {
      optionsToUpdate.push(valueToAddInOptions);
    }

    //// rest options other than current
    let otherProductOptions = { ...productOption };
    otherProductOptions = {
      ...otherProductOptions,
      attributeName: {
        ...otherProductOptions.attributeName,
        options: optionsToUpdate,
      },
    };

    const rawOptionList = optionList.map((el, idx) => {
      if (idx === index) {
        return {
          ...option,
          attributeName: {
            ...option.attributeName,
            options: optionsToUpdate,
          },
        };
      } else {
        return {
          ...el,
          attributeName: {
            ...el.attributeName,
            options: optionsToUpdate,
          },
        };
      }
    });

    ///// set variants from  product list
    /// set variants [] while changing handleAttributeNameChange
    // changeVariationsData(rawOptionList);

    setProductOptionList(rawOptionList);
    setProductOption(otherProductOptions);
  };

  const handleAttributeValueChange = (value, index) => {
    const optionList = [...productOptionList];
    let option = optionList[index];
    option = {
      ...option,
      attributeValue: {
        ...option.attributeValue,
        value,
      },
    };
    optionList[index] = option;

    ///// set variants array for api from  product list

    changeVariationsArray(optionList);
    setProductOptionList(optionList);
  };

  const checkVariationsOptionsToDelete = (optionList) => {
    // here checking old values for edit case
    const olValues = values?.variation_options || [];
    deleteArray = olValues
      .filter((el) => {
        const found = optionList.find((ele) => {
          return ele.id === el.id;
        });
        if (found) {
          return false;
        } else {
          return true;
        }
      })
      .map((el) => {
        return el.id;
      });
  };

  const handleVariants = (dataToSent) => {
    const data = createVariants(...dataToSent);
    const possibleCombinations = (data || []).map((el, index) => {
      if (el.length > 1) {
        const title = el.reduce((acc, crr) => {
          return acc.label + "/" + crr.label;
        });
        const options = el.map((item) => {
          return {
            name: item.name,
            value: item.value,
          };
        });
        return {
          title,
          options,
        };
      }
      return {
        title: el[0].label,
        options: el.map((item) => {
          return {
            name: item.name,
            value: item.value,
          };
        }),
      };
    });

    const rawVariants = (possibleCombinations || []).map((el) => {
      return { ...variant, title: el.title, options: el.options };
    });
    return rawVariants;
  };

  function createVariants(...args) {
    if (args.length > 0) {
      var r = [],
        max = args.length - 1;
      function helper(obj, i) {
        for (var j = 0, l = args[i]?.length; j < l; j++) {
          var dummy = [...obj];
          dummy.push(args[i][j]);
          if (i == max) {
            r.push(dummy);
          } else {
            helper(dummy, i + 1);
          }
        }
      }
      helper([], 0);
      return r;
    }
  }

  return (
    <>
      <div className="col-lg-6 ">
        <div className="group-cat product-info feature-image">
          <div className="text-center">
            <h3>Variable Product Information </h3>
            <p>Add your variable product necessary information from here</p>
            {productOptionList.map((item, index) => {
              return (
                <div className="mb-3" key={`key_${index}`}>
                  <div className="d-flex justify-content-between ms-4 me-4">
                    <p className="m-0"> Option {index + 1}</p>
                    <a
                      style={{ color: "red" }}
                      onClick={(e) => {
                        removeOption(index);
                      }}
                    >
                      Remove
                    </a>
                  </div>
                  <form className="m-2 pt-2">
                    <Select
                      className="basic-multi-select"
                      classNamePrefix="select"
                      options={item?.attributeName?.options || []}
                      placeholder={item?.attributeName?.placeholder || ""}
                      value={item?.attributeName?.value}
                      onChange={(value) => {
                        handleAttributeNameChange(value, index);
                      }}
                    />
                    <Select
                      className="basic-multi-select"
                      classNamePrefix="select"
                      isMulti
                      options={
                        item?.attributeValue[
                          item?.attributeName?.value?.label
                        ] || []
                      }
                      onChange={(value) => {
                        handleAttributeValueChange(value, index);
                      }}
                      placeholder={item?.attributeValue?.placeholder || ""}
                      value={item?.attributeValue?.value}
                    />
                  </form>
                </div>
              );
            })}
            <button
              type="button"
              className="invent-butn btn btn-success"
              onClick={handleAddOption}
              disabled={
                productOptionList?.length - 1 === attributes?.length - 1
              }
            >
              Add options
            </button>
          </div>
        </div>
        {variantList.map((item, index) => {
          return (
            <Fragment key = {`key_${index}`}>

              <Variant
                item={item}
                index={index}
                onChangeVariants={(e) => {
                  handleVariantsChange(e, index);
                }}
              />
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

const mapStateToProps = function (state) {
  return {
    attributes: state.inventory.attributes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAttributesData: (shop_id) => {
      return dispatch(getAttributeList(shop_id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VariableProduct);
