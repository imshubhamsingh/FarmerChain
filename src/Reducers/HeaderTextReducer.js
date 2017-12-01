import { UPDATE_HEADER } from '../Actions/HeaderTextAction';


const Header = 'Home';

export default function (state = Header, action) {
  switch (action.type) {
  case UPDATE_HEADER:
    return action.text;
  default:
    return state;
  }
}