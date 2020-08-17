/**
 * Internal dependencies
 */

import { createReducerStore } from 'wp-calypso-client/lib/store';
import {
	reducer,
	initialState,
} from 'wp-calypso-client/lib/invites/reducers/invites-accept-validation';

const InvitesAcceptValidationStore = createReducerStore( reducer, initialState );

InvitesAcceptValidationStore.getInvite = ( siteId, inviteKey ) =>
	InvitesAcceptValidationStore.get().getIn( [ 'list', siteId, inviteKey ] );
InvitesAcceptValidationStore.getInviteError = ( siteId, inviteKey ) =>
	InvitesAcceptValidationStore.get().getIn( [ 'errors', siteId, inviteKey ] );

export default InvitesAcceptValidationStore;
