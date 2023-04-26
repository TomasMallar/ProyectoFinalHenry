import React, { useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductsAdvanceController } from "../../Redux/Actions/Actions";
import SortingAndFiltering from "../sortingAndFiltering/sortingAndFiltering";
import { Rotate, Fade } from 'react-reveal';
import ModalDetail from "../../Components/ModalDetail/ModalDetail";

const Products = (props) => {
  const dispatch = useDispatch();

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // de acá en adelante andaba todo bien
  useEffect(() => {
    dispatch(getProductsAdvanceController());
  }, [dispatch]);

  let allProducts = useSelector((state) => state.chocolates.products);
  return (
    <>
      <div className=" bg-chocolate-blanco">
        <Rotate top left cascade>
          <div className="w-full h-96 bg-[url('https://homepagereferences.my.canva.site/images/fcbc0bc46f24b9cd4495a011fe1272ba.jpg')] bg-no-repeat bg-center bg-cover opacity-90 block pt-20">
            <h1 className="mb-2.5 text-start font-serif text-5xl text-chocolate-oscuro ml-6 bg-gradient-to-r from-chocolate-mantecol w-fit rounded-lg ">
              SOMOS LOS <br /> REYES DEL <br /> CHOCOLATE
            </h1>
          </div>
        </Rotate>

        <Fade bottom big cascade>
          <h4 className="font-serif text-3xl font-bold mt-7 mb-7 text-chocolate-oscuro">
            Our products:
          </h4>

          <div>
            <SortingAndFiltering />
          </div>

        </Fade>

        <div className="grid grid-cols-1 mb-8 ml-8 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {/* Map each product into a single card using map */}
          {allProducts?.map((product) => {
            return (
              <>
                <ProductCard
                  // as we are receiving info from the api with the "?" we make sure that we are getting the info and the app does not crash
                  key={product?.id}
                  id={product.id}
                  name={product?.name}
                  image={product?.image}
                  category={product?.categories}
                  price={product?.price}
                  score={product?.score}
                  onClick={handleOpenModal}
                />
              </>
            );
          })}
        </div>
        {modalOpen && (
    <ModalDetail onClose={handleCloseModal} selectedProduct={selectedProduct} />
  )}
      </div>

    </>
  );
};

export default Products;
