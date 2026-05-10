export interface Institution {
  name: string;
  slug: string;
  domain: string;         // For logo.clearbit.com
  type: "university" | "corporate" | "platform";
  region: string;
  country: string;
  ranking?: number;       // QS/THE rank if applicable
  courseCount?: number;    // Learnmora indexed courses
}

// ─── IVY LEAGUE & TOP US ─────────────────────────────────
const US_ELITE: Institution[] = [
  { name: "Harvard University", slug: "harvard-university", domain: "harvard.edu", type: "university", region: "North America", country: "US", ranking: 1 },
  { name: "Stanford University", slug: "stanford-university", domain: "stanford.edu", type: "university", region: "North America", country: "US", ranking: 2 },
  { name: "MIT", slug: "mit", domain: "mit.edu", type: "university", region: "North America", country: "US", ranking: 3 },
  { name: "Yale University", slug: "yale-university", domain: "yale.edu", type: "university", region: "North America", country: "US", ranking: 5 },
  { name: "Princeton University", slug: "princeton-university", domain: "princeton.edu", type: "university", region: "North America", country: "US", ranking: 6 },
  { name: "Columbia University", slug: "columbia-university", domain: "columbia.edu", type: "university", region: "North America", country: "US", ranking: 11 },
  { name: "University of Pennsylvania", slug: "university-of-pennsylvania", domain: "upenn.edu", type: "university", region: "North America", country: "US", ranking: 12 },
  { name: "Cornell University", slug: "cornell-university", domain: "cornell.edu", type: "university", region: "North America", country: "US", ranking: 16 },
  { name: "Brown University", slug: "brown-university", domain: "brown.edu", type: "university", region: "North America", country: "US", ranking: 20 },
  { name: "Dartmouth College", slug: "dartmouth-college", domain: "dartmouth.edu", type: "university", region: "North America", country: "US", ranking: 24 },
  { name: "University of Chicago", slug: "university-of-chicago", domain: "uchicago.edu", type: "university", region: "North America", country: "US", ranking: 9 },
  { name: "Duke University", slug: "duke-university", domain: "duke.edu", type: "university", region: "North America", country: "US", ranking: 21 },
  { name: "Johns Hopkins University", slug: "johns-hopkins-university", domain: "jhu.edu", type: "university", region: "North America", country: "US", ranking: 15 },
  { name: "Northwestern University", slug: "northwestern-university", domain: "northwestern.edu", type: "university", region: "North America", country: "US", ranking: 22 },
  { name: "UC Berkeley", slug: "uc-berkeley", domain: "berkeley.edu", type: "university", region: "North America", country: "US", ranking: 4 },
  { name: "UCLA", slug: "ucla", domain: "ucla.edu", type: "university", region: "North America", country: "US", ranking: 28 },
  { name: "University of Michigan", slug: "university-of-michigan", domain: "umich.edu", type: "university", region: "North America", country: "US", ranking: 23 },
  { name: "Carnegie Mellon University", slug: "carnegie-mellon-university", domain: "cmu.edu", type: "university", region: "North America", country: "US", ranking: 27 },
  { name: "Georgia Tech", slug: "georgia-tech", domain: "gatech.edu", type: "university", region: "North America", country: "US", ranking: 33 },
  { name: "University of Virginia", slug: "university-of-virginia", domain: "virginia.edu", type: "university", region: "North America", country: "US", ranking: 48 },
  { name: "NYU", slug: "nyu", domain: "nyu.edu", type: "university", region: "North America", country: "US", ranking: 35 },
  { name: "USC", slug: "usc", domain: "usc.edu", type: "university", region: "North America", country: "US", ranking: 50 },
  { name: "Rice University", slug: "rice-university", domain: "rice.edu", type: "university", region: "North America", country: "US", ranking: 52 },
  { name: "Vanderbilt University", slug: "vanderbilt-university", domain: "vanderbilt.edu", type: "university", region: "North America", country: "US", ranking: 55 },
  { name: "Emory University", slug: "emory-university", domain: "emory.edu", type: "university", region: "North America", country: "US", ranking: 58 },
  { name: "University of Texas at Austin", slug: "ut-austin", domain: "utexas.edu", type: "university", region: "North America", country: "US", ranking: 45 },
  { name: "University of Washington", slug: "university-of-washington", domain: "washington.edu", type: "university", region: "North America", country: "US", ranking: 29 },
  { name: "University of Illinois", slug: "university-of-illinois", domain: "illinois.edu", type: "university", region: "North America", country: "US", ranking: 46 },
  { name: "University of Wisconsin-Madison", slug: "university-of-wisconsin", domain: "wisc.edu", type: "university", region: "North America", country: "US", ranking: 56 },
  { name: "Purdue University", slug: "purdue-university", domain: "purdue.edu", type: "university", region: "North America", country: "US", ranking: 60 },
  { name: "Ohio State University", slug: "ohio-state-university", domain: "osu.edu", type: "university", region: "North America", country: "US", ranking: 75 },
  { name: "Penn State University", slug: "penn-state-university", domain: "psu.edu", type: "university", region: "North America", country: "US", ranking: 80 },
  { name: "University of Florida", slug: "university-of-florida", domain: "ufl.edu", type: "university", region: "North America", country: "US", ranking: 82 },
  { name: "Boston University", slug: "boston-university", domain: "bu.edu", type: "university", region: "North America", country: "US", ranking: 78 },
  { name: "University of Notre Dame", slug: "university-of-notre-dame", domain: "nd.edu", type: "university", region: "North America", country: "US", ranking: 85 },
  { name: "Georgetown University", slug: "georgetown-university", domain: "georgetown.edu", type: "university", region: "North America", country: "US", ranking: 88 },
  { name: "Washington University in St. Louis", slug: "washington-university-stl", domain: "wustl.edu", type: "university", region: "North America", country: "US", ranking: 46 },
  { name: "Caltech", slug: "caltech", domain: "caltech.edu", type: "university", region: "North America", country: "US", ranking: 7 },
  { name: "University of Maryland", slug: "university-of-maryland", domain: "umd.edu", type: "university", region: "North America", country: "US", ranking: 90 },
  { name: "Arizona State University", slug: "arizona-state-university", domain: "asu.edu", type: "university", region: "North America", country: "US", ranking: 105 },
];

