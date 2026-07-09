import React from 'react';
import Hero from './Hero';
import useAuthUser from '../../hooks/useAuthUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { axiosInstance } from '../../lib/axios';

const completeOnboarding = async (formData) => {
  const response = await axiosInstance.post('auth/onboarding', formData, {
    withCredentials: true,
  });
  return response.data;
};

function Onboard() {
  const authUser = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile Onboarded successfully")
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${idx}`;

    setFormState({ ...formState, profilePic: randomAvatar });
    console.log("Generated Avatar URL:", randomAvatar);
    toast.success("Random profile picture generated!");
  };
  return (
    <>
      <Hero
        onSubmit={handleSubmit}
        formState={formState}
        setFormState={setFormState}
        isPending={isPending}
        onGenerateAvatar={handleRandomAvatar}
      />
    </>
  )
}
export default Onboard;