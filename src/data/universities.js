import paceLogo from '../assets/pace.svg';
import paceHero from '../assets/openxpace.png';
import paceHeaderLogo from '../assets/pacex.png';
import paceWhyLogo from '../assets/whypaceuni.png';
import ubLogo from '../assets/ub.svg';
import stonyLogo from '../assets/stony.svg';
import sdsuLogo from '../assets/sdsu1.png';
import sdsuHero from '../assets/sdsuuni.png';
import sdsuWhyLogo from '../assets/whysdsu.png';
import indianaTechLogo from '../assets/IndianaTech.svg';
import indianaTechHero from '../assets/IndianaTechUni.png';
import indianaTechWhyLogo from '../assets/whyindianatech.png';
import njcuLogo from '../assets/njcu.svg';
import njcuHero from '../assets/NJCUUNI.png';
import njcuWhyLogo from '../assets/whynjcu.png';
import njitLogo from '../assets/njit.svg';
import njitHero from '../assets/njituni.png';
import njitWhyLogo from '../assets/whynjit.png';
import ohioLogo from '../assets/ohio.svg';
import ohioHero from '../assets/ohiouni.png';
import ohioWhyLogo from '../assets/whyohio.png';
import sunyLogo from '../assets/SUNY.svg';
import sunyHero from '../assets/SUNYUNI.png';
import sunyWhyLogo from '../assets/WHYSUNY.png';
import mvnuLogo from '../assets/mvnu.svg';
import mvnuHero from '../assets/mvnuuni.png';
import mvnuWhyLogo from '../assets/whymvnu.png';
import franklinLogo from '../assets/franklin.svg';
import franklinHero from '../assets/franklinuni.png';
import franklinWhyLogo from '../assets/whyfranklin.png';
import cmuLogo from '../assets/cmu.svg';
import cmuHero from '../assets/cmuuni.png';
import cmuWhyLogo from '../assets/whycmu.png';
import pennLogo from '../assets/penn.svg';
import crestLogo from '../assets/crest.svg';
import eccLogo from '../assets/ecc.svg';
import gracelynLogo from '../assets/gracelyn.svg';

export const universities = [
  {
    slug: 'pace-university',
    name: 'PACE University',
    logo: paceLogo,
    heroImage: paceHero,
    headerLogo: paceHeaderLogo,
    whyLogo: paceWhyLogo,
    color: '#003366',
    hasPartnerPage: true
  },
  {
    slug: 'university-at-buffalo',
    name: 'University at Buffalo',
    logo: ubLogo,
    color: '#0047bb'
  },
  {
    slug: 'stony-brook-university',
    name: 'Stony Brook University',
    logo: stonyLogo,
    color: '#7a1f2b',
    hasPartnerPage: true
  },
  {
    slug: 'njcu',
    name: 'NJCU',
    logo: njcuLogo,
    headerLogo: njcuLogo,
    heroImage: njcuHero,
    whyLogo: njcuWhyLogo,
    color: '#0f5aa5',
    hasPartnerPage: true
  },
  {
    slug: 'njit',
    name: 'NJIT',
    logo: njitLogo,
    headerLogo: njitLogo,
    heroImage: njitHero,
    whyLogo: njitWhyLogo,
    color: '#d32f2f',
    hasPartnerPage: true
  },
  {
    slug: 'san-diego-state-university',
    name: 'San Diego State University',
    logo: sdsuLogo,
    headerLogo: sdsuLogo,
    heroImage: sdsuHero,
    whyLogo: sdsuWhyLogo,
    color: '#a6192e',
    hasPartnerPage: true
  },
  {
    slug: 'suny',
    name: 'SUNY',
    logo: sunyLogo,
    headerLogo: sunyLogo,
    heroImage: sunyHero,
    whyLogo: sunyWhyLogo,
    color: '#0b3d91',
    fullBleed: true,
    hasPartnerPage: true
  },
  {
    slug: 'the-ohio-state-university',
    name: 'The Ohio State University',
    logo: ohioLogo,
    headerLogo: ohioLogo,
    heroImage: ohioHero,
    whyLogo: ohioWhyLogo,
    color: '#bb0000',
    hasPartnerPage: true
  },
  {
    slug: 'mvnu',
    name: 'MVNU',
    logo: mvnuLogo,
    headerLogo: mvnuLogo,
    heroImage: mvnuHero,
    whyLogo: mvnuWhyLogo,
    color: '#006f4c',
    hasPartnerPage: true
  },
  {
    slug: 'franklin-university',
    name: 'Franklin University',
    logo: franklinLogo,
    headerLogo: franklinLogo,
    heroImage: franklinHero,
    whyLogo: franklinWhyLogo,
    color: '#0f1a2f',
    fullBleed: true,
    hasPartnerPage: true
  },
  {
    slug: 'central-michigan-university',
    name: 'Central Michigan University',
    logo: cmuLogo,
    headerLogo: cmuLogo,
    heroImage: cmuHero,
    whyLogo: cmuWhyLogo,
    color: '#6a0030',
    fullBleed: true,
    hasPartnerPage: true
  },
  {
    slug: 'penn-state',
    name: 'Penn State',
    logo: pennLogo,
    color: '#1e407c',
    hasPartnerPage: true
  },
  {
    slug: 'crestpoint-university',
    name: 'Crestpoint University',
    logo: crestLogo,
    color: '#4a4a4a'
  },
  {
    slug: 'indiana-tech',
    name: 'Indiana Tech',
    logo: indianaTechLogo,
    headerLogo: indianaTechLogo,
    heroImage: indianaTechHero,
    whyLogo: indianaTechWhyLogo,
    color: '#b43c2e',
    fullBleed: true,
    hasPartnerPage: true
  },
  {
    slug: 'ec-council-university',
    name: 'EC-Council University',
    logo: eccLogo,
    color: '#c41e3a',
    fullBleed: true
  },
  {
    slug: 'graceland-university',
    name: 'Graceland University',
    logo: gracelynLogo,
    color: '#3b2f6f'
  }
];

export const defaultBadges = [
  '100% online',
  'Transfer Credit Focused',
  'Lower Total Cost',
  'Gen Ed + Electives',
  'Faster Time-to-Degree'
];
