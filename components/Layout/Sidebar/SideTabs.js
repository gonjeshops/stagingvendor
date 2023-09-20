import { Inventory, Dashboard, Shipping, HRMSvg } from "../../../assets";

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
