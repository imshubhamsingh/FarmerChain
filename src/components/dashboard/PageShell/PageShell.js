import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './pageshell.css';

const PageShell = (Service, web3,...args) => {
    return props =>
        <div>
            <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                transitionName="SlideIn"
            >
                {args.length===0?<Service {...props} web3={web3} />:<Service {...props} web3={web3} contractInstance={args[0]}/>}

            </ReactCSSTransitionGroup>

        </div>;
};

export default PageShell;
