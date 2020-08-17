/**
 * Internal dependencies
 */

import { createReducerStore } from 'wp-calypso-client/lib/store';
import { reducer, initialState } from 'wp-calypso-client/lib/invites/reducers/invites-sent';

const InvitesSentStore = createReducerStore( reducer, initialState );

InvitesSentStore.getSuccess = ( formId ) => InvitesSentStore.get().successes[ formId ];
InvitesSentStore.getErrors = ( formId ) => InvitesSentStore.get().errors[ formId ];

export default InvitesSentStore;
