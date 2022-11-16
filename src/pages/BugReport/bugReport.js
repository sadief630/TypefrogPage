import React from 'react';
import './../alignPages.css';
import './bugReport.css';
/**
 * Bug Report Page
 * @returns Bug Report Form Interface
 */
const BugReport = () => {
    return (
        <>
            <div className="wrapper pageHeight">
                <h2 className="pHeader">Report a Bug</h2>
                <p className="pDesc">
                    TypeFrog is still in its infancy. Bugs are bound to happen. If you experience
                    any issues, large or small, fill out the form below so we can check into it.
                    Thanks for making TypeFrog a better website for everyone!
                </p>
                <form action="https://formspree.io/f/xoqbkbyl" method="POST">
                    <input type="text" name="name" placeholder="Your Name" required></input>
                    <input type="email" name="email" placeholder="Email" required></input>
                    <textarea name="message" row="4" placeholder="Enter description here"></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </>
    );
};

export default BugReport;
