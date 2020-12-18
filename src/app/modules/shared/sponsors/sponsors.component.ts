import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.styl']
})
export class SponsorsComponent implements OnInit {
  public items = [
    {
      tabTitle: 'Sure.',
      title: 'Sure.',
      link: `
        <a href="https://sure.so" class="c-titles__link">sure.so</a>
      `,
      about: {
        ru: `
          <p>
            Sure. — новая фандрайзинговая платформа для армянских некоммерческих организаций и проектов. Это систематизированный, эффективный и прозрачный инструмент для совершения пожертвований. Основная цель проекта - создать новую культуру индивидуальной филантропии, заменив единоразовые пожертвования более системной и последовательной поддержкой на постоянной основе. Платформа дает возможность организациям рассказывать аудитории о своих целях, миссии, достижениях и актуальных проектах, а пользователям — легко, быстро и удобно жертвовать деньги на поддержку процветания Армении.
          </p>
        `,
        en: `
          <p>
            Sure. — new fundraising platform for Armenian non-profit organisations and projects. It is a structured, effective and transparent way to donate. The main goal of the project is to create a new culture of individual philanthropy by replacing one-off donations with more structured and consistent support on a full-time basis. On this platform organisations have an opportunity to tell the audience about their goals, mission, achievements and on-going projects, while users can easily and safely donate to support prosperity of Armenia.
          </p>
        `
      },
      social: {},
      person: {
        ava: '/assets/img/suren.png',
        name: {
          ru: 'Сурен Тер-Овсепян',
          en: 'Suren Ter-Ovsepian'
        },
        sub_name: 'CEO, Founder',
        text: {
          ru: `
            <p>
              «Мы должны объединяться, делиться умениями, идеями, ресурсами, находить креативные механизмы помощи и поддержки. Эта акция — один из таких механизмов и форм. Мы внезапно придумали её и очень быстро реализовали. Убежден, что она найдет отклик в сердцах и умах людей. Новогодний праздник, улыбки детей, радость взрослых, внутреннее тепло и гармония - все это так нужно каждому, но особенно сейчас и особенно в Армении. Действуйте!»
            </p>
          `,
          en: `
            <p>
              «We should unite, share our knowledge, ideas, resources, find creative tools of support. This project is one example of such tools and forms. We just came up with it and implemented in no time. I believe it will resonate with people’s hearts and minds. New Year celebration, children’s smiles, parents’ happiness, inner warmth and harmony is what everyone needs, especially today, especially in Armenia. Take action! »
            </p>
          `
        },
      },
    },
    {
      tabTitle: 'ASSO',
      title: 'ASSO',
      about: {
        ru: `
          <p>
            Государственный симфонический оркестр Армении был основан в 2005 году дирижером Сергеем Смбатяном, который также является его художественным руководителем и главным дирижером.
          </p>
          <p>
            В течение 14 лет Государственный симфонический оркестр Армении посвящал себя классической музыке. Оркестр исполняет более 50 концертов в год и имеет разносторонний репертуар, от оркестровых шедевров до ультрасовременных премьер произведений армянских и зарубежных композиторов.
          </p>
        `,
        en: `
          <p>
            Armenian State Symphony Orchestra was founded in 2005 by conductor Sergey Smbatyan, who is also artistic director and chief conductor of the orchestra.
          </p>
          <p>
            For 14 years Armenian State Symphony Orchestra has been committed to classical music. Today the orchestra gives over 50 concerts in a year with a versatile reprtoire from orchestral masterpieces to ultra-modern music written by Armenian and foreign composers.
          </p>
        `
      },
      person: {
        ava: '/assets/img/smbat.jpeg',
        name: {
          ru: 'Сергей Смбатян',
          en: 'Sergey Smbatyan '
        },
        sub_name: {
          ru: 'Главный дирижер и художественный руководитель АССО',
          en: 'Chief conductor and artistic director of the ASSO'
        },
        text: {
          ru: `
            <p>
              «Искренне надеюсь, что нам с оркестром удастся с помощью этих новогодних благотворительных концертов подарить детям из Арцаха, которые по воле судьбы оказались без крова, хоть немного тепла и радости».
            </p>
          `,
          en: `
            <p>
              «I sincerely hope that with these New Year charity concerts our orchestra will give children in Artsakh, who were left homeless in a twist of fate, a little warmth and happiness».
            </p>
          `
        },
      },
      social: null
    },
    {
      tabTitle: {
        ru: 'Гармония детства',
        en: 'Harmony of Childhood Foundation'
      },
      title: {
        ru: 'Гармония детства',
        en: 'Harmony of Childhood Foundation'
      },
      about: {
        ru: `
          <p>
            Благотворительный фонд создан в 2018 году. Цель фонда - поддержка юных дарований в сфере искусства, поиск новых талантливых и перспективных имен, продвижение значимых социальных проектов в области культуры и классической музыки, а также развитие отечественной анимации. Деятельность фонда направлена на развитие популярности классического искусства среди молодой аудитории, поддержание у нее интереса к социальным и культурным проектам.
          </p>
        `,
        en: `
          <p>
            The charity foundation was created in 2018. Its goal is to support young talents in arts, to find new talented and promising names, to promote important social projects devoted to culture and classical music, and to develop national animation. The foundation’s work aims to make classical art more popular among young audience and to support its interest in social and cultural projects.
          </p>
        `
      },
      person: {
        ava: '/assets/img/lezh.jpg',
        name: {
          ru: 'Кристина Лежанская',
          en: 'Kristina Lezhanskaya'
        },
        sub_name: 'CEO, Founder',
        text: {
          ru: `
            <p>
              «Настоящее чудо — где оно? Конечно же в душе каждого ребенка, который в полной мере ощущает его и живет в нем. Только детям окружающий мир предстает волшебным царством любви, добра и справедливости. Все мы не так давно были детьми и очень быстро, став взрослыми, мечтали бы снова оказаться там — в том естественном и гармоничном царстве. Мы понимаем, что это невозможно и грустим, но нас вдохновляет то, что это царство есть и оно в наших детях».
            </p>
          `,
          en: `
            <p>
              «Rear magic — where is it? In the souls of every child, of course. They fully live it through. Only children see the world as a magical kingdom of love, good and justice. Not so long ago we all were little children. We grew up so fast and now really wish to come back to that natural and balanced place. We understand that it’s impossible and feel sad. But knowing that this place is real and exists in our children is truly inspiring to us».
            </p>
          `
        },
      },
      social: null
    },
    {
      tabTitle: 'Zapomni',
      title: 'Zapomni',
      link: `
        <a href="https://zapomni.pro" target="_blank" class="c-titles__link">zapomni.pro</a>
      `,
      about: {
        ru: `
          <p>
            Группа компаний Zapomni ведёт предпринимательскую деятельность на территории Российской Федерации в сфере культуры, кино, музыкального продюсирования, электронной коммерции, разработки информационных систем. Партнерами компании являются крупнейшие российские и международные организации в сфере культуры и медиа: Министерство культуры РФ, Российский Фонд Культуры, студия «Союзмультфильм», студии Disney, DreamWorks, Universal Pictures, Газпромбанк, Сбербанк, Московская государственная консерватория им. П.И. Чайковского, МКЗ «Зарядье», компания Mastercard и другие.
          </p>
        `,
        en: `
          <p>
            Zapomni Group is involved in entrepreneurial activity across Russian Federation in sectors of culture, cinema, music production, e-commerce, informational systems development. Partners include the biggest Russian and international companies in culture and media industries: Ministry of Culture of the Russian Federation, Russian Cultural Foundation, Soyuzmultfilm, Disney, DreamWorks, Universal Pictures, Gazprombank, Sberbank, Tchaikovsky Moscow State Conservatory, Moscow Concert Hall Zaryadye, Mastercard, etc.
          </p>
        `
      },
      person: {
        ava: '/assets/img/yar.jpg',
        name: {
          ru: 'Ярослав Давлятов',
          en: 'Yaroslav Davlyatov'
        },
        sub_name: 'CEO, Co-founder',
        text: {
          ru: `
            <p>
              «Наша компания Zapomni Events, входящая в группу компаний Zapomni, развивает направление киноконцертов совместно с такими студиями как Disney, DreamWorks, Animaccord, Союзмультфильм и другими на территории России и стран СНГ с 2017 года. И я очень рад, что теперь, благодаря этой акции, шедевры мировой анимации и музыкального искусства подарят радость и новогоднее настроение детям в Армении».
            </p>
          `,
          en: `
            <p>
              «Our company Zapomni Events, a part of Zapomni Group, has been developing film music concerts in collaboration with studios like Disney, DreamWorks, Animaccord, Soyuzmultfilm and others in Russia and CIS since 2017. I am really glad that now, thanks to this charity project, masterpieces of world animation and musical art will fill children in Armenia with happiness and celebration mood».
            </p>
          `
        },
      },
      social: [
        {
          short_name: 'fb',
          url: 'https://www.facebook.com/zapomni.group'
        },
        {
          short_name: 'vk',
          url: 'https://vk.com/zapomnipro'
        },
        {
          short_name: 'insta',
          url: 'https://www.instagram.com/zapomni.pro'
        }
      ]
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
