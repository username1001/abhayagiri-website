import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import { withBreadcrumbs } from 'components/ui/breadcrumb/breadcrumb';
import { withGlobals } from 'components/shared/globals/globals';
import { tp } from 'i18n';
import TalkList from 'components/content/talks/talk-list/talk-list';
import AuthorService from 'services/author.service';
import TalkService from 'services/talk.service';

class TalksByTeacher extends Component {

    static propTypes = {
        page: PropTypes.number.isRequired,
        params: PropTypes.object.isRequired,
        searchText: PropTypes.string.isRequired,
        setBreadcrumbs: PropTypes.func.isRequired,
        t: PropTypes.func.isRequired
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            author: null,
            talks: null,
            isLoading: true
        }
    }

    componentDidMount() {
        this.updateBreadcrumbs();
        this.fetchData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.fetchData(nextProps)
    }

    async fetchData(props) {
        this.setState({
            isLoading: true
        });
        const author = await this.fetchAuthor(props);
        this.fetchTalks(author, props);
    }

    async fetchAuthor(props) {
        const author = await AuthorService.getAuthor(props.params.authorId);
        this.setState({ author }, this.updateBreadcrumbs);
        return author;
    }

    async fetchTalks(author, props) {
        const talks = await TalkService.getTalks({
            searchText: props.searchText,
            page: props.page,
            pageSize: 10,
            authorId: author.id
        });

        this.setState({
            talks: talks,
            isLoading: false
        });
    }

    updateBreadcrumbs = () => {
        this.props.setBreadcrumbs(() => {
            const { author } = this.state;
            return [
                {
                    title: this.props.t('teachers'),
                    to: '/talks/teachers'
                },
                author ? {
                    title: tp(author, 'title'),
                    to: author.talksPath
                } : null
            ];
        });
    }

    getCategory() {
        const { author } = this.state;
        if (author) {
            return {
                imageUrl: author.imageUrl,
                title: tp(author, 'title'),
            };
        } else {
            return null;
        }
    }

    render() {
        return (
                <TalkList
                    isLoading={this.state.isLoading}
                    talks={this.state.talks}
                    category={this.getCategory()}
                />
        );
    }
}

export default translate('talks')(
    withBreadcrumbs(
        withGlobals(TalksByTeacher, ['page', 'searchText'])
    )
);
