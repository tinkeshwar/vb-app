export type UserResponseType = {
    id: number,
    firstname: string,
    middlename: string | null,
    lastname: string | null,
    email: string,
    phone: number,
    email_verified_at: Date | null,
    phone_verified_at: Date | null,
    status: boolean,
    created_at: Date,
    updated_at: Date,
    image: ImageType
}

export type UserSettingResponseType = {
    key: string
    value: any
}

export type LoginResponseType = {
    user: UserResponseType,
    setting: UserSettingResponseType[],
    token: string,
    refresh: string,
    scopes: string[]|[]
}

export type UserProfileResponseType = {
    user: UserResponseType,
    buckets: number,
    tasks: number
}

export type RegisterUserType = {
    id: number,
    firstname: string,
    email: string,
    phone: number
}

export type ImageType = {
    id: number,
    name: string,
    path: string,
    public_url: string,
    status: boolean,
    created_at: Date,
    updated_at: Date
}

export type MetaResponseType = {
    total: number,
    page: number,
    per_page: number
}

export type DepartmentResponseType = {
    id: number,
    company_id: number,
    name: string,
    email: string,
    status: boolean,
    created_at: Date,
    updated_at: Date
}

export type DepartmentResponseListType = {
    list: DepartmentResponseType[],
    meta: MetaResponseType
}

export type EmployeeResponseType = {
    id: number,
    company_id: number,
    firstname: string,
    middlename: string|null,
    lastname: string|null,
    email: string,
    phone: number
    status: boolean,
    created_at: Date,
    updated_at: Date
}

export type EmployeeResponseListType = {
    list: EmployeeResponseType[],
    meta: MetaResponseType
}