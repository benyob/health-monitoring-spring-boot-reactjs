class LanguageService {
    //this is not optimized ,it runs multiple times prf frame
    dictionary = {
        "username": { fr: "Nom d'utilisateur", ar: "اسم االمستخدم" },
        "password": { fr: "mot de passe", ar: "كلمة السر" },
        "email": { fr: "e-mail", ar: "البريد الإلكتروني" },
        "Register": { fr: "S'inscrire", ar: "اشتراك" },
        "Login": { fr: "Connection", ar: "تسجيل" },
        "I don't have an account.": { fr: "Je n'ai pas de compte.", ar: "ليس لدي حساب." },
        "I already have an account.": { fr: "J'ai déjà un compte.", ar: "تسجيل الدخول." },
        "Charts": { fr: "Graphiques", ar: "المبيانات" },
        "Nutrition": { fr: "Nutrition", ar: "التغذية" },
        "Settings": { fr: "Réglages", ar: "الإعدادات" },
        "Notifications": { fr: "Notifications", ar: "الإشعارات" },
        "Admin": { fr: "Admin", ar: "المشرف"},
        "Search": { fr: "Chercher", ar: "بحث" },
        "Hi": { fr: "Bonjour", ar: "مرحبا" },
        "Blood": { fr: "Sang", ar: "الدم" },
        "Body": { fr: "Corps", ar: "الجسم" },
        "Generate Meal": { fr: "Générer un repas", ar: "توليد وجبة" },
        "Blood Pressure": { fr: "Pression Artérielle", ar: "ضغط الدم" },
        "Systolic": { fr: "Systolique", ar: "الانقباضي" },
        "Diastolic": { fr: "Diastolique", ar: "الانبساطي" },
        "Records": { fr: "Données", ar: "البيانات" },
        "Note": { fr: "Note", ar: "ملحوظة" },
        "Average Value": { fr: "Valeur moyenne", ar: "القيمة المتوسطة" },
        "Measurement Date": { fr: "Date de mesure", ar: "تاريخ القياس" },
        "Add": { fr: "Ajouter", ar: "أضف" },
        "Extra": { fr: "Extra", ar: "إضافي" },
        "Additional Tools": { fr: "Outils supplémentaires", ar: "أدوات إضافية" },
        "There are no records ,add new ones": { fr: "Il n'y a pas d'enregistrements, ajoutez-en de nouveaux !", ar: "! لا توجد سجلات ، أضف سجلات جديدة" },
        "Sugar Levels": { fr: "Niveaux de sucre", ar: "مستويات السكر" },
        "Value": { fr: "Valeur", ar: "القيمة" },
        "Reference Value": { fr: "La Valeur de Référence", ar: "القيمة المرجعية" },
        // "": { fr: "", ar: "" },
        // "": { fr: "", ar: "" },
        // "": { fr: "", ar: "" },
        // "": { fr: "", ar: "" },
        // "": { fr: "", ar: "" },

    }
    getLanguage(){
        return localStorage.getItem('lang') ? localStorage.getItem('lang') : "eng";
    }

    setArLanguage() {
        localStorage.setItem('lang', 'ar')
        window.location.reload()
    }
    setFrLanguage() {
        localStorage.setItem('lang', 'fr')
        window.location.reload()
    }
    setEngLanguage() {
        localStorage.setItem('lang', 'eng')
        window.location.reload()
    }
    getText(t) {

        let lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : "eng"


        switch (lang) {
            case "eng":
                return (t in this.dictionary) ? t : ("[" + t+"]")
            case "fr":
                return (t in this.dictionary)? this.dictionary[t].fr : ("[" + t+"]")
            case "ar":
                return (t in this.dictionary) ? this.dictionary[t].ar : ("["+ t+"]")

        }

    }
}
export default new LanguageService()