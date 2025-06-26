import React, { useState, useRef, useEffect } from 'react';
import './Team.css';
import rc from '../assets/rc.png';

const Team = () => {
  return (
    <div className="center">
      <div className="team">
        <div className="main-title">Team</div>
        
        {/* Senior Council Section */}
        <div className="council-section">
          <div className="council-title">Senior Council</div>
          
          {/* Position Centre */}
          <div className="position-group">
            <div className="position-title">Head</div>
            <div className="profiles two-columns">
              <ProfileCard 
                name="John Smith"
                role="President"
                description="Leading the organization with vision and strategic direction for sustainable growth."
              />
              <ProfileCard 
                name="Sarah Johnson"
                role="Vice President"
                description="Supporting executive leadership and overseeing operational excellence."
              />
            </div>
          </div>

          {/* Secretaries */}
          <div className="position-group">
            <div className="position-title">Secretaries</div>
            <div className="profiles three-columns">
              <ProfileCard 
                name="Michael Brown"
                role="General Secretary"
                description="Managing administrative operations and organizational documentation."
              />
              <ProfileCard 
                name="Emma Davis"
                role="Finance Secretary"
                description="Overseeing financial planning and budget management across departments."
              />
              <ProfileCard 
                name="James Wilson"
                role="Academic Secretary"
                description="Coordinating academic programs and educational initiatives."
              />
            </div>
          </div>

          {/* Domain Leads */}
          <div className="position-group">
            <div className="position-title">Domain Leads</div>
            <div className="profiles three-columns">
              <ProfileCard 
                name="Lisa Garcia"
                role="Technology Lead"
                description="Spearheading technological innovation and digital transformation initiatives."
              />
              <ProfileCard 
                name="David Miller"
                role="Operations Lead"
                description="Ensuring smooth operational workflows and process optimization."
              />
              <ProfileCard 
                name="Rachel Adams"
                role="Strategy Lead"
                description="Developing long-term strategic plans and market positioning."
              />
            </div>
          </div>
        </div>

        {/* Junior Council Section */}
        <div className="council-section">
          <div className="council-title">Junior Council</div>
          
          {/* PR & Marketing Directors */}
          <div className="position-group">
            <div className="position-title">PR & Marketing Directors</div>
            <div className="profiles four-columns">
              <ProfileCard 
                name="Alex Thompson"
                role="PR Director"
                description="Managing public relations and brand communication strategies."
              />
              <ProfileCard 
                name="Sophie Chen"
                role="PR Director"
                description="Coordinating media relations and external communications."
              />
              <ProfileCard 
                name="Mark Rodriguez"
                role="Marketing Director"
                description="Driving marketing campaigns and customer engagement initiatives."
              />
              <ProfileCard 
                name="Jennifer Lee"
                role="Marketing Director"
                description="Developing digital marketing strategies and brand positioning."
              />
            </div>
          </div>

          {/* Other Directors - Row 1 */}
          <div className="position-group">
            <div className="position-title">Department Directors</div>
            <div className="profiles four-columns">
              <ProfileCard 
                name="Kevin Park"
                role="Events Director"
                description="Organizing and managing corporate events and team activities."
              />
              <ProfileCard 
                name="Amanda White"
                role="Content Director"
                description="Creating and managing content strategy across all platforms."
              />
              <ProfileCard 
                name="Ryan Cooper"
                role="Design Director"
                description="Leading visual design and user experience across all products."
              />
              <ProfileCard 
                name="Maria Gonzalez"
                role="HR Director"
                description="Managing human resources and organizational development."
              />
            </div>
          </div>

          {/* Other Directors - Row 2 */}
          <div className="position-group">
            <div className="position-title">Specialized Directors</div>
            <div className="profiles four-columns">
              <ProfileCard 
                name="Chris Taylor"
                role="Research Director"
                description="Leading research initiatives and innovation projects."
              />
              <ProfileCard 
                name="Nicole Anderson"
                role="Partnership Director"
                description="Building strategic partnerships and business relationships."
              />
              <ProfileCard 
                name="Tyler Jackson"
                role="Training Director"
                description="Developing training programs and professional development."
              />
              <ProfileCard 
                name="Hannah Kim"
                role="Quality Director"
                description="Ensuring quality standards and continuous improvement."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileCard = ({ name, role, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`profile ${isExpanded ? 'expanded' : ''}`}
      onClick={toggleExpand}
      ref={profileRef}
    >
      <div className="card">
        <div className="head">
          <img src={rc} alt={name} />
          <div className="name">{name}</div>
        </div>
        <div className="content">
          <div className="role">{role}</div>
          {description}
        </div>
        <div className="icons">
          <a href="#"><i className="fa-brands fa-linkedin"></i></a>
          <a href="#"><i className="fa-brands fa-github"></i></a>
          <a href="#"><i className="fa-solid fa-envelope"></i></a>
        </div>
      </div>
      <img src={rc} alt={name} id="picture" />
      <div className="details">
        {name}
        <span>{role}</span>
      </div>
    </div>
  );
};

export default Team;