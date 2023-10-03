import { suppliersFakeData } from "@/data/suppliers";

export default function handler(req, res) {
    const { currentPage = 1, limit = 4 } = req.query;
// console.log('currentPage=',currentPage, 'limit=', limit, 'query=', req.query)
    // Ensure currentPage and limit are integers
    try {
        const currentPageInt = parseInt(currentPage);
        const limitInt = parseInt(limit);

        if (isNaN(currentPageInt) || isNaN(limitInt) || currentPageInt < 1 || limitInt < 1) {
            return res.status(400).json({ message: 'Invalid pagination parameters' });
        }

        // Calculate the startIndex and endIndex for pagination
        const startIndex = (currentPageInt - 1) * limitInt;
        const endIndex = startIndex + limitInt;

        // Calculate total_pages based on the total number of items
        const total_pages = Math.ceil(suppliersFakeData.length / limitInt);
    
        // Get a portion of the suppliersFakeData based on pagination parameters
        const paginatedSuppliers = suppliersFakeData.slice(startIndex, endIndex);
        // console.log({ message: 'Successful', data: { paginatedSuppliers, total_pages } })
    
        res.status(200).json({ message: 'Successful', data: { paginatedSuppliers, total_pages } });
    } catch (error) {
        console.log({ message: 'Api Error ', error })
        res.status(500).json({ message: 'Api Error ', error });
        
    }
}
