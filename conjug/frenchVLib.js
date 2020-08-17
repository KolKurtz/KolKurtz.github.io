//CORE GRAMMAR LIBRARY
//VERB libraries divided by modes and tenses
//format - verbname: difficulty,infinitive, je form,1s,2s,3s,1p,2p,3p
var coreLib = {
//INDICATIVE PRESENT demander voir parler porter montrer venir trouver
"IP":
{
  "avoir": [1,"avoir","j'","ai","as","a","avons","avez","ont"],
  "etre": [1,"etre","je","suis","es","est","sommes","etez","sont"],
  "aller": [1,"aller","je","vais","vas","va","allons","allez","vont"],
  "faire": [1,"faire","je","fais","fais","fait","faisons","faites","font"],
  "pouvoir": [2,"pouvoir","je","peux","peux","peut","pouvons","pouvez","peuvent"],
  "devoir": [2,"devoir","je","dois","dois","doit","devons","devez","doivent"],
  "prendre": [2,"prendre","je","prends","prends","prend","prenons","prenez","prennent"],
  "amener": [2,"amener","j'","amène","amènes","amène","amenons","amenez","amènent"],
  "savoir": [3,"savoir","je","sais","sais","sait","savons","savez","savent"],
  "connaître": [3,"connaître","je","connais","connais","connaît","connaissons","connaissez","connaissent"],
  "penser": [1,"penser","je","pense","penses","pense","pensons","pensez","pensent"],
  "mettre": [1,"mettre","je","mets","mets","met","mettons","mettez","mettent"],
  "éviter": [1,"éviter","j'","évite","évites","évite","évitons","évitez","évitent"],
  "tenir": [1,"tenir","je","tiens","tiens","tien","tenons","tenez","tiennent"],
  "répéter": [1,"répéter","je","répète","répètes","répète","répétons","répétez","répètent"],
  "renvoyer": [1,"renvoyer","je","renvoie","renvoies","renvoie","renvoyons","renvoyez","renvoient"],
  "dire": [1,"dire","je","dis","dis","dit","disons","disez","disent"],
  "finir": [1,"finir","je","finis","finis","finit","finissons","finissez","finissent"],
  "vouloir": [1,"vouloir","je","veux","veux","veut","voulons","voulez","veulent"],
  "comprendre": [2,"comprendre","je","comprends","comprends","comprend","comprenons","comprenez","comprennent"],
  "demander": [2,"demander","je","demande","demandes","demande","demandons","demandez","demandent"]
},
//INDICATIVE PASSE COMPOSE
"IPC":
{
  "avoir": [1,"avoir","j'","ai_eu","as_eu","a_eu","avons_eu","avez_eu","ont_eu"],
  "etre": [1,"etre","j'","ai_été","as_été","a_été","avons_été","avez_été","ont_été"],
  "aller": [1,"aller","je","suis_allé","es_allé","est_allé","sommes_allés","etez_allés","sont_allés"],
  "faire": [1,"faire","j'","ai_fait","as_fait","a_fait","avons_fait","avez_fait","ont_fait"],
  "pouvoir": [2,"pouvoir","j'","ai_pu","as_pu","a_pu","avons_pu","avez_pu","ont_pu"],
  "devoir": [2,"devoir","j'","ai_d&ucirc;","as_d&ucirc;","a_d&ucirc;","avons_d&ucirc;","avez_d&ucirc;","ont_d&ucirc;"],
  "prendre": [2,"prendre","j'","ai_pris","as_pris","a_pris","avons_pris","avez_pris","ont_pris"],
  "amener": [2,"amener","j'","ai_amené","as_amené","a_amené","avons_amené","avez_amené","ont_amené"],
  "savoir": [3,"savoir","j'","ai_su","as_su","a_su","avons_su","avez_su","ont_su"],
  "connaître": [3,"connaître","j'","ai_connu","as_connu","a_connu","avons_connu","avez_connu","ont_connu"],
  "penser": [1,"penser","j'","ai_pensé","as_penses","a_pense","avons_pensons","avez_pensez","ont_pensent"],
  "mettre": [1,"mettre","j'","ai_mis","as_mis","a_mis","avons_mis","avez_mis","ont_mis"],
  "éviter": [1,"éviter","j'","ai_évité","as_évité","a_évité","avons_évité","avez_évité","ont_évité"],
  "tenir": [1,"tenir","j'","ai_tenu","as_tenu","a_tenu","avons_tenu","avez_tenu","ont_tenu"],
  "répéter": [1,"répéter","j'","ai_répété","as_répété","a_répété","avons_répété","avez_répété","ont_répété"],
  "renvoyer": [1,"renvoyer","j'","ai_renvoyé","as_renvoyé","a_renvoyé","avons_renvoyé","avez_renvoyé","ont_renvoyé"],
  "dire": [1,"dire","j'","ai_dit","as_dit","a_dit","avons_dit","avez_dit","ont_dit"],
  "finir": [1,"finir","j'","ai_fini","as_fini","a_fini","avons_fini","avez_fini","ont_fini"],
  "vouloir": [1,"vouloir","j'","ai_voulu","as_voulu","a_voulu","avons_voulu","avez_voulu","ont_voulu"],
  "comprendre": [2,"comprendre","j'","ai_compris","as_compris","a_compris","avons_compris","avez_compris","ont_compris"],
  "demander": [2,"demander","j'","ai_demandé","as_demandé","a_demandé","avons_demandé","avez_demandé","ont_demandé"]
},
//INDICATIVE IMPARFAIT
"IPI":
{
  "avoir": [1,"avoir","j'","avais","avais","avait","avions","aviez","avaient"],
  "etre": [1,"etre","j'","étais","étais","était","étions","étiez","étaient"],
  "aller": [1,"aller","j'","allais","allais","allait","allions","alliez","allaient"],
  "faire": [1,"faire","je","faisais","faisais","faisait","faisions","faisiez","faisaient"],
  "pouvoir": [2,"pouvoir","je","pouvais","pouvais","pouvait","pouvions","pouviez","pouvaient"],
  "devoir": [2,"devoir","je","devais","devais","devait","devions","deviez","devaient"],
  "prendre": [2,"prendre","je","prenais","prenais","prenait","prenions","preniez","prenaient"],
  "amener": [2,"amener","j'","amenais","amenais","amenait","amenions","ameniez","amenaient"],
  "savoir": [3,"savoir","je","savais","savais","savait","savions","saviez","savaient"],
  "connaître": [3,"connaître","je","connaissais","connaissais","connaissait","connaissions","connaissiez","connaissaient"],
  "penser": [1,"penser","je","pensais","pensais","pensait","pensions","pensiez","pensaient"],
  "mettre": [1,"mettre","je","mettais","mettais","mettait","mettions","mettiez","mettaient"],
  "éviter": [1,"éviter","j'","évitais","évitais","évitait","évitions","évitiez","évitaient"],
  "tenir": [1,"tenir","je","tenais","tenais","tenais","tenions","teniez","tenaient"],
  "répéter": [1,"répéter","je","répétais","répétais","répétait","répétions","répétiez","répétaient"],
  "renvoyer": [1,"renvoyer","je","renvoyais","renvoyais","renvoyais","renvoyions","renvoyiez","renvoyaient"],
  "dire": [1,"dire","je","disais","disais","disait","disions","disiez","disaient"],
  "finir": [1,"finir","je","finissais","finissais","finissait","finissions","finissiez","finissaient"],
  "vouloir": [1,"vouloir","je","voulais","voulais","voulait","voulions","vouliez","voulaient"],
  "comprendre": [2,"comprendre","je","comprenais","comprenais","comprenait","comprenions","compreniez","comprenaient"],
  "demander": [2,"demander","je","demandais","demandais","demandait","demandions","demandiez","demandaient"]
},
//INDICATIVE PQP
"IPQP":
{
  "avoir": [1,"avoir","j'","avais_eu","avais_eu","avait_eu","avions_eu","aviez_eu","avaient_eu"],
  "etre": [1,"etre","j'","avais_été","avais_été","avait_été","avions_été","aviez_été","avaient_été"],
  "aller": [1,"aller","j'","étais_allé","étais_allé","était_allé","étions_allés","étiez_allés","étaient_allés"],
  "faire": [1,"faire","j'","avais_fait","avais_fait","avait_fait","avions_fait","aviez_fait","avaient_fait"],
  "pouvoir": [2,"pouvoir","j'","avais_pu","avais_pu","avait_pu","avions_pu","aviez_pu","avaient_pu"],
  "devoir": [2,"devoir","j'","avais_d&ucirc;","avais_d&ucirc;","avait_d&ucirc;","avions_d&ucirc;","aviez_d&ucirc;","avaient_d&ucirc;"],
  "prendre": [2,"prendre","j'","avais_pris","avais_pris","avait_pris","avions_pris","aviez_pris","avaient_pris"],
  "amener": [2,"amener","j'","avais_amené","avais_amené","avait_amené","avions_amené","aviez_amené","avaient_amené"],
  "savoir": [3,"savoir","j'","avais_su","avais_su","avait_su","avions_su","aviez_su","avaient_su"],
  "connaître": [3,"connaître","j'","avais_connu","avais_connu","avait_connu","avions_connu","aviez_connu","avaient_connu"],
  "penser": [1,"penser","j'","avais_pensé","avais_penses","avait_pense","avions_pensons","aviez_pensez","avaient_pensent"],
  "mettre": [1,"mettre","j'","avais_mis","avais_mis","avait_mis","avions_mis","aviez_mis","avaient_mis"],
  "éviter": [1,"éviter","j'","avais_évité","avais_évité","avait_évité","avions_évité","aviez_évité","avaient_évité"],
  "tenir": [1,"tenir","j'","avais_tenu","avais_tenu","avait_tenu","avions_tenu","aviez_tenu","avaient_tenu"],
  "répéter": [1,"répéter","j'","avais_répété","avais_répété","avait_répété","avions_répété","aviez_répété","avaient_répété"],
  "renvoyer": [1,"renvoyer","j'","avais_renvoyé","avais_renvoyé","avait_renvoyé","avions_renvoyé","aviez_renvoyé","avaient_renvoyé"],
  "dire": [1,"dire","j'","avais_dit","avais_dit","avait_dit","avions_dit","aviez_dit","avaient_dit"],
  "finir": [1,"finir","j'","avais_fini","avais_fini","avait_fini","avions_fini","aviez_fini","avaient_fini"],
  "vouloir": [1,"vouloir","j'","avais_voulu","avais_voulu","avait_voulu","avions_voulu","aviez_voulu","avaient_voulu"],
  "comprendre": [2,"comprendre","j'","avais_compris","avais_compris","avait_compris","avions_compris","aviez_compris","avaient_compris"],
  "demander": [2,"demander","j'","avais_demandé","avais_demandé","avait_demandé","avions_demandé","aviez_demandé","avaient_demandé"]
},
//INDICATIVE FUTURE
"IF":
{
  "avoir": [1,"avoir","j'","aurai","auras","aura","aurons","aurez","auront"],
  "etre": [1,"etre","j'","serai","seras","sera","serons","serez","seront"],
  "aller": [1,"aller","j'","irai","iras","ira","irons","irez","iront"],
  "faire": [1,"faire","je","ferai","feras","fera","ferons","ferez","feront"],
  "pouvoir": [2,"pouvoir","je","pourrai","pourras","pourra","pourrons","pourrez","pourront"],
  "devoir": [2,"devoir","je","devrai","devras","devra","devrons","devrez","devront"],
  "prendre": [2,"prendre","je","prendrai","prendras","prendra","prendrons","prendrez","prendront"],
  "amener": [2,"amener","j'","amènerai","amèneras","amènera","amènerons","amènerez","amèneront"],
  "savoir": [3,"savoir","je","saurai","sauras","saura","saurons","saurez","sauront"],
  "connaître": [3,"connaître","je","connaîtrai","connaîtras","connaîtra","connaîtrons","connaîtrez","connaîtront"],
  "penser": [1,"penser","je","penserai","penseras","pensera","penserons","penserez","penseront"],
  "mettre": [1,"mettre","je","mettrai","mettrai","mettra","mettrons","mettrez","mettront"],
  "éviter": [1,"éviter","j'","éviterai","éviteras","évitera","éviterons","éviterez","éviteront"],
  "tenir": [1,"tenir","je","tiendrai","tiendras","tiendra","tiendrons","tiendrez","tiendront"],
  "répéter": [1,"répéter","je","répéterai","répéteras","répétera","répéterons","répéterez","répéteront"],
  "renvoyer": [1,"renvoyer","je","renverrai","renverras","renverra","renverrons","renverrez","renverront"],
  "dire": [1,"dire","je","dirai","dira","dira","dirons","direz","diront"],
  "finir": [1,"finir","je","finirai","finiras","finira","finirons","finirez","finiront"],
  "vouloir": [1,"vouloir","je","voudrai","voudras","voudra","voudrons","voudrez","voudront"],
  "comprendre": [2,"comprendre","je","comprendrai","comprendras","comprendra","comprendrons","comprendrez","comprendront"],
  "demander": [2,"demander","je","demanderai","demanderas","demandera","demanderons","demanderez","demanderont"]
},
//CPC - conditional passe compose
"CPC":
{
  "avoir": [1,"avoir","j'","aurais_eu","aurais_eu","aurait_eu","aurions_eu","auriez_eu","auraient_eu"],
  "etre": [1,"etre","j'","aurais_été","aurais_été","aurait_été","aurions_été","auriez_été","auraient_été"],
  "aller": [1,"aller","je","serais_allé","serais_allé","serait_allé","serions_allés","seriez_allés","seraient_allés"],
  "faire": [1,"faire","j'","aurais_fait","aurais_fait","aurait_fait","aurions_fait","auriez_fait","auraient_fait"],
  "pouvoir": [2,"pouvoir","j'","aurais_pu","aurais_pu","aurait_pu","aurions_pu","auriez_pu","auraient_pu"],
  "devoir": [2,"devoir","j'","aurais_d&ucirc;","aurais_d&ucirc;","aurait_d&ucirc;","aurions_d&ucirc;","auriez_d&ucirc;","auraient_d&ucirc;"],
  "prendre": [2,"prendre","j'","aurais_pris","aurais_pris","aurait_pris","aurions_pris","auriez_pris","auraient_pris"],
  "amener": [2,"amener","j'","aurais_amené","aurais_amené","aurait_amené","aurions_amené","auriez_amené","auraient_amené"],
  "savoir": [3,"savoir","j'","aurais_su","aurais_su","aurait_su","aurions_su","auriez_su","auraient_su"],
  "connaître": [3,"connaître","j'","aurais_connu","aurais_connu","aurait_connu","aurions_connu","auriez_connu","auraient_connu"],
  "penser": [1,"penser","j'","aurais_pensé","aurais_penses","aurait_pense","aurions_pensons","auriez_pensez","auraient_pensent"],
  "mettre": [1,"mettre","j'","aurais_mis","aurais_mis","aurait_mis","aurions_mis","auriez_mis","auraient_mis"],
  "éviter": [1,"éviter","j'","aurais_évité","aurais_évité","aurait_évité","aurions_évité","auriez_évité","auraient_évité"],
  "tenir": [1,"tenir","j'","aurais_tenu","aurais_tenu","aurait_tenu","aurions_tenu","auriez_tenu","auraient_tenu"],
  "répéter": [1,"répéter","j'","aurais_répété","aurais_répété","aurait_répété","aurions_répété","auriez_répété","auraient_répété"],
  "renvoyer": [1,"renvoyer","j'","aurais_renvoyé","aurais_renvoyé","aurait_renvoyé","aurions_renvoyé","auriez_renvoyé","auraient_renvoyé"],
  "dire": [1,"dire","j'","aurais_dit","aurais_dit","aurait_dit","aurions_dit","auriez_dit","auraient_dit"],
  "finir": [1,"finir","j'","aurais_fini","aurais_fini","aurait_fini","aurions_fini","auriez_fini","auraient_fini"],
  "vouloir": [1,"vouloir","j'","aurais_voulu","aurais_voulu","aurait_voulu","aurions_voulu","auriez_voulu","auraient_voulu"],
  "comprendre": [2,"comprendre","j'","aurais_compris","aurais_compris","aurait_compris","aurions_compris","auriez_compris","auraient_compris"],
  "demander": [2,"demander","j'","aurais_demandé","aurais_demandé","aurait_demandé","aurions_demandé","auriez_demandé","auraient_demandé"]
},
//CP - conditional presenté
"CP":
{
  "avoir": [1,"avoir","j'","aurais","aurais","aurait","aurions","auriez","auraient"],
  "etre": [1,"etre","j'","serais","serais","serait","serions","seriez","seraient"],
  "aller": [1,"aller","j'","irais","irais","irait","irions","iriez","iraient"],
  "faire": [1,"faire","je","ferais","ferais","ferait","ferions","feriez","feraient"],
  "pouvoir": [2,"pouvoir","je","pourrais","pourrais","pourrait","pourrions","pourriez","pourraient"],
  "devoir": [2,"devoir","je","devrais","devrais","devrait","devrions","devriez","devraient"],
  "prendre": [2,"prendre","je","prendrais","prendrais","prendrait","prendrions","prendriez","prendraient"],
  "amener": [2,"amener","j'","amènerais","amènerais","amènerait","amènerions","amèneriez","amèneraient"],
  "savoir": [3,"savoir","je","saurais","saurais","saurait","saurions","sauriez","sauraient"],
  "connaître": [3,"connaître","je","connaîtrais","connaîtrais","connaîtrait","connaîtrions","connaîtriez","connaîtraient"],
  "penser": [1,"penser","je","penserais","penserais","penserait","penserions","penseriez","penseraient"],
  "mettre": [1,"mettre","je","mettrais","mettrais","mettrait","mettrions","mettriez","mettraient"],
  "éviter": [1,"éviter","j'","éviterais","éviterais","éviterait","éviterions","éviteriez","éviteraient"],
  "tenir": [1,"tenir","je","tiendrais","tiendrais","tiendrait","tiendrions","tiendriez","tiendraient"],
  "répéter": [1,"répéter","je","répéterais","répéterais","répéterait","répéterions","répéteriez","répéteraient"],
  "renvoyer": [1,"renvoyer","je","renverrais","renverrais","renverrait","renverrions","renverriez","renverraient"],
  "dire": [1,"dire","je","dirais","dirais","dirait","dirions","diriez","diraient"],
  "finir": [1,"finir","je","finirais","finirais","finirait","finirions","finiriez","finiraient"],
  "vouloir": [1,"vouloir","je","voudrais","voudrais","voudrait","voudrions","voudriez","voudraient"],
  "comprendre": [2,"comprendre","je","comprendrais","comprendrais","comprendrait","comprendrions","comprendriez","comprendraient"],
  "demander": [2,"demander","je","demanderais","demanderais","demanderait","demanderions","demanderiez","demanderaient"]
}
//END CORE LIB
}
