import angry from "./../assets/img/angry.jpg";
import normal from "./../assets/img/normal.jpg";
import happy from "./../assets/img/happy.jpg";
import sad from "./../assets/img/sad.png";
import hours from "./../assets/img/hours.png";
import number from "./../assets/img/number.jpg";
import location from "./../assets/img/location.png";
import document from "./../assets/img/document.jpg";
import menu from "./../assets/img/menu.png";
import computerhod from "./../assets/img/computerhod.jpg";
import extchod from "./../assets/img/extchod.png";
import sem from "./../assets/img/sem.png";
import uniform from "./../assets/img/uniform.jpeg";
import swear from "./../assets/img/swear.jpg";
import sports from "./../assets/img/sports.png";
import salutaion from "./../assets/img/salutaion.jpeg";
import hod from "./../assets/img/hod.jpg";
import strains from "./../assets/img/Strains.png";
import fever from "./../assets/img/Fever.jpeg";
import nasalCongestion from "./../assets/img/Nasal Congestion.png";
import cough from "./../assets/img/Cough.png";
import soreThroat from "./../assets/img/Sore Throat.jpeg";
import gastrointestinalProblems from "./../assets/img/Gastrointestinal problems.png";
import skinProblems from "./../assets/img/Skin problems.png";
import bruises from "./../assets/img/Bruises.png";
import choking from "./../assets/img/Choking.png";
import noseBleed from "./../assets/img/nose bleed.png";
import vertigo from "./../assets/img/Vertigo.png";
import eyeInjury from "./../assets/img/Eye Injury.png";
import poison from "./../assets/img/Poison.jpeg";
import teeth from "./../assets/img/Teeth.png";
import headInjury from "./../assets/img/Head Injury.jpeg";
import fainting from "./../assets/img/Fainting.png";
import headache from "./../assets/img/Headache.png";
import cold from "./../assets/img/Cold.jpeg";


class ProfileService {
  checkEmotion(tag, dp) {
    if (tag == null) {
      dp.value = normal;
      return;
    }
    if (tag == "angry") {
      dp.value = angry;
      return;
    }
    if (tag == "hours") {
      dp.value = hours;
      return;
    }
    if (tag == "document") {
      dp.value = document;
      return;
    }
    if (tag == "computerhod") {
      dp.value = computerhod;
      return;
    }
    if (tag == "extchod") {
      dp.value = extchod;
      return;
    }
    if (tag == "uniform") {
      dp.value = uniform;
      return;
    }
    if (tag == "sports") {
      dp.value = sports;
      return;
    }
    if (tag == "swear") {
      dp.value = swear;
      return;
    }
    if (tag == "salutaion") {
      dp.value = salutaion;
      return;
    }
    if (tag == "sem") {
      dp.value = sem;
      return;
    }
    if (tag == "menu") {
      dp.value = menu;
      return;
    }
    if (tag == "Strains") {
      dp.value = strains;
      return;
    }
    if (tag == "Fever") {
      dp.value = fever;
      return;
    }
    if (tag == "Nasal Congestion") {
      dp.value = nasalCongestion;
      return;
    }
    if (tag == "Cough") {
      dp.value = cough;
      return;
    }
    if (tag == "Sore Throat") {
      dp.value = soreThroat;
      return;
    }
    if (tag == "Gastrointestinal problems") {
      dp.value = gastrointestinalProblems;
      return;
    }
    if (tag == "Skin problems") {
      dp.value = skinProblems;
      return;
    }
    if (tag == "Bruises") {
      dp.value = bruises;
      return;
    }
    if (tag == "Choking") {
      dp.value = choking;
      return;
    }
    if (tag == "nose bleed") {
      dp.value = noseBleed;
      return;
    }
    if (tag == "Vertigo") {
      dp.value = vertigo;
      return;
    }
    if (tag == "Eye Injury") {
      dp.value = eyeInjury;
      return;
    }
    if (tag == "Poison") {
      dp.value = poison;
      return;
    }
    if (tag == "Teeth") {
      dp.value = teeth;
      return;
    }
    if (tag == "Head Injury") {
      dp.value = headInjury;
      return;
    }
    if (tag == "Fainting") {
      dp.value = fainting;
      return;
    }
    if (tag == "Headache") {
      dp.value = headache;
      return;
    }
    if (tag == "Cold") {
      dp.value = cold;
      return;
    }
    if (tag == "number") {
      dp.value = number;
      return;
    }
    if (["hod", "Heat Exhaustion", "Heat Stroke", "Sun Burn"].includes(tag)) {
      dp.value = hod;
      return;
    }
    if (["greeting", "vacation"].includes(tag)) {
      dp.value = happy;
      return;
    }
    if (
      [
        "goodbye",
        "ragging",
        "Cuts",
        "Abrasions",
        "Abdonominal Pain",
        "Broken Toe",
        "Wound",
        "Diarrhea",
        "Frost bite",
        "Insect Bites",
        "Pulled Muscle",
        "Rectal bleeding",
        "Testicle Pain",
        "Chemical Burn",
        "Normal Bleeding",
        "seizure,Rash",
        "animal bite",
        "CPR",
        "Fracture",
      ].includes(tag)
    ) {
      dp.value = sad;
      return;
    }
    if (["location", "hostel", "library", "canteen"].includes(tag)) {
      dp.value = location;
      return;
    }
    dp.value = normal;
  }
}

export default ProfileService;
