export const countAcceptedPool = (pools, user) =>{
  let poolAccepted = 0;
  pools!==null?pools.map((pool)=> {
    let flags = false;
    if (pool.userId !== user.uid) {
      for (const userId in pool.acceptedBy) {
        if (pool.acceptedBy[userId].uid === user.uid) {
          flags = true;
          break;
        }
      }
      return (!flags)?null:poolAccepted++;
    }
    return null;
  }):'';
  return poolAccepted;
};

export const orderProducts = (products, user) => {
  let orderProducts = 0;
  products!==null?products.map((product)=> {
    if(product.userId === user.uid){
      return orderProducts++;
    }
    return null;
  }):'';
  return orderProducts;
};


export const transactionDone = (transactions, userID) => {
  let transactionDone = 0;
  if (transactions !== null || transactions !== undefined){
    transactions.map((transaction)=> {
      if (transaction.from.uid === userID) {
        transactionDone++;
      }
      return null;
    });
    return transactionDone;
  }else return '';
};

export const transactionReceived = (transactions, userID) => {
  let transactionReceived = 0;
  if (transactions !== null || transactions !== undefined){
    transactions.map((transaction)=> {
      if (transaction.to.uid === userID) {
        transactionReceived++;
      }
    });
    return transactionReceived;
  }else return '';
};