// ─── EUROPEAN LEADERS ─────────────────────────────────
const EUROPEAN: Institution[] = [
  { name: "University of Oxford", slug: "university-of-oxford", domain: "ox.ac.uk", type: "university", region: "Europe", country: "UK", ranking: 3 },
  { name: "University of Cambridge", slug: "university-of-cambridge", domain: "cam.ac.uk", type: "university", region: "Europe", country: "UK", ranking: 4 },
  { name: "Imperial College London", slug: "imperial-college-london", domain: "imperial.ac.uk", type: "university", region: "Europe", country: "UK", ranking: 8 },
  { name: "UCL", slug: "ucl", domain: "ucl.ac.uk", type: "university", region: "Europe", country: "UK", ranking: 10 },
  { name: "University of Edinburgh", slug: "university-of-edinburgh", domain: "ed.ac.uk", type: "university", region: "Europe", country: "UK", ranking: 22 },
  { name: "King's College London", slug: "kings-college-london", domain: "kcl.ac.uk", type: "university", region: "Europe", country: "UK", ranking: 37 },
  { name: "London School of Economics", slug: "lse", domain: "lse.ac.uk", type: "university", region: "Europe", country: "UK", ranking: 45 },
  { name: "University of Manchester", slug: "university-of-manchester", domain: "manchester.ac.uk", type: "university", region: "Europe", country: "UK", ranking: 34 },
  { name: "University of Bristol", slug: "university-of-bristol", domain: "bristol.ac.uk", type: "university", region: "Europe", country: "UK", ranking: 55 },
  { name: "University of Warwick", slug: "university-of-warwick", domain: "warwick.ac.uk", type: "university", region: "Europe", country: "UK", ranking: 60 },
  { name: "University of Glasgow", slug: "university-of-glasgow", domain: "gla.ac.uk", type: "university", region: "Europe", country: "UK", ranking: 70 },
  { name: "University of Leeds", slug: "university-of-leeds", domain: "leeds.ac.uk", type: "university", region: "Europe", country: "UK", ranking: 86 },
  { name: "ETH Zurich", slug: "eth-zurich", domain: "ethz.ch", type: "university", region: "Europe", country: "Switzerland", ranking: 7 },
  { name: "EPFL", slug: "epfl", domain: "epfl.ch", type: "university", region: "Europe", country: "Switzerland", ranking: 14 },
  { name: "University of Zurich", slug: "university-of-zurich", domain: "uzh.ch", type: "university", region: "Europe", country: "Switzerland", ranking: 70 },
  { name: "TU Munich", slug: "tu-munich", domain: "tum.de", type: "university", region: "Europe", country: "Germany", ranking: 25 },
  { name: "Heidelberg University", slug: "heidelberg-university", domain: "uni-heidelberg.de", type: "university", region: "Europe", country: "Germany", ranking: 42 },
  { name: "LMU Munich", slug: "lmu-munich", domain: "lmu.de", type: "university", region: "Europe", country: "Germany", ranking: 38 },
  { name: "Humboldt University of Berlin", slug: "humboldt-university", domain: "hu-berlin.de", type: "university", region: "Europe", country: "Germany", ranking: 85 },
  { name: "Free University of Berlin", slug: "free-university-berlin", domain: "fu-berlin.de", type: "university", region: "Europe", country: "Germany", ranking: 90 },
  { name: "RWTH Aachen", slug: "rwth-aachen", domain: "rwth-aachen.de", type: "university", region: "Europe", country: "Germany", ranking: 87 },
  { name: "Sorbonne University", slug: "sorbonne-university", domain: "sorbonne-universite.fr", type: "university", region: "Europe", country: "France", ranking: 44 },
  { name: "École Polytechnique", slug: "ecole-polytechnique", domain: "polytechnique.edu", type: "university", region: "Europe", country: "France", ranking: 40 },
  { name: "Sciences Po", slug: "sciences-po", domain: "sciencespo.fr", type: "university", region: "Europe", country: "France", ranking: 110 },
  { name: "HEC Paris", slug: "hec-paris", domain: "hec.edu", type: "university", region: "Europe", country: "France", ranking: 115 },
  { name: "INSEAD", slug: "insead", domain: "insead.edu", type: "university", region: "Europe", country: "France", ranking: 50 },
  { name: "Bocconi University", slug: "bocconi-university", domain: "unibocconi.eu", type: "university", region: "Europe", country: "Italy", ranking: 95 },
  { name: "Politecnico di Milano", slug: "politecnico-di-milano", domain: "polimi.it", type: "university", region: "Europe", country: "Italy", ranking: 120 },
  { name: "KU Leuven", slug: "ku-leuven", domain: "kuleuven.be", type: "university", region: "Europe", country: "Belgium", ranking: 58 },
  { name: "University of Amsterdam", slug: "university-of-amsterdam", domain: "uva.nl", type: "university", region: "Europe", country: "Netherlands", ranking: 55 },
  { name: "TU Delft", slug: "tu-delft", domain: "tudelft.nl", type: "university", region: "Europe", country: "Netherlands", ranking: 47 },
  { name: "Leiden University", slug: "leiden-university", domain: "universiteitleiden.nl", type: "university", region: "Europe", country: "Netherlands", ranking: 65 },
  { name: "KTH Royal Institute", slug: "kth-royal-institute", domain: "kth.se", type: "university", region: "Europe", country: "Sweden", ranking: 73 },
  { name: "Lund University", slug: "lund-university", domain: "lu.se", type: "university", region: "Europe", country: "Sweden", ranking: 78 },
  { name: "University of Helsinki", slug: "university-of-helsinki", domain: "helsinki.fi", type: "university", region: "Europe", country: "Finland", ranking: 75 },
  { name: "Trinity College Dublin", slug: "trinity-college-dublin", domain: "tcd.ie", type: "university", region: "Europe", country: "Ireland", ranking: 98 },
  { name: "University of Copenhagen", slug: "university-of-copenhagen", domain: "ku.dk", type: "university", region: "Europe", country: "Denmark", ranking: 66 },
  { name: "Technical University of Denmark", slug: "dtu", domain: "dtu.dk", type: "university", region: "Europe", country: "Denmark", ranking: 100 },
  { name: "University of Oslo", slug: "university-of-oslo", domain: "uio.no", type: "university", region: "Europe", country: "Norway", ranking: 105 },
  { name: "University of Barcelona", slug: "university-of-barcelona", domain: "ub.edu", type: "university", region: "Europe", country: "Spain", ranking: 115 },
  { name: "IE University", slug: "ie-university", domain: "ie.edu", type: "university", region: "Europe", country: "Spain", ranking: 130 },
  { name: "Universidade de Lisboa", slug: "university-of-lisbon", domain: "ulisboa.pt", type: "university", region: "Europe", country: "Portugal", ranking: 150 },
  { name: "University of Vienna", slug: "university-of-vienna", domain: "univie.ac.at", type: "university", region: "Europe", country: "Austria", ranking: 125 },
  { name: "Charles University", slug: "charles-university", domain: "cuni.cz", type: "university", region: "Europe", country: "Czech Republic", ranking: 140 },
  { name: "University of Warsaw", slug: "university-of-warsaw", domain: "uw.edu.pl", type: "university", region: "Europe", country: "Poland", ranking: 160 },
  { name: "Moscow State University", slug: "moscow-state-university", domain: "msu.ru", type: "university", region: "Europe", country: "Russia", ranking: 87 },
];

