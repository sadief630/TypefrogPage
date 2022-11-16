import React from 'react';
import './../alignPages.css';
import './about.css';
import HeadshotAndrew from './../../images/headshotAndrew.png';
import HeadshotBryce from './../../images/headshotBryce.png';
import HeadshotCalvin from './../../images/headshotCalvin.png';
import HeadshotEthan from './../../images/headshotEthan.png';
import HeadshotJames from './../../images/headshotJames.png';
import HeadshotSadie from './../../images/headshotSadie.png';
import TypeFrogLogo from './../../images/typeFrogLOGO.png';
import TypeFrogHand from './../../images/frogLogo.png';
// import TypeFrogLogo from './../images/typeFrogLOGO_brightverde.svg';

/**
 * About Page
 * @returns About Page Interface
 */
const About = () => {
    return (
        <>
            <div className="wrapper pageHeight">

                <div className="aHeader">
                    <h2>About Us</h2>
                </div>

                <div className="aboutBody">
                    <p>
                        TypeFrog was created by a group of six computer science undergraduate students at Louisiana State University.
                        As part of a class project, we collaborated to provide a customizable way to improve typing skills for both
                        new and experienced typists.
                    </p>
                    <p>
                        Typing has become an essential skill as the world has begun relying more and more on computers. With COVID-19
                        pushing students and workers online, this skill has become increasingly important. Many users are not
                        equipped to navigate computers efficiently, with the average American typing at roughly 40 words per minute.
                        In order to address this issue, we created a website which would allow a user to practice their own prompts.
                        By being able to create custom prompts, users can practice phrases and words that apply specifically to their
                        needs. Alternatively, users can take advantage of our various modes to keep their practice refreshing and exciting.
                    </p>
                    <p>
                        Whether you're new to computers or you already type at lightning-speed, TypeFrog has the right tools
                        for you to enhance your skills. We've worked hard to make TypeFrog awesome, so we're happy you're here!
                    </p>
                </div>
                <div className="hrow">

                    <a className="hcol" href="https://github.com/Supercoop03">
                        <img className="headshot" src={HeadshotEthan} alt="" />
                        <h5>Ethan Cooper</h5>
                        <h6>Game Designer</h6>
                    </a>
                    <a className="hcol" href="https://github.com/bdoyle125">
                        <img className="headshot" src={HeadshotBryce} alt="" />
                        <h5>Bryce Doyle</h5>
                        <h6>Game Designer</h6>
                    </a>
                    <a className="hcol" href="https://github.com/C-Feldt">
                        <img className="headshot" src={HeadshotCalvin} alt="" />
                        <h5>Calvin Feldt</h5>
                        <h6>Front End Designer</h6>
                    </a>
                    <a className="hcol" href="https://github.com/sadief630">
                        <img className="headshot" src={HeadshotSadie} alt="" />
                        <h5>Sadie Forbes</h5>
                        <h6>Data Architect</h6>
                    </a>
                    <a className="hcol" href="https://github.com/ALeonard2024">
                        <img className="headshot" src={HeadshotAndrew} alt="" />
                        <h5>Andrew Leonard</h5>
                        <h6>Interaction Designer</h6>
                    </a>
                    <a className="hcol" href="https://github.com/jmatherne65">
                        <img className="headshot" src={HeadshotJames} alt="" />
                        <h5>James Matherne</h5>
                        <h6>Back End Designer</h6>
                    </a>
                </div>
                <div className="mrow">
                    <div className="hcol">
                        <img className="logo2" src={TypeFrogHand} alt="" />
                    </div>
                </div>
                <div className="mrow">
                    <div className="hcol">
                        <img className="logo1" src={TypeFrogLogo} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
