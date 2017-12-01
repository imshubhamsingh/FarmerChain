import { UPDATE_PRODUCT_LIST } from '../Actions/CartFarmAction';


const productList = [];

export default function (state = productList, action) {
  switch (action.type) {
  case UPDATE_PRODUCT_LIST:
    return [
      ...action.updatedProduct
    ];
  default:
    return state;
  }
}