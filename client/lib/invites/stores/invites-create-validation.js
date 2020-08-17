/**
 * Internal dependencies
 */

import { createReducerStore } from 'wp-calypso-client/lib/store';
import {
	reducer,
	initialState,
} from 'wp-calypso-client/lib/invites/reducers/invites-create-validation';

const InvitesCreateValidationStore = createReducerStore( reducer, initialState );

InvitesCreateValidationStore.getSuccess = ( siteId, role ) =>
	InvitesCreateValidationStore.get().getIn( [ 'success', siteId, role ] );
InvitesCreateValidationStore.getErrors = ( siteId, role ) =>
	InvitesCreateValidationStore.get().getIn( [ 'errors', siteId, role ] );

export default InvitesCreateValidationStore;
