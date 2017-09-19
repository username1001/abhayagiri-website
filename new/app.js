//Babel
import 'babel-polyfill';

//React
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//React Router
import { Router, Route, IndexRoute, IndexRedirect, Redirect, browserHistory } from 'react-router';
import applyMiddleware from 'react-router-apply-middleware'
import { useRelativeLinks, RelativeLink } from 'react-router-relative-links'

//i18n
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

//Google Analytics
import ReactGA from 'react-ga';
ReactGA.initialize('UA-34323281-1');

//Pages
import Main from './components/ui/main/main';
import Page from './components/ui/page/page';
import Subpage from './components/ui/subpage/subpage/subpage';

import TalksPage from './components/pages/talks/talks';
import TalksByType from './components/pages/talks/talks-pages/by-type';
import TalksByTeacher from './components/pages/talks/talks-pages/by-teacher';
import TalksBySubject from './components/pages/talks/talks-pages/by-subject';
import TalksByCollection from './components/pages/talks/talks-pages/by-collection';
import TalksById from './components/pages/talks/talks-pages/by-id';
import TalksByQuery from './components/pages/talks/talks-pages/by-query';

import Teachers from './components/widgets/categories/category-pages/teachers';
import Subjects from './components/widgets/categories/category-pages/subjects';
import Collections from './components/widgets/categories/category-pages/collections';

class App extends Component {
    logPageView() {
        ReactGA.set({ page: window.location.pathname + window.location.search });
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    localizedRoutes(path, lng) {
        return (
            <Route path={path} name="Home" component={Main} lng={lng}>
                <IndexRedirect to="talks" />

                {/* About */}
                <Route name="About" path="about" component={Page}>
                    <IndexRedirect to="purpose" />
                    <Route name="Purpose" path="purpose" component={Subpage} />
                    <Route name="A Typical Day" path="a-typical-day" component={Subpage} />
                    <Route name="Origins Of Abhayagiri" path="origins-of-abhayagiri" component={Subpage} />
                    <Route name="Thai Forest Tradition" path="thai-forest-tradition" component={Subpage} />
                    <Route name="Ajahn Chah" path="ajahn-chah" component={Subpage} />
                    <Route name="Western Sangha" path="western-sangha" component={Subpage} />
                </Route>

                {/* Community */}
                <Route name="Community" path="community" component={Page}>
                    <IndexRedirect to="residents" />
                    <Route name="Residents" path="residents" component={Subpage} />
                    <Route name="Pacific Hermitage" path="pacific-hermitage" component={Subpage} />
                    <Route name="Associated Monasteries" path="associated-monasteries" component={Subpage} />
                    <Route name="Monastic Training for Women" path="monastic-training-for-women" component={Subpage} />
                    <Route name="Associated Lay Groups" path="associated-lay-groups" component={Subpage} />
                    <Route name="Upasika Program" path="upasika-program" component={Subpage} />
                    <Route name="Subscribe" path="subscribe" component={Subpage} />
                </Route>

                {/* Support */}
                <Route name="Support" path="support" component={Page}>
                    <IndexRedirect to="ethos" />
                    <Route name="Ethos" path="ethos" component={Subpage} />
                    <Route name="Food & Supplies" path="food-and-supplies" component={Subpage} />
                    <Route name="Volunteer" path="volunteer" component={Subpage} />
                    <Route name="Donations" path="donations" component={Subpage} />
                    <Route name="Dana Wish List" path="dana-wish-list" component={Subpage} />
                    <Route name="Kathina Wishlist" path="kathina-wishlist" component={Subpage} />
                </Route>

                {/* Visiting */}
                <Route name="Visiting" path="visiting" component={Page}>
                    <IndexRedirect to="daily-schedule" />
                    <Route name="Daily Schedule" path="daily-schedule" component={Subpage} />
                    <Route name="Day Visits" path="day-visits" component={Subpage} />
                    <Route name="Directions" path="directions" component={Subpage} />
                    <Route name="Overnight Stays" path="overnight-stays" component={Subpage} />
                    <Route name="Transportation" path="transportation" component={Subpage} />
                    <Route name="Eight Precepts" path="eight-precepts" component={Subpage} />
                    <Route name="Monastery Etiquette" path="monastery-etiquette" component={Subpage} />
                    <Route name="FAQ" path="faq" component={Subpage} />
                </Route>

                {/* Talks */}
                <Route name="Talks" path="talks" component={TalksPage}>
                    <IndexRedirect to="talks/types" />

                    <Route name="Search" path="search/:query" component={TalksByQuery} />

                    {/* Latest */}
                    <Route name="Latest" path="types/:typeId" component={TalksByType} />
                    <Redirect from="types" to="types/2-dhamma-talks" />

                    {/* Teachers */}
                    <Route name="Teachers" path="teachers" component={Teachers} />
                    <Route name="Teachers" path="teachers/:authorId" component={TalksByTeacher} />

                    {/* Subjects */}
                    <Route name="Subjects" path="subjects" component={Subjects} />
                    <Route name="Subjects" path="subjects/:subjectGroupId(/:subjectId)" component={TalksBySubject} />

                    {/* Collections */}
                    <Route name="Collections" path="collections" component={Collections} />
                    <Route name="Collections" path="collections/:playlistGroupId(/:playlistId)" component={TalksByCollection} />

                    {/* Older route redirects */}
                    <Redirect from="latest" to="types/2-dhamma-talks" />
                    <Redirect from="by-type" to="types" />
                    <Redirect from="by-type/:talkTypeId" to="types/:talkTypeId" />
                    <Redirect from="by-teacher" to="teachers" />
                    <Redirect from="by-teacher/:authorId" to="teachers/:authorId" />
                    <Redirect from="by-subject" to="subjects" />
                    <Redirect from="by-subject/:subjectGroupId" to="subjects/:subjectGroupId" />
                    <Redirect from="by-subject/:subjectGroupId/:subjectId" to="subjects/:subjectGroupId/:subjectId" />
                    <Redirect from="by-collection" to="collections" />
                    {/* This one has no simple redirect scheme, so we just send them here. */}
                    <Redirect from="by-collection/:playlistId" to="collections" />
                    <Redirect from="by-collection/:playlistGroupId/:playlistId" to="collections/:playlistGroupId/:playlistId" />

                    <Route name="Talk" path=":talkId" component={TalksById} />
                </Route>
            </Route>
        );
    }

    render() {
        return (
            <I18nextProvider i18n={i18n}>
                <Router
                    history={browserHistory}
                    onUpdate={this.logPageView}
                    render={applyMiddleware(useRelativeLinks())}>
                    {this.localizedRoutes('/new', 'en')}
                    {this.localizedRoutes('/new/th', 'th')}
                </Router>
            </I18nextProvider>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));

export default App;
