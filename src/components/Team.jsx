import React, { useState, useRef, useEffect } from 'react';
import './Team.css';

const Team = () => {
  return (
    <div className="center" id='team-profile'>
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
                name="Johnson Serrao"
                role="President"
                description="Leading the organization with vision and strategic direction for sustainable growth."
              />
              <ProfileCard 
                name="Kegan Estibeiro"
                role="Vice President"
                description="Supporting executive leadership and overseeing operational excellence."
              />
            </div>
          </div>

          {/* Secretaries */}
          <div className="position-group">
            <div className="position-title"></div>
            <div className="profiles three-columns">
              <ProfileCard 
                name="Arnav Ferreria"
                role="Secretary"
                description="Managing administrative operations and organizational documentation."
              />
              <ProfileCard 
                name="Sherlynn Vaz"
                role="Joint Secretary"
                description="Overseeing financial planning and budget management across departments."
              />
              <ProfileCard 
                name="Joshua Parmar"
                role="PR Head"
                description="Coordinating academic programs and educational initiatives."
              />
            </div>
          </div>

          {/* Domain Leads */}
          <div className="position-group">
            <div className="position-title"></div>
            <div className="profiles three-columns">
              <ProfileCard 
                name="Naomi Coutinho"
                role="Marketing Head"
                description="Spearheading technological innovation and digital transformation initiatives."
              />
              <ProfileCard 
                name="Abu Hamza"
                role="Tech Head"
                description="Ensuring smooth operational workflows and process optimization."
              />
              <ProfileCard 
                name="Aaryan Singh"
                role="Sergant at Arms"
                description="Developing long-term strategic plans and market positioning."
              />
            </div>
          </div>
        </div>

       {/* Junior Council Section */}
<div className="council-section">
  <div className="council-title">Junior Council</div>

  {/* First Row */}
  <div className="position-group">
    <div className="position-title"></div>
    <div className="profiles four-columns">
      <ProfileCard 
        name="Bianca Creado"
        role="Club Service"
        description="Leading research initiatives and innovation projects."
      />
      <ProfileCard 
        name="Anjali Rawat"
        role="Community Service"
        description="Building strategic partnerships and business relationships."
      />
      <ProfileCard 
        name="Dev Saroj"
        role="Professional Development"
        description="Developing training programs and professional development."
      />
      <ProfileCard 
        name="Royce Antony"
        role="PR Director"
        description="Managing public relations and brand communication strategies."
      />
    </div>
  </div>

  {/* Second Row */}
  <div className="position-group">
    <div className="position-title"></div>
    <div className="profiles four-columns">
      <ProfileCard 
        name="Avril Fernandes"
        role="Marketing Director"
        description="Coordinating media relations and external communications."
      />
      <ProfileCard 
        name="Aaron Deniz"
        role="Marketing Director"
        description="Driving marketing campaigns and customer engagement initiatives."
      />
      <ProfileCard 
        name="Zeon D'Souza"
        role="Technical Director"
        description="Managing human resources and organizational development."
      />
      <ProfileCard 
        name="Chris Perreira"
        role="Media Director"
        description="Leading visual design and user experience across all products."
      />
    </div>
  </div>

  {/* Third Row */}
  <div className="position-group">
    <div className="position-title"></div>
    <div className="profiles four-columns">
      <ProfileCard 
        name="Ziel Cabral"
        role="Media Director"
        description="Organizing and managing corporate events and team activities."
      />
      <ProfileCard 
        name="Anushka Kedare"
        role="Media Director"
        description="Creating and managing content strategy across all platforms."
      />
      <ProfileCard 
        name="Jeremiah Yangal"
        role="Operational Director"
        description="Ensuring quality standards and continuous improvement."
      />
      <ProfileCard 
        name="Asher Coutinho"
        role="Task Force"
        description="Developing digital marketing strategies and brand positioning."
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

  // Create placeholder images
  const profileImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM0MTQxNDEiLz4KPGNpcmNsZSBjeD0iNDAiIGN5PSIzMiIgcj0iMTIiIGZpbGw9IiNmZjU4NTgiLz4KPGF0aCBkPSJNMTYgNTZjMC04IDExLTE2IDI0LTE2czI0IDExIDI0IDE2djE2SDE2VjU2eiIgZmlsbD0iI2ZmNTg1OCIvPgo8L3N2Zz4=";
  
  const cardPhotoPlaceholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDI0MCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iMTYwIiByeD0iNSIgZmlsbD0iIzQxNDE0MSIvPgo8cGF0aCBkPSJNMTIwIDgwQzEzMy4yNTQgODAgMTQ0IDY5LjI1NDMgMTQ0IDU2QzE0NCA0Mi43NDU3IDEzMy4yNTQgMzIgMTIwIDMyQzEwNi43NDYgMzIgOTYgNDIuNzQ1NyA5NiA1NkM5NiA2OS4yNTQzIDEwNi43NDYgODAgMTIwIDgwWiIgZmlsbD0iI2ZmNTg1OCIvPgo8cGF0aCBkPSJNNDAgMTYwQzQwIDE2MCA4MCAxMjAgMTIwIDEyMEMxNjAgMTIwIDIwMCAxNjAgMjAwIDE2MEg0MFoiIGZpbGw9IiNmZjU4NTgiLz4KPC9zdmc+";

  // Check if role needs GitHub icon
  const needsGithub = ['Tech Head', 'Sergant at Arms', 'Secretary', 'Technical Director'].includes(role);

  return (
    <div 
      className={`profile ${isExpanded ? 'expanded' : ''}`}
      onClick={toggleExpand}
      ref={profileRef} 
    >
      {/* Uiverse Card */}
      <div className={`uv-card ${isExpanded ? 'show' : ''}`}>
        <div className="imge">
          <div className="Usericon"></div>
          <div className="UserName">{name.split(' ')[0]}</div>
          <div className="Id">{role}</div>
        </div>
        <div className="photo-placeholder" style={{ backgroundImage: `url(${cardPhotoPlaceholder})` }}></div>
        <div className={`social-media ${needsGithub ? 'with-github' : ''}`}>
          {/* Instagram */}
          <a href="#" aria-label="Instagram">
            <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
            </svg>
          </a>
          
          {/* LinkedIn */}
          <a href="#" aria-label="LinkedIn">
            <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
            </svg>
          </a>
          
          {/* Email */}
          <a href="#" aria-label="Email">
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path>
            </svg>
          </a>
          
          {/* GitHub - only for specific roles */}
          {needsGithub && (
            <a href="#" aria-label="GitHub">
             <svg viewBox="0 0 496 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.3-1.3 1.3-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
              </svg>
            </a>
          )}
        </div>
      </div>

      <img src={profileImage} alt={name} id="picture" />
      <div className="details">
        {name}
        <span>{role}</span>
      </div>
    </div>
  );
};

export default Team;