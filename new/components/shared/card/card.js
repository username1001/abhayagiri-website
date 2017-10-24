import React, { Component } from 'react';
import Link from 'components/shared/link/link';

import './card.css';

class Card extends Component {
    constructor() {
        super();
        this.state = {
            showCategories: false
        }
    }

    toggleCategories() {
        this.setState({
            showCategories: !this.state.showCategories
        })
    }

    render() {
        return (
            <div>
                <div className={"card hidden-sm-down " + (this.props.listItem && "card-list-item")}>
                    <img className="card-img-top" src={this.props.thumbnail} />
                    <div className="card-block card-title">
                        <span >{this.props.title}</span>
                    </div>
                    {this.props.links && <ul className="list-group list-group-flush">
                        {this.props.links.map((link, index) => {
                            return (
                                <li key={index} className={"list-group-item " + (link.active ? 'active' : '')}>
                                    <Link to={link.href}>{link.title}</Link>
                                </li>
                            );
                        })}
                    </ul>}
                </div>

                {!this.props.listItem && <div className="card card-mobile hidden-md-up">
                    <div className="card-block">
                        <div className="row">
                            <div className="col-xs-3">
                                <img className="card-img-mobile" src={this.props.thumbnail} />
                            </div>
                            <div className="col-xs-9">
                                <h4 className="card-title">{this.props.title}</h4>
                                {this.props.subtitle && <div className="card-title">{this.props.subtitle}</div>}
                                {this.props.links && <div className={"dropdown " + (this.state.showCategories && 'show')}>
                                    <button
                                        onClick={this.toggleCategories.bind(this)}
                                        className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Subcategories
                </button>
                                    <div className="dropdown-menu" >
                                        {this.props.links.map((link, index) => {
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
                </div>}
            </div>
        );
    }
}

export default Card;