/**
 * External dependencies
 */

import PropTypes from 'prop-types';
import React from 'react';

/**
 * Internal Dependencies
 */
import { connect } from 'react-redux';
import QueryReaderTeams from 'wp-calypso-client/components/data/query-reader-teams';
import QueryBlogStickers from 'wp-calypso-client/components/data/query-blog-stickers';
import getBlogStickers from 'wp-calypso-client/state/selectors/get-blog-stickers';
import { getReaderTeams } from 'wp-calypso-client/state/reader/teams/selectors';
import BlogStickersList from 'wp-calypso-client/blocks/blog-stickers/list';
import InfoPopover from 'wp-calypso-client/components/info-popover';
import { isAutomatticTeamMember } from 'wp-calypso-client/reader/lib/teams';

/**
 * Style dependencies
 */
import './style.scss';

const BlogStickers = ( { blogId, teams, stickers } ) => {
	const isTeamMember = isAutomatticTeamMember( teams );
	if ( teams && ! isTeamMember ) {
		return null;
	}

	return (
		<div className="blog-stickers">
			<QueryBlogStickers blogId={ blogId } />
			{ isTeamMember && stickers && stickers.length > 0 && (
				<InfoPopover>
					<BlogStickersList stickers={ stickers } />
				</InfoPopover>
			) }
			{ ! teams && <QueryReaderTeams /> }
		</div>
	);
};

BlogStickers.propTypes = {
	blogId: PropTypes.number.isRequired,
};

export default connect( ( state, { blogId } ) => ( {
	teams: getReaderTeams( state ),
	stickers: getBlogStickers( state, blogId ),
} ) )( BlogStickers );
