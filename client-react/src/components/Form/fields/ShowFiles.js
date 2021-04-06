import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { Storage } from 'aws-amplify';
import './ShowFiles.scss';

const ShowFiles = ({ name, label }) => {
  const [link, setLink] = useState('');

  const getLink = async () => {
    // const s3Link = await Storage.get(name);
    // setLink(s3Link);
  };

  useEffect(() => {
    getLink();
  }, []);

  return (
    <div className="show-files">
      <p className="show-files__label">{label}</p>
      {
        link
          ? (
            <img
              className="show-files__img"
              width={50}
              height={50}
              src={link}
              alt={name}
            />
          )
          : 'loading...'
      }
    </div>
  );
};

ShowFiles.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default ShowFiles;
