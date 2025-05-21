import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authorizeAxiosInstance from "~/utils/authorizeAxios"
import { API_ROOT } from "~/utils/constants"

const initialState = {
    currentNotifications: null
}

export const fetchInvitationsAPI = createAsyncThunk(
    'notifications/fetchInvitationsAPI',
    async () => {
        const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/invitations`)
        return response.data
    }
)

export const updateBoardInvitationsAPI = createAsyncThunk(
    'notifications/updateBoardInvitationsAPI',
    async ({ status, invitationId }) => {
        const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/invitations/board/${invitationId}`, {status})
        return response.data
    }
)

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        clearCurrentNotifications: (state) => {
            state.currentNotifications = null
        },
        updateCurrentNotifications: (state, action) => {
            state.currentNotifications = action.payload
        },
        addCurrentNotifications: (state, action) => {
            const incomingInvitation = action.payload
            state.currentNotifications.unshift(incomingInvitation)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
            let incomingInvitations = action.payload
            state.currentNotifications = Array.isArray(incomingInvitations) ? incomingInvitations.reverse() : []
        })
        builder.addCase(updateBoardInvitationsAPI.fulfilled, (state, action) => {
            const incomingInvitation = action.payload
            const getInvitation = state.currentNotifications.find(i => i._id === incomingInvitation._id)
            getInvitation.boardInvitation = incomingInvitation.boardInvitation      
        })
    }
})

export const {
    clearCurrentNotifications,
    updateCurrentNotifications,
    addNotification
} = notificationsSlice.actions

export const selectCurrentNotifications = state => {
    return state.notifications.currentNotifications
}


export const notificationsReducer = notificationsSlice.reducer