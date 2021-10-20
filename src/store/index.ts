import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getDepartment, getDepartmentList, getDepartments, getEmployee, getEmployees, getProfile } from '../app/api'
import { DepartmentResponseListType, DepartmentResponseType, EmployeeResponseListType, EmployeeResponseType, LoginResponseType, MetaResponseType, UserProfileResponseType, UserResponseType } from '../type'

export const VBSlice = createSlice({
    name: 'vb',
    initialState: {
        /*start common*/
        loading:false as boolean,
        message:'' as string,
        token:'' as string,
        refresh:'' as string,
        meta: {} as MetaResponseType,
        /*end common*/

        /*start user*/
        user:{} as UserResponseType,
        profile: {} as UserProfileResponseType,
        isLoggedIn: false as boolean,
        /*end user*/

        /**department */
        departmentPage: 1 as number,
        departments: [] as DepartmentResponseType[],
        departmentDropdown: [] as DepartmentResponseType[],
        department: {} as DepartmentResponseType,

        /**employee */
        employeePage: 1 as number,
        employees: [] as EmployeeResponseType[],
        employee: {} as EmployeeResponseType,
    },
    reducers:{
        /*start common*/
        setLoading: (state, action:PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setAlert: (state, action:PayloadAction<string>) =>{
            state.message = action.payload
        },
        setToken: (state, action:PayloadAction<string>) => {
            state.token = action.payload
            state.isLoggedIn = true
        },
        setRToken: (state, action:PayloadAction<string>) => {
            state.refresh = action.payload
        },
        setMeta: (state, action:PayloadAction<MetaResponseType>) => {
            state.meta = action.payload
        },
        /*end common*/

        /*start user*/
        setProfile: (state, action:PayloadAction<UserProfileResponseType>) => {
            state.profile = action.payload
        },
        setUser: (state, action:PayloadAction<UserResponseType>) => {
            state.user = action.payload
        },
        setLoggedIn: (state, action:PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
        /*end user*/

        /**department */
        setDepartments: (state, action: PayloadAction<DepartmentResponseType[]>) => {
            state.departments = action.payload
        },
        setDepartmentDropdown: (state, action: PayloadAction<DepartmentResponseType[]>) => {
            state.departmentDropdown = action.payload
        },
        setDepartmentPage: (state, action: PayloadAction<number>) => {
            state.departmentPage = action.payload
        },
        setDepartment: (state, action: PayloadAction<DepartmentResponseType>) => {
            state.department = action.payload
        },

        /**employee */
        setEmployees: (state, action: PayloadAction<EmployeeResponseType[]>) => {
            state.employees = action.payload
        },
        setEmployee: (state, action: PayloadAction<EmployeeResponseType>) => {
            state.employee = action.payload
        },
        setEmployeePage: (state, action: PayloadAction<number>) => {
            state.employeePage = action.payload
        }
    }
})

export const {
    setLoading,
    setMeta,
    setAlert,
    setToken,
    setRToken,
    setProfile,
    setUser,
    setLoggedIn,
    setDepartmentPage,
    setDepartments,
    setDepartment,
    setDepartmentDropdown,
    setEmployeePage,
    setEmployees,
    setEmployee
} = VBSlice.actions

/*start user*/
export const logUser = (auth: LoginResponseType) => (dispatch: any) => {
    dispatch(setUser(auth.user))
    dispatch(setToken(auth.token))
    dispatch(setRToken(auth.refresh))
    dispatch(setLoading(false))
}

export const loadUserProfile = () => async (dispatch: any) => {
    dispatch(setLoading(true))
    const profile: UserProfileResponseType = await getProfile()
    dispatch(setProfile(profile))
    dispatch(setUser(profile.user))
    dispatch(setLoading(false))
}

export const loadDepartments = (page: number, records: number) => async (dispatch: any) => {
    dispatch(setLoading(true))
    const departmentList: DepartmentResponseListType = await getDepartments(page, records)
    dispatch(setMeta(departmentList.meta))
    dispatch(setDepartments(departmentList.list))
    dispatch(setLoading(false))
}

export const loadDepartment = (id: number) => async (dispatch: any) => {
    dispatch(setLoading(true))
    const departmentList: DepartmentResponseType = await getDepartment(id)
    dispatch(setDepartment(departmentList))
    dispatch(setLoading(false))
}

export const loadDepartmentDropdown = (sort?: string, order?: string) => async (dispatch: any) => {
    dispatch(setLoading(true))
    const departmentList = await getDepartmentList(sort, order)
    dispatch(setDepartmentDropdown(departmentList.items))
    dispatch(setLoading(false))
}

export const loadEmployees = (page: number, records: number) => async (dispatch: any) => {
    dispatch(setLoading(true))
    const employeeList: EmployeeResponseListType = await getEmployees(page, records)
    dispatch(setMeta(employeeList.meta))
    dispatch(setEmployees(employeeList.list))
    dispatch(setLoading(false))
}

export const loadEmployee = (id: number) => async (dispatch: any) => {
    dispatch(setLoading(true))
    const employeeList = await getEmployee(id)
    dispatch(setEmployee(employeeList))
    dispatch(setLoading(false))
}

export const logOut = () => async (dispatch: any) => {
    await AsyncStorage.clear()
}
/*end user*/

export const selectLoading = (state:any) => state.vb.loading
export const selectAlert = (state:any) => state.vb.message
export const selectIsLoggedIn = (state: any) => state.vb.isLoggedIn
export const selectAuthUser = (state: any) => state.vb.user
export const selectLoginLog = (state: any) => state.vb.loginLog
export const selectCurrentLog = (state: any) => state.vb.currentLog
export const selectAuthProfile = (state: any) =>state.vb.profile

export const selectDepartmentPage = (state: any) => state.vb.departmentPage
export const selectDepartments = (state: any) => state.vb.departments
export const selectDepartment = (state: any) => state.vb.department
export const selectDepartmentDropdown = (state: any) => state.vb.departmentDropdown

export const selectEmployeePage = (state: any) => state.vb.employeePage
export const selectEmployees = (state: any) => state.vb.employees
export const selectEmployee = (state: any) => state.vb.employee

export default VBSlice.reducer