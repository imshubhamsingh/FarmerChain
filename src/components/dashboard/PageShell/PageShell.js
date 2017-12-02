import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './pageshell.css';

const PageShell = (Service, web3) => {
    return props =>
        <div>
            <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                transitionName="SlideIn"
            >
                <Service {...props} web3={web3} />
            </ReactCSSTransitionGroup>

        </div>;
};

export default PageShell;
