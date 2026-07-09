import React from 'react';
import { CameraIcon } from 'lucide-react';
import { LANGUAGES } from '../../constants/index.js';

function Hero({ onSubmit, formState, setFormState, isPending, onGenerateAvatar }) {
    return (
        <div className='container py-5'>
            <div className='row mb-4 text-center'>
                <h1 className='text-primary fw-bold'>Onboarding</h1>
            </div>

            <div className='row justify-content-center'>
                <div className='col-md-8 col-lg-6'>
                    <div className='p-4 bg-white rounded shadow'>
                        <h3 className='text-center fw-bold mb-3'>Complete your Profile</h3>

                        <div className='text-center mb-3'>
                            {formState.profilePic ? (
                                <img
                                    src={formState.profilePic}
                                    alt="Profile Preview"
                                    className="img-thumbnail rounded-circle"
                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'media/fallback-avatar.png';
                                    }}
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <CameraIcon className="size-12 text-base-content opacity-40" />
                                </div>
                            )}


                            <br />
                            <button
                                type='button'
                                className='btn btn-info text-white fw-semibold mt-4'
                                onClick={onGenerateAvatar}
                            >
                                🎲 Generate Random Avatar
                            </button>
                        </div>

                        <form onSubmit={onSubmit}>
                            <div className='mb-3'>
                                <label className='form-label fw-semibold'>Full Name</label>
                                <input
                                    type='text'
                                    name="fullName"
                                    value={formState.fullName}
                                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                                    className='form-control'
                                    placeholder='Enter your full name'
                                />
                            </div>

                            <div className='mb-3'>
                                <label className='form-label fw-semibold'>Bio</label>
                                <textarea
                                    name="bio"
                                    value={formState.bio}
                                    onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                                    className='form-control'
                                    rows='3'
                                    placeholder='Tell others about yourself and your learning goals'
                                ></textarea>
                            </div>

                            <div className='row'>
                                <div className='col-md-6 mb-3'>
                                    <label className='form-label fw-semibold'>Native Language</label>
                                    <select
                                        className='form-select'
                                        name='nativeLanguage'
                                        value={formState.nativeLanguage}
                                        onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                                    >
                                        <option value=''>Select your native language</option>
                                        {LANGUAGES.map((lang) => (
                                            <option key={`native-${lang}`} value={lang.toLowerCase()}>
                                                {lang}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className='col-md-6 mb-3'>
                                    <label className='form-label fw-semibold'>Learning Language</label>
                                    <select
                                        className='form-select'
                                        name='learningLanguage'
                                        value={formState.learningLanguage}
                                        onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                                    >
                                        <option value=''>Select language you're learning</option>
                                        {LANGUAGES.map((lang) => (
                                            <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                                                {lang}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className='mb-4'>
                                <label className='form-label fw-semibold'>Location</label>
                                <input
                                    type='text'
                                    name="location"
                                    value={formState.location}
                                    onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                                    className='form-control'
                                    placeholder='City, Country'
                                />
                            </div>

                            <button
                                type='submit'
                                className='btn btn-primary w-100 fw-bold'
                                disabled={isPending}
                            >
                                {!isPending ? " Complete Onboarding" : "Onboarding..."}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Hero;