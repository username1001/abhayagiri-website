import React, { Component } from 'react';
import { translate } from 'react-i18next';

import ContactService from 'services/contact.service';
import ReCAPTCHA from 'react-google-recaptcha';
import swal from 'sweetalert2';
import './contact.css';

export class Contact extends Component {
    constructor () {
        super();

        this.state = {
            name: '' ,
            email: '' ,
            message: '',
            'g-recaptcha-response': '',
            loading: false,
            formIsFullyFilled: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleReCaptchaChange = this.handleReCaptchaChange.bind(this);
        this.buttonDisabled = this.buttonDisabled.bind(this);
        this.send = this.send.bind(this);
        this.clear = this.clear.bind(this);
    }

    handleChange (field, event) {
        let newState = {};
        newState[field] = event.target.value;
        newState.formIsFullyFilled = this.state.name !== '' && this.state.email !== '' && this.state.message !== '';

        this.setState(newState);
    }

    handleReCaptchaChange (value) {
        this.setState({
            'g-recaptcha-response': value,
        });
    }

    clear () {
        this.resetForm();
     }

    async send (event) {
        event.preventDefault();

        this.setState({ loading: true });

        let response = await ContactService.send(this.state);

        if (response.success === true) {
            swal({
                type: 'success',
                title: 'Message sent',
                text: response.message
            });

            this.resetForm();
        } else {
            let errors = Object.keys(response.errors).reduce((content, index) => {
                return content + response.errors[index].join("\n") + "\n";
            }, '');

            swal({
                type: 'error',
                title: 'Whoops',
                text: errors
            });

            this.setState({ loading: false });
        }
    }

    resetForm () {
        window.grecaptcha.reset();

        this.setState({
            name: '',
            email: '',
            message: '',
            formIsFullyFilled: false,
            loading: false
        });
    }

    buttonDisabled () {
        return this.state.loading || ! this.state.formIsFullyFilled;
    }

    render () {
        let disabled = this.state.loading;

        return (
            <div className='contact container'>
                <form onSubmit={this.send} className="form-horizontal">
                    <legend>Contact Form</legend>

                    <p>Please use this page to contact the monastery. We do ask, however, that you read through the website thoroughly before asking any questions.</p>
                    <p>In addition, before contacting Abhayagiri, please take note of the following:</p>
                    <p>Due to a high volume of emails, we are unable to respond to general questions about Buddhism whether these concern school projects, college research or are of general interest. Short, specific questions about our monastery and tradition, however, are welcome.</p>
                    <p>We are not able to provide spiritual or pastoral counseling via email or telephone.</p>
                    <p>If inquiring about an overnight stay please use this contact form to make your inquiry.</p>
                    <p>Please keep in mind the following notes concerning overnight stays: First time guests may stay for one week if coming from northern California, ten days if coming from southern California or out of state, or two weeks if coming from outside the country. We encourage first time guests to stay for at least three nights.</p>
                    <p>For April 1st - Dec. 24th: When writing to request an overnight stay, please include your age, gender, physical restrictions of any kind, where you are traveling from and briefly describe your experience with meditation, following precepts, previous stays in a monastery and information about any medication you take for physical or mental well being. If you are easily accessible by phone, it may also be helpful to provide us with your phone number.</p>
                    <p>For Dec. 25th - March 31st: We do not accept overnight guests during this time.</p>
                    <p>Current guest accommodation availability:</p>
                    <p>The accommodations allocated for guests are full for during the remainder of this calendar year (2017).</p>
                    <p>The monastery will not be accepting overnight guests during the months of January, February, and March 2018. If interested in visiting in April 2018 or after, please contact the monastery on April 1st, 2018.</p>
                    <p>Please do not make reservations more than two months in advance of the date you wish to arrive.</p>
                    <p>After receiving your reservation request we will usually respond within five days.</p>
                    <p>Finally, we ask that you please do not request a reservation unless you have a sincere commitment to follow through.</p>
                    <p>
                        Thank you for your consideration,<br/>
                        The Abhayagiri Saṅgha
                    </p>

                    <div className='form-group row'>
                        <label className='control-label col-md-2 text-right' htmlFor="name"><b>Name</b></label>
                        <div className='col-md-6'>
                            <input type="text" id="name" placeholder="Name" className='form-control' disabled={this.state.loading} value={this.state.name} onChange={this.handleChange.bind(this, 'name')} required />
                        </div>
                    </div>

                    <div className='form-group row'>
                        <label className='control-label col-md-2 text-right' htmlFor="inputIcon"><b>Email address</b></label>
                        <div className='col-md-6'>
                            <div className='input-prepend'>
                                <span className='add-on'><i className='icon-envelope'></i></span>
                                <input className='form-control' type="email" placeholder="Email" disabled={this.state.loading} value={this.state.email} onChange={this.handleChange.bind(this, 'email')} required />
                            </div>
                        </div>
                    </div>

                    <div className='form-group row'>
                        <label className='control-label col-md-2 text-right' htmlFor="email"><b>Message</b></label>
                        <div className='col-md-6'>
                            <textarea id="message" rows="12" className='form-control' disabled={this.state.loading} value={this.state.message} onChange={this.handleChange.bind(this, 'message')} required></textarea>
                        </div>
                    </div>

                    <div className='form-group row'>
                        <label className='control-label col-md-2 text-right'></label>
                        <div className='col-md-6'>
                            <ReCAPTCHA
                                ref="recaptcha"
                                sitekey={process.env.NOCAPTCHA_SITEKEY}
                                onChange={this.handleReCaptchaChange}
                            />
                        </div>
                    </div>

                    <div className='form-group row'>
                        <div className="col-md-2"></div>
                        <div className="col-md-6">
                            <button type="submit" className='btn btn-large btn-primary' disabled={this.buttonDisabled()}>
                                {this.state.loading ? 'Sending your message...' : 'Send message' }
                            </button>

                            <button type="submit" className='btn btn-large' onClick={this.clear}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Contact;
