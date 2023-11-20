import {AiOutlineCompass} from 'react-icons/ai'
import {FiShoppingCart, FiHelpCircle, FiFile, FiBook, FiDollarSign} from 'react-icons/fi';
import {MdOutlineEmail,MdOutlineMarkEmailUnread, MdOutlineMarkEmailRead, } from 'react-icons/md'
import {HiOutlineMailOpen} from 'react-icons/hi'
import {SiMinutemailer} from 'react-icons/si'



export const workspaceLinks = [
    {
        icon: <AiOutlineCompass/>,
        title: 'dashboard',
        link: '/vendorb2b'
    },
    {
        icon: <FiShoppingCart/>,
        title: 'orders',
        link: '/vendorb2b/workspace/orders'
    },
    {
        icon: <FiDollarSign/>,
        title: 'invoices',
        link: '/vendorb2b/workspace/invoices'
    },
    {
        icon: <FiBook/>,
        title: 'inventory',
        link: '/vendorb2b/workspace/inventory'
    },
    {
        icon: <FiFile/>,
        title: 'quotes',
        link: '/vendorb2b/workspace/quotes',
        submenu: [
            {
                title: 'Manage Quotes',
                link: '/vendorb2b/workspace/request-quotes',
                path: 'request-quotes'
            }, 
            {   title: 'Forcasted Quotes',
                link: '/vendorb2b/workspace/forcasted-quotes',
                path: 'manage-quotes',
            }
        ]       
    },
]



export const supplierWorkspaceLinks = [
    {
        icon: <AiOutlineCompass/>,
        title: 'dashboard',
        link: '/supplier'
    },
    {
        icon: <FiShoppingCart/>,
        title: 'orders',
        link: '/supplier/orders'
    },
    {
        icon: <FiDollarSign/>,
        title: 'invoices',
        link: '/supplier/invoices'
    },
    {
        icon: <FiBook/>,
        title: 'inventory',
        link: '/supplier/inventory'
    },
    {
        icon: <FiFile/>,
        title: 'quotes',
        link: '/supplier/quotes',
        submenu: [
            {
                title: 'Quote Request',
                link: '/supplier/request-quotes',
                path: 'request-quotes'
            }, 
            {   title: 'Manage Quotes',
                link: '/supplier/manage-quotes',
                path: 'manage-quotes',
            }
        ]       
    },
]


export const workspaceData = {
    quotes: {
        icon: <MdOutlineEmail/>,
        data: 2800,
        title: 'Total Quotes',
    },
    sentEmail: {
        icon: <SiMinutemailer/>,
        data: 1200,
        title: 'Email Sent',
    },
    deliveredEmail: {
        icon: <MdOutlineMarkEmailRead/>,
        data: 640,
        title: 'Email Delivered',
    },
    openedEmail: {
        icon: <HiOutlineMailOpen/>,
        data: 1200,
        title: 'Email Opened',
    },
    clickedEmail: {
        icon: <MdOutlineMarkEmailUnread/>,
        data: 453,
        title: 'Email Clicked',
    },
    bouncedEmail: {
        icon: <MdOutlineMarkEmailUnread/>,
        data: 343,
        title: 'Email Bounced',
    },
}