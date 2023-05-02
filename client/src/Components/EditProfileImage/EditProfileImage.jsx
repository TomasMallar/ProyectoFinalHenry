import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PutEditProfile } from '../../Redux/Actions/Actions';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import style from './EditProfileImage.module.css'

const EditProfileImage = () => {
    const dispatch = useDispatch();
    const [editProfile, setEditProfile] = useState({});
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);

    const { image } = JSON.parse(
        sessionStorage.getItem('user')
    );

    const id = sessionStorage.getItem('id');

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        const updatedUserData = { ...userData, ...editProfile };
        sessionStorage.setItem('user', JSON.stringify(updatedUserData));
    }, [editProfile]);

    const [fileInputState, setFileInputState] = useState('')
    const [previewSource, setPreviewSource] = useState()

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        previewFile(file)
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
        console.log(reader);
    }

    const handleSubmitFile = async (e) => {
        console.log(previewSource);
        if (!previewSource) return
        await uploadImage(previewSource)
    }



    const uploadImage = async (base64EncodedImage) => {
        try {
            const response = await axios.post('http://localhost:3001/upload/profile', { data: base64EncodedImage });

            setEditProfile({
                ...editProfile,
                image: response.data.secure_url,
            });
        } catch (error) {
            console.log(error);
        }
    }

    const token = sessionStorage.getItem('token');
    let userId = null;
    if (token) {
        const decodedToken = jwt_decode(token);
        userId = decodedToken.id;
        console.log(userId, "user ID");
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!previewSource) return

        const response = await axios.put('http://localhost:3001/coments/all', { userId: userId, image: editProfile.image })
        console.log(response.data);
        const userData = JSON.parse(sessionStorage.getItem('user'));
        dispatch(PutEditProfile(id, userData))
        const updatedUserData = { ...userData, ...editProfile };
        sessionStorage.setItem('user', JSON.stringify(updatedUserData));
        setIsProfileUpdated(true)
    }

    return isProfileUpdated ? (
        <Redirect to='/myprofile' />
    ) : (
        <div >
            <form onSubmit={handleSubmit} >
                <div >
                    <div>
                        <div className={style.containerImage}>
                            <img src={previewSource 
                            ? previewSource 
                            : "https://i.pinimg.com/564x/88/b4/4e/88b44e2f78161c673f92346540e1ebee.jpg"
                            } className={style.image}/>
                        </div>
                        <input type="file" name="image" onChange={handleFileInputChange} value={fileInputState} />
                        <button type="button" onClick={handleSubmitFile}>aceptar</button>
                    </div>
                    <button type='submit'>
                        Guardar
                    </button>
                    <Link to='/myprofile' >
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default EditProfileImage