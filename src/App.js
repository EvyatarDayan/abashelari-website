import { useEffect, useRef, useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
  useParams
} from 'react-router-dom';
import homeVideo1 from './assets/images/homeVideo1.mov';
import homeVideo2 from './assets/images/homeVideo2.mov';
import homeVideo3 from './assets/images/homeVideo3.mov';
import homeVideo4 from './assets/images/homeVideo4.mov';
import homeVideo5 from './assets/images/homeVideo5.mov';
import abaShelAriLogo from './assets/images/AbaShelAriLogo.svg';
import localeDE from './locales/de';
import localeES from './locales/es';
import localeFR from './locales/fr';

const CONTACT_EMAIL = 'abashelariprod@gmail.com';

const HOME_CAROUSEL_AUTO_MS = 10000;

/** UI labels for the language switcher (not translated) */
const LANG_META = {
  en: { flag: '🇬🇧', short: 'EN', menuLabel: 'English' },
  sv: { flag: '🇸🇪', short: 'SV', menuLabel: 'Svenska' },
  es: { flag: '🇪🇸', short: 'ES', menuLabel: 'Español' },
  de: { flag: '🇩🇪', short: 'DE', menuLabel: 'Deutsch' },
  fr: { flag: '🇫🇷', short: 'FR', menuLabel: 'Français' }
};

