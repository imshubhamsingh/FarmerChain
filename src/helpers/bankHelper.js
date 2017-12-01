export const colorStatus = (status, rejected, granted, waiting, paid)=>{
    if(status === "rejected") return rejected;
    else if ( status === "granted") return granted;
    else if (status === "waiting") return waiting;
    else return paid
}