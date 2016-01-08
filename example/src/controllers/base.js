import React, { PropTypes } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import Footer from './footer';

const headerHeight = 88;
const footerHeight = 160;

const links = [
    { link: 'getting-started', title: 'Getting Started' },
    { link: 'guides', title: 'Guides' },
    { link: 'examples', title: 'Examples' },
    { link: 'api', title: 'API' }
];

const documentHeight = function documentHeight() {
    return Math.max(
        document.documentElement.clientHeight,
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
    );
}

export default React.createClass({
    propTypes: {
        children: PropTypes.node,
        location: PropTypes.object
    },

    getInitialState() {
        return {
            subLinks: [],
            activeSublink: ''
        };
    },

    componentDidMount() {
        window.addEventListener('scroll', () => this.forceUpdate());
        window.addEventListener('resize', () => this.forceUpdate());

        // TODO: On the index route the sidebar doesn't render correctly.
        // This hack keeps it rendering... for now.
        window.scrollTo(1, 1);
    },

    componentDidUnMount() {
        window.removeEventListener('scroll', () => this.forceUpdate());
        window.removeEventListener('resize', () => this.forceUpdate());
    },

    setSublinks(subLinks) {
        this.setState({ subLinks });
    },

    setActiveSublink(activeSublink) {
        this.setState({ activeSublink });
    },

    render() {
        const scrollTop = window.pageYOffset;
        const totalHeight = documentHeight();
        const scrollBottom = window.innerHeight + window.pageYOffset;
        const headerVisible = headerHeight - scrollTop > 0;
        const footerVisible = totalHeight - scrollBottom < footerHeight;

        let style = {};

        style.position = (headerVisible || footerVisible) ? 'absolute' : 'fixed';
        if (footerVisible && !headerVisible) style.top = totalHeight - window.innerHeight - footerHeight - headerHeight;

        return <div className="app" onScroll={this.onScroll}>
            <Header />

            <div style={{ position: 'relative', minHeight: '100%' }}>
                <Sidebar links={links}
                         subLinks={this.state.subLinks} style={style}
                         activePath={this.props.location.pathname}
                         activeSublink={this.state.activeSublink} />

                <div className="app-content">
                    {React.cloneElement(this.props.children, {
                        setSublinks: this.setSublinks,
                        setActiveSublink: this.setActiveSublink
                    })}
                </div>
            </div>

            <Footer />
        </div>;
    }
});
