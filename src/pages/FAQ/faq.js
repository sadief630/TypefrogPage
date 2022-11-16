import React from 'react';
import './../alignPages.css';
import './faq.css';

/**
 * FAQ Page
 * @returns FAQ Interface
 */
const FAQ = () => {
    return (
        <>
            <div className="faqPageFormat pageHeight">
                <div className="faq">
                    <h2>FAQ</h2>
                    <h5>
                        We've compiled some of our most frequently asked questions.
                    </h5>
                    <h3>How do I use the website?</h3>
                    <p>
                        TypeFrog is intended to help you improve your typing skills. To get started right
                        away, navigate to Home and press the Start button! This will give you 40
                        random words to type in order to measure your WPM.
                    </p>
                    <p>
                        If you want to create your own custom prompts, navigate to the Prompts page
                        and create your own prompt! Give it a unique title and then press Play
                        Prompt. You can test your speeds with words and phrases suited directly to
                        you. You can even type out books, poems, songs, or your other favorite works!
                    </p>
                    <p>
                        After creating an account, you can set your own username and avatar in
                        the Profile page. You can also access your account information here. We plan
                        to add more profile features in the future, so check
                        back for more!
                    </p>
                    <h3>How do you measure Words Per Minute (WPM)?</h3>
                    <p>
                        For our WPM calculations, we use the 5 letter standard. Every 5 characters is
                        considered one word. So if you type 200 characters per minute, you'll be at the
                        national average of 40 WPM! (But you can do better than that!)
                    </p>
                    <h3>Will TypeFrog ever charge for their services?</h3>
                    <p>
                        Monetization is a topic we take very seriously. We believe that keeping our
                        application free to play is integral to our mission. We promise to never
                        charge to access TypeFrog. We are open to exploring alternative forms of
                        monetization and providing users with the option to support TypeFrog, but
                        payment will never be required.
                    </p>
                </div>
            </div>
        </>
    );
};

export default FAQ;