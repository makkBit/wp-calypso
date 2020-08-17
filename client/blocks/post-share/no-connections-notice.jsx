/**
 * External dependencies
 */
import React from 'react';
import { useTranslate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Notice from 'wp-calypso-client/components/notice';
import NoticeAction from 'wp-calypso-client/components/notice/notice-action';

const NoConnectionsNotice = ( { siteSlug } ) => {
	const translate = useTranslate();

	return (
		<Notice
			status="is-warning"
			showDismiss={ false }
			text={ translate( 'Connect an account to get started.' ) }
		>
			<NoticeAction href={ `/marketing/connections/${ siteSlug }` }>
				{ translate( 'Settings' ) }
			</NoticeAction>
		</Notice>
	);
};

export default NoConnectionsNotice;
