/**
 * Internal dependencies
 */
import { createReducerStore } from 'wp-calypso-client/lib/store';
import { initialDomainState, reducer } from './reducer';

const WapiDomainInfoStore = createReducerStore( reducer, {} );

WapiDomainInfoStore.getByDomainName = function ( domainName ) {
	const state = this.get();

	return ( state && state[ domainName ] ) || initialDomainState;
};

export default WapiDomainInfoStore;
