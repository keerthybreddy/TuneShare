import { useLocation } from 'react-router-dom';

export function UserProfile() {

    const {state} = useLocation();
    const {username} = state;
    
    // const validateUserHandler = e => {
    //     e.preventDefault()
    //     axios.post('http://localhost:5000/user-profile-page', {username: username})
    //     .then(data => {
    //         console.log('Response from server:', data);
    //         if (data.data === "Login unsuccessful!") {
    //             setLoginStatus(false)
    //         } else {
    //             setLoginStatus(true)
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
    // }

    return (
        <>
        <h1>User: {username}</h1>
        </>
    )
}