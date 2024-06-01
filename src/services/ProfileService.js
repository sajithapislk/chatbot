import angry from "./../assets/img/angry.jpg";
import normal from "./../assets/img/normal.jpg";
import sad from "./../assets/img/sad.jpg";

class ProfileService {
    checkEmotion(tag,dp) {
        if(tag == null){
            dp.value=normal;
            return;
        }
        if(tag == 'angry'){
            dp.value=angry;
            return;
        }
        if(['goodbye', 'cut'].includes(tag)){
            dp.value=sad;
            return;
        }
        dp.value=normal;
    }
}

export default ProfileService;
