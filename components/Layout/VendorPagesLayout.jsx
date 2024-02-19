import Tabs from "./Tabs"

const VendorPageLayout = ({navs, searchBar,children}) => {
    return (
        <main className='space-y-8'>
            <Tabs navs={navs}/>

            <div className="bg-light100 rounded-lg space-y-8 py-8 ">
                {searchBar}
            </div>

            <div className="bg-light100 rounded-lg py-8">
                {children}
            </div>
        </main>
        )
    }
export default VendorPageLayout