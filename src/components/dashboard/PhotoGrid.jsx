import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { Image } from 'antd';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import PhotoThumbnail from './PhotoThumbnail.jsx';
import FloatingButton from './FloatingButton.jsx';
import ImageUploadModal from '../ImageUploadModal.jsx';
import GroupStateContext from '../../contexts/GroupStateContext.jsx';

import '../../scss/photo-grid.scss';

const item = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1 },
};

function PhotoGrid({ photos }) {
  const [isUploadModalVisible, setUploadModalVisible] = useState(false);
  const openUploadModal = () => setUploadModalVisible(true);
  const closeUploadModal = () => setUploadModalVisible(false);
  const { groups } = useContext(GroupStateContext);

  return (
    <div className="photo-grid-container">
      <Image.PreviewGroup>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            initial={{ opacity: 0, y: '25%' }}
            key="photo-container"
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: '25%',
            }}
            transition={{
              ease: 'easeOut',
              duration: 0.3,
              type: 'spring',
              bounce: 0.25,
            }}
          >
            <div className="photo-grid">
              {photos.map(photo => (
                <motion.div key={photo.URL} variants={item}>
                  <PhotoThumbnail key={photo.URL} src={photo.URL} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        {groups.length > 0 && (
          <FloatingButton onClick={openUploadModal}>
            <AiOutlineCloudUpload size={32} color="#525252" />
          </FloatingButton>
        )}
      </Image.PreviewGroup>
      <ImageUploadModal
        visible={isUploadModalVisible}
        onClose={closeUploadModal}
      />
    </div>
  );
}

PhotoGrid.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      URL: PropTypes.string.isRequired,
      caption: PropTypes.string,
    }),
  ).isRequired,
};

export default PhotoGrid;
