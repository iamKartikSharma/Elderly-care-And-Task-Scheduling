import React from 'react';
import RatingSystem from '../../../../src/components/RatingSystem';

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.role}</p>
      <RatingSystem 
        userId={user._id}
        userType={user.role === 'volunteer' ? 'volunteer' : 'family'}
      />
    </div>
  );
};

export default UserProfile;