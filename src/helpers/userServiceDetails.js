export const countAcceptedPool = (pools, user) =>{
    let poolAccepted = 0;
    pools!==null?pools.map((pool)=> {
        let flags = false;
        if (pool.userId !== user.uid) {
            for (const userId in pool.acceptedBy) {
                if (pool.acceptedBy[userId].uid === user.uid) {
                    flags = true
                    break
                }
            }
            return (!flags)?null:poolAccepted++
        }
        return null;
    }):''
    return poolAccepted
}

export const orderProducts = (products, user) => {
    let orderProducts = 0;
    products!==null?products.map((product)=> {
        if(product.userId === user.uid){
            return orderProducts++;
        }
        return null;
    }):''
    return orderProducts
}