import React, { PropTypes } from 'react';
import Well from '../components/well';
import Button from '../components/button';

export default React.createClass({
    propTypes: {
        children: PropTypes.node,
        setSublinks: PropTypes.func
    },

    componentWillMount() {
        this.props.setSublinks([]);
    },


    render() {
        return <div className="home">
            <h1>What is react-formable?</h1>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque neque tortor, sagittis eget mollis vitae, maximus nec tortor. Curabitur rutrum augue at feugiat eleifend. Nullam pretium mauris at erat bibendum, sit amet ullamcorper purus pulvinar. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed vel aliquet ligula, non volutpat metus. Donec id diam arcu. Sed eu nisl a est maximus varius quis varius massa. Ut tempor sodales ante, ut fringilla nisi volutpat ac. Duis ac commodo augue. Aenean id aliquet purus. Fusce consectetur ex tortor, vitae porttitor sem posuere nec. Etiam lacinia non nunc quis tincidunt. Donec aliquet tempor risus vitae molestie.</p>

            <h1>Who can use react-formable</h1>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque neque tortor, sagittis eget mollis vitae, maximus nec tortor. Curabitur rutrum augue at feugiat eleifend. Nullam pretium mauris at erat bibendum, sit amet ullamcorper purus pulvinar. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed vel aliquet ligula, non volutpat metus. Donec id diam arcu. Sed eu nisl a est maximus varius quis varius massa. Ut tempor sodales ante, ut fringilla nisi volutpat ac. Duis ac commodo augue. Aenean id aliquet purus. Fusce consectetur ex tortor, vitae porttitor sem posuere nec. Etiam lacinia non nunc quis tincidunt. Donec aliquet tempor risus vitae molestie.</p>

            <Well>
                <h2>LIKE IT? LOVE IT? WANT TO MARRY IT?</h2>
                <p>Contribute to our repo on GitHub.</p>
                <Button>GITHUB</Button>
            </Well>
        </div>;
    }
});
