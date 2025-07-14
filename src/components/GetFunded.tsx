
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { DollarSign, FileText, CheckCircle, Clock, TrendingUp, Users, Shield, Award } from 'lucide-react';

interface FundingProgram {
  id: string;
  title: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  duration: string;
  interestRate: string;
  requirements: string[];
  benefits: string[];
  category: string;
}

const GetFunded = () => {
  const { t, isRTL } = useLanguage();
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [applicationStep, setApplicationStep] = useState(1);

  // Dummy funding programs data
  const fundingPrograms: FundingProgram[] = [
    {
      id: '1',
      title: t('funding.programs.program1.title'),
      description: t('funding.programs.program1.description'),
      minAmount: 50000,
      maxAmount: 500000,
      duration: '12-36 months',
      interestRate: '5-8%',
      requirements: [
        t('funding.programs.program1.req1'),
        t('funding.programs.program1.req2'),
        t('funding.programs.program1.req3')
      ],
      benefits: [
        t('funding.programs.program1.benefit1'),
        t('funding.programs.program1.benefit2'),
        t('funding.programs.program1.benefit3')
      ],
      category: 'Small Business'
    },
    {
      id: '2',
      title: t('funding.programs.program2.title'),
      description: t('funding.programs.program2.description'),
      minAmount: 100000,
      maxAmount: 2000000,
      duration: '24-60 months',
      interestRate: '4-7%',
      requirements: [
        t('funding.programs.program2.req1'),
        t('funding.programs.program2.req2'),
        t('funding.programs.program2.req3')
      ],
      benefits: [
        t('funding.programs.program2.benefit1'),
        t('funding.programs.program2.benefit2'),
        t('funding.programs.program2.benefit3')
      ],
      category: 'Real Estate'
    },
    {
      id: '3',
      title: t('funding.programs.program3.title'),
      description: t('funding.programs.program3.description'),
      minAmount: 25000,
      maxAmount: 250000,
      duration: '6-24 months',
      interestRate: '6-10%',
      requirements: [
        t('funding.programs.program3.req1'),
        t('funding.programs.program3.req2'),
        t('funding.programs.program3.req3')
      ],
      benefits: [
        t('funding.programs.program3.benefit1'),
        t('funding.programs.program3.benefit2'),
        t('funding.programs.program3.benefit3')
      ],
      category: 'Technology'
    }
  ];

  const applicationSteps = [
    {
      number: 1,
      title: t('funding.steps.step1.title'),
      description: t('funding.steps.step1.description'),
      icon: FileText
    },
    {
      number: 2,
      title: t('funding.steps.step2.title'),
      description: t('funding.steps.step2.description'),
      icon: CheckCircle
    },
    {
      number: 3,
      title: t('funding.steps.step3.title'),
      description: t('funding.steps.step3.description'),
      icon: Users
    },
    {
      number: 4,
      title: t('funding.steps.step4.title'),
      description: t('funding.steps.step4.description'),
      icon: Shield
    },
    {
      number: 5,
      title: t('funding.steps.step5.title'),
      description: t('funding.steps.step5.description'),
      icon: DollarSign
    }
  ];

  const stats = [
    { label: t('funding.stats.totalFunded'), value: '$50M+', icon: DollarSign },
    { label: t('funding.stats.projects'), value: '200+', icon: Award },
    { label: t('funding.stats.successRate'), value: '95%', icon: TrendingUp },
    { label: t('funding.stats.avgTime'), value: '30 days', icon: Clock }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
              <DollarSign className="text-green-600" size={40} />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-primary-800 mb-4">
            {t('funding.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('funding.subtitle')}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="text-green-600" size={24} />
              </div>
              <h3 className="text-3xl font-bold text-primary-800 mb-2">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Funding Programs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-primary-800 mb-8 text-center">
            {t('funding.programs.title')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fundingPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-primary-800">{program.title}</h4>
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      {program.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{program.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t('funding.amount')}:</span>
                      <span className="font-semibold">${program.minAmount.toLocaleString()} - ${program.maxAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t('funding.duration')}:</span>
                      <span className="font-semibold">{program.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t('funding.rate')}:</span>
                      <span className="font-semibold text-green-600">{program.interestRate}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h5 className="font-semibold text-primary-800 mb-2">{t('funding.requirements')}:</h5>
                    <ul className="space-y-1">
                      {program.requirements.slice(0, 2).map((req, reqIndex) => (
                        <li key={reqIndex} className="text-sm text-gray-600 flex items-start">
                          <CheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" size={14} />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button
                    onClick={() => setSelectedProgram(program.id)}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl"
                  >
                    {t('funding.applyNow')}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Application Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-primary-800 mb-8 text-center">
            {t('funding.process.title')}
          </h3>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2 hidden lg:block" />
            <div className="absolute top-1/2 left-0 h-0.5 bg-primary-600 transform -translate-y-1/2 hidden lg:block transition-all duration-500"
                 style={{ width: `${(applicationStep - 1) * 25}%` }} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {applicationSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center relative z-10"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                    applicationStep >= step.number
                      ? 'bg-primary-600 text-white shadow-lg scale-110'
                      : 'bg-white border-2 border-gray-200 text-gray-400'
                  }`}>
                    <step.icon size={24} />
                  </div>
                  <h4 className="font-semibold text-primary-800 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">{t('funding.cta.title')}</h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              {t('funding.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-3">
                {t('funding.cta.startApplication')}
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-3">
                {t('funding.cta.schedule')}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GetFunded;
