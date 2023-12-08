import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Pagination from "react-js-pagination";

const List = ({
  inventoryList,
  onDelete,
  onPageChange,
  pageLimit,
  activePage,
  totalData,
  onUpdateInventory,
}) => {
  const route = useRouter();

  return (
    <div className="order-table inventory-table">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Product Name</th>
              <th scope="col">Group</th>
              <th scope="col">Product Type</th>
              <th scope="col">Price</th>
              <th scope="col">Sale Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">In Stock</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {inventoryList.map((item) => {
              return (
                <tr key={`key_${item.id}`}>
                  <th scope="row">
                    {item?.image?.thumbnail ? (
                      <Image
                        src={item?.image?.thumbnail}
                        alt=""
                        height={50}
                        width={50}
                      />
                    ) : null}
                  </th>
                  <td>{item.name}</td>
                  {/* <td>{item.type.name}</td> */}
                  <td>{item.product_type}</td>
                  <td>{item.price}</td>
                  <td>{item.sale_price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.in_stock}</td>
                  <td style={{ color: "#76a713" }}>{item.status}</td>
                  <td className="actions">
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => {
                        route.push({
                          pathname: "/inventory/edit",
                          query: { slug: item.slug },
                        });
                      }}
                      // onClick={onUpdateInventory}
                    >
                      EDIT
                    </button>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => {
                        onDelete(item.id);
                      }}
                    >
                      DELETE
                    </button>
                    <button type="button" className="btn btn-dark">
                      PROMOTION
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {totalData > pageLimit && (
        <Pagination
          itemClass="page-item"
          linkClass="page-link"
          activePage={activePage}
          itemsCountPerPage={pageLimit}
          totalItemsCount={totalData}
          pageRangeDisplayed={5}
          onChange={onPageChange}
        />
      )}
    </div>
  );
};

export default List;
