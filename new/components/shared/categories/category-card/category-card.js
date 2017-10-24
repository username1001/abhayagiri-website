import React, { Component } from 'react';
import Link from 'components/shared/link/link';
import Card from 'components/shared/card/card';

import './category-card.css';

class CategoryItem extends Component {
    constructor() {
        super();
        this.state = {
            showCategories: false
        }
    }

    isActive(title) {
        return this.context.pageName === title ? 'nav-link active' : 'nav-link';
    }

    toggleCategories() {
        this.setState({
            showCategories: !this.state.showCategories
        })
    }

    render() {
        let category = this.props.category;
        let subcategory = null;

        if (category.links) {
            subcategory = category.links.filter(link => link.active === true)[0];
        }
        return (
            <div>
                <Card
                    className="hidden-sm-down"
                    thumbnail={category.imageUrl}
                    title={category.title}
                    links={category.links}>
                </Card>

                <div className="card card-mobile hidden-md-up">
                    <div className="card-block">
                        <div className="row">
                            <div className="col-xs-3">
                                <img className="card-img-mobile" src={category.imageUrl} />
                            </div>
                            <div className="col-xs-9">
                                <h4 className="card-title">{category.title}</h4>
                                {subcategory && <div className="card-title">{subcategory.title}</div>}
                                {category.links && <div className={"dropdown " + (this.state.showCategories && 'show')}>
                                    <button
                                        onClick={this.toggleCategories.bind(this)}
                                        className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Subcategories
                                    </button>
                                    <div className="dropdown-menu" >
                                        {category.links.map((link, index) => {
                                            return (
                                                <Link
                                                    key={index}
                                                    className={"dropdown-item " + (link.active && "active")}
                                                    onClick={this.jumpToNav}
                                                    to={link.href}>
                                                    {link.title}
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryItem;