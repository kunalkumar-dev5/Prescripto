import { createContext } from "react";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify'

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000').replace(/\/$/, '')

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [appointments, setAppointments] = useState([])

    const getAppointments = useCallback(async () => {
        try {

            const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, {
                headers: { dtoken: dToken }
            })
            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message)
        }
    }, [backendUrl, dToken])

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/complete-appointment`, { appointmentId }, {
                headers: { dtoken: dToken }
            })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/cancel-appointment`, { appointmentId }, {
                headers: { dtoken: dToken }
            })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message)
        }
    }

    const value = {
        dToken, setDToken,
        backendUrl,
        appointments,
        setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment
    }
    return (
        <DoctorContext.Provider value={value} >
            {props.children}
        </DoctorContext.Provider >
    )
}
export default DoctorContextProvider