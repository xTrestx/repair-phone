import React from 'react';
import './style.css'; 

const Footer = () => {
  return (
    <section className="footer">
      <div className="box-container">
        
        <div className="box">
          <h3>Меню</h3>
          <a className="link"> <i className="fas fa-angle-right"></i> Головна</a>
          <a className="link"> <i className="fas fa-angle-right"></i> Про нас</a>
          <a className="link"> <i className="fas fa-angle-right"></i> Послуги</a>
          <a className="link"> <i className="fas fa-angle-right"></i> Ціни</a>
          <a className="link"> <i className="fas fa-angle-right"></i> Контакти</a>
        </div>

        <div className="box">
          <h3>Робочий час</h3>
          <p> <span>Понеділок:</span> 08:00-18:00 </p>
          <p> <span>Вівторок:</span> 08:00-18:00 </p>
          <p> <span>Середа:</span> 08:00-19:00 </p>
          <p> <span>Четвер:</span> 08:00-18:00 </p>
          <p> <span>П'ятниця:</span> 08:00-18:00 </p>
          <p> <span>Субота:</span> 08:00-15:00 </p>
          <p> <span>Неділя:</span> Закриті </p>
        </div>

        <div className="box">
          <h3>Контакти</h3>
          <a className="link"> <i className="fas fa-phone"></i> +380665975343 </a>
          <a className="link"> <i className="fas fa-envelope"></i> roman.skrypnyk-ip231k@nung.edu.ua </a>
          <a className="link"> <i className="fas fa-map"></i> Україна, м Івано-Франківськ, вул. Тролейбусна - 76008 </a>
        </div>

        <div className="box">
          <h3>Ми знаходимось:</h3>
          <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5243.8336513685!2d24.708098576869414!3d48.91697689658138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4730c16a7afce33b%3A0x74913f2043c1e4a6!2z0KDQtdC80L7QvdGCINGB0LzQsNGA0YLRhNC-0L3RltCyIOKAlCDQodC10YDQstGW0YHQvdC40Lkg0YbQtdC90YLRgCDQvNC-0LHRltC70YzQvdC40YUg0YLQtdC70LXRhNC-0L3RltCyIEF5bW9iaWxlICjQsNGOIG1vYmlsZSkgMg!5e0!3m2!1sen!2sus!4v1718538280740!5m2!1sen!2sus" 
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>

      <div className="credit">Всі права захищені!</div>
    </section>
  );
};

export default Footer;
