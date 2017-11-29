import { UPDATED_LOAN_LIST} from '../Actions/FarmerBankAction';


const LoanList = [];

export default function (state = LoanList, action) {
    switch (action.type) {
        case UPDATED_LOAN_LIST:
            return [
                ...action.updatedLoanList
            ]
        default:
            return state;
    }
}