const TRANSLATIONS = {
  en: {
    menu: {
      home: 'Home',
      ourApps: 'Our Apps',
      whoWeAre: 'Who We Are',
      privacyPolicy: 'Privacy policy',
      contactUs: 'Contact Us',
      settings: 'Settings'
    },
    siteFooter: {
      ariaLabel: 'Site footer',
      rightsReserved: 'All rights reserved.'
    },
    home: {
      title: 'Simple tools. Real progress.',
      intro:
        'We believe technology should be a quiet partner in your success.',
      masterSwedishLabel: 'Master Swedish:',
      masterSwedishText:
        'Our suite of 8+ language apps, including TalkSvenska and SWGrammar, provides a complete ecosystem for students and expats.',
      simplifyFinancesLabel: 'Simplify Your Finances:',
      simplifyFinancesText:
        'Tools like BillTracker and Curren$ee help you stay on top of your global and local spending.',
      designedLabel: 'Designed for Everyone:',
      designedText:
        'From visual timers for kids to advanced word-ordering puzzles, our apps are built for users of all ages and skill levels.',
      carouselRegion: 'ABASHELARI apps highlights',
      previousImage: 'Previous image',
      nextImage: 'Next image',
      howTitle: 'What you’ll find in our apps',
      howSubtitle:
        'Language learning, financial clarity, and family-friendly tools-each designed to stay focused and useful.',
      feature1Title: 'Master Swedish with one connected suite',
      feature1Desc:
        'SWGrammar, TalkSvenska, and the SW apps cover grammar, vocabulary, and phrases-with offline study that fits real life.',
      feature2Title: 'Stay on top of money across borders',
      feature2Desc:
        'BillTracker and Curren$ee make subscriptions and spending clear in the currencies you actually use.',
      feature3Title: 'Calm tools for kids and daily life',
      feature3Desc:
        'Letter games, early literacy, and utilities like Time2See-built for clarity at every age.',
      appsStripeTitle: 'Our apps',
      appsStripeAria: 'Our apps — tap an icon to open its page',
      appsStripePrev: 'Scroll left for more apps',
      appsStripeNext: 'Scroll right for more apps'
    },
    ourApps: {
      pageTitle: 'Our Apps',
      intro:
        'From Swedish learning and playful literacy apps to everyday utilities-everything we ship lives here. Pick an app to read the story, browse screenshots, and jump to the App Store when you are ready.',
      readMore: 'Read more',
      downloadLabel: 'Download on the App Store',
      appNotFound: 'App not found.',
      screenshotsHeading: 'Screenshots & Video',
      descriptionMore: 'More',
      descriptionLess: 'Less',
      noScreenshotsLead: 'No screenshots yet. Add 3 images under'
    },
    whoWeAre: {
      title: 'Smart Tools for Curious Minds.',
      intro:
        'ABASHELARI builds focused apps across Swedish learning, playful literacy for kids, and practical everyday tools. Below is how our work fits together.',
      section1Title: 'Swedish language learning',
      section1Text:
        'Our “SW” family-titles such as SWGrammar, SWVerbs, SWVocabulary, SWWorder, SWAdjective, and TalkSvenska-is designed as one ecosystem for Swedish learners. You get structured practice, clear explanations, audio where it matters, and offline-friendly workflows so studying fits real life. Whether you are settling in Sweden, preparing for work or study, or sharpening skills you already have, these apps reinforce grammar, vocabulary, and usable phrases in parallel-not as disconnected downloads.',
      section2Title: 'Games for kids: English & Hebrew',
      section2Text:
        'We also build gentle, visual learning games for young readers-letter tracing, letters and words, and vocabulary paths tuned for early literacy in English and Hebrew. The goal is screen time that feels calm and purposeful: repetition children understand, layouts that stay readable, and progression that respects how kids actually learn.',
      section3Title: 'Day-to-day utilities',
      section3Text:
        'Alongside education, we ship utilities that belong in everyday routines. BillTracker helps you track bills and subscriptions with clarity-including multi-currency views when life crosses borders. Curren$ee keeps spending understandable in the currencies you care about. Time2See offers visual timers so children can feel time passing without the pressure of numbers on a clock. Each product aims for speed, clarity, and no noisy clutter.',
      section4Title: 'Who we are-and what we aim for',
      section4Text:
        'ABASHELARI is a small, independent app studio. We prefer polish and privacy over aggressive monetization: clean interfaces, no ads in our philosophy of shipping, and respect for your attention and data. Our mission is to create focused tools that solve concrete problems-whether that is mastering Swedish, supporting a child’s first steps in reading, or keeping household money legible-and to keep refining those products based on how people really use them.'
    },
    contact: {
      title: 'Contact us',
      p1:
        'Have a question or suggestion-or just want to say hello? We are a small studio and we read every message. Email is the best way to reach us:',
      p2:
        'You can also share a note through the form below-whatever feels easier for you. We will reply as soon as we can.',
      p3: 'Thanks for taking the time to connect.',
      name: 'Name',
      emailLabel: 'Email',
      message: 'Message',
      messageErrorMin:
        'Please enter at least 10 characters in your message.',
      messageErrorMax:
        'Please keep your message to 500 characters or fewer.',
      submitSending: 'Sending…',
      submitSuccess: 'Thanks! Your message was sent-we will get back to you soon.',
      submitError:
        'Something went wrong sending your message. Please try again or email us directly.',
      gotIt: 'Got it',
      send: 'Send Message'
    },
    settings: {
      title: 'Settings',
      languageTitle: 'Language',
      languageDesc: 'Choose your preferred language for the entire site.',
      english: 'English',
      swedish: 'Swedish',
      spanish: 'Spanish',
      german: 'German',
      french: 'French'
    },
    privacy: {
      title: 'Privacy policy',
      updated: 'Last updated: March 3, 2025',
      intro:
        'This policy describes how ABASHELARI collects, uses, stores, and protects information when you use our website and mobile apps.',
      contactHeading: 'Contact',
      contactTextLead: 'Questions about privacy? Email us at',
      contactTextTrail: '.',
      collectHeading: 'Information we may collect',
      collectIntro:
        'Depending on which product you use, we may collect limited information needed to operate the service, respond to support requests, and improve reliability.',
      collectItems: [
        'Contact details you choose to provide (for example, email when you contact us).',
        'Basic usage and diagnostic data generated by the app or website (for example, crash reports or performance metrics).',
        'Device-related technical information commonly sent by apps and browsers (for example, device type, OS version, and general location inferred from IP where applicable).'
      ],
      useHeading: 'How we use information',
      useItems: [
        'To provide, maintain, and improve our apps and website.',
        'To respond to support requests and communicate important updates.',
        'To understand aggregate usage trends and fix bugs (we aim to minimize personal data where possible).'
      ],
      shareHeading: 'Sharing and processors',
      shareText:
        'We do not sell your personal data. We may share information with service providers who help us operate the service (for example, hosting, analytics, or email delivery), subject to appropriate safeguards and only as needed.',
      retentionHeading: 'Retention',
      retentionText:
        'We keep information only as long as needed for the purposes described in this policy, unless a longer retention period is required by law.',
      securityHeading: 'Security',
      securityText:
        'We take reasonable measures to protect information, but no method of transmission or storage is 100% secure.',
      childrenHeading: "Children's privacy",
      childrenText:
        'Our apps may be suitable for families. If you believe a child has provided personal information without appropriate consent, contact us and we will take reasonable steps to delete it where required.',
      thirdHeading: 'Links to other sites',
      thirdText:
        'Our website or apps may link to third-party sites (for example, App Store pages). Those sites have their own policies.',
      changesHeading: 'Changes',
      changesText:
        'We may update this policy from time to time. When we do, we will update the “Last updated” date and post the revised policy.',
      rightsHeading: 'Your choices',
      rightsText:
        'Depending on where you live, you may have rights to access, correct, or delete certain personal information. Contact us and we will respond within a reasonable time.'
    }
  },
  sv: {
    menu: {
      home: 'Hem',
      ourApps: 'Våra appar',
      whoWeAre: 'Vilka är vi',
      privacyPolicy: 'Integritetspolicy',
      contactUs: 'Kontakta oss',
      settings: 'Inställningar'
    },
    siteFooter: {
      ariaLabel: 'Sidfot',
      rightsReserved: 'Alla rättigheter förbehållna.'
    },
    home: {
      title: 'Enkla verktyg. Riktig framsteg.',
      intro:
        'Vi tror att teknik ska vara en tyst partner i din framgång.',
      masterSwedishLabel: 'Bemästra svenska:',
      masterSwedishText:
        'Vår svit med 8+ språkappar, inklusive TalkSvenska och SWGrammar, ger ett komplett ekosystem för studenter och expats.',
      simplifyFinancesLabel: 'Förenkla din ekonomi:',
      simplifyFinancesText:
        'Verktyg som BillTracker och Curren$ee hjälper dig att hålla koll på både globala och lokala utgifter.',
      designedLabel: 'Designad för alla:',
      designedText:
        'Från visuella timers för barn till avancerade ordordningspussel - våra appar är byggda för användare i alla åldrar och nivåer.',
      carouselRegion: 'Höjdpunkter från ABASHELARI-appar',
      previousImage: 'Föregående bild',
      nextImage: 'Nästa bild',
      howTitle: 'Det här hittar du i våra appar',
      howSubtitle:
        'Språkinlärning, ekonomisk översikt och familjevänliga verktyg - varje produkt är fokuserad och praktisk.',
      feature1Title: 'Lär dig svenska i en sammanhängande svit',
      feature1Desc:
        'SWGrammar, TalkSvenska och SW-apparna täcker grammatik, ordförråd och fraser - med offline-stöd som passar vardagen.',
      feature2Title: 'Håll koll på pengarna över gränser',
      feature2Desc:
        'BillTracker och Curren$ee gör prenumerationer och utgifter tydliga i de valutor du faktiskt använder.',
      feature3Title: 'Lugna verktyg för barn och vardagen',
      feature3Desc:
        'Bokstavsspel, tidig läsning och hjälpmedel som Time2See - byggda för tydlighet i alla åldrar.',
      appsStripeTitle: 'Våra appar',
      appsStripeAria:
        'Våra appar — tryck på en ikon för att öppna sidan',
      appsStripePrev: 'Scrolla åt vänster för fler appar',
      appsStripeNext: 'Scrolla åt höger för fler appar'
    },
    ourApps: {
      pageTitle: 'Våra appar',
      intro:
        'Här samlar vi allt vi bygger-från svenska språkappar och lekfull läsning till vardagsverktyg. Välj en app för att läsa mer, se skärmbilder och gå vidare till App Store när du vill.',
      readMore: 'Läs mer',
      downloadLabel: 'Ladda ner på App Store',
      appNotFound: 'Appen hittades inte.',
      screenshotsHeading: 'Skärmbilder och video',
      descriptionMore: 'Mer',
      descriptionLess: 'Mindre',
      noScreenshotsLead: 'Inga skärmbilder än. Lägg till 3 bilder under'
    },
    whoWeAre: {
      title: 'Smarta verktyg för nyfikna sinnen.',
      intro:
        'ABASHELARI utvecklar fokuserade appar för svenskinlärning, lekfull läsintroduktion för barn och praktiska vardagsverktyg. Här är hur vårt arbete hänger ihop.',
      section1Title: 'Svenskinlärning',
      section1Text:
        'Vår ”SW”-familj-bland annat SWGrammar, SWVerbs, SWVocabulary, SWWorder, SWAdjective och TalkSvenska-är tänkt som ett ekosystem för alla som lär sig svenska. Du får strukturerad träning, tydliga förklaringar, ljud där det gör skillnad och möjlighet att plugga offline så det passar vardagen. Oavsett om du är ny i Sverige, förbereder dig för jobb eller studier eller slipar på kunskaper du redan har, förstärker apparna grammatik, ordförråd och användbara fraser i samspel.',
      section2Title: 'Spel för barn: engelska och hebreiska',
      section2Text:
        'Vi bygger också mjuka, visuella lärspel för små läsare-bokstavsspårning, bokstäver och ord samt ordförråd anpassat för tidig läsning på engelska och hebreiska. Målet är skärmtid som känns lugn och meningsfull: repetition barn förstår, layout som är lättläst och progression som följer hur barn verkligen lär.',
      section3Title: 'Vardagsverktyg',
      section3Text:
        'Vid sidan av utbildning levererar vi verktyg som passar i vardagsrutiner. BillTracker hjälper dig hålla koll på räkningar och prenumerationer-inklusive flervalutor när livet korsar gränser. Curren$ee gör utgifter begripliga i de valutor som är viktiga för dig. Time2See erbjuder visuella timers så barn kan uppleva tid utan stressen av klocksiffror. Varje produkt siktar på snabbhet, tydlighet och minimal bråte.',
      section4Title: 'Vilka vi är-och vad vi vill',
      section4Text:
        'ABASHELARI är en liten, oberoende appstudio. Vi väljer finish och integritet framför aggressiv monetisering: rena gränssnitt, ingen reklam som ledstjärna och respekt för din uppmärksamhet och dina data. Vårt uppdrag är att skapa fokuserade verktyg som löser konkreta problem-oavsett om det handlar om att bemästra svenska, stötta ett barns första steg i läsning eller göra hushållsekonomin läsbar-och att fortsätta förbättra produkterna utifrån hur människor faktiskt använder dem.'
    },
    contact: {
      title: 'Kontakta oss',
      p1:
        'Har du en fråga eller ett förslag-eller vill du bara säga hej? Vi är en liten studio och läser allt som kommer in. Mejl är bästa sättet att nå oss:',
      p2:
        'Du kan också skriva några rader i formuläret nedan-välj det som känns smidigast för dig. Vi återkommer så fort vi kan.',
      p3: 'Tack för att du hör av dig.',
      name: 'Namn',
      emailLabel: 'E-post',
      message: 'Meddelande',
      messageErrorMin: 'Ange minst 10 tecken i meddelandet.',
      messageErrorMax: 'Meddelandet får vara högst 500 tecken.',
      submitSending: 'Skickar…',
      submitSuccess:
        'Tack! Ditt meddelande har skickats - vi återkommer så snart vi kan.',
      submitError:
        'Något gick fel när meddelandet skulle skickas. Försök igen eller mejla oss direkt.',
      gotIt: 'Okej',
      send: 'Skicka meddelande'
    },
    settings: {
      title: 'Inställningar',
      languageTitle: 'Språk',
      languageDesc: 'Välj vilket språk som ska användas på hela webbplatsen.',
      english: 'Engelska',
      swedish: 'Svenska',
      spanish: 'Spanska',
      german: 'Tyska',
      french: 'Franska'
    },
    privacy: {
      title: 'Integritetspolicy',
      updated: 'Senast uppdaterad: 3 mars 2025',
      intro:
        'Denna policy beskriver hur ABASHELARI samlar in, använder, lagrar och skyddar information när du använder vår webbplats och våra mobilappar.',
      contactHeading: 'Kontakt',
      contactTextLead: 'Frågor om integritet? Mejla oss på',
      contactTextTrail: '.',
      collectHeading: 'Information vi kan samla in',
      collectIntro:
        'Beroende på vilken produkt du använder kan vi samla in begränsad information som behövs för att driva tjänsten, svara på support och förbättra stabilitet.',
      collectItems: [
        'Kontaktuppgifter som du väljer att lämna (till exempel e-post när du kontaktar oss).',
        'Grundläggande användnings- och diagnostikdata som genereras av appen eller webbplatsen (till exempel kraschrapporter eller prestandamått).',
        'Teknisk enhetsinformation som vanligtvis skickas av appar och webbläsare (till exempel enhetstyp, OS-version och generell plats härledd från IP där det är tillämpligt).'
      ],
      useHeading: 'Hur vi använder information',
      useItems: [
        'För att tillhandahålla, underhålla och förbättra våra appar och webbplats.',
        'För att svara på supportförfrågningar och kommunicera viktiga uppdateringar.',
        'För att förstå aggregerade användningstrender och åtgärda buggar (vi strävar efter att minimera personuppgifter där det går).'
      ],
      shareHeading: 'Delning och underleverantörer',
      shareText:
        'Vi säljer inte dina personuppgifter. Vi kan dela information med tjänsteleverantörer som hjälper oss driva tjänsten (till exempel hosting, analys eller e-postleverans), med lämpliga skyddsåtgärder och endast när det behövs.',
      retentionHeading: 'Lagring',
      retentionText:
        'Vi sparar information endast så länge som behövs för de ändamål som beskrivs i denna policy, om inte längre lagring krävs enligt lag.',
      securityHeading: 'Säkerhet',
      securityText:
        'Vi vidtar rimliga åtgärder för att skydda information, men ingen överförings- eller lagringsmetod är 100% säker.',
      childrenHeading: 'Barn och integritet',
      childrenText:
        'Våra appar kan passa familjer. Om du tror att ett barn har lämnat personuppgifter utan lämpligt samtycke, kontakta oss så vidtar vi rimliga åtgärder för att radera dem där det krävs.',
      thirdHeading: 'Länkar till andra webbplatser',
      thirdText:
        'Vår webbplats eller appar kan länka till tredjepartswebbplatser (till exempel App Store-sidor). Dessa webbplatser har egna policys.',
      changesHeading: 'Ändringar',
      changesText:
        'Vi kan uppdatera denna policy från tid till annan. När vi gör det uppdaterar vi datumet “Senast uppdaterad” och publicerar den reviderade policyn.',
      rightsHeading: 'Dina val',
      rightsText:
        'Beroende på var du bor kan du ha rätt att få tillgång till, rätta eller radera vissa personuppgifter. Kontakta oss så återkommer vi inom rimlig tid.'
    }
  },
  es: localeES,
  de: localeDE,
  fr: localeFR
};