// ─── ASIA-PACIFIC ─────────────────────────────────
const APAC: Institution[] = [
  { name: "National University of Singapore", slug: "nus", domain: "nus.edu.sg", type: "university", region: "Asia-Pacific", country: "Singapore", ranking: 8 },
  { name: "Nanyang Technological University", slug: "ntu", domain: "ntu.edu.sg", type: "university", region: "Asia-Pacific", country: "Singapore", ranking: 15 },
  { name: "University of Tokyo", slug: "university-of-tokyo", domain: "u-tokyo.ac.jp", type: "university", region: "Asia-Pacific", country: "Japan", ranking: 14 },
  { name: "Kyoto University", slug: "kyoto-university", domain: "kyoto-u.ac.jp", type: "university", region: "Asia-Pacific", country: "Japan", ranking: 33 },
  { name: "Osaka University", slug: "osaka-university", domain: "osaka-u.ac.jp", type: "university", region: "Asia-Pacific", country: "Japan", ranking: 68 },
  { name: "Tokyo Institute of Technology", slug: "tokyo-tech", domain: "titech.ac.jp", type: "university", region: "Asia-Pacific", country: "Japan", ranking: 55 },
  { name: "Tsinghua University", slug: "tsinghua-university", domain: "tsinghua.edu.cn", type: "university", region: "Asia-Pacific", country: "China", ranking: 12 },
  { name: "Peking University", slug: "peking-university", domain: "pku.edu.cn", type: "university", region: "Asia-Pacific", country: "China", ranking: 14 },
  { name: "Fudan University", slug: "fudan-university", domain: "fudan.edu.cn", type: "university", region: "Asia-Pacific", country: "China", ranking: 34 },
  { name: "Zhejiang University", slug: "zhejiang-university", domain: "zju.edu.cn", type: "university", region: "Asia-Pacific", country: "China", ranking: 42 },
  { name: "Shanghai Jiao Tong University", slug: "sjtu", domain: "sjtu.edu.cn", type: "university", region: "Asia-Pacific", country: "China", ranking: 46 },
  { name: "HKUST", slug: "hkust", domain: "hkust.edu.hk", type: "university", region: "Asia-Pacific", country: "Hong Kong", ranking: 18 },
  { name: "University of Hong Kong", slug: "university-of-hong-kong", domain: "hku.hk", type: "university", region: "Asia-Pacific", country: "Hong Kong", ranking: 21 },
  { name: "Chinese University of Hong Kong", slug: "cuhk", domain: "cuhk.edu.hk", type: "university", region: "Asia-Pacific", country: "Hong Kong", ranking: 38 },
  { name: "Seoul National University", slug: "seoul-national-university", domain: "snu.ac.kr", type: "university", region: "Asia-Pacific", country: "South Korea", ranking: 29 },
  { name: "KAIST", slug: "kaist", domain: "kaist.ac.kr", type: "university", region: "Asia-Pacific", country: "South Korea", ranking: 40 },
  { name: "Yonsei University", slug: "yonsei-university", domain: "yonsei.ac.kr", type: "university", region: "Asia-Pacific", country: "South Korea", ranking: 56 },
  { name: "National Taiwan University", slug: "national-taiwan-university", domain: "ntu.edu.tw", type: "university", region: "Asia-Pacific", country: "Taiwan", ranking: 68 },
  { name: "University of Melbourne", slug: "university-of-melbourne", domain: "unimelb.edu.au", type: "university", region: "Asia-Pacific", country: "Australia", ranking: 13 },
  { name: "University of Sydney", slug: "university-of-sydney", domain: "sydney.edu.au", type: "university", region: "Asia-Pacific", country: "Australia", ranking: 18 },
  { name: "UNSW Sydney", slug: "unsw-sydney", domain: "unsw.edu.au", type: "university", region: "Asia-Pacific", country: "Australia", ranking: 19 },
  { name: "Australian National University", slug: "anu", domain: "anu.edu.au", type: "university", region: "Asia-Pacific", country: "Australia", ranking: 30 },
  { name: "Monash University", slug: "monash-university", domain: "monash.edu", type: "university", region: "Asia-Pacific", country: "Australia", ranking: 37 },
  { name: "University of Queensland", slug: "university-of-queensland", domain: "uq.edu.au", type: "university", region: "Asia-Pacific", country: "Australia", ranking: 43 },
  { name: "University of Auckland", slug: "university-of-auckland", domain: "auckland.ac.nz", type: "university", region: "Asia-Pacific", country: "New Zealand", ranking: 68 },
];

