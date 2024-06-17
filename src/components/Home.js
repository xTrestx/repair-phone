import React from 'react';
import videobg from '../assets/fon5.mp4'
import box1 from '../assets/box1.png';
import box2 from '../assets/box2.png';
import box3 from '../assets/box3.png';
import box4 from '../assets/box4.png';
import box5 from '../assets/box5.png';
import box6 from '../assets/box6.png';
import box7 from '../assets/box7.png';
import box8 from '../assets/box8.png';

import service1 from '../assets/service1.png';
import service2 from '../assets/service2.png';
import service3 from '../assets/service3.png';

const facilitiesData = [
    { imgSrc: box1, title: 'Експертність та Досвід', description: 'Наша компанія має значний досвід у сфері ремонту та модернізації смартфонів. Наші техніки - це професіонали з глибокими знаннями і великим досвідом у відновленні роботи сучасних мобільних пристроїв.' },
    { imgSrc: box2, title: 'Терміновий Ремонт', description: 'Ми розуміємо, що швидкість відновлення є важливою. Наші майстри готові вирішити термінові проблеми, щоб забезпечити ефективний і швидкий ремонт вашого смартфона.' },
    { imgSrc: box3, title: 'Індивідуальний Підхід', description: 'Ми прагнемо надати індивідуальний підхід до кожного клієнта, враховуючи особливості проблеми вашого смартфона та ваші власні вимоги.' },
    { imgSrc: box4, title: 'Гнучкі Тарифи', description: 'Наша компанія пропонує гнучкі тарифи на ремонт та модернізацію, щоб кожен клієнт міг обрати оптимальний варіант сервісу, який підходить його потребам та бюджету.' },
    { imgSrc: box5, title: 'Транспортні Послуги', description: 'Ми надаємо зручні транспортні послуги, щоб ви могли легко доставити свій смартфон до нашого сервісного центру для ремонту або отримати його назад після відновлення.' },
    { imgSrc: box6, title: 'Транспарентність та Відкритість', description: 'Ми прагнемо забезпечити чесність та відкритість на кожному етапі ремонту вашого смартфона, надаючи детальну інформацію про виконані роботи та стан замовлення.' },
    { imgSrc: box7, title: 'Доступність та Зручність', description: 'Наша мережа приймальних пунктів та онлайн-сервіси забезпечують зручність для кожного клієнта. Ви можете зробити замовлення та відстежувати його стан в будь-який час і з будь-якого місця.' },
    { imgSrc: box8, title: 'Комплексний Підхід до Клієнтів', description: 'Ми не лише відновлюємо смартфони, але й надаємо консультації щодо їх технічної підтримки. Наші фахівці завжди готові допомогти вам з будь-якими питаннями та забезпечити повний цикл обслуговування вашого мобільного пристрою.' },
  ];
  
  const servicesData = [
    { imgSrc: service1, title: 'Ремонт смартфонів', description: 'Наші експерти відмінно розуміють архітектуру та особливості роботи сучасних смартфонів. Ми здійснюємо ремонт будь-якої складності та забезпечуємо повне технічне обслуговування.' },
    { imgSrc: service2, title: 'Модернізація смартфонів', description: 'Якщо ви плануєте покращити функціональні можливості свого смартфона, ми пропонуємо послуги з модернізації, щоб ваш пристрій відповідав сучасним вимогам.' },
    { imgSrc: service3, title: 'Заміна компонентів', description: 'Надаємо послуги заміни пошкоджених або застарілих компонентів смартфонів, щоб забезпечити його оптимальну продуктивність і тривалість служби.' },
  ];


  const Home = () => {
    return (
        <div>
            <section className="home">
                <video className="back-video" src={videobg} autoPlay loop muted />
                <div className="content">
                    <h3>Ремонт і модернізація смартфонів</h3>
                    <p>Дізнайся про нас та нашу компанію</p>
                    <a className="btn">Детальніше</a>
                </div>
            </section>
            <section className="facilities">
                <h1 className="heading">Чому ми?</h1>
                <div className="box-container">
                    {facilitiesData.map((facility, index) => (
                        <div className="box" key={index}>
                            <img src={facility.imgSrc} alt={facility.title} />
                            <h3>{facility.title}</h3>
                            <p>{facility.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="services" id="services">
                <h1 className="heading">Наші Послуги</h1>
                <div className="box-container">
                    {servicesData.map((service, index) => (
                        <div className="box" key={index}>
                            <img src={service.imgSrc} alt={service.title} />
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
