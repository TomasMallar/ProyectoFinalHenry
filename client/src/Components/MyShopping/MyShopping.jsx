import React from 'react';
import { getUserOrder } from '../../Redux/Actions/Actions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './MyShopping.module.css';
import { Link } from 'react-router-dom';

const MyShopping = () => {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const id = sessionStorage.getItem('id');
  const [page, setPage] = useState(1);
  const { orders, totalPages } = order;
console.log(orders);
  useEffect(() => {
    dispatch(getUserOrder(id, page));
  }, [page]);

  const handlePage = (e) => {
    setPage(e.target.value);
  };

  const buttonVisible = () => {
    const buttons = [];
    for (let i = 1; i < totalPages + 1; i++) {
      buttons.push(i);
    }
    return buttons;
  };

  return (
    <div className={style.container}>
      {/* <Link to='/myprofile'>My Profile</Link> */}
      <h2 className={style.title}>MY SHOPPINGS</h2>
      <div className={style.divInfo}>
        {Array.isArray(orders) &&
          orders.flatMap((el) => (
            <div className={style.dataOrders}>
              <div>
                <h2 className={style.titleSub}>Número de orden</h2>
                <p className={style.statusId}>{el.id}</p>
                <hr />
                <h2 className={style.titleSub}>Estado</h2>
                <h3 className={style.statusId}>{el.status}</h3>
              </div>
              <hr />
              {el.items?.flatMap((item) => (
                <div>
                  <h2 className={style.titleSub}>Producto</h2>
                  <div className={style.divProduct}>
                    <div>
                      <p className={style.titleProduct}>Nombre</p>
                      <p className={style.textProduct}>{item.product.name}</p>
                    </div>
                    <div>
                      <p className={style.titleProduct}>Precio</p>
                      <p className={style.textProduct}>$ {item.product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div>
                <hr />
                <h2 className={style.titleSub}>Total</h2>
                <h3 className={style.statusId}>$ {el.total}</h3>
              </div>
            </div>
          ))}
      </div>
      <div>
        {buttonVisible().map((pageCurrent) => (
          <button value={pageCurrent} onClick={handlePage} className={style.button}>
            {pageCurrent}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyShopping;
