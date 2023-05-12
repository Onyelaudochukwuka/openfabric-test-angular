/**
 * Express router paths go here.
 */

import { Immutable } from '@src/other/types';


const Paths = {
  Base: '/api',
  Product: {
    Base: '/product',
    Get: '/all',
    GetById: '/item/:id',
    Search: '/search',
    Add: '/add',
    Update: '/update/:id',
    Delete: '/delete/:id',
    Rate: '/rate/:id',
  },
  Users: {
    Base: '/user',
    Register: '/register',
    Login: '/login',
    Validate: '/validate',
    History: '/get-history',
    AddHistory: '/add-history',
  },
};


// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
