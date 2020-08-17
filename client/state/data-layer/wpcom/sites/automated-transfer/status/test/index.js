/**
 * External dependencies
 */
import { expect } from 'chai';
import sinon from 'sinon';

/**
 * Internal dependencies
 */
import { requestStatus, receiveStatus } from '../';
import { recordTracksEvent } from 'wp-calypso-client/state/analytics/actions';
import {
	fetchAutomatedTransferStatus,
	setAutomatedTransferStatus,
} from 'wp-calypso-client/state/automated-transfer/actions';
import { http } from 'wp-calypso-client/state/data-layer/wpcom-http/actions';
import { useFakeTimers } from 'wp-calypso-client/test-helpers/use-sinon';

const siteId = 1916284;

const COMPLETE_RESPONSE = {
	blog_id: 1916284,
	status: 'complete',
	uploaded_plugin_slug: 'hello-dolly',
	transfer_id: 1,
};

const IN_PROGRESS_RESPONSE = {
	blog_id: 1916284,
	status: 'uploading',
	uploaded_plugin_slug: 'hello-dolly',
};

describe( 'requestStatus', () => {
	test( 'should dispatch an http request', () => {
		expect( requestStatus( { siteId } ) ).to.eql(
			http(
				{
					method: 'GET',
					path: `/sites/${ siteId }/automated-transfers/status`,
					apiVersion: '1',
				},
				{ siteId }
			)
		);
	} );
} );

describe( 'receiveStatus', () => {
	let clock;
	useFakeTimers( ( fakeClock ) => ( clock = fakeClock ) );

	test( 'should dispatch set status action', () => {
		const dispatch = sinon.spy();
		receiveStatus( { siteId }, COMPLETE_RESPONSE )( dispatch );
		expect( dispatch ).to.have.callCount( 3 );
		expect( dispatch ).to.have.been.calledWith(
			setAutomatedTransferStatus( siteId, 'complete', 'hello-dolly' )
		);
	} );

	test( 'should dispatch tracks event if complete', () => {
		const dispatch = sinon.spy();
		receiveStatus( { siteId }, COMPLETE_RESPONSE )( dispatch );
		expect( dispatch ).to.have.callCount( 3 );
		expect( dispatch ).to.have.been.calledWith(
			recordTracksEvent( 'calypso_automated_transfer_complete', {
				context: 'plugin_upload',
				transfer_id: 1,
				uploaded_plugin_slug: 'hello-dolly',
			} )
		);
	} );

	test( 'should request status again if not complete', () => {
		const dispatch = sinon.spy();
		receiveStatus( { siteId }, IN_PROGRESS_RESPONSE )( dispatch );
		clock.tick( 4000 );

		expect( dispatch ).to.have.been.calledTwice;
		expect( dispatch ).to.have.been.calledWith( fetchAutomatedTransferStatus( siteId ) );
	} );
} );
