import '../styles/Header.css';

function Header(props) {
    return (
        <header>
            <h1 className="heading">
                Get Your Kicks - HiTops
            </h1>
            <div className='banner-img'>
                <img src={props.bannerImg} alt="Get Your Kicks" />
            </div>
        </header>
    )
}

export default Header;