// ─── INDIA (IITs + Top Private) ─────────────────────────────────
const INDIA: Institution[] = [
  { name: "IIT Bombay", slug: "iit-bombay", domain: "iitb.ac.in", type: "university", region: "South Asia", country: "India", ranking: 118 },
  { name: "IIT Delhi", slug: "iit-delhi", domain: "iitd.ac.in", type: "university", region: "South Asia", country: "India", ranking: 150 },
  { name: "IIT Madras", slug: "iit-madras", domain: "iitm.ac.in", type: "university", region: "South Asia", country: "India", ranking: 227 },
  { name: "IIT Kanpur", slug: "iit-kanpur", domain: "iitk.ac.in", type: "university", region: "South Asia", country: "India", ranking: 263 },
  { name: "IIT Kharagpur", slug: "iit-kharagpur", domain: "iitkgp.ac.in", type: "university", region: "South Asia", country: "India", ranking: 271 },
  { name: "IIT Roorkee", slug: "iit-roorkee", domain: "iitr.ac.in", type: "university", region: "South Asia", country: "India", ranking: 350 },
  { name: "IIT Hyderabad", slug: "iit-hyderabad", domain: "iith.ac.in", type: "university", region: "South Asia", country: "India", ranking: 400 },
  { name: "IIT Guwahati", slug: "iit-guwahati", domain: "iitg.ac.in", type: "university", region: "South Asia", country: "India", ranking: 380 },
  { name: "IISc Bangalore", slug: "iisc-bangalore", domain: "iisc.ac.in", type: "university", region: "South Asia", country: "India", ranking: 150 },
  { name: "BITS Pilani", slug: "bits-pilani", domain: "bits-pilani.ac.in", type: "university", region: "South Asia", country: "India", ranking: 450 },
  { name: "Delhi University", slug: "delhi-university", domain: "du.ac.in", type: "university", region: "South Asia", country: "India", ranking: 320 },
  { name: "Jadavpur University", slug: "jadavpur-university", domain: "jaduniv.edu.in", type: "university", region: "South Asia", country: "India", ranking: 500 },
  { name: "Anna University", slug: "anna-university", domain: "annauniv.edu", type: "university", region: "South Asia", country: "India", ranking: 480 },
  { name: "ISB Hyderabad", slug: "isb-hyderabad", domain: "isb.edu", type: "university", region: "South Asia", country: "India", ranking: 200 },
  { name: "IIM Ahmedabad", slug: "iim-ahmedabad", domain: "iima.ac.in", type: "university", region: "South Asia", country: "India", ranking: 190 },
  { name: "IIM Bangalore", slug: "iim-bangalore", domain: "iimb.ac.in", type: "university", region: "South Asia", country: "India", ranking: 195 },
];

