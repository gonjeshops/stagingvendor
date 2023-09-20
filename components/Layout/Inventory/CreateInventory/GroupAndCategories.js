import React, { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import {
  inventoryCategoryList,
  inventoryGroupList,
} from "../../../../redux/actions/inventory";

const GroupAndCategories = ({
  getGroupList,
  inventoryGroups,
  getCategoryList,
  inventoryCategories,
  onChange,
  values,
}) => {
  const [groupOptions, setGroupOptions] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [categoriesOption, setCategoriesOptions] = useState([]);

  /// set initial selected values for group abd categories
  useEffect(() => {
    if (values.group && !selectedGroup) {
      const initialSelectedGroup = groupOptions.find((el) => {
        return el.id === values.group;
      });
      setSelectedGroup(initialSelectedGroup);
    }
  }, [values]);

  useEffect(() => {
    if (values.categories.length > 0 && categoriesOption.length > 0) {
      const initialSelectedCategories = (categoriesOption || [])
        .filter((el, index) => {
          return values.categories.includes(el.id);
        })
        .map((el) => {
          return {
            ...el,
            value: el.id,
            label: el.name,
          };
        });
      setSelectedCategory(initialSelectedCategories);
    }
  }, [values.categories, categoriesOption]);

  useEffect(() => {
    const shop_id = localStorage.getItem("shop_id");
    getGroupList(shop_id);
  }, []);

  useEffect(() => {
    // get Group list
    if (inventoryGroups) {
      const data = (inventoryGroups || []).map((el) => {
        return {
          ...el,
          value: el.id,
          label: el.name,
        };
      });
      setGroupOptions(data);
    }
    if (inventoryCategories) {
      const data = (inventoryCategories || []).map((el) => {
        return {
          ...el,
          value: el.id,
          label: el.name,
        };
      });
      setCategoriesOptions(data);
    }
  }, [inventoryGroups, inventoryCategories]);

  useEffect(() => {
    // get categories here
    if (selectedGroup?.value) {
      getCategoryList(selectedGroup.value);
    }
  }, [selectedGroup]);

  // useEffect(() => {
  //   if (selectedCategory.length > 0) {
  //     const data = selectedCategory.map((el) => {
  //       return el.id;
  //     });
  //     onChange("categories", data);
  //   } else {
  //     onChange("categories", []);
  //   }
  // }, [selectedCategory]);

  const handleGroupChange = (value) => {
    if (selectedGroup?.value !== value.value) {
      setSelectedGroup(value);
      // to save the group id for product
      onChange("type_id", value.id);
      setSelectedCategory([]);
    }
  };

  const handleCategoryChange = (value) => {
    const data = (value || []).map((el) => {
      return el.id;
    });
    onChange("categories", data);
    setSelectedCategory(value);
  };

  return (
    <div className="col-lg-6">
      <div className="group-cat feature-image text-center mt-4">
        <h3>Group & Categories</h3>
        <p>Select product group and categories from here</p>

        <Select
          className="basic-multi-select"
          classNamePrefix="select"
          options={groupOptions}
          placeholder="Group"
          onChange={handleGroupChange}
          value={selectedGroup}
        />
        <Select
          className="basic-multi-select"
          classNamePrefix="select"
          isMulti
          options={categoriesOption}
          placeholder="Categories"
          onChange={handleCategoryChange}
          value={selectedCategory}
        />
      </div>
    </div>
  );
};

const mapStateToProps = function (state) {
  return {
    inventoryGroups: state.inventory.inventoryGroups,
    inventoryCategories: state.inventory.inventoryCategories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGroupList: (shop_id) => {
      return dispatch(inventoryGroupList(shop_id));
    },
    getCategoryList: (shop_id) => {
      return dispatch(inventoryCategoryList(shop_id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GroupAndCategories);
