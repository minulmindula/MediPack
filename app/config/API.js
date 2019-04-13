
const local = "http://192.168.1.4:80/FinalProject/backend_Yii/web/index.php?r=api";
// const local = "www.quickpick-lk.com/mediPack_backend/backend_Yii/web/index.php?r=api";

export default {

    loginLink: local+"/authnz",

    registerLink: local+"/register-app-user",

    nextmedTime: local+"/get-next-med-time",
    
    summaryOfDay: local+"/get-summary-of-day",

    weeklySchedule: local+"/get-weekly-schedule",

    singleDaySchedule: local+"/get-singleday-schedule",

    onlineDocs: local+"/get-doctors",

    getHospitalDetailsEmg: local+"/get-hospital-emg-contact",

    getHospitalLocations: local+"/get-hospital-locations",
    
    getPharmacyLocations: local+"/get-pharmacy-locations",

    getUserDetails: local+"/get-user-details",

    updateUserDetails: local+"/update-user-details",

    changePassword: local+"/change-user-password",

    getMessages: local+"/get-messages",

    sendMessage: local+"/send-message"

  }