// ─── CANADA & LATIN AMERICA ─────────────────────────────────
const AMERICAS_OTHER: Institution[] = [
  { name: "University of Toronto", slug: "university-of-toronto", domain: "utoronto.ca", type: "university", region: "North America", country: "Canada", ranking: 18 },
  { name: "McGill University", slug: "mcgill-university", domain: "mcgill.ca", type: "university", region: "North America", country: "Canada", ranking: 31 },
  { name: "University of British Columbia", slug: "ubc", domain: "ubc.ca", type: "university", region: "North America", country: "Canada", ranking: 35 },
  { name: "University of Waterloo", slug: "university-of-waterloo", domain: "uwaterloo.ca", type: "university", region: "North America", country: "Canada", ranking: 112 },
  { name: "University of Alberta", slug: "university-of-alberta", domain: "ualberta.ca", type: "university", region: "North America", country: "Canada", ranking: 96 },
  { name: "McMaster University", slug: "mcmaster-university", domain: "mcmaster.ca", type: "university", region: "North America", country: "Canada", ranking: 140 },
  { name: "University of Montreal", slug: "university-of-montreal", domain: "umontreal.ca", type: "university", region: "North America", country: "Canada", ranking: 116 },
  { name: "USP (São Paulo)", slug: "usp", domain: "usp.br", type: "university", region: "Latin America", country: "Brazil", ranking: 85 },
  { name: "Tecnológico de Monterrey", slug: "tec-de-monterrey", domain: "tec.mx", type: "university", region: "Latin America", country: "Mexico", ranking: 155 },
  { name: "Universidad de Buenos Aires", slug: "uba", domain: "uba.ar", type: "university", region: "Latin America", country: "Argentina", ranking: 67 },
  { name: "Pontificia Universidad Católica de Chile", slug: "puc-chile", domain: "uc.cl", type: "university", region: "Latin America", country: "Chile", ranking: 93 },
];

