import { createContext, useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const  [dashData, setDashData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
    const baseUrl = backendUrl.replace(/\/$/, '')

    async function getAllDoctors() {
        try {
            const { data } = await axios.post(`${baseUrl}/api/admin/all-doctors`, {}, { headers: { atoken: aToken } });
            if (data.success) {
                setDoctors(data.doctors || []);
                console.log('Doctors fetched:', data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Get doctors error:', error);
            toast.error(error.response?.data?.message || error.message);
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(`${baseUrl}/api/admin/change-availability`, { docId }, { headers: { atoken: aToken } });
            if (data.success) {
                toast.success(data.message);
                getAllDoctors(); // Refresh the doctors list
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const getAllAppointments = async ()=>{
        try {
            const { data } = await axios.get(`${baseUrl}/api/admin/appointments`, { headers: { atoken: aToken } });
            if (data.success) {
                setAppointments(data.appointments || []);
                console.log(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    const cancelAppointment = async(appointmentId) =>{
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { atoken: aToken } })
            if(data.success){
                toast.success(data.message || 'Appointment canceled successfully')
                getAllAppointments()
            } else {
                toast.error(data.message || 'Failed to cancel appointment')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }

    const getDashData = useCallback(async () => {
        try{
            const { data } = await axios.get(`${baseUrl}/api/admin/dashboard`, { headers: { atoken: aToken } });
            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData);
            } else {
                toast.error(data.message || 'Failed to fetch dashboard data')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }, [aToken, baseUrl]);

    const value = {
        aToken, setAToken,
        backendUrl, doctors, appointments, dashData,
        getAllDoctors,setAppointments,getAllAppointments, getDashData,
        changeAvailability, cancelAppointment
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider 