export const HealthDataType={
    BloodPressure:"BloodPressure",
    SugarLevels:"SugarLevels",
    none:"none",

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
                nb= 1;
                break
            case "/dashboard/notifications":
                nb= 2;
                break
            case "/dashboard/settings":
                nb= 3;
                break
            case "/dashboard/admin":
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
                return 1;
            case "/dashboard/charts/nutrition":
                return 2;
            default:
                return 0;
        }
    }
}
export default new HelperClass();