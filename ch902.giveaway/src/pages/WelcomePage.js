import './welcome.css';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const onClick = (e) => {
    e.preventDefault();
    navigate('/play');
  };

  return (
    <div className="main">
      <video autoPlay loop muted id="video" plays-inline="true">
        <source src="/Light.mp4" type="video/mp4" />
      </video>
		  <div className="overlay"></div>
      <div className="navbar">
        <img src="/norisystem_logo.jpeg" width="25%" heigh="10%" alt="logo" />
      </div>
      <div className="heading" style={{ height: '400px' }}>
          <h1 className="head">신년회 경품 <span spellCheck="false">추첨기</span></h1>
          <h3 className="sub"><span>Happy New Year</span> 2023!</h3>	
          <button className="custom-btn btn-12" onClick={onClick}><span>시작!</span><span>추첨</span></button>
          <p className="image" align="right"><img src="/runningbunny.png" width="15%" height="10%" style={{verticalAlign: 'text-bottom' }} alt="bunny" /></p>
      </div>
	</div>
  );
};

export default WelcomePage;
