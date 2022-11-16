import React from 'react';
import './../alignPages.css';
import './merch.css';
// Below are all the image imports, as React objects.
// We found this to be the easiest method for displaying pictures & maintaining formatability.
import MerchIndividualCap from './../../images/merch/merchIndividualCap.png';
import MerchIndividualDadHat from './../../images/merch/merchIndividualDadHat.png';
import MerchIndividualHoodie from './../../images/merch/merchIndividualHoodie.png';
import MerchIndividualMagnet from './../../images/merch/merchIndividualMagnet.png';
import MerchIndividualMousePad from './../../images/merch/merchIndividualMousePad.png';
import MerchIndividualNotebook from './../../images/merch/merchIndividualNotebook.png';
import MerchIndividualPin from './../../images/merch/merchIndividualPin.png';
import MerchIndividualShirt from './../../images/merch/merchIndividualShirt.png';
import MerchSpecialFrogCollection from './../../images/merch/merchSpecialFrogCollection.png';
import MerchSpecialFrogCollectionDeskMat from './../../images/merch/merchSpecialFrogCollectionDeskMat.png';
import MerchSpecialFrogCollectionMug from './../../images/merch/merchSpecialFrogCollectionMug.png';
import MerchSpecialFrogCollectionTravelMug from './../../images/merch/merchSpecialFrogCollectionTravelMug.png';
import MerchTypeFrogLogo from './../../images/merch/merchTypeFrogLogo.png';
import MerchTypeFrogLogoBaseballCap from './../../images/merch/merchTypeFrogLogoBaseballCap.png';
import MerchTypeFrogLogoButton from './../../images/merch/merchTypeFrogLogoButton.png';
import MerchTypeFrogLogoHoodie from './../../images/merch/merchTypeFrogLogoHoodie.png';
import MerchTypeFrogLogoShirt from './../../images/merch/merchTypeFrogLogoShirt.png';

/**
 * Merch Page
 * @returns Redbubble Shop/Link Interface
 */
