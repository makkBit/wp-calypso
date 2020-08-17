/**
 * Internal dependencies
 */
import getHasAvailableConciergeSessions from 'wp-calypso-client/state/selectors/get-concierge-has-available-sessions';

describe( 'getHasAvailableConciergeSessions()', () => {
	test( 'should be defaulted to null.', () => {
		expect( getHasAvailableConciergeSessions( {} ) ).toBeNull();
	} );

	test( 'should return the has available concierge sessions state value.', () => {
		const hasAvailableConciergeSessions = true;

		const state = {
			concierge: {
				hasAvailableConciergeSessions,
			},
		};

		expect( getHasAvailableConciergeSessions( state ) ).toEqual( hasAvailableConciergeSessions );
	} );
} );
