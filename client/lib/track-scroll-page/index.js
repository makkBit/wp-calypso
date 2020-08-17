/**
 * Internal dependencies
 */
import { recordPageView } from 'wp-calypso-client/lib/analytics/page-view';
import { bumpStat } from 'wp-calypso-client/lib/analytics/mc';
import { gaRecordEvent } from 'wp-calypso-client/lib/analytics/ga';

export default function ( path, title, category, page ) {
	gaRecordEvent( category, 'Loaded Next Page', 'page', page );
	recordPageView( path, title );
	bumpStat( 'newdash_pageviews', 'scroll' );
}