const Merch = () => {
    return (
        <>
            <div className="wrapper pageHeight">

                <div className="mTop">
                    <h2>Official TypeFrog Merch</h2>
                    <p>
                        This is TypeFrog's merch page. All of our merch is hosted on RedBubble by one of our developers.
                        Below is a compilation of some of our current items. Prices may change based on RedBubble's current
                        rates, so for accurate prices, click each photo and follow the link!
                    </p>
                </div>

                <div className="productCont">
                    <a className="prodTopCont" href="https://www.redbubble.com/people/c-feldt/works/130465326-typefrog-logo?asc=u">
                        <span className="prodTitle">TypeFrog Logo </span>
                    </a>
                    <div className="image-grid">
                        <img className="image-grid-col-2 image-grid-row-2" src={MerchTypeFrogLogo} alt="Type Frog Logo" onClick={() => window.open("https://www.redbubble.com/people/c-feldt/works/130465326-typefrog-logo?asc=u", "_blank", 'noopener,noreferrer')} />
                        <img src={MerchTypeFrogLogoShirt} alt="Logo Shirt" onClick={() => window.open("https://www.redbubble.com/i/t-shirt/TypeFrog-Logo-by-C-FELDT/130465326.FB110", "_blank", 'noopener,noreferrer')} />
                        <img src={MerchTypeFrogLogoButton} alt="Logo Button" onClick={() => window.open("https://www.redbubble.com/i/pin/TypeFrog-Logo-by-C-FELDT/130465326.NP9QY", "_blank", 'noopener,noreferrer')} />
                        <img src={MerchTypeFrogLogoBaseballCap} alt="Logo Baseball Cap" onClick={() => window.open("https://www.redbubble.com/i/hat/TypeFrog-Logo-by-C-FELDT/130465326.FACOX", "_blank", 'noopener,noreferrer')} />
                        <img src={MerchTypeFrogLogoHoodie} alt="Logo Hoodie" onClick={() => window.open("https://www.redbubble.com/i/hoodie/TypeFrog-Logo-by-C-FELDT/130465326.YFBT8", "_blank", 'noopener,noreferrer')} />
                    </div>
                    <p>Our logo. Perfect for representing TypeFrog wherever you go! Available on a variety of products.</p>
                </div>

                <div className="productCont">
                    <a className="prodTopCont" href="https://www.redbubble.com/people/C-FELDT/shop?asc=u">
                        <span className="prodTitle">Individual Frog Collection </span>               
                    </a>
                    <div className="image-grid">
                        <img src={MerchIndividualMagnet} alt="Magnets and Sticker" onClick={() => window.open("https://www.redbubble.com/i/sticker/Typo-TypeFrog-by-C-FELDT/130844218.EJUG5", "_blank", 'noopener,noreferrer')} />
                        <img src={MerchIndividualShirt} alt="Shirt" onClick={() => window.open("https://www.redbubble.com/i/t-shirt/Alto-TypeFrog-by-C-FELDT/130845066.UGYPM", "_blank", 'noopener,noreferrer')} />
                        <img src={MerchIndividualCap} alt="Baseball Cap" onClick={() => window.open("https://www.redbubble.com/i/hat/Andrew-TypeFrog-by-C-FELDT/130847467.9AAXL", "_blank", 'noopener,noreferrer')} />
                        <img src={MerchIndividualPin} alt="Pin" onClick={() => window.open("https://www.redbubble.com/i/pin/Sadie-TypeFrog-by-C-FELDT/130845470.NP9QY", "_blank", 'noopener,noreferrer')} />
                        <img src={MerchIndividualHoodie} alt="Hoodie" onClick={() => window.open("https://www.redbubble.com/i/hoodie/Bryce-TypeFrog-by-C-FELDT/130847081.V3BWK", "_blank", 'noopener,noreferrer')} />
                        <img src={MerchIndividualDadHat} alt="Dad Hat" onClick={() => window.open("https://www.redbubble.com/i/hat/Ethan-TypeFrog-by-C-FELDT/130846077.ARXHY", "_blank", 'noopener,noreferrer')} />
                        <img src={MerchIndividualMousePad} alt="MousePad" onClick={() => window.open("https://www.redbubble.com/i/mouse-pad/Calvin-TypeFrog-by-C-FELDT/130846754.G1FH6", "_blank", 'noopener,noreferrer')} />
                        <img src={MerchIndividualNotebook} alt="Notebook" onClick={() => window.open("https://www.redbubble.com/i/notebook/James-TypeFrog-by-C-FELDT/130846416.WX3NH", "_blank", 'noopener,noreferrer')} />
                    </div>
                    <p>Our frogs! Perfect for the fan who wants to show off their favorite frog. Available on a variety of products.</p>
                </div>

                <div className="productCont">
                    <a className="prodTopCont" href="https://www.redbubble.com/people/c-feldt/works/130466019-typefrogs?asc=u">
                        <span className="prodTitle">Special Frog Group </span>
                    </a>
                    <div className="image-grid">
                        <img className="image-grid-col-2 image-grid-row-2" src={MerchSpecialFrogCollection} alt="Type Frog Logo" onClick={() => window.open("https://www.redbubble.com/people/c-feldt/works/130466019-typefrogs?asc=u", "_blank", 'noopener,noreferrer')} />
                        <img src={MerchSpecialFrogCollectionDeskMat} alt="architecture" onClick={() => window.open("https://www.redbubble.com/i/mouse-pad/TypeFrogs-by-C-FELDT/130466019.GAP22", "_blank", 'noopener,noreferrer')} />
                        <img src={MerchSpecialFrogCollectionMug} alt="architecture" onClick={() => window.open("https://www.redbubble.com/i/mug/TypeFrogs-by-C-FELDT/130466019.9Q0AD", "_blank", 'noopener,noreferrer')} />
                        <img src={MerchSpecialFrogCollectionTravelMug} alt="architecture" onClick={() => window.open("https://www.redbubble.com/i/mug/TypeFrogs-by-C-FELDT/130466019.W3OIY", "_blank", 'noopener,noreferrer')} />
                    </div>
                    <p>All of our frogs together as a group! Perfect for those who can't decide their favorite. Available on mugs and desk mats.</p>
                </div>

            </div>
        </>
    );
};

export default Merch;