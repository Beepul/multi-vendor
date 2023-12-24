import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { deleteProductAsync, getAllProductsAsync } from "../../redux/actions/product";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import ShopHeader from "./Header";
import ShopSideBar from "./SideBar";
import Loader from "../../components/Loader";


const ShopAllProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.product);
  const { shop } = useSelector((state: RootState) => state.shop);


  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 120,
      flex: 1.4,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 120,
      flex: 1.4,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 180,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => {
                dispatch(deleteProductAsync(params.id.toString()))
            }}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <ShopHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <ShopSideBar active={3} />
        </div>
        <div className="w-full justify-center flex">
          {loading === "pending" ? (
            <Loader />
          ) : (
            <div className="w-full mx-8 pt-1 mt-10 bg-white">
              <DataGrid
                rows={products
                  .filter((product) => product.shopId === shop?._id)
                  .map((product) => ({
                    id: product._id!,
                    name: product.name,
                    price: "US$ " + product.discountPrice,
                    Stock: product.stock,
                  }))}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopAllProducts;