import { UPDATE_TRANSACTION_LIST } from '../Actions/TransactionAction';


const TransactionList = [];

export default function (state = TransactionList, action) {
  switch (action.type) {
  case UPDATE_TRANSACTION_LIST:
    return [
      ...action.updatedTransactions
    ];
  default:
    return state;
  }
}