const SETTINGS_LANG_KEY = {
  en: 'english',
  sv: 'swedish',
  es: 'spanish',
  de: 'german',
  fr: 'french'
};

function HomePage({ t, apps }) {
  const carouselMedia = [
    { type: 'video', src: homeVideo1 },
    { type: 'video', src: homeVideo2 },
    { type: 'video', src: homeVideo3 },
    { type: 'video', src: homeVideo4 },
    { type: 'video', src: homeVideo5 }
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselVideoRefs = useRef([]);
  const appsStripeRef = useRef(null);

  const features = [
    {
      title: t.home.feature1Title,
      description: t.home.feature1Desc
    },
    {
      title: t.home.feature2Title,
      description: t.home.feature2Desc
    },
    {
      title: t.home.feature3Title,
      description: t.home.feature3Desc
    }
  ];

  const showPrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? carouselMedia.length - 1 : prevIndex - 1
    );
  };

  const showNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % carouselMedia.length);
  };

  const scrollAppsStripe = (direction) => {
    const el = appsStripeRef.current;
    if (!el) return;
    const step = Math.min(Math.floor(el.clientWidth * 0.72), 340);
    el.scrollBy({
      left: direction === 'next' ? step : -step,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    carouselVideoRefs.current.forEach((videoEl, index) => {
      if (!videoEl) return;
      if (index === activeIndex) {
        const playPromise = videoEl.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {});
        }
      } else {
        videoEl.pause();
      }
    });
  }, [activeIndex]);

  useEffect(() => {
    const n = carouselMedia.length;
    if (n <= 1) return undefined;
    const timerId = window.setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % n);
    }, HOME_CAROUSEL_AUTO_MS);
    return () => window.clearInterval(timerId);
  }, [carouselMedia.length]);

  return (
    <>
      <header className="hero">
        <div className="hero-content container">
          <div className="hero-text">
            <img
              src={abaShelAriLogo}
              alt="AbaShelAri logo"
              className="hero-main-logo"
            />
            <h1>{t.home.title}</h1>
            <div className="hero-description">
              <p>{t.home.intro}</p>
              <ul>
                <li>
                  <strong>{t.home.masterSwedishLabel}</strong>{' '}
                  {t.home.masterSwedishText}
                </li>
                <li>
                  <strong>{t.home.simplifyFinancesLabel}</strong>{' '}
                  {t.home.simplifyFinancesText}
                </li>
                <li>
                  <strong>{t.home.designedLabel}</strong> {t.home.designedText}
                </li>
              </ul>
            </div>
          </div>

          <div className="hero-carousel" aria-label={t.home.carouselRegion}>
            <div className="carousel-stage">
              {carouselMedia.map((media, index) => {
                const rawOffset = index - activeIndex;
                const wrappedOffset =
                  rawOffset > carouselMedia.length / 2
                    ? rawOffset - carouselMedia.length
                    : rawOffset < -carouselMedia.length / 2
                      ? rawOffset + carouselMedia.length
                      : rawOffset;

                let slideClass = 'is-hidden';
                if (wrappedOffset === 0) slideClass = 'is-center';
                if (wrappedOffset === -1) slideClass = 'is-left';
                if (wrappedOffset === 1) slideClass = 'is-right';

                return (
                  <div
                    key={`${media.type}-${media.src}`}
                    className={`carousel-slide ${slideClass}`}
                  >
                    <div className="carousel-phone-frame">
                      <div className="carousel-phone-chrome">
                        {media.type === 'video' ? (
                          <video
                            src={media.src}
                            className="carousel-phone-media"
                            ref={(el) => {
                              carouselVideoRefs.current[index] = el;
                            }}
                            loop
                            muted
                            playsInline
                          />
                        ) : (
                          <img
                            src={media.src}
                            alt={`ABASHELARI app preview ${index + 1}`}
                            className="carousel-phone-media"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <button
                type="button"
                className="carousel-arrow prev"
                onClick={showPrev}
                aria-label={t.home.previousImage}
              >
                ‹
              </button>
              <button
                type="button"
                className="carousel-arrow next"
                onClick={showNext}
                aria-label={t.home.nextImage}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section
          className="home-apps-stripe section-muted"
          aria-labelledby="home-apps-stripe-heading"
        >
          <div className="container home-apps-stripe-inner">
            <div className="home-apps-stripe-block">
            <h2 id="home-apps-stripe-heading" className="home-apps-stripe-title">
              {t.home.appsStripeTitle}
            </h2>
            <div className="home-apps-stripe-scroll-wrap">
              <button
                type="button"
                className="carousel-arrow prev home-apps-stripe-arrow"
                onClick={() => scrollAppsStripe('prev')}
                aria-label={t.home.appsStripePrev}
              >
                ‹
              </button>
              <nav
                ref={appsStripeRef}
                className="home-apps-stripe-grid"
                aria-label={t.home.appsStripeAria}
              >
                {apps.map((app) => (
                  <Link
                    key={app.slug}
                    to={`/our-apps/${app.slug}`}
                    className="home-apps-stripe-item"
                  >
                    {app.iconUrl ? (
                      <img
                        src={app.iconUrl}
                        alt={app.title}
                        className="home-apps-stripe-icon"
                      />
                    ) : (
                      <div
                        className="home-apps-stripe-icon placeholder"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                ))}
              </nav>
              <button
                type="button"
                className="carousel-arrow next home-apps-stripe-arrow"
                onClick={() => scrollAppsStripe('next')}
                aria-label={t.home.appsStripeNext}
              >
                ›
              </button>
            </div>
            </div>
          </div>
        </section>

        <section className="section container">
          <h2>{t.home.howTitle}</h2>
          <p className="section-subtitle">{t.home.howSubtitle}</p>
          <div className="grid three">
            {features.map((item) => (
              <article className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

const APPS = [
  {
    slug: 'swadjective',
    folderName: 'SWAdjective',
    title: 'SWAdjective',
    subtitle: 'Swedish Adjectives',
    description: `Master Swedish Adjectives with Confidence!

Understanding Swedish adjectives is essential for speaking correctly and naturally.
“SWAdjective” helps you practice and master Antonyms, Agreement, and Comparison through interactive exercises, clear explanations, and smart testing tools.

Whether you're learning basic adjective forms or refining advanced grammar, this app guides you step by step toward accuracy and confidence.
With a clean interface, instant feedback, and real grammar support, “SWAdjective” makes Swedish adjective practice focused and effective.

Why Users Love “SWAdjective”?

- Antonyms Practice - Learn opposites and expand your vocabulary
- Agreement Training - Master adjective forms for en, ett, and plural
- Comparison Exercises - Practice comparative and superlative forms
- Practice & Test Modes - Train first, then challenge yourself
- Instant Feedback - Clear correction for right and wrong answers
- English Translations - Understand meaning while learning structure
- Audio Pronunciation - Hear words pronounced correctly
- Save Your History - Return to previous tests and review mistakes
- Learning Tips Section - Improve with helpful grammar insights
- Scheduled Notifications - Stay consistent with daily reminders
- Light & Dark Mode - Learn comfortably anytime
- Clean & Intuitive Design - Focused, simple, and easy to use

Whether you’re preparing for exams, improving everyday conversation, or building a strong grammar foundation, “SWAdjective” helps you use Swedish adjectives correctly and naturally.

Download “SWAdjective” now and strengthen your Swedish grammar one word at a time!`,
    iconUrl:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/a3/14/3e/a3143e82-0880-93cb-2f2d-0f37b76cc3dd/AppIcon-0-0-1x_U007epad-0-1-85-220.png/100x100bb.jpg',
    appStoreUrl: 'https://apps.apple.com/us/app/swadjective/id6759053336'
  },
  {
    slug: 'swgrammar',
    folderName: 'SWGrammar',
    title: 'SWGrammar',
    subtitle: 'Swedish Grammar',
    description: `SWGrammar - Master Swedish Grammar, One Step at a Time

Learning Swedish grammar doesn’t have to be confusing or boring.
SWGrammar helps you practice, understand, and master Swedish grammar through focused exercises, smart tests, and clear structure - all at your own pace.
Whether you’re a beginner or refreshing your skills, SWGrammar makes grammar simple, practical, and effective.

What You Can Practice

SWGrammar focuses on the most important grammar foundations:

- Verbs - Tenses, forms, and real usage
- Pronouns - Personal, possessive, reflexive, and more
- Noun Gender - en / ett made clear through practice
Each section includes guided practice, tests, and review tools to help knowledge stick.

Why Users Love SWGrammar

- Focused Grammar Practice - Learn grammar through doing, not memorizing
- Practice & Test Modes - Train first, then test yourself when ready
- Test History - Review past tests and learn from your mistakes
- Smart Repetition - Practice weak areas again for better retention
- Works 100% Offline - Learn anywhere, anytime
- Privacy-Friendly - No accounts, no tracking, no data collection
- Clean & Simple Design - Easy to use and distraction-free
Learn With Confidence

SWGrammar is perfect if you:

- Want to finally understand Swedish grammar
- Prefer structured practice over long explanations
- Study offline or on the go
- Care about privacy and simplicity

Whether you’re studying Swedish for school, work, or everyday life, SWGrammar gives you the tools to practice grammar with confidence.

Download SWGrammar today and build a strong foundation in Swedish grammar - one exercise at a time.`,
    iconUrl:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/89/04/55/890455e1-192b-d4e9-fa29-7d97d860d260/AppIcon-0-0-1x_U007epad-0-1-85-220.png/100x100bb.jpg',
    appStoreUrl: 'https://apps.apple.com/us/app/swgrammar/id6758405991'
  },
  {
    slug: 'swverbs',
    folderName: 'SWVerbs',
    title: 'SWVerbs',
    subtitle: 'Swedish Verbs',
    description: `SWVerbs - Master Swedish Verbs with Confidence

Swedish verbs are the key to speaking and understanding the language.SWVerbs helps you learn, practice, and master the most common Swedish verbs, with clear verb forms, real-life examples, and smart practice tools - all designed to make verbs feel natural and easy.
Whether you’re a beginner or strengthening your foundation, SWVerbs gives you full control over your learning.

What You Can Learn
SWVerbs includes 200+ of the most common Swedish verbs, each with:
- Present, Past & Perfect forms
- Clear English translations
- Real-life example sentences
- Audio pronunciation for every verb and sentence
Learn not just the verb - but how to use it correctly in real Swedish.

Why Users Love SWVerbs
- Browse & Learn Mode - Explore all verbs and their forms at your own pace
- Practice Mode - Train with random verbs for active recall
- Test Mode - Turn any practice session into a test when you feel ready
- Real-Life Sentences - Learn verbs in meaningful context
- Audio for All Content - Hear correct pronunciation anytime
- Works 100% Offline - Learn verbs anywhere, no internet required
- Privacy Friendly - No accounts, no tracking, no data collection
- Clean & Intuitive Design - Focused, simple, and easy to use

Learn Verbs the Smart Way
SWVerbs is perfect if you:
- Want to finally understand Swedish verb forms
- Learn best through practice and repetition
- Prefer real examples over long explanations
- Study offline or on the go
From everyday conversations to more confident speaking, SWVerbs helps Swedish verbs click - once and for all.

Download SWVerbs today and start mastering Swedish verbs, one tense at a time.`,
    iconUrl:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/44/11/73/441173e6-09dd-c781-e246-fb01b7bec946/AppIcon-0-0-1x_U007epad-0-1-85-220.png/100x100bb.jpg',
    appStoreUrl: 'https://apps.apple.com/us/app/swverbs/id6758412306'
  },
  {
    slug: 'swvocabulary',
    folderName: 'SWVocabulary',
    title: 'SWVocabulary',
    subtitle: 'Swedish Vocabulary',
    description: `SWVocabulary - Build Your Swedish Vocabulary with Confidence.

Expanding your Swedish vocabulary doesn’t have to feel overwhelming.SWVocabulary helps you learn, practice, and remember Swedish words through smart repetition, clear examples, and focused testing - all designed to make learning efficient and enjoyable.
Whether you’re just starting out or growing your vocabulary further, SWVocabulary adapts to how you learn.

What You Can Learn

SWVocabulary gives you access to over 1,000 carefully selected Swedish words, each supported by:
- Clear English translations
- Real-life example sentences
- Audio pronunciation for every word
Practice words in context and learn how they’re actually used in everyday Swedish.

Why Users Love SWVocabulary?
- Smart Practice System - Weak words return automatically for better retention
- Practice & Test Modes - Learn first, then test your knowledge
- Test History - Review completed tests and learn from past mistakes
- Audio for Every Word - Hear correct pronunciation anytime
- Example Sentences - Understand words in real-life context
- 100% Offline - Learn anywhere, no internet required
- Privacy First - No accounts, no tracking, no data collection
- Clean & Intuitive Design - Focus on learning without distractions

Learn Smarter, Not Harder
SWVocabulary is perfect if you:
- Want to grow your Swedish vocabulary efficiently
- Prefer practice-based learning over memorization
- Learn better with audio and examples
- Study offline or on the go

Whether you’re learning Swedish for daily life, work, or travel, SWVocabulary helps words stick - for good.

Download SWVocabulary today and start building a stronger Swedish vocabulary, one word at a time.`,
    iconUrl:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/94/de/e4/94dee4d4-a239-f53c-2e14-5ee89aa11edc/AppIcon-0-0-1x_U007epad-0-1-85-220.png/100x100bb.jpg',
    appStoreUrl: 'https://apps.apple.com/us/app/swvocabulary/id6758410859'
  },
  {
    slug: 'swworder',
    folderName: 'SWWorder',
    title: 'SWWorder',
    subtitle: 'Swedish word ordering',
    description: `Master Swedish Sentence Structure, One Sentence at a Time!

Struggling with Swedish word order?
"SWWorder" helps you build correct Swedish sentences by arranging words in the right order - naturally and confidently.
Whether you’re a beginner learning basic structure or improving advanced grammar, "SWWorder" trains your brain to think in Swedish step by step.
With a clean interface, interactive practice, and clear grammar feedback, "SWWorder" makes mastering Swedish sentence structure simple and effective.

Why Users Love "SWWorder"?

- Sentence Building Practice - Arrange words to form correct Swedish sentences
- Practice & Test Modes - Learn first, then challenge yourself
- Instant Feedback - See corrections and understand your mistakes
- Swedish Grammar Rules - Get clear explanations for each sentence type
- Save Your History - Return to previous tests and learn from past errors
- Favorite Sentences - Save tricky sentences for focused practice
- Learning Tips Section - Improve with helpful grammar insights
- Scheduled Notifications - Stay consistent with daily reminders
- Light & Dark Mode - Learn comfortably day or night
- Intuitive Design - Clean, focused, and easy to use

Whether you're preparing for exams, improving daily conversation skills, or building a stronger grammar foundation, 
"SWWorder" helps you think in Swedish with confidence and clarity.

Download "SWWorder" now and start building Swedish sentences the right way!`,
    iconUrl:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/85/f7/52/85f752d6-b483-13fd-4900-d24798899d8a/AppIcon-0-0-1x_U007epad-0-1-85-220.png/100x100bb.jpg',
    appStoreUrl: 'https://apps.apple.com/us/app/swworder/id6759053552'
  },
  {
    slug: 'billtracker',
    folderName: 'BillTracker - Smart Finance',
    title: 'BillTracker - Smart Finance',
    subtitle: 'BillTracker - Smart Finance',
    description: `Why Users Love MyBillTracker:

- Multi-Currency Support - Track bills no matter where you are in the world
- Smart Notifications - Get reminders before payments are due
- Known Bill Templates - Quickly add common subscriptions like Netflix, Spotify, and more
- Powerful Analytics - See exactly how your bills stack up against your income with easy % calculations
- Export Your Data - Save or share your bill history for better record keeping
- Dark Mode - A sleek, eye-friendly design for day or night use
- Clean & Intuitive Design - Focused on clarity, speed, and simplicity

BillTracker makes it simple to plan ahead, avoid late fees, and gain full visibility of your financial commitments.
Whether you’re budgeting, managing household expenses, or keeping track of personal bills, BillTracker is your all-in-one solution for smarter money management.

Download BillTracker today and take control of your bills with confidence!`,
    iconUrl:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/83/a6/88/83a688c5-ca13-50a7-b354-76b752b6b575/AppIcon-0-0-1x_U007epad-0-1-85-220.png/100x100bb.jpg',
    appStoreUrl: 'https://apps.apple.com/us/app/billtracker-smart-finance/id6752301236'
  },
  {
    slug: 'talksvenska',
    folderName: 'TalkSvenska',
    title: 'TalkSvenska',
    subtitle: 'Start Talking Swedish',
    description: `Effortless Swedish Learning, Right at Your Fingertips!

Want to learn Swedish quickly and naturally? TalkSvenska helps you speak, understand, and practice Swedish with ease - whether you’re traveling, studying, or just curious about the language.

With a simple interface, interactive lessons, and real-world examples, TalkSvenska is your perfect companion for mastering Swedish step by step.

Why Users Love TalkSvenska?
- Practical Vocabulary & Phrases - Learn words and sentences you actually use
- Interactive Exercises - Practice speaking, listening, and reading daily
- Track Your Progress - See your improvement and stay motivated
- Light & Dark Mode - Switch between themes for day or night learning
- Customizable Lessons - Focus on topics that interest you most
- Intuitive Design - Easy to navigate and fun to use

Whether you’re planning a trip, connecting with Swedish friends, or boosting your career skills, TalkSvenska gives you the confidence to speak Swedish naturally.

Download TalkSvenska now and start speaking Swedish today!`,
    iconUrl:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b5/35/3b/b5353b92-af9e-b989-3ca7-0737cb11455a/AppIcon-0-0-1x_U007epad-0-1-85-220.png/100x100bb.jpg',
    appStoreUrl: 'https://apps.apple.com/us/app/talksvenska/id6751245892'
  },
  {
    slug: 'time2see',
    folderName: 'Time2See',
    title: 'Time2See',
    subtitle: 'Visual timer for kids',
    description: `Visual Timers That Make Time Make Sense!
Help your child build a natural sense of time with Time2See - a fun, visual timer app designed to make time feel real through colorful animations and smart design.
Whether it’s getting ready, brushing teeth, or finishing a task, Time2See helps kids understand time passing - without the stress of numbers or traditional clocks.

Why Families Love Time2See:
Engaging Visual Timers - Choose from balloons, bricks, emojis, and more to visualize time passing
Kid-Friendly & Intuitive - Simple enough for children to use independently
5 Language Options - Available in English, Spanish, Swedish, French, and German
Dark Mode Support - Gentle on the eyes in low-light environments
No Ads. No Purchases. No Distractions. - 100% safe and distraction-free for kids

Encourages Time Awareness - Helps kids manage daily routines with ease and confidence

Whether you're helping your child focus, transition between activities, or just understand how long “5 minutes” really is - Time2See turns time into something they can actually see and feel.

Download Time2See today and help your child connect with time like never before!`,
    iconUrl:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/57/1c/74/571c74b5-acd5-9f71-b5af-b41b0bfd37bd/AppIcon-0-0-1x_U007epad-0-1-85-220.png/100x100bb.jpg',
    appStoreUrl: 'https://apps.apple.com/us/app/time2see/id6749707107'
  },
  {
    slug: 'alphatime',
    folderName: 'AlphaTime',
    title: 'AlphaTime',
    subtitle: 'Elegant time in words',
    description: `Elegant Time in Words, Right on Your Display!

Want to experience time in a more natural and beautiful way? AlphaTime transforms your device into a sophisticated word clock,
displaying the current time through elegant typography, whether you're at your desk, in bed, or decorating your living room.

With a focus on minimalist design and linguistic accuracy,
AlphaTime is the perfect companion for those who appreciate the art of language and the beauty of high-end displays.

Why Users Love AlphaTime?

- Multilingual Elegance - Experience time in Hebrew (with precise Niqqud), English, Swedish, German, and French.
- Stunning Visual Themes - Choose from curated palettes like "Midnight," "Sepia," or "Nordic" to match your room's vibe.
- Premium Typography - Select from multiple Serif and Modern fonts designed for maximum legibility and style.
- Perfect for Landscape & iPad - Optimized to look incredible as a full-screen display on your nightstand or office desk.
- Customizable Appearance - Fully adjust background and text colors to create your own personalized clock.
- See the time anytime - Home Screen & Lock Screen Widgets will show the time as well.
- Intuitive & Simple - A clutter-free interface that focuses entirely on what matters: the present moment.

Whether you are looking for a unique bedside clock, a stylish desk accessory, or a way to stay connected to a new language,
AlphaTime gives you a timeless way to see the day.

Download AlphaTime now and let your clock tell the story!`,
    iconUrl:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d2/55/ee/d255ee62-f0f8-507f-5af1-516de8fbc4ba/AppIcon-0-0-1x_U007epad-0-1-85-220.png/100x100bb.jpg',
    appStoreUrl: 'https://apps.apple.com/us/app/alphatime-clock/id6759533912'
  },
  {
    slug: 'currensee',
    folderName: 'Curren$ee',
    title: 'Curren$ee',
    subtitle: 'Curren$ee - Currency converter',
    description: `Effortless Currency Conversion, Right at Your Fingertips!

Need a fast, accurate, and easy-to-use currency converter? Curren$ee gives you the power to convert between all world currencies instantly - whether you're traveling, shopping online, or tracking exchange trends.

With a clean interface, real-time data, and powerful customization, Curren$ee is your perfect companion for smart financial decisions.

Why Users Love Curren$ee?
- All Global Currencies Covered - Convert between any currencies, including crypto and rare ones
- Historical Exchange Rates - View trends and make informed choices with built-in rate history
- Light & Dark Mode - Switch between sleek themes for day or night use
- Set Your Defaults - Personalize your base & target currencies for lightning-fast conversions
- Ad-Free Experience - Clean, focused interface with zero distractions
- Intuitive Design - Built for speed, clarity, and ease of use

Whether you're managing international business, planning a trip, or just curious about currency trends, Curren$ee gives you the accuracy and convenience you need - all in one beautifully designed app.

Download Curren$ee now and take control of your conversions like a pro!`,
    iconUrl:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/39/89/61/398961be-a30e-72b8-4113-169539a6646c/AppIcon-0-0-1x_U007epad-0-1-85-220.png/100x100bb.jpg',
    appStoreUrl: 'https://apps.apple.com/us/app/curren%24ee/id6747065219'
  },
  {
    slug: 'swedish-letters-and-words',
    folderName: 'Swedish Letters And Words',
    title: 'Swedish Letters And Words',
    subtitle: 'Letters And Words For Kids',
    description: `Make Learning Swedish Fun & Engaging for Your Child!

Looking for the perfect way to introduce your little one to Swedish letters and words? Our interactive educational game turns learning into an exciting adventure! Designed for kids aged 3-6, this app helps children recognize letters, build words, and improve listening skills through fun drag-and-drop challenges with vivid images and engaging sounds.

3 Exciting Games for Endless Learning!
- Complete the Word - Drag the missing letters to form the correct word while seeing a helpful image.
- Build the Word - Arrange the letters in the correct order while the image guides the way.
- Listen & Build - Hear the word and match the correct letters to complete it!

With a progressive learning approach, increasing difficulty, and a hint system for extra help, your child will develop confidence and language skills effortlessly!

Why Parents & Kids Love This App?
- 160+ Fun Challenges to keep kids engaged
- High-Quality Images & Sounds for an immersive learning experience
- Multiple Background Music Options to keep things exciting
- Helpful Hint Button to overcome tricky words
- Smart Progression System that adapts as kids improve
- Completely Ad-Free! A safe environment for learning
- Kid-Friendly Interface - Easy to use, even for toddlers

Download now and let your child learn Swedish while having fun!`,
    iconUrl:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/82/1b/d3/821bd3d2-0181-18c1-0e91-9d41e06ad8d2/AppIcon-0-0-1x_U007epad-0-1-85-220.png/100x100bb.jpg',
    appStoreUrl: 'https://apps.apple.com/us/app/swedish-letters-and-words/id6745685313'
  },
  {
    slug: 'swedish-vocabulary-for-kids',
    folderName: 'Swedish Vocabulary for kids',
    title: 'Swedish Vocabulary for kids',
    subtitle: 'Swedish Vocabulary for kids',
    description: `The Most Fun Way to Learn Swedish Vocabulary!

Looking for an exciting way to teach your child - or yourself - Swedish vocabulary?
Our interactive and colorful educational app makes learning Swedish fun, effective, and engaging!

Perfect for kids and adults alike, the app offers a friendly interface in English or Hebrew, 
12 themed word categories, and crystal-clear audio in Swedish, English, and Hebrew for every word.

Why You'll Love This App:

- Learn Swedish words by topic - animals, colors, food, transportation and many more!
- Clear pronunciation for every word in Swedish, English, and Hebrew
- Switch easily between Hebrew or English interface
- Fun point-based scoring system to motivate learning
- High Score section to celebrate top learners
- Vivid images and playful design that keep learners engaged
- Safe for kids, perfect for adults - great for beginners
- 100% Ad-Free! A safe and distraction-free learning environment

Fall in love with learning Swedish - download now and start your journey!`,
    iconUrl:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ac/2b/bd/ac2bbd90-336c-bc54-d736-75054fc6ef72/AppIcon-0-0-1x_U007epad-0-1-85-220.png/100x100bb.jpg',
    appStoreUrl: 'https://apps.apple.com/us/app/swedish-vocabulary-for-kids/id6745595857'
  },
  {
    slug: 'abc-letter-tracing',
    folderName: 'ABC Letter Tracing',
    title: 'ABC Letter Tracing',
    subtitle: 'ABC Letter Tracing',
    description: `Make Learning to Write Fun & Engaging for Your Child!

Looking for the perfect way to teach your little one how to write English letters and numbers? Our interactive educational app makes learning to trace letters an exciting and rewarding experience! Designed for kids aged 3-6, this app helps children practice uppercase and lowercase letters, learn correct stroke order, and associate letters with words through fun, guided tracing exercises.

3 Exciting Learning Activities!
Letter & Number Tracing – Follow guided hints to trace uppercase letters, lowercase letters, and numbers.
Interactive Rewards – Earn points and enjoy a confetti celebration after successfully tracing a letter!
Complete the Tracing Challenge – Play a fun game where kids complete all letters in a colorful and engaging dashboard.
With more than 220 vivid images and sounds, children will also learn to associate letters with words, making the learning process both visual and auditory!

Why Parents & Kids Love This App?
- Guided Tracing with Hints for Easy Learning
- Uppercase, Lowercase & Number Tracing in One App
- Fun Reward System to Keep Kids Motivated
- Over 220 Images & Sounds to Reinforce Learning
- Interactive Game Mode for Extra Engagement
- Completely Ad-Free! A Safe & Fun Learning Environment
- Simple & Kid-Friendly Interface – Easy for Little Hands

Download now and help your child learn to write with confidence and joy!`,
    iconUrl:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/95/67/c8/9567c8cd-bbcb-fee5-52f6-6fabe4df6868/AppIcon-0-0-1x_U007epad-0-1-85-220.png/100x100bb.jpg',
    appStoreUrl: 'https://apps.apple.com/us/app/abc-letter-tracing/id6743401096'
  },
  {
    slug: 'hebrew-letter-tracing',
    folderName: 'Hebrew Letter Tracing',
    title: 'Hebrew Letter Tracing',
    subtitle: 'Hebrew Letter Tracing',
    description: `Make Learning to Write Fun & Engaging for Your Child!

Looking for the perfect way to teach your little one how to write Hebrew letters and numbers? 
Our interactive educational app makes learning to trace letters an exciting and rewarding experience! 
Designed for kids aged 3-6, this app helps children practice print and script letters, 
Learn correct stroke order, and associate letters with words through fun, guided tracing exercises.

3 Exciting Learning Activities!
- Letter & Number Tracing - Follow guided hints to trace print letters, script letters, and numbers.
- Interactive Rewards - Earn points and enjoy a confetti celebration after successfully tracing a letter!
- Complete the Tracing Challenge - Play a fun game where kids complete all letters in a colorful and engaging dashboard.

With more than 220 vivid images and sounds, children will also learn to associate letters with words, making the learning process both visual and auditory!

Why Kids & Parents Love This App?
- Guided Tracing with Hints for Easy Learning
- Print, Script & Number Tracing in One App
- Fun Reward System to Keep Kids Motivated
- Over 220 Images & Sounds to Reinforce Learning
- Interactive Game Mode for Extra Engagement
- Completely Ad-Free! A Safe & Fun Learning Environment
- Simple & Kid-Friendly Interface - Easy for Little Hands

The app that will make your kids love writing - download now!`,
    iconUrl:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/10/df/cc/10dfcc87-1a4d-139f-c400-40e7750e4df8/AppIcon-0-0-1x_U007epad-0-1-85-220.png/100x100bb.jpg',
    appStoreUrl: 'https://apps.apple.com/us/app/hebrew-letter-tracing/id6744246145'
  },
  {
    slug: 'hebrew-letters-and-words',
    folderName: 'Hebrew Letters And Words',
    title: 'Hebrew Letters And Words',
    subtitle: 'Hebrew Letters And Words',
    description: `Make Learning Hebrew Fun & Engaging for Your Child!

Looking for the perfect way to introduce your little one to Hebrew letters and words? Our interactive educational game turns learning into an exciting adventure! Designed for kids aged 3-6, this app helps children recognize letters, build words, and improve listening skills through fun drag-and-drop challenges with vivid images and engaging sounds.

3 Exciting Games for Endless Learning!
- Complete the Word - Drag the missing letters to form the correct word while seeing a helpful image.
- Build the Word - Arrange the letters in the correct order while the image guides the way.
- Listen & Build - Hear the word and match the correct letters to complete it!

With a progressive learning approach, increasing difficulty, and a hint system for extra help, your child will develop confidence and language skills effortlessly!

Why Parents & Kids Love This App?
- 160+ Fun Challenges to keep kids engaged
- High-Quality Images & Sounds for an immersive learning experience
- Multiple Background Music Options to keep things exciting
- Helpful Hint Button to overcome tricky words
- Smart Progression System that adapts as kids improve
- Completely Ad-Free! A safe environment for learning
- Kid-Friendly Interface – Easy to use, even for toddlers

Download now and let your child learn Hebrew while having fun!

-------------------------------

מחפשים דרך מושלמת להכיר לילדכם את האותיות והמילים בעברית? המשחק החינוכי האינטראקטיבי שלנו הופך את הלמידה להרפתקה מרגשת! האפליקציה מיועדת לילדים בגילאי 3-6 ומסייעת להם לזהות אותיות, להרכיב מילים ולשפר את יכולות ההאזנה באמצעות אתגרי גרירה ושחרור מהנים, תמונות צבעוניות וצלילים מרתקים.

3 משחקים מהנים ללמידה אין סופית!

- השלימו את המילה - גררו את האותיות החסרות להשלמת המילה הנכונה בליווי תמונה.
- הרכיבו את המילה לפי תמונה - סדרו את האותיות לפי הסדר הנכון בעזרת תמונה מכוונת.
- הרכיבו את המילה לפי צליל - האזינו למילה והתאימו את האותיות הנכונות להשלמתה.

עם שיטת למידה הדרגתית, רמות קושי מתפתחות ומערכת רמזים לעזרה נוספת, ילדכם יפתח בטחון ויכולות שפה בקלות!

למה הורים וילדים אוהבים את האפליקציה הזו?
- 160+ אתגרים מהנים שישאירו את הילדים סקרנים
- תמונות וצלילים באיכות גבוהה לחוויית למידה מעניינת
- מגוון אפשרויות מוזיקת רקע לשמירה על עניין והנאה
- כפתור רמז לעזרה במילים קשות
- מערכת התקדמות חכמה שמתאימה את עצמה לשיפור של הילדים
- ללא פרסומות! סביבה בטוחה לגמרי
- ממשק ידידותי - קל לשימוש, אפילו לפעוטות

הורידו עכשיו ותנו לילדכם ללמוד עברית תוך כדי כיף!`,
    iconUrl:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/f1/02/7d/f1027d95-1bf9-8790-6225-cec5206915d7/AppIcon-0-0-1x_U007epad-0-1-85-220.png/100x100bb.jpg',
    appStoreUrl: 'https://apps.apple.com/us/app/hebrew-letters-and-words/id6742989548'
  },
  {
    slug: 'letters-and-words-for-kids',
    folderName: 'Letters And Words For Kids',
    title: 'Letters And Words For Kids',
    subtitle: 'Letters And Words For Kids',
    description: `Make Learning English Fun & Engaging for Your Child!

Looking for the perfect way to introduce your little one to English letters and words? Our interactive educational game turns learning into an exciting adventure! Designed for kids aged 3-6, this app helps children recognize letters, build words, and improve listening skills through fun drag-and-drop challenges with vivid images and engaging sounds.

3 Exciting Games for Endless Learning!
- Complete the Word - Drag the missing letters to form the correct word while seeing a helpful image.
- Build the Word - Arrange the letters in the correct order while the image guides the way.
- Listen & Build - Hear the word and match the correct letters to complete it!

With a progressive learning approach, increasing difficulty, and a hint system for extra help, your child will develop confidence and language skills effortlessly!

Why Parents & Kids Love This App?
- 160+ Fun Challenges to keep kids engaged
- High-Quality Images & Sounds for an immersive learning experience
- Multiple Background Music Options to keep things exciting
- Helpful Hint Button to overcome tricky words
- Smart Progression System that adapts as kids improve
- Completely Ad-Free! A safe environment for learning
- Kid-Friendly Interface – Easy to use, even for toddlers

Download now and let your child learn English while having fun!`,
    iconUrl:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/e4/2a/45/e42a45fe-c4d9-0669-4607-d354ae502c65/AppIcon-0-1x_U007epad-0-1-85-220-0.png/100x100bb.jpg',
    appStoreUrl: 'https://apps.apple.com/us/app/letters-and-words-for-kids/id6742707650'
  },
  {
    slug: 'swedish-letter-tracing',
    folderName: 'Swedish Letter Tracing',
    title: 'Swedish Letter Tracing',
    subtitle: 'Swedish Letter Tracing',
    description: `Make Learning to Write Fun & Engaging for Your Child!
Looking for the perfect way to teach your little one how to write English letters and numbers? Our interactive educational app makes learning to trace letters an exciting and rewarding experience! Designed for kids aged 3-6, this app helps children practice uppercase and lowercase letters, learn correct stroke order, and associate letters with words through fun, guided tracing exercises.

3 Exciting Learning Activities!
- Letter & Number Tracing – Follow guided hints to trace uppercase letters, lowercase letters, and numbers.
- Interactive Rewards - Earn points and enjoy a confetti celebration after successfully tracing a letter!
- Complete the Tracing Challenge - Play a fun game where kids complete all letters in a colorful and engaging dashboard.

With more than 220 vivid images and sounds, children will also learn to associate letters with words, making the learning process both visual and auditory!

Why Parents & Kids Love This App?
- Guided Tracing with Hints for Easy Learning
- Uppercase, Lowercase & Number Tracing in One App
- Fun Reward System to Keep Kids Motivated
- Over 220 Images & Sounds to Reinforce Learning
- Interactive Game Mode for Extra Engagement
- Completely Ad-Free! A Safe & Fun Learning Environment
- Simple & Kid-Friendly Interface - Easy for Little Hands

Download now and help your child learn to write with confidence and joy!


------------------------------------------------------------------------------------


Gör Lärandet Roligt & Engagerande för Ditt Barn!
Letar du efter det perfekta sättet att lära ditt barn att skriva engelska bokstäver och siffror? Vår interaktiva utbildningsapp gör bokstavsträning till en spännande och givande upplevelse! Designad för barn i åldern 3–6 år, hjälper denna app barn att öva på stora och små bokstäver, lära sig rätt skrivordning och koppla bokstäver till ord genom roliga och vägledda övningar.

3 Spännande Inlärningsaktiviteter!
- Bokstavs - & Sifferträning – Följ vägledande tips för att spåra stora och små bokstäver samt siffror.
- Interaktiva Belöningar - Få poäng och fira med konfetti när du lyckas spåra en bokstav!
- Fullfölj Spårningsutmaningen - Spela ett roligt spel där barnen slutför alla bokstäver på en färgglad och engagerande spelplan.

Med över 220 levande bilder och ljud får barnen också lära sig att koppla bokstäver till ord, vilket gör inlärningen både visuell och auditiv!

Varför Älskar Föräldrar & Barn Denna App?
- Vägledd Träning med tips för enkel inlärning
- Stora, små bokstäver & siffror - allt i en app
- Roligt belöningssystem som håller barnen motiverade
- Över 220 bilder & ljud som förstärker lärandet
- Interaktivt spelläge för extra engagemang
- Helt reklamfri! En trygg och rolig inlärningsmiljö
- Enkel & barnvänlig design - lätt för små händer att använda

Ladda ner nu och hjälp ditt barn att lära sig skriva med glädje och självförtroende!`,
    iconUrl:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/9c/a8/44/9ca8444c-9eb9-9d30-d28a-0ff7f0005111/AppIcon-0-0-1x_U007epad-0-1-85-220.png/100x100bb.jpg',
    appStoreUrl: 'https://apps.apple.com/us/app/swedish-letter-tracing/id6743621112'
  }
];

const APP_MEDIA_CONTEXT = require.context(
  './assets/images',
  true,
  /\.(png|jpe?g|webp|mov|mp4|webm)$/i
);

/** Landscape mockup filenames (width > height); shown without portrait aspect forcing */
const LANDSCAPE_SCREENSHOT_FILENAMES = new Set([
  'iPhone4.001.png',
  'iPhone5.001.png'
]);

const ALL_LANDSCAPE_SCREENSHOT_SLUGS = new Set([
  'swedish-letters-and-words',
  'swedish-vocabulary-for-kids',
  'abc-letter-tracing',
  'hebrew-letter-tracing',
  'hebrew-letters-and-words',
  'letters-and-words-for-kids',
  'swedish-letter-tracing'
]);

function getScreenshotOrientation(key) {
  const filename = key.split('/').pop() ?? '';
  return LANDSCAPE_SCREENSHOT_FILENAMES.has(filename) ? 'landscape' : 'portrait';
}

function getScreenshotsGridClass(appSlug, mediaItems) {
  if (ALL_LANDSCAPE_SCREENSHOT_SLUGS.has(appSlug)) {
    return 'landscape-media';
  }
  const hasLandscape = mediaItems.some((item) => item.orientation === 'landscape');
  const hasPortrait = mediaItems.some((item) => item.orientation === 'portrait');
  if (hasLandscape && hasPortrait) {
    return 'has-mixed-orientation';
  }
  if (hasLandscape) {
    return 'landscape-media';
  }
  return '';
}

function getAppMedia(folderName) {
  try {
    return APP_MEDIA_CONTEXT.keys()
      .filter((key) => key.startsWith(`./${folderName}/`))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((key) => {
        const lowerKey = key.toLowerCase();
        const type = /\.(mov|mp4|webm)$/i.test(lowerKey) ? 'video' : 'image';
        const orientation =
          type === 'image' ? getScreenshotOrientation(key) : 'portrait';
        return { type, src: APP_MEDIA_CONTEXT(key), orientation };
      });
  } catch {
    return [];
  }
}

function AppShowcaseBox({ app, t }) {
  return (
    <article
      className={`our-apps-box ${app.iconUrl ? 'with-bg-image' : ''}`}
      style={app.iconUrl ? { '--box-bg-image': `url(${app.iconUrl})` } : undefined}
    >
      <div className="our-apps-box-header">
        <div className="our-apps-text">
          <h2 className="our-apps-title-row">
            <Link to={`/our-apps/${app.slug}`} className="app-title-link">
              {app.title}
            </Link>
            <Link
              to={`/our-apps/${app.slug}`}
              className="app-read-more-btn"
            >
              {t.ourApps.readMore}
            </Link>
          </h2>
          <p>{app.subtitle}</p>
          {app.appStoreUrl ? (
            <a
              href={encodeURI(app.appStoreUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="app-store-badge-link"
              aria-label={`Download ${app.title} on the App Store`}
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt={t.ourApps.downloadLabel}
                className="app-store-badge"
              />
            </a>
          ) : null}
        </div>

        {app.iconUrl ? (
          <img src={app.iconUrl} alt={`${app.title} icon`} className="our-app-icon" />
        ) : (
          <div className="our-app-icon placeholder" aria-hidden="true" />
        )}
      </div>
    </article>
  );
}

function OurAppsPage({ t }) {
  return (
    <main className="our-apps-page container">
      <h1>{t.ourApps.pageTitle}</h1>
      <p className="our-apps-intro">{t.ourApps.intro}</p>

      <div className="our-apps-grid">
        {APPS.map((app) => (
          <AppShowcaseBox
            key={app.slug}
            app={app}
            t={t}
          />
        ))}
      </div>
    </main>
  );
}

function AppDetailPage({ t }) {
  const { appSlug } = useParams();
  const app = APPS.find((item) => item.slug === appSlug);
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!app) {
    return (
      <main className="placeholder-page container">
        <h1>{t.ourApps.pageTitle}</h1>
        <p>{t.ourApps.appNotFound}</p>
      </main>
    );
  }

  const mediaItems = getAppMedia(app.folderName);
  const orderedMediaItems = [
    ...mediaItems.filter((item) => item.type === 'video'),
    ...mediaItems.filter((item) => item.type === 'image')
  ];
  const screenshotsGridClass = getScreenshotsGridClass(app.slug, orderedMediaItems);

  return (
    <main className="app-detail-page container">
      <Link to="/our-apps" className="back-link">
        ← {t.ourApps.pageTitle}
      </Link>

      <header className="app-detail-header">
        <img src={app.iconUrl} alt={`${app.title} icon`} className="app-detail-icon" />
        <div>
          <h1>{app.title}</h1>
          <p className="app-detail-subtitle">{app.subtitle}</p>
          <p
            className={`app-detail-description ${
              showFullDescription ? 'expanded' : 'collapsed'
            }`}
          >
            {app.description}
          </p>
          <button
            type="button"
            className="description-toggle-btn"
            onClick={() => setShowFullDescription((prev) => !prev)}
          >
            {showFullDescription
              ? t.ourApps.descriptionLess
              : t.ourApps.descriptionMore}
          </button>
          <a
            href={encodeURI(app.appStoreUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="app-store-badge-link app-store-badge-link-right"
            aria-label={`Download ${app.title} on the App Store`}
          >
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt={t.ourApps.downloadLabel}
              className="app-store-badge"
            />
          </a>
        </div>
      </header>

      <section className="app-screenshots">
        <h2>{t.ourApps.screenshotsHeading}</h2>
        {orderedMediaItems.length > 0 ? (
          <div className={`app-screenshots-grid ${screenshotsGridClass}`.trim()}>
            {orderedMediaItems.map((item, index) => (
              <div
                className={`app-media-item${
                  item.orientation === 'landscape' ? ' is-landscape' : ''
                }`}
                key={`${app.slug}-${item.type}-${index}`}
              >
                {item.type === 'video' ? (
                  <video src={item.src} autoPlay loop muted playsInline controls />
                ) : (
                  <img
                    src={item.src}
                    alt={`${app.title} screenshot ${index + 1}`}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>
            {t.ourApps.noScreenshotsLead}{' '}
            <code>src/assets/images/{app.folderName}/</code>.
          </p>
        )}
      </section>
    </main>
  );
}

function PrivacyPolicyPage({ t }) {
  const p = t.privacy;
  return (
    <main className="privacy-page container">
      <h1>{p.title}</h1>
      <p className="privacy-updated">{p.updated}</p>
      <p>{p.intro}</p>

      <section className="privacy-section">
        <h2>{p.collectHeading}</h2>
        <p>{p.collectIntro}</p>
        <ul>
          {p.collectItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="privacy-section">
        <h2>{p.useHeading}</h2>
        <ul>
          {p.useItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="privacy-section">
        <h2>{p.shareHeading}</h2>
        <p>{p.shareText}</p>
      </section>

      <section className="privacy-section">
        <h2>{p.retentionHeading}</h2>
        <p>{p.retentionText}</p>
      </section>

      <section className="privacy-section">
        <h2>{p.securityHeading}</h2>
        <p>{p.securityText}</p>
      </section>

      <section className="privacy-section">
        <h2>{p.childrenHeading}</h2>
        <p>{p.childrenText}</p>
      </section>

      <section className="privacy-section">
        <h2>{p.thirdHeading}</h2>
        <p>{p.thirdText}</p>
      </section>

      <section className="privacy-section">
        <h2>{p.changesHeading}</h2>
        <p>{p.changesText}</p>
      </section>

      <section className="privacy-section">
        <h2>{p.rightsHeading}</h2>
        <p>{p.rightsText}</p>
      </section>

      <section className="privacy-section">
        <h2>{p.contactHeading}</h2>
        <p>
          {p.contactTextLead}{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="mailto-link">
            {CONTACT_EMAIL}
          </a>
          {p.contactTextTrail}
        </p>
      </section>
    </main>
  );
}

const CONTACT_MESSAGE_MIN = 10;
const CONTACT_MESSAGE_MAX = 500;
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgorggnd';

function ContactUsPage({ t }) {
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [submitError, setSubmitError] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    if (!successModalOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSuccessModalOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [successModalOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const len = message.trim().length;
    if (len < CONTACT_MESSAGE_MIN) {
      setMessageError(t.contact.messageErrorMin);
      return;
    }
    if (len > CONTACT_MESSAGE_MAX) {
      setMessageError(t.contact.messageErrorMax);
      return;
    }
    setMessageError('');
    setSubmitError('');
    setSubmitStatus('submitting');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        form.reset();
        setMessage('');
        setSubmitStatus('idle');
        setSuccessModalOpen(true);
        return;
      }

      let detail = '';
      try {
        const data = await response.json();
        if (data?.error) detail = String(data.error);
      } catch {
        /* ignore */
      }
      setSubmitStatus('error');
      setSubmitError(
        detail ? `${t.contact.submitError} (${detail})` : t.contact.submitError
      );
    } catch {
      setSubmitStatus('error');
      setSubmitError(t.contact.submitError);
    }
  };

  const handleMessageChange = (event) => {
    const value = event.target.value;
    setMessage(value);
    if (!messageError) return;
    const len = value.trim().length;
    if (
      len >= CONTACT_MESSAGE_MIN &&
      len <= CONTACT_MESSAGE_MAX
    ) {
      setMessageError('');
    }
  };

  return (
    <main className="contact-page container">
      <h1>{t.contact.title}</h1>
      <p>{t.contact.p1}</p>
      <p className="contact-email">
        <a href={`mailto:${CONTACT_EMAIL}`} className="mailto-link">
          {CONTACT_EMAIL}
        </a>
      </p>
      <p>{t.contact.p2}</p>
      <p>{t.contact.p3}</p>

      <form
        className="contact-form"
        onSubmit={handleSubmit}
        onFocusCapture={() => {
          if (submitStatus === 'error') {
            setSubmitStatus('idle');
            setSubmitError('');
          }
        }}
      >
        <label htmlFor="contact-name">{t.contact.name}</label>
        <input id="contact-name" name="name" type="text" required />

        <label htmlFor="contact-email-input">{t.contact.emailLabel}</label>
        <input id="contact-email-input" name="email" type="email" required />

        <label htmlFor="contact-message">{t.contact.message}</label>
        <div className="contact-message-field">
          <textarea
            id="contact-message"
            name="message"
            rows="5"
            value={message}
            onChange={handleMessageChange}
            maxLength={CONTACT_MESSAGE_MAX}
            aria-invalid={messageError ? 'true' : 'false'}
            aria-describedby={
              messageError ? 'contact-message-error' : undefined
            }
            className={messageError ? 'contact-message-input-invalid' : ''}
          />
          {messageError ? (
            <p
              id="contact-message-error"
              className="contact-message-error"
              role="alert"
            >
              {messageError}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          className="btn btn-solid"
          disabled={submitStatus === 'submitting'}
        >
          {submitStatus === 'submitting'
            ? t.contact.submitSending
            : t.contact.send}
        </button>

        {submitStatus === 'error' && submitError ? (
          <p className="contact-form-status contact-form-status-error" role="alert">
            {submitError}
          </p>
        ) : null}
      </form>

      {successModalOpen ? (
        <div
          className="modal-overlay"
          role="presentation"
          onClick={() => setSuccessModalOpen(false)}
        >
          <div
            className="modal-dialog contact-success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-heading"
            onClick={(event) => event.stopPropagation()}
          >
            <p id="contact-success-heading" className="contact-success-modal-text">
              {t.contact.submitSuccess}
            </p>
            <button
              type="button"
              className="btn btn-solid contact-success-modal-btn"
              onClick={() => setSuccessModalOpen(false)}
            >
              {t.contact.gotIt}
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function WhoAreWePage({ t }) {
  const w = t.whoWeAre;
  return (
    <main className="info-page container who-we-page">
      <h1>{w.title}</h1>
      <p className="who-we-intro">{w.intro}</p>
      <section className="who-we-section" aria-labelledby="who-we-s1">
        <h2 id="who-we-s1">{w.section1Title}</h2>
        <p>{w.section1Text}</p>
      </section>
      <section className="who-we-section" aria-labelledby="who-we-s2">
        <h2 id="who-we-s2">{w.section2Title}</h2>
        <p>{w.section2Text}</p>
      </section>
      <section className="who-we-section" aria-labelledby="who-we-s3">
        <h2 id="who-we-s3">{w.section3Title}</h2>
        <p>{w.section3Text}</p>
      </section>
      <section className="who-we-section" aria-labelledby="who-we-s4">
        <h2 id="who-we-s4">{w.section4Title}</h2>
        <p>{w.section4Text}</p>
      </section>
    </main>
  );
}

function SettingsPage({ language, setLanguage, t }) {
  const langCodes = ['en', 'sv', 'es', 'de', 'fr'];
  return (
    <main className="settings-page container">
      <h1>{t.settings.title}</h1>
      <section className="settings-card">
        <h2>{t.settings.languageTitle}</h2>
        <p>{t.settings.languageDesc}</p>
        <div className="language-buttons">
          {langCodes.map((code) => (
            <button
              key={code}
              type="button"
              className={`btn ${language === code ? 'btn-solid' : 'btn-outline'}`}
              onClick={() => setLanguage(code)}
            >
              {t.settings[SETTINGS_LANG_KEY[code]]}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

function SiteFooter({ t }) {
  const year = new Date().getFullYear();
  return (
    <footer
      className="site-footer"
      role="contentinfo"
      aria-label={t.siteFooter.ariaLabel}
    >
      <div className="site-footer-inner container">
        <p className="site-footer-copy">
          © {year} ABASHELARI. {t.siteFooter.rightsReserved}
        </p>
      </div>
    </footer>
  );
}

function AppLayout() {
  const [language, setLanguage] = useState('en');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const resolvedLang = TRANSLATIONS[language] ? language : 'en';
  const t = TRANSLATIONS[resolvedLang];
  const langUi = LANG_META[resolvedLang] ?? LANG_META.en;
  const languageFlag = langUi.flag;
  const languageLabel = langUi.short;

  const selectLanguage = (nextLanguage) => {
    if (TRANSLATIONS[nextLanguage]) {
      setLanguage(nextLanguage);
    }
    setIsLanguageMenuOpen(false);
  };

  return (
    <div className="app">
      <header className="site-header">
        <nav className="nav container" aria-label="Main">
          <div className="brand-area">
            <Link to="/" className="brand" aria-label="Go to home">
              <img src={abaShelAriLogo} alt="AbaShelAri" className="nav-logo" />
            </Link>
            <div className="language-switcher">
              <button
                type="button"
                className="language-toggle"
                onClick={() => setIsLanguageMenuOpen((prev) => !prev)}
                aria-label="Switch language"
                aria-expanded={isLanguageMenuOpen}
              >
                <span className="language-flag" aria-hidden="true">
                  {languageFlag}
                </span>
                {languageLabel}
              </button>
              {isLanguageMenuOpen ? (
                <div className="language-menu" role="menu">
                  {Object.entries(LANG_META).map(([code, meta]) => (
                    <button
                      key={code}
                      type="button"
                      className="language-menu-item"
                      onClick={() => selectLanguage(code)}
                    >
                      {meta.flag} {meta.menuLabel}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <div className="menu-links">
            <NavLink to="/" end>
              {t.menu.home}
            </NavLink>
            <NavLink to="/our-apps">{t.menu.ourApps}</NavLink>
            <NavLink to="/who-are-we">{t.menu.whoWeAre}</NavLink>
            <NavLink to="/privacy-policy">{t.menu.privacyPolicy}</NavLink>
            <NavLink to="/contact-us">{t.menu.contactUs}</NavLink>
            <NavLink to="/settings">{t.menu.settings}</NavLink>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage t={t} apps={APPS} />} />
        <Route path="/our-apps" element={<OurAppsPage t={t} />} />
        <Route path="/our-apps/:appSlug" element={<AppDetailPage t={t} />} />
        <Route path="/who-are-we" element={<WhoAreWePage t={t} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage t={t} />} />
        <Route path="/galery" element={<Navigate to="/privacy-policy" replace />} />
        <Route
          path="/contact-us"
          element={<ContactUsPage t={t} />}
        />
        <Route
          path="/settings"
          element={
            <SettingsPage
              language={resolvedLang}
              setLanguage={setLanguage}
              t={t}
            />
          }
        />
      </Routes>
      <SiteFooter t={t} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
