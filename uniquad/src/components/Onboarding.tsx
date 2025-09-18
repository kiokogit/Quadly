"use client"
import React, { useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft, Users, Shield, Star, MapPin, Calendar, BookOpen, Info, Megaphone, Heart, Search, ShoppingBag, PenTool, MoreHorizontal } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import axiosInstance from '@/lib/api-client';

const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const isDarkMode = true
  const [formData, setFormData] = useState<any>({
    accountType: '',
    campus: '',
    course: '',
    yearOfStudy: '',
    interests: [],
    fullname: ''
  });

  const totalSteps = 4;

   const {data: session} = useSession()
  
    if ((session as any)?.user?.campus) {
      redirect('/home')
    }
  
   
  const accountTypes = [
    {
      id: 'student',
      title: 'Student',
      description: 'Connect with fellow students',
      icon: <Users className="w-6 h-6" />
    },
    {
      id: 'premium',
      title: 'Premium',
      description: 'Enhanced features & benefits',
      icon: <Star className="w-6 h-6" />
    },
    {
      id: 'admin',
      title: 'Campus Admin',
      description: 'Manage campus community',
      icon: <Shield className="w-6 h-6" />
    },
    
  ];

  const [campuses, setCampuses] = useState<any[]>([])

  const getCampuses = async() => {
     await axiosInstance.get('/users/campuses/all').then(res => {
      setCampuses(res.data)
    })
     
  }

  useEffect(() => {
    getCampuses()

  }, [])

  const interests = [
    { id: 'information', label: 'Information', icon: <Info className="w-4 h-4" /> },
    { id: 'announcements', label: 'Announcements', icon: <Megaphone className="w-4 h-4" /> },
    { id: 'friends', label: 'Meet Friends', icon: <Heart className="w-4 h-4" /> },
    { id: 'services', label: 'Locate Services', icon: <Search className="w-4 h-4" /> },
    { id: 'offers', label: 'Find Offers', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'sell', label: 'Sell Items', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'blog', label: 'Blogging', icon: <PenTool className="w-4 h-4" /> },
    { id: 'more', label: 'More', icon: <MoreHorizontal className="w-4 h-4" /> }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAccountTypeSelect = (type: string) => {
    setFormData({ ...formData, accountType: type });
  };

  const handleCampusSelect = (campus: string) => {
    setFormData({ ...formData, campus: campus });
  };

  const handleInterestToggle = (interest: string) => {
    const updatedInterests = formData.interests.includes(interest)
      ? formData.interests.filter((i: string) => i !== interest)
      : [...formData.interests, interest];
    setFormData({ ...formData, interests: updatedInterests });
  };

  const handleSubmit = async() => {
    await axiosInstance.put('/users/profile/update-details', formData)
    .then(res => {
      console.log(res)
      alert('Profile Updated successfuly')
      redirect('/home')
    })
    .catch(err => {
      alert('THere was an error updating data')
      console.log(err)
    }
    )
  }

  const cardClasses = isDarkMode
    ? 'bg-gray-800 border-gray-700'
    : 'bg-white border-gray-200';

  return (
    <div className={`min-h-screen transition-colors duration-300`}>
      {/* Theme Toggle */}

      <div className="px-6 py-8 max-w-md mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium`}>
              Step {currentStep} of {totalSteps}
            </span>
            <span className={`text-sm`}>
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          <div className={`w-full bg-gray-200 rounded-full h-2 bg-gray-200 dark:bg-gray-700`}>
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Account Type */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Choose Your Account Type</h1>
              <p className={`dark:text-gray-400 text-gray-600`}>
                Select the type that best describes you
              </p>
            </div>

            <div className="space-y-4">
              {accountTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleAccountTypeSelect(type.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.accountType === type.id
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                      : `${cardClasses} border-2 hover:border-orange-300`
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      formData.accountType === type.id 
                        ? 'bg-orange-500 text-white' 
                        : `${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`
                    }`}>
                      {type.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">{type.title}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {type.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Campus Selection */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Select Your Campus</h1>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Choose your university or campus
              </p>
            </div>

            <div className="space-y-4">
              {campuses.map((campus) => (
                <button
                  key={campus.id}
                  onClick={() => handleCampusSelect(campus.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.campus === campus.id
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                      : `${cardClasses} border-2 hover:border-orange-300`
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        formData.campus === campus.id 
                          ? 'bg-orange-500 text-white' 
                          : `${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`
                      }`}>
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-lg">{campus.initials}</h3>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {campus.name}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {campus.students || 0} students
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Academic Details */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Personal Details</h1>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Help us personalize your experience (optional)
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name 
                </label>
                <div className="relative">
                  <BookOpen className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder="e.g., John Doe"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      isDarkMode ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                    value={formData.fullname}
                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  About you
                </label>
                <div className="relative">
                  <BookOpen className={`absolute left-3 top-1/6 transform  w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  <textarea
                    rows={3}
                    placeholder="e.g., Computer Science"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      isDarkMode ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Year of Study
                </label>
                <div className="relative">
                  <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  <select
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                    value={formData.yearOfStudy}
                    onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                  >
                    <option value="">Select year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="5">5th Year</option>
                    <option value="graduate">Graduate</option>
                    <option value="postgraduate">Postgraduate</option>
                  </select>
                </div>
              </div>
{/* 
              {formData.accountType === 'admin' && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Department/Role
                  </label>
                  <div className="relative">
                    <GraduationCap className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      placeholder="e.g., Student Affairs"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        isDarkMode ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                    />
                  </div>
                </div>
              )} */}
            </div>
          </div>
        )}

        {/* Step 4: Interests */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">What brings you here</h1>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                What brings you to Uniquad? Select all that apply
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {interests.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center space-y-2 ${
                    formData.interests.includes(interest.id)
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                      : `${cardClasses} border-2 hover:border-orange-300`
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    formData.interests.includes(interest.id) 
                      ? 'bg-orange-500 text-white' 
                      : `${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`
                  }`}>
                    {interest.icon}
                  </div>
                  <span className="text-sm font-medium text-center">{interest.label}</span>
                </button>
              ))}
            </div>

            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-orange-50'} mt-6`}>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-orange-800'}`}>
                💡 You can change these preferences anytime in your profile settings
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentStep === 1
                ? 'opacity-50 cursor-not-allowed'
                : `${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            onClick={currentStep === totalSteps ? handleSubmit:handleNext}
            disabled={
              (currentStep === 1 && !formData.accountType) ||
              (currentStep === 2 && !formData.campus)
            }
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              ((currentStep === 1 && !formData.accountType) ||
               (currentStep === 2 && !formData.campus))
                ? 'opacity-50 cursor-not-allowed bg-orange-300'
                : 'bg-orange-500 hover:bg-orange-600 text-white transform hover:scale-105'
            }`}
          >
            <span>{currentStep === totalSteps ? 'Get Started' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;