/**
 * This file contains the client-side logic for initiating the payment process. 
 * It uses the StripeCheckout component to handle the payment UI and sends the payment information to the server.
 */

import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import './payments.css';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {

        return (
            <StripeCheckout 
              name = "Emaily"
              description="$5 for 5 email credits"
              amount={500}
              token={token => this.props.handleToken(token)}
              stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="add-credits-button">
                    Add Credits
                </button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);