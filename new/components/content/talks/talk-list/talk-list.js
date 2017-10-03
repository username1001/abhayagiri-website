import React, { Component } from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

import Talk from '../talk/talk';
import Pagination from '../../../shared/pagination/pagination';
import CategoryCard from '../../../shared/categories/category-card/category-card';
import Spinner from '../../../shared/spinner/spinner';

import './talk-list.css';

class TalkList extends Component {

    render() {
        let results = this.props.talks,
            totalPages = results && results.totalPages || 1,
            talks = results && results.result || [],
            category = this.props.category,
            isLoading = this.props.isLoading,
            lng = this.props.i18n.language;


        return (
            <div className='talk-list' >
                <div className="row">
                    <div className="col-md-3">
                        {category && <CategoryCard category={this.props.category} />}
                    </div>
                    <div className={"col-md-" + (category ? '9' : '12')}>
                        {<div className={this.props.isLoading ? 'loading' : 'loaded'}>
                            <div className='spinner'>
                                <Spinner />
                            </div>
                            <div className='talks'>
                                {this.props.preamble && (<div>
                                    {this.props.preamble}
                                    <hr />
                                </div>)}
                                {talks.map((talk, index) => {
                                    return <div key={index}><Talk talk={talk} /><hr className='border' /></div>
                                })}
                                <Pagination totalPages={totalPages} />
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

TalkList.propTypes = {
    talks: PropTypes.object,
    category: PropTypes.object,
    preamble: PropTypes.object
};

export default translate('talks')(TalkList);