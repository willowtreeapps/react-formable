import React, { PropTypes } from 'react';
import Header from './header';
import Sidebar from './sidebar';

export default React.createClass({
    propTypes: {
        children: PropTypes.node
    },

    getInitialState() {
        return {
            subLinks: []
        };
    },

    setSublinks(subLinks) {
        this.setState({ subLinks });
    },

    render() {
        return <div className="app">
            <Header />

            <div className="app-inner">
                <Sidebar subLinks={this.state.subLinks} />

                <div className="app-content">
                    {React.cloneElement(this.props.children, {
                        setSublinks: this.setSublinks
                    })}
                </div>
            </div>
        </div>;
    }
});
