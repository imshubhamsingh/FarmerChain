import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './pageshell.css';

const PageShell = Service => {
    return props =>
        <div>
            <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                transitionName="SlideIn"
            >
                <Service {...props} />
            </ReactCSSTransitionGroup>

        </div>;
};

export default PageShell;
