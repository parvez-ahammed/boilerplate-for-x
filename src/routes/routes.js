
import { getAboutDetails } from '../controllers/about.js';


const routes = [
    { method: 'GET', path: '/hello', handler: getAboutDetails },
]

export { routes };