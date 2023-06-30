export const environmentStateInitial: EnvironmentState = {
    loading: false,
    environmentList: [],
    currentAPIEnvironment: 'PRE'
}

export interface EnvironmentState {
    loading: boolean
    environmentList: string[]
    currentAPIEnvironment: string 
}

export interface AppState {
    darkTheme: boolean
    environmentState: EnvironmentState
}

export const initialState: AppState = {
    darkTheme: false,
    environmentState: environmentStateInitial,
}