// ─── MIDDLE EAST & AFRICA ─────────────────────────────────
const MENA: Institution[] = [
  { name: "King Abdulaziz University", slug: "king-abdulaziz-university", domain: "kau.edu.sa", type: "university", region: "Middle East", country: "Saudi Arabia", ranking: 106 },
  { name: "KAUST", slug: "kaust", domain: "kaust.edu.sa", type: "university", region: "Middle East", country: "Saudi Arabia", ranking: 101 },
  { name: "American University of Beirut", slug: "aub", domain: "aub.edu.lb", type: "university", region: "Middle East", country: "Lebanon", ranking: 220 },
  { name: "Khalifa University", slug: "khalifa-university", domain: "ku.ac.ae", type: "university", region: "Middle East", country: "UAE", ranking: 170 },
  { name: "Qatar University", slug: "qatar-university", domain: "qu.edu.qa", type: "university", region: "Middle East", country: "Qatar", ranking: 208 },
  { name: "University of Cape Town", slug: "university-of-cape-town", domain: "uct.ac.za", type: "university", region: "Africa", country: "South Africa", ranking: 171 },
  { name: "University of the Witwatersrand", slug: "wits-university", domain: "wits.ac.za", type: "university", region: "Africa", country: "South Africa", ranking: 340 },
  { name: "Stellenbosch University", slug: "stellenbosch-university", domain: "sun.ac.za", type: "university", region: "Africa", country: "South Africa", ranking: 375 },
  { name: "University of Nairobi", slug: "university-of-nairobi", domain: "uonbi.ac.ke", type: "university", region: "Africa", country: "Kenya", ranking: 500 },
  { name: "Cairo University", slug: "cairo-university", domain: "cu.edu.eg", type: "university", region: "Africa", country: "Egypt", ranking: 371 },
];

