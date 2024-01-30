import { Inventory, Dashboard, Shipping, HRMSvg, V2V } from "../../../assets";

export const SideTabs = {
  vendor: {
    dashboard: {
      name: "Dashboard",
      url: "/dashboard",
      image: Dashboard,
    },
    orders: {
      name: "Order & shipping",
      url: "/orders",
      image: Shipping,
    },
    inventory: {
      name: "Inventory",
      url: "/inventory",
      image: Inventory,
    },
    // sales: {
    //   name: "Sales",
    //   url: "/sales",
    //   image: Shipping,
    // },
    finance: {
      // name: "Finance",
      name: "Vendor To Vendor",
      image: V2V,
      isCollapsable: true,
      innerTabs: [
        {
          name: "Quotes",
          url: "/quotes/products",
        },
        {
          name: "Invoicing",
          url: "/invoicing/received_invoice",
        },
        {
          name: "Orders",
          url: "/orders_vendors/incoming",
        },
        {
          name: "Accounting",
          url: "/accounting",
        },

      ],
    },
    hrm: {
      name: "HRM",
      image: HRMSvg,
      isCollapsable: true,
      innerTabs: [
        {
          name: "Employee",
          url: "/employee",
        },
        {
          name: "TimeSheet",
          url: "/timesheet",
        },
      ],
    },
  },
  staff: {
    hrm: {
      name: "HRM",
      image: HRMSvg,
      isCollapsable: true,
      innerTabs: [
        {
          name: "TimeSheet",
          url: "/employee_timesheet",
        },
      ],
    },
  },
};
