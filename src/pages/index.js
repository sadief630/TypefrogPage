import {React} from 'react';
import Game from '../components/GameUI/GameUI';
import './alignPages.css'

const Home = () => {
    return (
        <>
            <div className='wrapper'>
                <div className="pageHeight"
                    style={{
                        color: 'white',
                    }}>
                    <Game />
                </div>
            </div>
        </>
    );
};

export default Home;