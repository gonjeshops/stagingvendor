import Inventory from "@/componentsB2b/Inventory/Inventory";
import Workspace from "@/componentsB2b/Workspace/Workspace";

const InventoryPage = () => { // Rename the function to InventoryPage (it should start with an uppercase letter)

  const inventories = {
    page: 'inventory', // Correct the typo 'nventory' to 'inventory'
    tableHeader: [' ', 'PRODUCT NAME', 'PRICE', 'CATEGORY', 'TAGS', ' ', 'QUANTITY', 'DATE'],
    category: [
      { title: 'All', value: '68817' },
      { title: 'Published', value: '7067' },
      { title: 'Drafts', value: '87' },
      { title: 'On Discount', value: '810' },
    ],
    inventoryData: [
      { id: 1, productName: 'FItbit Sense Advanced Smartwatch with...', published: '2023-08-17', price: '$87', productImg: '/profile1.webp', category: 'Plants', tags: ['HEALTH', 'EXERCISE', 'BIZ', 'FASHION', 'LIFE'], qty: '4', liked: false },
      { id: 2, productName: 'iPhone 13 pro max-Pacific Blue-128GB', published: '2023-08-17', price: '$87', productImg: '/profile1.webp', category: 'Eze Anna', tags: ['HEALTH', 'EXERCISE', 'BIZ', ], qty: '4', liked: true },
      { id: 3, productName: 'Apple MacBook 13 inch-M1- 76789/ 256GB -space', published: '2023-08-17', price: '$87', productImg: '/profile1.webp', category: 'Eze Anna', tags: ['HEALTH', 'EXERCISE', 'BIZ', 'FASHION', 'LIFE'], qty: '4', liked: false },
      { id: 4, productName: 'FItbit Sense Advanced Smartwatch with...', published: '2023-08-17', price: '$87', productImg: '/profile1.webp', category: 'Eze Anna', tags: ['HEALTH', 'EXERCISE', 'BIZ', 'FASHION', 'LIFE'], qty: '4', liked: true },
      { id: 5, productName: 'FItbit Sense Advanced Smartwatch with...', published: '2023-08-17', price: '$87', productImg: '/profile1.webp', category: 'Eze Anna', tags: ['HEALTH', 'EXERCISE', 'BIZ', 'FASHION', 'LIFE'], qty: '4', liked: false },
      { id: 6, productName: 'FItbit Sense Advanced Smartwatch with...', published: '2023-08-17', price: '$87', productImg: '/profile1.webp', category: 'Eze Anna', tags: ['HEALTH', 'EXERCISE', 'BIZ', 'FASHION', 'LIFE'], qty: '4', liked: false },
      { id: 7, productName: 'FItbit Sense Advanced Smartwatch with...', published: '2023-08-17', price: '$87', productImg: '/profile1.webp', category: 'Eze Anna', tags: ['HEALTH', 'EXERCISE', 'BIZ', 'FASHION', 'LIFE'], qty: '4', liked: true },
      { id: 8, productName: 'FItbit Sense Advanced Smartwatch with...', published: '2023-08-17', price: '$87', productImg: '/profile1.webp', category: 'Eze Anna', tags: ['HEALTH', 'EXERCISE', 'BIZ', 'FASHION', 'LIFE'], qty: '4', liked: false },
      { id: 9, productName: 'FItbit Sense Advanced Smartwatch with...', published: '2023-08-17', price: '$87', productImg: '/profile1.webp', category: 'Eze Anna', tags: ['HEALTH', 'EXERCISE', 'BIZ', 'FASHION', 'LIFE'], qty: '4', liked: true },
    ]
  };

  return (
      <Workspace >
        <Inventory inventories={inventories} />
      </Workspace>
  );
};

export default InventoryPage; // Export the InventoryPage component