// ─── CORPORATE & TECH PROVIDERS ─────────────────────────────────
const CORPORATE: Institution[] = [
  { name: "Google", slug: "google", domain: "google.com", type: "corporate", region: "Global", country: "US" },
  { name: "Google Cloud", slug: "google-cloud", domain: "cloud.google.com", type: "corporate", region: "Global", country: "US" },
  { name: "Microsoft", slug: "microsoft", domain: "microsoft.com", type: "corporate", region: "Global", country: "US" },
  { name: "Amazon Web Services (AWS)", slug: "aws", domain: "aws.amazon.com", type: "corporate", region: "Global", country: "US" },
  { name: "IBM", slug: "ibm", domain: "ibm.com", type: "corporate", region: "Global", country: "US" },
  { name: "Meta", slug: "meta", domain: "meta.com", type: "corporate", region: "Global", country: "US" },
  { name: "NVIDIA", slug: "nvidia", domain: "nvidia.com", type: "corporate", region: "Global", country: "US" },
  { name: "Apple", slug: "apple", domain: "apple.com", type: "corporate", region: "Global", country: "US" },
  { name: "Salesforce", slug: "salesforce", domain: "salesforce.com", type: "corporate", region: "Global", country: "US" },
  { name: "Oracle", slug: "oracle", domain: "oracle.com", type: "corporate", region: "Global", country: "US" },
  { name: "SAP", slug: "sap", domain: "sap.com", type: "corporate", region: "Global", country: "Germany" },
  { name: "Cisco", slug: "cisco", domain: "cisco.com", type: "corporate", region: "Global", country: "US" },
  { name: "Adobe", slug: "adobe", domain: "adobe.com", type: "corporate", region: "Global", country: "US" },
  { name: "Intel", slug: "intel", domain: "intel.com", type: "corporate", region: "Global", country: "US" },
  { name: "Qualcomm", slug: "qualcomm", domain: "qualcomm.com", type: "corporate", region: "Global", country: "US" },
  { name: "Samsung", slug: "samsung", domain: "samsung.com", type: "corporate", region: "Global", country: "South Korea" },
  { name: "Atlassian", slug: "atlassian", domain: "atlassian.com", type: "corporate", region: "Global", country: "Australia" },
  { name: "Stripe", slug: "stripe", domain: "stripe.com", type: "corporate", region: "Global", country: "US" },
  { name: "Databricks", slug: "databricks", domain: "databricks.com", type: "corporate", region: "Global", country: "US" },
  { name: "Snowflake", slug: "snowflake", domain: "snowflake.com", type: "corporate", region: "Global", country: "US" },
  { name: "Palantir", slug: "palantir", domain: "palantir.com", type: "corporate", region: "Global", country: "US" },
  { name: "HubSpot", slug: "hubspot", domain: "hubspot.com", type: "corporate", region: "Global", country: "US" },
  { name: "Twilio", slug: "twilio", domain: "twilio.com", type: "corporate", region: "Global", country: "US" },
  { name: "ServiceNow", slug: "servicenow", domain: "servicenow.com", type: "corporate", region: "Global", country: "US" },
  { name: "VMware", slug: "vmware", domain: "vmware.com", type: "corporate", region: "Global", country: "US" },
  { name: "Palo Alto Networks", slug: "palo-alto-networks", domain: "paloaltonetworks.com", type: "corporate", region: "Global", country: "US" },
  { name: "CrowdStrike", slug: "crowdstrike", domain: "crowdstrike.com", type: "corporate", region: "Global", country: "US" },
  { name: "Shopify", slug: "shopify", domain: "shopify.com", type: "corporate", region: "Global", country: "Canada" },
  { name: "LinkedIn Learning", slug: "linkedin-learning", domain: "linkedin.com", type: "platform", region: "Global", country: "US" },
  { name: "DeepLearning.AI", slug: "deeplearning-ai", domain: "deeplearning.ai", type: "platform", region: "Global", country: "US" },
];

