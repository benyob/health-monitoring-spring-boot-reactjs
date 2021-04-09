import './CompDashboard.css'
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthService from '../service/auth.service';
import CompNavbar from './dashboard/CompNavbar';
import CompSideBar from './dashboard/CompSidebar';
import CompChartBlood from './dashboard/Content/CompChartBlood';
import CompChartBody from './dashboard/Content/CompChartBody';
import CompChartNutrition from './dashboard/Content/CompChartNutrition';
import CompNutritionSearch from './dashboard/Content/CompNutritionSearch';
import CompSettings from './dashboard/Content/CompSettings';
import HelperClass from '../service/HelperClass'
import CompDetailedData from './dashboard/Content/CompDetailedData';
import { HealthDataType } from '../service/HelperClass'
import healthDataService from '../service/healthData.service';
import CompAdmin from './dashboard/Content/CompAdmin';
import nutritionSerivce from '../service/nutrition.serivce';
import notificationsService from '../service/notifications.service';
import CompNotifications from './dashboard/Content/CompNotifications';
//responsile for passing the method that opens detaailed data page
export const DetailedDataPageContext = React.createContext()
export const HealthDataContex = React.createContext();

export default class CompDashboard extends Component {
    constructor(props) {
        super(props);


        this.logOut = this.logOut.bind(this);
        this.setSelectedNavBtn = this.setSelectedNavBtn.bind(this);
        this.setSelectedSideBtn = this.setSelectedSideBtn.bind(this);
        this.closeDetailedDataPage = this.closeDetailedDataPage.bind(this);
        this.openDetailedDataPage = this.openDetailedDataPage.bind(this);
        this.updateHealthData = this.updateHealthData.bind(this);
        this.fn_resetUnreadNotifications = this.fn_resetUnreadNotifications.bind(this);
        this.state = {
            isAdmin: false,
            currentUser: undefined,
            selectedNavBtn: 0,
            selectedSideBtn: 0,
            isDetailedDataPage: false,
            //this is the component that will be rendered in detailed data page 
            DetailedDataPageContent: HealthDataType.none,
            healthData:
            {
                data_bloodPressure: [],
                data_sugarLevels: [],
                data_PulseRate:[],
                data_RespirationRate:[],
                data_CholesterolLevels:[],
                data_Temperature:[],
                data_SleepingHours:[],
                data_Weight:[],
                data_Calories :[],
                data_Sodium  :[],
                data_Carbohydrate :[],
                data_Protein :[],
            },
            notifications:[],
            unreadNotifications:[],

        };
    }
    fn_resetUnreadNotifications(){
        this.setState({unreadNotifications:[]})

    }
    closeDetailedDataPage() {
        this.setState({ isDetailedDataPage: false,DetailedDataPageContent: HealthDataType.none })
    }
    //first we set the ccomponent we wants to display then we open the bla bla
    openDetailedDataPage(healthDataType) {
        this.setState({ DetailedDataPageContent: healthDataType })
        this.setState({ isDetailedDataPage: true })
    }
    setSelectedNavBtn(i) {
        this.setState({ selectedNavBtn: i })
    }
    setSelectedSideBtn(i) {
        this.setState({ selectedSideBtn: i })
    }
    logOut() {
        AuthService.logout();
        this.props.history.push("/auth");
    }
    componentDidMount() {
       
        //get new notifications
        notificationsService.getNotified().then(res=>{
            this.setState({unreadNotifications:res.data});
            //get all notifications
            notificationsService.getNotifications().then(res=>{
                this.setState({notifications:res.data});
            })
        })
        
           
        //update ui of paage we're on
        this.setState({
            selectedNavBtn: HelperClass.getSelectedNavBtn(),
            selectedSideBtn: HelperClass.GetSelectedSideBtn()
        })
        //get uder info from localstorage
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
                isAdmin: user.roles.includes("ROLE_ADMIN"),
            });
        } else {
            this.props.history.push("/auth");
        }

        //get blood pressure data
        healthDataService.getBloodPressure().then(res => {
            this.setState(this.state.healthData.data_bloodPressure=res.data)
        });
        //get sugar levels
        healthDataService.getHealthData(HealthDataType.SugarLevels).then(res=>{
            this.setState(this.state.healthData.data_sugarLevels=res.data)
        });
        //
        healthDataService.getHealthData(HealthDataType.CholesterolLevels).then(res=>{
            this.setState(this.state.healthData.data_CholesterolLevels=res.data)
        });
        //
        healthDataService.getHealthData(HealthDataType.RespirationRate).then(res=>{
            this.setState(this.state.healthData.data_RespirationRate=res.data)
        });
        //
        healthDataService.getHealthData(HealthDataType.PulseRate).then(res=>{
            this.setState(this.state.healthData.data_PulseRate=res.data)
        });
        //*** */body
        healthDataService.getHealthData(HealthDataType.SleepingHours).then(res=>{
            this.setState(this.state.healthData.data_SleepingHours=res.data)
        });
        //
        healthDataService.getHealthData(HealthDataType.Weight).then(res=>{
            this.setState(this.state.healthData.data_Weight=res.data)
        });
        //
        healthDataService.getHealthData(HealthDataType.Temperature).then(res=>{
            this.setState(this.state.healthData.data_Temperature=res.data)
        });
        //
       
    }
    updateHealthData (dataType)
    {
        //get new notifications
        notificationsService.getNotified().then(res=>{
            this.setState({unreadNotifications:[...this.state.unreadNotifications,...res.data]});

            //get all notifications
            notificationsService.getNotifications().then(res=>{
                this.setState({notifications:res.data});
            })
        })
        
        
        switch (dataType) {
            case HealthDataType.BloodPressure:
                healthDataService.getBloodPressure().then(res => {
                    this.setState(this.state.healthData.data_bloodPressure=res.data)
                });
                break;
                case HealthDataType.SugarLevels:
                    healthDataService.getHealthData(HealthDataType.SugarLevels).then(res=>{
                        this.setState(this.state.healthData.data_sugarLevels=res.data)
                    });
                    break;
                    case HealthDataType.CholesterolLevels:
                        healthDataService.getHealthData(HealthDataType.CholesterolLevels).then(res=>{
                            this.setState(this.state.healthData.data_CholesterolLevels=res.data)
                });
                break;
                case HealthDataType.RespirationRate:
                healthDataService.getHealthData(HealthDataType.RespirationRate).then(res=>{
                    this.setState(this.state.healthData.data_RespirationRate=res.data)
                });
                break;
                case HealthDataType.PulseRate:
                    healthDataService.getHealthData(HealthDataType.PulseRate).then(res=>{
                        this.setState(this.state.healthData.data_PulseRate=res.data)
                    });
                    break;
                    case HealthDataType.SleepingHours:
                        healthDataService.getHealthData(HealthDataType.SleepingHours).then(res=>{
                            this.setState(this.state.healthData.data_SleepingHours=res.data)
                });
                break;
                case HealthDataType.Weight:
                    healthDataService.getHealthData(HealthDataType.Weight).then(res=>{
                        this.setState(this.state.healthData.data_Weight=res.data)
                });
                break;
                case HealthDataType.Temperature:
                    healthDataService.getHealthData(HealthDataType.Temperature).then(res=>{
                    this.setState(this.state.healthData.data_Temperature=res.data)
                });
                break;
                
                default:
                    break;
        }
   
        
    }
    render() {
        return (
            <BrowserRouter>
                <div className="dashboard-container">
                    <CompNavbar unreadNotifications={this.state.unreadNotifications} reset={this.fn_resetUnreadNotifications} selectedNavBtn={this.state.selectedNavBtn} fn_setSelectedSideBtn={this.setSelectedSideBtn} fn_setSelectedNavBtn={this.setSelectedNavBtn} logout={this.logOut} currentUser={this.state.currentUser} isAdmin={this.state.isAdmin} />
                    <CompSideBar selectedSideBtn={this.state.selectedSideBtn} fn_setSelectedSideBtn={this.setSelectedSideBtn} selectedNavBtn={this.state.selectedNavBtn} />

                    <HealthDataContex.Provider value = {{healthData:this.state.healthData ,updateHealthData:this.updateHealthData}}>
                        
                        <div className="dashboard-content">
                            <Switch>
                                <DetailedDataPageContext.Provider value={this.openDetailedDataPage}>
                                    <Route exact path="/dashboard/charts/blood" component={CompChartBlood} />
                                    <Route exact path="/dashboard/charts/body" component={CompChartBody} />
                                    <Route exact path="/dashboard/charts/nutrition" component={CompChartNutrition} />
                                    <Route exact path="/dashboard/nutrition/search" component={CompNutritionSearch} />
                                    <Route exact path="/dashboard/settings" component={CompSettings} />
                                    <Route exact path="/dashboard/admin" component={CompAdmin} />
                                    <Route exact path="/dashboard/notifications" render={(props)=>(<CompNotifications {...props} notifications={this.state.notifications.reverse()}/>)} />
                                </DetailedDataPageContext.Provider>
                            </Switch>
                        </div>
                        {this.state.isDetailedDataPage
                        ?<CompDetailedData fn_hide={this.closeDetailedDataPage} content={this.state.DetailedDataPageContent} />
                        :<></>}
                    </HealthDataContex.Provider>

                </div>
            </BrowserRouter>
        )
    }

}
