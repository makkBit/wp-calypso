/**
 * Internal dependencies
 */
import { mergeHandlers } from 'wp-calypso-client/state/action-watchers/utils';
import recentPostViews from './views/posts';
import chartCounts from './visits';
import googleMyBusiness from './google-my-business';

export default mergeHandlers( recentPostViews, googleMyBusiness, chartCounts );