// ─── LEARNING PLATFORMS ─────────────────────────────────
const PLATFORMS: Institution[] = [
  { name: "Coursera", slug: "coursera", domain: "coursera.org", type: "platform", region: "Global", country: "US" },
  { name: "edX", slug: "edx", domain: "edx.org", type: "platform", region: "Global", country: "US" },
  { name: "Udemy", slug: "udemy", domain: "udemy.com", type: "platform", region: "Global", country: "US" },
  { name: "Udacity", slug: "udacity", domain: "udacity.com", type: "platform", region: "Global", country: "US" },
  { name: "Pluralsight", slug: "pluralsight", domain: "pluralsight.com", type: "platform", region: "Global", country: "US" },
  { name: "Skillshare", slug: "skillshare", domain: "skillshare.com", type: "platform", region: "Global", country: "US" },
  { name: "Khan Academy", slug: "khan-academy", domain: "khanacademy.org", type: "platform", region: "Global", country: "US" },
  { name: "FutureLearn", slug: "futurelearn", domain: "futurelearn.com", type: "platform", region: "Global", country: "UK" },
  { name: "Codecademy", slug: "codecademy", domain: "codecademy.com", type: "platform", region: "Global", country: "US" },
  { name: "DataCamp", slug: "datacamp", domain: "datacamp.com", type: "platform", region: "Global", country: "US" },
  { name: "Brilliant", slug: "brilliant", domain: "brilliant.org", type: "platform", region: "Global", country: "US" },
  { name: "MasterClass", slug: "masterclass", domain: "masterclass.com", type: "platform", region: "Global", country: "US" },
  { name: "Simplilearn", slug: "simplilearn", domain: "simplilearn.com", type: "platform", region: "Global", country: "India" },
  { name: "Great Learning", slug: "great-learning", domain: "greatlearning.in", type: "platform", region: "South Asia", country: "India" },
  { name: "Unacademy", slug: "unacademy", domain: "unacademy.com", type: "platform", region: "South Asia", country: "India" },
  { name: "BYJU'S", slug: "byjus", domain: "byjus.com", type: "platform", region: "South Asia", country: "India" },
  { name: "NPTEL", slug: "nptel", domain: "nptel.ac.in", type: "platform", region: "South Asia", country: "India" },
  { name: "Swayam", slug: "swayam", domain: "swayam.gov.in", type: "platform", region: "South Asia", country: "India" },
];

import { EXTENDED_INSTITUTIONS } from "./institutions_extended";

// ─── COMBINE ALL ─────────────────────────────────
export const ALL_INSTITUTIONS: Institution[] = [
  ...US_ELITE,
  ...EUROPEAN,
  ...APAC,
  ...INDIA,
  ...AMERICAS_OTHER,
  ...MENA,
  ...CORPORATE,
  ...PLATFORMS,
  ...EXTENDED_INSTITUTIONS,
];

// Utility functions
export function getInstitutionBySlug(slug: string): Institution | undefined {
  return ALL_INSTITUTIONS.find(i => i.slug === slug);
}

export function getLogoUrl(domain: string, slug?: string): string {
  const localSvgs = [
    "coursera", "edx", "udemy", "udacity", "pluralsight", "skillshare",
    "google", "google-cloud", "meta", "nvidia", "apple"
  ];

  if (slug && localSvgs.includes(slug)) {
    return `/assets/provider-logos/${slug}.svg`;
  }
  
  // Use Clearbit for high-quality vector/high-res logos
  return `https://logo.clearbit.com/${domain}?size=256`;
}

export function getInstitutionsByRegion(): Record<string, Institution[]> {
  const grouped: Record<string, Institution[]> = {};
  ALL_INSTITUTIONS.forEach(i => {
    if (!grouped[i.region]) grouped[i.region] = [];
    grouped[i.region].push(i);
  });
  return grouped;
}

export function getInstitutionsByType(): Record<string, Institution[]> {
  const grouped: Record<string, Institution[]> = {};
  ALL_INSTITUTIONS.forEach(i => {
    if (!grouped[i.type]) grouped[i.type] = [];
    grouped[i.type].push(i);
  });
  return grouped;
}
