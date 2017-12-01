import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

export default process.env.BROWSER ? createBrowserHistory() : createMemoryHistory();