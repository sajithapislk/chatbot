import angry from "./../assets/img/angry.jpg";
import normal from "./../assets/img/normal.jpg";
import bye from "./../assets/img/bye.jpg";
import sad from "./../assets/img/sad.jpg";

class ProfileService {
    constructor() {
      
    }
    checkEmotion(tag,dp) {
        if(tag == null) dp.value=normal;
        if(tag == 'angry') dp.value=angry;
        if(['goodbye', 'cut'].includes(tag)) dp.value=sad;
        
    }
}

export default ProfileService;
