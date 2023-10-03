import { suppliersFakeData } from "@/data/suppliers";

export default function handler(req, res) {
    const { supplierId} = req.query;
console.log('supplierId=',supplierId, 'query=', req.query)
    // Ensure currentPage and limit are integers
    try {
        const id = parseInt(supplierId);

        if (isNaN(id) ) {
            return res.status(400).json({ message: 'Invalid pagination parameters' });
        }

        // Get a portion of the suppliersFakeData based on pagination parameters
        const supplier = suppliersFakeData.find(item => item.id === id);

        console.log({ message: 'Successful', data: supplier })
    
        res.status(200).json({ message: 'Successful', data: supplier });
    } catch (error) {
        console.log({ message: 'Api Error ', error })
        res.status(500).json({ message: 'Api Error ', error });
        
    }
}
