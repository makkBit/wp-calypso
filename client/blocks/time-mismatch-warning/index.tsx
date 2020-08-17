/**
 * External dependencies
 */
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useTranslate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Notice from 'wp-calypso-client/components/notice';
import { withApplySiteOffset, applySiteOffsetType } from 'wp-calypso-client/components/site-offset';
import { useLocalizedMoment } from 'wp-calypso-client/components/localized-moment';

/**
 * Type dependencies
 */
import { getSelectedSiteSlug } from 'wp-calypso-client/state/ui/selectors';

interface ConnectedProps {
	applySiteOffset: applySiteOffsetType;
}

interface ExternalProps {
	status?: string;
}

export const TimeMismatchWarning: FC< ExternalProps & ConnectedProps > = ( {
	applySiteOffset,
	status = 'is-warning',
}: ExternalProps & ConnectedProps ) => {
	const translate = useTranslate();
	const moment = useLocalizedMoment();
	const siteSlug = useSelector( getSelectedSiteSlug );
	const settingsUrl = siteSlug ? `/settings/general/${ siteSlug }` : '#';
	const now = moment();
	const siteOffset = applySiteOffset( now );

	if ( ! siteOffset || now.isSame( siteOffset ) ) {
		return null;
	}

	return (
		<Notice status={ status }>
			{ translate(
				'Looks like your computer time and site time don’t match! ' +
					'We’re going to show you times based on your site. ' +
					'If that doesn’t look right, you can {{SiteSettings}}go here to update it{{/SiteSettings}}.',
				{
					components: {
						SiteSettings: <a href={ settingsUrl } />,
					},
				}
			) }
		</Notice>
	);
};

export default withApplySiteOffset( TimeMismatchWarning );
