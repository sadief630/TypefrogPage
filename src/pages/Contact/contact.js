import React from 'react';
import './../alignPages.css';
import './contact.css';
/**
 * Contact Us Interface
 * @returns Contact us form Interface
 */
const Contact = () => {
    return (
        <>
            <div className="wrapper pageHeight">
                <h2 className="pHeader">Contact Us</h2>
                <p className="pDesc">
                    If you have any questions or concerns, reach out to us with the form below!
                    We'll get back to you as soon as we can.
                </p>
                <form action="https://formspree.io/f/xoqbkbyl" method="POST">
                    <input type="text" name="name" placeholder="Your Name" required></input>
                    <input type="email" name="email" placeholder="Email" required></input>
                    <textarea name="message" row="4" placeholder="Enter message here"></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </>
    );
};

export default Contact;
