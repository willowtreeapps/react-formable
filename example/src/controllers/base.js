import React, { PropTypes } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import Footer from './footer';

const headerHeight = 100;
const footerHeight = 100;

function documentHeight() {
    return Math.max(
        document.documentElement.clientHeight,
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
    );
}

// http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
// const isElementVisible = function isElementVisible(el) {
//     const rect = el.getBoundingClientRect();
//     const vWidth = window.innerWidth || document.documentElement.clientWidth;
//     const vHeight = window.innerHeight || document.documentElement.clientHeight;
//     const efp =  (x, y) => document.elementFromPoint(x, y)
//
//     // Return false if it's not in the viewport
//     if (rect.right < 0 || rect.bottom < 0
//             || rect.left > vWidth || rect.top > vHeight)
//         return false;
//
//     // Return true if any of its four corners are visible
//     return (
//           el.contains(efp(rect.left,  rect.top))
//       ||  el.contains(efp(rect.right, rect.top))
//       ||  el.contains(efp(rect.right, rect.bottom))
//       ||  el.contains(efp(rect.left,  rect.bottom))
//     );
// }


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
