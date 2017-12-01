export function extractUserDetails(user) {
  return {
    displayName: user.displayName,
    email: user.email,
    uid: user.uid
  };
}

export function transactionDetailsSorted(transactions, userID, type) {
  let transactionList = [];
  if (transactions !== null || transactions !== undefined){
    for( const transactionID in transactions){
      if(transactions[transactionID].type === type && (transactions[transactionID].to.uid === userID || transactions[transactionID].from.uid === userID )){
        if(type === 'product'){
          transactionList.push({
            time:transactions[transactionID].time,
            id: transactions[transactionID].info.id,
            from: {
              displayName:transactions[transactionID].from.displayName,
              uid:transactions[transactionID].from.uid
            },
            to:{
              displayName:transactions[transactionID].to.displayName,
              uid:transactions[transactionID].to.uid
            },
            info: {
              productName: transactions[transactionID].info.productName,
              quantity: transactions[transactionID].info.quantity,
              price: transactions[transactionID].info.price
            }
          });
        }else{
          transactionList.push({
            time:transactions[transactionID].time,
            id: transactions[transactionID].info.id,
            from: {
              displayName:transactions[transactionID].from.displayName,
              uid:transactions[transactionID].from.uid
            },
            to:{
              displayName:transactions[transactionID].to.displayName,
              uid:transactions[transactionID].to.uid
            },
            info: {
              amount: transactions[transactionID].info.amount
            }
          });
        }

      }
    }
  }
  const FinalList =  transactionList.sort((a,b)=>{
    return new Date(b.time) - new Date(a.time);
  });

  return FinalList;
}