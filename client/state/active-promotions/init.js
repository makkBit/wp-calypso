/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import activePromotionsReducer from './reducer';

registerReducer( [ 'activePromotions' ], activePromotionsReducer );
