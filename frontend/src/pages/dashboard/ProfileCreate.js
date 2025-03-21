import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

const ProfileCreate = () => {
  const { register, handleSubmit, watch, reset,formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log('see all working', data);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('sex', data.sex);
    formData.append('birthDate', data.birthDate);
    formData.append('age', data.age);
    formData.append('microchip', data.microchip);
    formData.append('chipNo', data.chipNo);
    formData.append('remarks', data.remarks);
    formData.append('species', data.species);
    formData.append('breed', data.breed);
    formData.append('color', data.color);
    formData.append('weight', data.weight);
    formData.append('status', data.status);
    formData.append('intakeDate', data.intakeDate);
    formData.append('treatment', data.treatment);
    formData.append('mediDate', data.mediDate);
    formData.append('note', data.note);

    if (data.profileImage && data.profileImage.length > 0) {
        formData.append("profileImage", data.profileImage[0]);
      }
  
      if (data.medicalHistoryFile && data.medicalHistoryFile.length > 0) {
        formData.append("medicalHistoryFile", data.medicalHistoryFile[0]);
      }

      try {
        const res = await axios.post("https://cat-charity-sgdi.vercel.app/api/cat", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
  
        reset();
        console.log(res.data);
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
      }
  };


  return (
    <div className="mt-10 w-full">
      <p className="text-2xl font-bold mb-4">New Animals</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="bg-red-400 text-center text-lg">Animal Profile</p>
        <div className="flex w-full mx-auto">
          <div className="w-1/2">
            <div className="flex border justify-between">
              <p className="text-end bg-orange-100 w-1/2">Name</p>
              <input {...register('name', { required: true })} className="w-1/2" />
            </div>
            <div className="flex border justify-between">
              <p className="text-end bg-orange-100 w-1/2">Sex</p>
              <select {...register('sex', { required: true })} className="w-1/2">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="flex border justify-between">
              <p className="text-end bg-orange-100 w-1/2">Date of birth</p>
              <input type="date" {...register('birthDate', { required: true })} className="w-1/2" />
            </div>
            <div className="flex border justify-between">
              <p className="text-end bg-orange-100 w-1/2">Age</p>
              <input {...register('age', { required: true })} className="w-1/2" />
            </div>
            <div className="flex border justify-between">
              <p className="text-end bg-orange-100 w-1/2">MicroChipped?</p>
              <select {...register('microchip', { required: true })} className="w-1/2">
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
            <div className="flex border justify-between">
              <p className="text-end bg-orange-100 w-1/2">MicroChip No</p>
              <input {...register('chipNo', { required: false })} className="w-1/2" />
            </div>
            <div className="flex border justify-between">
              <p className="text-end bg-orange-100 w-1/2">Remarks</p>
              <input {...register('remarks', { required: false })} className="w-1/2" />
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex border justify-between">
              <p className="text-end bg-orange-100 w-1/2">Species</p>
              <input {...register('species', { required: true })} className="w-1/2" />
            </div>
            <div className="flex border justify-between">
              <p className="text-end bg-orange-100 w-1/2">Breed</p>
              <input {...register('breed', { required: false })} className="w-1/2" />
            </div>
            <div className="flex border justify-between">
              <p className="text-end bg-orange-100 w-1/2">Color/pattern</p>
              <input {...register('color', { required: false })} className="w-1/2" />
            </div>
            <div className="flex border justify-between">
              <p className="text-end bg-orange-100 w-1/2">Weight Group</p>
              <input {...register('weight', { required: false })} className="w-1/2" />
            </div>
            <div className="flex border justify-between">
              <p className="text-end bg-orange-100 w-1/2">Intake Date</p>
              <input type="date" {...register('intakeDate', { required: true })} className="w-1/2" />
            </div>
            <div className="flex border justify-between">
              <p className="text-end bg-orange-100 w-1/2">Status</p>
              <select {...register('status', { required: true })} className="w-1/2">
                <option value="Stray">Stray</option>
                <option value="Surrender">Surrender</option>
              </select>
            </div>
            <div className="flex border justify-between">
              <p className="text-end bg-orange-100 w-1/2">photo</p>
              <input type="file" {...register('photo', { required: false })} className="w-1/2" />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="bg-red-400 text-center text-lg">Medical History</p>
          <div className="flex border justify-between">
            <input {...register('treatment', { required: true })} placeholder="Treatment" className="" />
            <input type="date" {...register('mediDate', { required: true })} placeholder="Date" className="" />
            <input type="file" {...register('medicalHistoryFile', { required: false })} placeholder="Attachment" className="" />
            <input {...register('note', { required: false })} placeholder="Notes" className="" />
          </div>
        </div>
        <input type="submit" className=" text-center text-xl btn bg-red-300 mx-auto mt-8 " />
      </form>
    </div>
  );
};

export default ProfileCreate;