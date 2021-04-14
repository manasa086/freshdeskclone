import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import translationEN from './locales/en/translationEN.json';
import translationPT from './locales/pt/translationPT.json';
import translationTEL from "./locales/tel/translationTEL.json";
import translationHIN from "./locales/hin/translationHIN.json";
import translationKAN from "./locales/kan/translationKAN.json";
import translationMAL from "./locales/mal/translationMAL.json";
import translationOR from "./locales/or/translationOR.json";
import translationSPAN from "./locales/span/translationSPAN.json";
import translationTAM from "./locales/tam/translationTAM.json";
import translationUR from "./locales/ur/translationUR.json";
import translationFR from "./locales/fr/translationFR.json";

const resources={
    en:{
        translation:translationEN
    },
    pt:{
        translation:translationPT
    },
    tel:{
        translation:translationTEL
    },
    hin:{
        translation:translationHIN
    },
    kan:{
        translation:translationKAN
    },
    mal:{
        translation:translationMAL
    },
    or:{
        translation:translationOR
    },
    span:{
        translation:translationSPAN
    },
    tam:{
        translation:translationTAM
    },
    ur:{
        translation:translationUR
    },
    fr:{
        translation:translationFR
    }
}


i18n
.use(initReactI18next)
.init({
    resources,
    lng:'en',
    keySeparator:false,
    interpolation:{
        escapeValue:false
    }
});

export default i18n;