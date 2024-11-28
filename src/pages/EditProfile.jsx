import "../Index.css"
import EditProfileForm from "../components/EditProfileForm";
import RedirectButton from "../components/RedirectButton";
import {useState, useEffect } from "react";
import { useToken } from "../hooks/useToken";
import {BASE_API_URL, BASE_HEADERS } from "../utils/APIUtils";

function EditProfile({chlildren}) {
    const [userData, setUserData] = useState(null)
    const { token } = useToken();

    const getUser = async () => {
        console.log("getUser function called");  // Log to check if function is triggered
        const response = await fetch(
            `${BASE_API_URL}/user`,
            {
                headers:{
                ...BASE_HEADERS,
                Authorization: `Bearer ${token}`,
                },
                method: "GET",
            }
        );
        if (!response.ok) {
            console.error("Failed to fetch user data:", response.statusText);
        }
        const data = await response.json();
        console.log("User data:", data);
        if (!data) {
            console.error("Received null or empty data");
        }
        setUserData(data);
    };
    
    useEffect(() => {
        console.log(token)
        if (token) {
          getUser();
        }
      }, [token]);

	return(
        <div>
            <RedirectButton
                name = 'Back'
                redirect="/profile"
                className='back-button'
            >
        </RedirectButton>
            <div>
                <EditProfileForm
                 isEditing={false}
                 apiData={userData}
                 />

            </div>      
            {chlildren}  
        </div>
    );
}

export default EditProfile;
