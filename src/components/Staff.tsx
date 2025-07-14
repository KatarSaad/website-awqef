
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, Mail, Phone, Linkedin, Award, Calendar, MapPin } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  position: string;
  department: string;
  bio: string;
  email: string;
  phone: string;
  linkedin: string;
  imageUrl: string;
  joinDate: string;
  certifications: string[];
  expertise: string[];
}

const Staff = () => {
  const { t, isRTL } = useLanguage();
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Dummy staff data
  const staffMembers: StaffMember[] = [
    {
      id: '1',
      name: 'Dr. Ahmed Al-Rashid',
      position: t('staff.members.member1.position'),
      department: 'Leadership',
      bio: t('staff.members.member1.bio'),
      email: 'ahmed.rashid@awqef.com',
      phone: '+971 50 123 4567',
      linkedin: 'https://linkedin.com/in/ahmed-rashid',
      imageUrl: '/placeholder.svg',
      joinDate: '2020-01-15',
      certifications: ['AAOIFI Certified', 'CIFA Certified'],
      expertise: ['Islamic Finance', 'Investment Strategy', 'Regulatory Compliance']
    },
    {
      id: '2',
      name: 'Sarah Al-Zahra',
      position: t('staff.members.member2.position'),
      department: 'Investment',
      bio: t('staff.members.member2.bio'),
      email: 'sarah.zahra@awqef.com',
      phone: '+971 50 234 5678',
      linkedin: 'https://linkedin.com/in/sarah-zahra',
      imageUrl: '/placeholder.svg',
      joinDate: '2020-03-20',
      certifications: ['CFA Charter', 'FRM Certified'],
      expertise: ['Portfolio Management', 'Risk Analysis', 'Market Research']
    },
    {
      id: '3',
      name: 'Prof. Mohamed Hassan',
      position: t('staff.members.member3.position'),
      department: 'Compliance',
      bio: t('staff.members.member3.bio'),
      email: 'mohamed.hassan@awqef.com',
      phone: '+971 50 345 6789',
      linkedin: 'https://linkedin.com/in/mohamed-hassan',
      imageUrl: '/placeholder.svg',
      joinDate: '2019-08-10',
      certifications: ['Sharia Scholar', 'AAOIFI Certified'],
      expertise: ['Sharia Compliance', 'Islamic Law', 'Financial Auditing']
    },
    {
      id: '4',
      name: 'Fatima Al-Mansouri',
      position: t('staff.members.member4.position'),
      department: 'Operations',
      bio: t('staff.members.member4.bio'),
      email: 'fatima.mansouri@awqef.com',
      phone: '+971 50 456 7890',
      linkedin: 'https://linkedin.com/in/fatima-mansouri',
      imageUrl: '/placeholder.svg',
      joinDate: '2021-02-01',
      certifications: ['PMP Certified', 'Six Sigma Black Belt'],
      expertise: ['Operations Management', 'Process Optimization', 'Quality Assurance']
    }
  ];

  const departments = [
    { id: 'all', name: t('staff.departments.all') },
    { id: 'leadership', name: t('staff.departments.leadership') },
    { id: 'investment', name: t('staff.departments.investment') },
    { id: 'compliance', name: t('staff.departments.compliance') },
    { id: 'operations', name: t('staff.departments.operations') }
  ];

  const filteredStaff = staffMembers.filter(member => 
    selectedDepartment === 'all' || member.department.toLowerCase() === selectedDepartment
  );

  const stats = [
    { label: t('staff.stats.totalStaff'), value: '25+', icon: Users },
    { label: t('staff.stats.experience'), value: '15+', icon: Calendar },
    { label: t('staff.stats.certifications'), value: '50+', icon: Award },
    { label: t('staff.stats.countries'), value: '8', icon: MapPin }
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
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
              <Users className="text-blue-600" size={40} />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-primary-800 mb-4">
            {t('staff.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('staff.subtitle')}
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
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="text-blue-600" size={24} />
              </div>
              <h3 className="text-3xl font-bold text-primary-800 mb-2">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Department Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-2 bg-white rounded-2xl p-2 shadow-lg">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedDepartment === dept.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Staff Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredStaff.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary-800 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-2">{member.position}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>
                
                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {member.expertise.slice(0, 2).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-primary-50 text-primary-700 px-2 py-1 rounded-lg text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.expertise.length > 2 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs">
                      +{member.expertise.length - 2}
                    </span>
                  )}
                </div>
                
                {/* Contact Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button className="w-8 h-8 bg-primary-100 hover:bg-primary-200 rounded-lg flex items-center justify-center transition-colors">
                      <Mail size={16} className="text-primary-600" />
                    </button>
                    <button className="w-8 h-8 bg-primary-100 hover:bg-primary-200 rounded-lg flex items-center justify-center transition-colors">
                      <Phone size={16} className="text-primary-600" />
                    </button>
                    <button className="w-8 h-8 bg-primary-100 hover:bg-primary-200 rounded-lg flex items-center justify-center transition-colors">
                      <Linkedin size={16} className="text-primary-600" />
                    </button>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    {t('staff.viewProfile')}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">{t('staff.joinTeam.title')}</h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              {t('staff.joinTeam.description')}
            </p>
            <Button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-3">
              {t('staff.joinTeam.cta')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Staff;
