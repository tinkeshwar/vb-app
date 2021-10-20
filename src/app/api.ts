import ApiService from "../service/ApiService"

export const login = async (data: any) => {
    const url = 'auth/user/login'
    return await ApiService.post(url, data)
}

export const getProfile = async () => {
    const path = 'auth/profile/profile'
    return await ApiService.get(path)
}

// departments
export const getDepartments = async (page: number, records: number) => {
    const path = `department/departments?page=${page}&records=${records}`
    return await ApiService.get(path)
}

export const getDepartment = async (id: number) => {
    const path = `department/departments/${id}`
    return await ApiService.get(path)
}

export const createDepartment = async (data: any) => {
    const path = `department/departments`
    return await ApiService.post(path, data)
}

export const getDepartmentList = async (sort?: string, order?: string) => {
    const path = `department/departments/dropdown?sort=${sort}&order=${order}`
    return await ApiService.get(path)
}

export const statusDepartment = async (id: number) => {
    const path = `department/departments/${id}`
    return await ApiService.patch(path)
}

export const deleteDepartment = async (id: number) => {
    const path = `department/departments/${id}`
    return await ApiService.destroy(path)
}

// employees
export const getEmployees = async (page: number, records: number) => {
    const path = `employee/employees?page=${page}&records=${records}`
    return await ApiService.get(path)
}

export const getEmployee = async (id: number) => {
    const path = `employee/employees/${id}`
    return await ApiService.get(path)
}

export const createEmployee = async (data: any) => {
    const path = `employee/employees`
    return await ApiService.post(path, data)
}

export const statusEmployee = async (id: number) => {
    const path = `employee/employees/${id}`
    return await ApiService.patch(path)
}

export const deleteEmployee = async (id: number) => {
    const path = `employee/employees/${id}`
    return await ApiService.destroy(path)
}