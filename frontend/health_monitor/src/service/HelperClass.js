export const HealthDataType={
    BloodPressure:"BloodPressure",
    SugarLevels:"SugarLevels",
    PulseRate:"PulseRate",
    RespirationRate:"RespirationRate",
    CholesterolLevels:"CholesterolLevels",
    Temperature:"Temperature",
    SleepingHours:"SleepingHours",
    Weight:"Weight",
    Calories :"Calories",
    Sodium  :"Sodium",
    Carbohydrate :"Carbohydrate",
    Protein :"Protein",

    none:"none",

}
export const ReferenceValues={
    SugarLevels_Min:"SugarLevels_Min",
    SugarLevels_Max:"SugarLevels_Max",
    PulseRate_Min:"PulseRate_Min",
    PulseRate_Max:"PulseRate_Max",
    RespirationRate_Min:"RespirationRate_Min",
    RespirationRate_Max:"RespirationRate_Max",
    CholesterolLevels_Min:"CholesterolLevels_Min",
    CholesterolLevels_Max:"CholesterolLevels_Max",
    Temperature_Min:"Temperature_Min",
    Temperature_Max:"Temperature_Max",
    SleepingHours_Min:"SleepingHours_Min",
    SleepingHours_Max:"SleepingHours_Max",
    Weight_Min:"Weight_Min",
    Weight_Max:"Weight_Max",
    Calories_Min:"Calories_Min",
    Calories_Max:"Calories_Max",
    Sodium_Min:"Sodium_Min",
    Sodium_Max:"Sodium_Max",
    Carbohydrate_Min:"Carbohydrate_Min",
    Carbohydrate_Max:"Carbohydrate_Max",
    Protein_Min:"Protein_Min",
    Protein_Max:"Protein_Max",
    BloodPressureSyst_Min:"BloodPressureSyst_Min",
    BloodPressureSyst_Max:"BloodPressureSyst_Max",
    BloodPressureDiast_Min:"BloodPressureDiast_Min",
    BloodPressureDiast_Max:"BloodPressureDiast_Max",
}


class HelperClass {
    getSelectedNavBtn() {
        const location = window.location.pathname;
        let nb = 0;
        switch (location) {
            case "/dashboard/charts/blood":
            case "/dashboard/charts/body":
            case "/dashboard/charts/nutrition":
                nb= 0;
            break
            case "/dashboard/nutrition/search":
            case "/dashboard/nutrition/generatemeal":
            case "/dashboard/nutrition/customizedmeal":
                nb= 1;
                break
            case "/dashboard/notifications":
                nb= 2;
                break
            case "/dashboard/settings":
                nb= 3;
                break
            case "/dashboard/admin/general":
            case "/dashboard/admin/customize":
                nb= 4;
                break
            default:
                nb= 0;
                break
        }
        return nb;
    }
    GetSelectedSideBtn() {
        const location = window.location.pathname;

        switch (location) {
            case "/dashboard/nutrition/generatemeal":
            case "/dashboard/charts/body":
            case "/dashboard/admin/customize":
                return 1;
            case "/dashboard/nutrition/customizedmeal":
            case "/dashboard/charts/nutrition":
                return 2;
            default:
                return 0;
        }
    }
}
export default new HelperClass();