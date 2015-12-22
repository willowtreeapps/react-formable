import React, { PropTypes } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import Footer from './footer';

const headerHeight = 100;
const footerHeight = 100;

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
        children: PropTypes.node
    },

    getInitialState() {
        return {
            subLinks: []
        };
    },

    componentDidMount() {
        window.addEventListener('scroll', () => this.forceUpdate());
        window.addEventListener('resize', () => this.forceUpdate());
    },

    componentDidUnMount() {
        window.removeEventListener('scroll', () => this.forceUpdate());
        window.removeEventListener('resize', () => this.forceUpdate());
    },

    setSublinks(subLinks) {
        this.setState({ subLinks });
    },

    render() {
        const scrollTop = window.pageYOffset;
        const totalHeight = documentHeight();
        const scrollBottom = window.innerHeight + window.pageYOffset;

        const headerVisible = headerHeight - scrollTop > 0;
        const footerVisible = totalHeight - scrollBottom < footerHeight;
        const bottom = Math.abs(totalHeight - scrollBottom - footerHeight);

        return <div className="app" onScroll={this.onScroll}>
            <Header />

            <div style={{ position: 'relative', minHeight: '100%' }}>
                <Sidebar subLinks={this.state.subLinks} style={{
                    position: headerVisible ? 'absolute' : 'fixed',
                    top: 0,
                    bottom: footerVisible ? bottom : 0
                }}/>

                <div className="app-content">
                    {React.cloneElement(this.props.children, {
                        setSublinks: this.setSublinks
                    })}
                </div>
            </div>

            <Footer />
        </div>;
    }
});
